const publicationsUpdatedOn = "2026-Jun-30";
const publicationsData = [
  {
    "title": "A 43 μm × 269 μm Light-Adaptive Optoelectronic Autonomous Microsystem for Neural Recording",
    "authors": [
      "Rui Jiao",
      "Yumin Zheng",
      "Azmaeen M. Nibras",
      "Shahaboddin Ghajari",
      "Sanaz Sadeghi",
      "Alejandro J. Cortese",
      "Paul L. McEuen",
      "Alyosha C. Molnar",
      "Sunwoo Lee"
    ],
    "venue": "IEEE Transactions on Biomedical Circuits and Systems",
    "year": 2026,
    "type": "Article",
    "links": {
      "pdf": "https://doi.org/10.1109/TBCAS.2026.3652195",
      "doi": "https://doi.org/10.1109/TBCAS.2026.3652195"
    },
    "abstract": "We present a 43 µm × 269 µm tetherless neural recording microsystem in which the CMOS bulk is forward-biased to utilize silicon junctions as a photovoltaic source. Our microsystem, forward-bulk microscale optoelectronic tetherless electrode (FB-MOTE), can operate with as low as 0.2 µA at 0.317 V and can withstand light intensity up to 1200 µW/mm2, and is power-adaptive: the higher available power increases the system bandwidth while maintaining the input-referred integrated noise. To balance adaptability and stability, we have designed our amplifier to take up most of the additional power, hence acting like a regulator, while the other circuit blocks are PTAT-biased to remain relatively stable across available power levels. The amplified neural signals are pulse position modulated (PPM) and optically transmitted through an AlGaAs microscale light emitting diode (µLED) for its information-per-photon efficiency, where the µLED driver is designed to maximize the emission-to-area ratio. Finally, we discuss various light-induced effects observed in measurements and introduce a simulation methodology to account for such effects and its limitations. Our forward-bulk CMOS microsystem provides an approach that can effectively harness and account for the available light in optoelectronic systems design.",
    "citations": 1,
    "citationsByYear": {
      "2026": 1
    },
    "id": "11339461_TBCAS2026"
  },
  {
    "title": "A Closed-Loop and Data-Driven Decoding Algorithm for Optical Pulse Position Modulated Uplinks in Neural Implants",
    "authors": [
      "Yumin Zheng",
      "Rui Jiao",
      "Sunwoo Lee"
    ],
    "venue": "ICASSP 2026 - 2026 IEEE International Conference on Acoustics, Speech and Signal Processing (ICASSP)",
    "year": 2026,
    "type": "Inproceedings",
    "links": {
      "pdf": "https://doi.org/10.1109/ICASSP55912.2026.11462355",
      "doi": "https://doi.org/10.1109/ICASSP55912.2026.11462355"
    },
    "abstract": "Advanced implantable microsystems (IMs) employ pulse position modulation (PPM) for data transmission. However, identifying PPM pulses whose signal-to-noise ratios (SNRs) have been heavily attenuated and fluctuating within biological media is challenging. An efficient decoding algorithm can not only relax the IM design equirements, but also increase its operational depth. We present one such PPM decoding algorithm that is adaptive and closed-loop, utilizing a proportional-integral feedback control, and leverages a microsystem’s periodic clock for reference enhancement. For verification, we model a PPM channel based on experimental data from a neural recording autonomous microsystem, microscale optoelectric tetherless electrode (MOTE). Across test datasets with low and varying SNRs, the algorithm provides higher recall and F1 scores compared to the traditional Otsu’s Method and Otsu-based thresholding. This enhanced pulse detectability translates to a 24 % reduction in total power requirement, demonstrating how our algorithmic improvement directly translates into improved system performance.",
    "id": "11462355_ICASSP2026"
  },
  {
    "title": "A 43 µm × 269 µm, Light-Tolerant and Power-Adaptive Forward-Bulk Optoelectrical Microsystem for Tetherless Neural Recording",
    "authors": [
      "Rui Jiao",
      "Yumin Zheng",
      "Shahaboddin Ghajari",
      "Sanaz Sadeghi",
      "Alejandro J. Cortese",
      "Paul L. McEuen",
      "Alyosha C. Molnar",
      "Sunwoo Lee"
    ],
    "venue": "2025 IEEE International Symposium on Circuits and Systems (ISCAS)",
    "year": 2025,
    "type": "Inproceedings",
    "links": {
      "pdf": "https://doi.org/10.1109/ISCAS56072.2025.11044230",
      "doi": "https://doi.org/10.1109/ISCAS56072.2025.11044230"
    },
    "abstract": "A sub-nanoliter, light-tolerant (780 µW/mm2), and power-adaptive forward-bulk optoelectronic microsystem for tetherless neural recording is presented. The CMOS bulk is used as a power harvester to utilize photogenerated carriers and a lower transistor threshold voltage for low power design (~0.3 µA at ~0.32 V). Increasing optical power boosts the system bandwidth to 14 kHz and the sampling frequency to 18.2 kHz, while maintaining the integrated input-referred noise (~10 µVRMS) stable, with an NEF of 2.34.",
    "citations": 1,
    "citationsByYear": {
      "2026": 1
    },
    "id": "11044230_ISCAS2025"
  },
  {
    "title": "A High-Sensitivity Partial Discharge Detection System Based on a Superwide-Band Reconfigurable Antenna Sensor for Insulation Diagnosis in IIoT Applications",
    "authors": [
      "Yange Wang",
      "Yumin Zheng",
      "Zhou Shu",
      "Shiquan Wang",
      "Wensong Wang",
      "Yuanjin Zheng"
    ],
    "venue": "IEEE Internet of Things Journal",
    "year": 2025,
    "type": "Article",
    "links": {
      "pdf": "https://doi.org/10.1109/JIOT.2025.3582276",
      "doi": "https://doi.org/10.1109/JIOT.2025.3582276"
    },
    "abstract": "Accurate partial discharge (PD) detection and insulation diagnosis are essential for ensuring the operational safety of high-voltage (HV) power equipment, while wideband high sensitivity PD detection is extremely imperative since most of the PD events reflecting potential insulation defects have low strength (<1 pC) with wideband features. However, conventional wideband detection methods, such as high-frequency (HF) antennas often suffer from the tradeoff between low sensitivity, increased noise and the bandwidth requirements due to their low-Q features in the wideband sensing, and the vulnerability to in-band narrowband interference, especially in complex industrial environments. To address these challenges, this article proposes a novel high sensitivity super-wideband PD detection system for Industrial Internet of Things (IIoT) applications integrating a reconfigurable HF antenna sensor (RHAS), a bandwidth-reconfigurable low-noise amplifier (BRLNA), and a sub-band synthesis algorithm with built-in narrowband interference rejection (NIR) function. The RHAS captures weak PD signals across 48 high-Q sub-bands, which are individually amplified and digitally synthesized to reconstruct the wideband signal with enhanced sensitivity. The proposed system enables remote, clamp-free PD detection with strong NIR capability near grounded conductors, significantly outperforming the traditional sensors, such as HF current transformers (HFCTs). Experimental results demonstrate a detection bandwidth from 1.4 to 98.2 MHz (194.38% relative bandwidth) and a minimum detectable PD level of 0.3 pC. Compared with HFCT-based systems, the proposed method achieves a 0.4–4.2 dB improvement in PD signal-to-noise ratio (SNR) and a 6.1–8.4 dB increase in total system gain. These results validate the effectiveness and robustness of the proposed approach for high-sensitivity wideband PD monitoring.",
    "citations": 2,
    "citationsByYear": {
      "2025": 1,
      "2026": 1
    },
    "id": "11048658_JIOT2025"
  },
  {
    "title": "A subnanolitre tetherless optoelectronic microsystem for chronic neural recording in awake mice",
    "authors": [
      "Sunwoo Lee",
      "Shahaboddin Ghajari",
      "Sanaz Sadeghi",
      "Yumin Zheng",
      "Hind Zahr",
      "Alejandro J. Cortese",
      "Wenchao Gu",
      "Kibaek Choe",
      "Aaron Mok",
      "Melanie Wallace",
      "Rui Jiao",
      "Chunyan Wu",
      "Jesse C. Werth",
      "Weiru Fan",
      "Praneeth Mogalipuvvu",
      "Ju Uhn Park",
      "Shitong Zhao",
      "Conrad Smart",
      "Thomas A. Cleland",
      "Melissa R. Warden",
      "Jan Lammerding",
      "Tianyu Wang",
      "Jesse H. Goldberg",
      "Paul L. McEuen",
      "Chris Xu",
      "Alyosha C. Molnar"
    ],
    "venue": "Nature Electronics",
    "year": 2025,
    "type": "Article",
    "links": {
      "pdf": "https://doi.org/10.1038/s41928-025-01484-1",
      "doi": "https://doi.org/10.1038/s41928-025-01484-1"
    },
    "abstract": "The long-term recording of neural activity could be used to understand complex behaviours and disorders. However, the development of technology capable of such measurements faces a variety of technical challenges, including the relative motion between recording electrodes and tissue and the excessive displaced volume from implanted electronics. Here we report a subnanolitre-volume tetherless optoelectronic microsystem for neural recording. The system relies on light for photovoltaic power and data transfer, through a light-emitting diode, eliminating the need for wires or other tethers. It uses a single AlGaAs diode as both photovoltaic and light-emitting diode. Complementary metal–oxide–semiconductor circuits provide low-noise amplification, pulse-position-modulated encoding and electro-optical transduction. Two-dimensional materials processing techniques, vacuum annealing and atomic layer deposition, in conjunction with a standard complementary metal–oxide–semiconductor fabrication process, provide compact encapsulation against the corrosive conditions of biological media. We show that the subnanolitre neural implant is capable of chronic (365 days) in vivo recordings in awake mice.",
    "citations": 5,
    "citationsByYear": {
      "2026": 5
    },
    "id": "NE2025"
  },
  {
    "title": "Design, Modeling, and Control of a Coaxial Drone",
    "authors": [
      "Liangming Chen",
      "Jiaping Xiao",
      "Yumin Zheng",
      "N Arun Alagappan",
      "Mir Feroskhan"
    ],
    "venue": "IEEE Transactions on Robotics",
    "year": 2024,
    "type": "Article",
    "links": {
      "pdf": "https://doi.org/10.1109/TRO.2024.3354161",
      "doi": "https://doi.org/10.1109/TRO.2024.3354161"
    },
    "abstract": "Various quadrotor drones have been developed in recent years, mainly focusing on either improving maximum thrust per platform area or flight maneuverability. Evidently, achieving both advantages simultaneously is a challenging task, since they call for opposing rotor requirements. Specifically, improving the drone's maximum thrust per platform area mainly requires reducing the number of rotors to make way for larger and more powerful rotors. While this can be an effective method to increase overall thrust, improving flight maneuverability requires a greater number of rotors to generate larger rotating torques or to increase the thrust vectoring capability. To address this challenge, we design a novel coaxial drone with two contra-rotating rotors for high thrust efficiency while enabling independent dual-axis rotor rotation to maintain maneuverability along the roll and pitch axes. The thrust vectoring capability is provided by two dedicated servomotors connected vertically in series with the coaxial propellers to produce a compact and elongated fuselage frame. A nonlinear flight model in six degrees of freedom is developed for the underactuated system, incorporating four control inputs from the two propellers and servos, respectively. Consequently, a nonlinear control allocation approach is proposed such that the drone can produce a desired control force and yaw torque to stabilize the drone's position and yaw angle. For the uncontrolled roll and pitch dynamics, a damping component is added such that the roll and pitch angular velocities can also be stabilized. Both numerical simulations and real experiments are conducted to validate the design of the drone and the effectiveness of the proposed control strategy.",
    "citations": 60,
    "citationsByYear": {
      "2024": 10,
      "2025": 39,
      "2026": 11
    },
    "id": "10399791_TRO2024"
  }
];
