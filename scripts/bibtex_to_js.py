import re
import json
import sys
import os

def clean_latex(text):
    """
    Convert basic LaTeX/mathematical symbols to unicode/plain text.
    """
    if not text: return ""
    
    # Remove $ delimiters for math
    text = text.replace('$', '')
    
    # Common symbols map
    replacements = {
        r'\\&': '&',
        r'\\%': '%',
        r'\\$': '$',
        r'\\_': '_',
        r'---': '—',
        r'--': '–',
        r'~': ' ',
        r'\\ ': ' ',
        # Math / Greek (Basic subset)
        r'\\alpha': 'α',
        r'\\beta': 'β',
        r'\\gamma': 'γ',
        r'\\lambda': 'λ',
        r'\\sigma': 'σ',
        r'\\epsilon': 'ε',
        r'\\theta': 'θ',
        r'\\Delta': 'Δ',
        r'\\times': '×',
        r'\\approx': '≈',
        r'\\leq': '≤',
        r'\\geq': '≥',
        r'\\rightarrow': '→',
        r'\\leftarrow': '←',
        r'\\dots': '...',
        r'\\mathcal': '', # Strip mathcal wrapper
        r'\\mathbf': '', # Strip mathbf wrapper
        r'\\textit': '',
        r'\\emph': '',
        r'\\text': '',
    }
    
    for k, v in replacements.items():
        text = text.replace(k, v)
        
    # Remove braces { } but keep content
    # Handling nested braces simply by running multiple passes or regex
    # First, handle command wrappers like \textbf{content} -> content
    # We simple remove all \command{...} structure if we can't map it,
    # but simplest is just remove all { and } and \command words if they aren't in map
    
    # Remove left-over braces
    text = text.replace('{', '').replace('}', '')
    
    # Remove leftover backslashes if they look like commands
    text = re.sub(r'\\[a-zA-Z]+', '', text)
    
    # Fix multiple spaces
    text = re.sub(r'\s+', ' ', text).strip()
    
    return text

def normalize_url(url_str):
    """
    Ensure parsed URL is valid HTTPS link.
    """
    if not url_str: return ""
    url_str = url_str.strip()
    
    # Check if it is a naked DOI (10.xxxx/yyyy)
    if url_str.startswith("10.") and "/" in url_str:
        return f"https://doi.org/{url_str}"
        
    if not url_str.startswith("http"):
        return "https://" + url_str
        
    return url_str

def parse_bibtex(bib_content):
    """
    Robust Regex-based BibTeX parser.
    """
    entries = []
    
    # Pattern to capture the entire entry content inside @type{ key, Content }
    # This relies on counting braces which regex can't perfect, 
    # but we can try to split by Top Level @ markers.
    
    raw_entries = re.split(r'@(\w+)\s*\{', bib_content)
    # raw_entries[0] is garbage before first @
    # raw_entries[1] is Type1, raw_entries[2] is Body1
    # raw_entries[3] is Type2, raw_entries[4] is Body2
    
    for i in range(1, len(raw_entries), 2):
        entry_type = raw_entries[i].lower().strip()
        body = raw_entries[i+1]
        
        # The body string might contain the next @ entry if split didn't work perfectly on closing brace.
        # But split acts on @type{, so mostly it's fine.
        # We just need to find the closing brace of this entry.
        # A simple heuristic: take everything until the last '}' 
        # But that's risky if file has trailing junk.
        # Let's clean the body up to the last }
        if body.rfind('}') != -1:
            body = body[:body.rfind('}')]
            
        # Extract Citation Key (first item before comma)
        if ',' not in body: continue
        entry_id, fields_str = body.split(',', 1)
        entry_id = entry_id.strip()
        
        # Extract Fields using Regex
        # Matches: key = {Val ue}, key = "Value", key = 123
        # Use DOTALL to match newlines in values (Abstracts!)
        field_pattern = re.compile(
            r'(\w+)\s*=\s*(?:\{((?:[^{}]|{[^{}]*})*)\}|"((?:[^"]|\\")*)"|(\d+))', 
            re.IGNORECASE | re.DOTALL
        )
        
        fields = {}
        for match in field_pattern.finditer(fields_str):
            key = match.group(1).lower()
            # Group 2: {val}, Group 3: "val", Group 4: 123
            val = match.group(2) or match.group(3) or match.group(4) or ""
            fields[key] = val
        
        # Process Authors
        start_authors = fields.get("author", "Unknown")
        raw_authors = clean_latex(start_authors).split(" and ")
        clean_authors_list = []
        for author in raw_authors:
            author = author.strip()
            if ',' in author:
                parts = author.split(',')
                if len(parts) >= 2:
                    clean_authors_list.append(f"{parts[1].strip()} {parts[0].strip()}")
                else:
                    clean_authors_list.append(author)
            else:
                clean_authors_list.append(author)

        # DOI / URL Logic
        raw_doi = fields.get("doi", "").strip()
        raw_url = fields.get("url", "").strip()
        
        final_pdf_link = ""
        final_doi_link = ""
        
        # 1. Process DOI
        if raw_doi:
            final_doi_link = normalize_url(raw_doi)
        
        # 2. Process URL (PDF)
        # User request: "DOI and PDF both point to DOI url"
        if final_doi_link:
            final_pdf_link = final_doi_link
        elif raw_url:
            final_pdf_link = normalize_url(raw_url)
            
        # Abstract cleaning
        abstract_text = clean_latex(fields.get("abstract", ""))

        json_entry = {
            "id": entry_id,
            "title": clean_latex(fields.get("title", "Untitled")), 
            "authors": clean_authors_list,
            "venue": clean_latex(fields.get("booktitle") or fields.get("journal") or "Unknown Venue"),
            "year": int(fields.get("year", 0)) if fields.get("year", "0").isdigit() else 2024,
            "type": entry_type.capitalize(),
            "links": {},
            "abstract": abstract_text
        }
        
        if final_pdf_link:
             json_entry["links"]["pdf"] = final_pdf_link
        if final_doi_link:
             json_entry["links"]["doi"] = final_doi_link
            
        entries.append(json_entry)

    return entries


def main():
    if len(sys.argv) < 2:
        print("Usage: python bibtex_to_js.py <path_to_bib_file>")
        print("Example: python scripts/bibtex_to_js.py my_papers.bib")
        return

    input_path = sys.argv[1]
    
    if not os.path.exists(input_path):
        print(f"Error: File {input_path} not found.")
        return

    try:
        with open(input_path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        data = parse_bibtex(content)
        
        # Convert to JS string
        json_str = json.dumps(data, indent=2)
        js_content = f"const publicationsData = {json_str};\n"
        
        output_path = "data/publications_generated.js"
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(js_content)
            
        print(f"Success! Converted {len(data)} entries.")
        print(f"Output saved to: {output_path}")
        print("You can verify the content and rename it to 'publications.js' to use it.")
        
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    main()
