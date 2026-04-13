import { Publication, ResearchArea, Collaboration, NewsItem, Talk } from './types';
import { parseBibTex } from './utils/bibParser';
import profileImg from './img/susannaaz.jpg';
import researchImg from './img/gravity_group.png'

// Note: These imports will work locally if you have the files in an 'img' folder.
// For the preview to work here, we use the existing URLs as fallbacks.
// const profileImg = "https://storage.googleapis.com/nav-p-ais-attachments/758276f5-045a-4721-8742-0199587c6722";
// const researchImg = "https://picsum.photos/seed/physics_group/1200/800";

export const COLLABORATIONS: Collaboration[] = [
  {
    id: 'so',
    name: 'Simons Observatory',
    description: 'A state-of-the-art CMB experiment in the Atacama Desert of Chile, designed to measure the CMB with unprecedented sensitivity.',
    contribution: 'I co-lead the analysis efforts for the Small Aperture Telescopes (SATs), focusing on data analysis, pipeline development, validation, and instrument characterization. I co-lead the B-mode analysis working group focused on the search for primordial gravitational waves.',
    imageUrl: 'https://simonsobservatory.org/wp-content/uploads/2024/10/simons-home-scaled.jpg',
    url: 'https://simonsobservatory.org'
  },
  {
    id: 'litebird',
    name: 'LiteBIRD',
    description: 'An upcoming satellite mission dedicated to the measurements of CMB polarization at the larger angular scales across the entire sky.',
    contribution: 'I am an active member of the systematics and foregrounds analysis groups, working on modeling and mitigating complex galactic foregrounds and instrument effects.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/23/LiteBIRD_CG03.jpg',
    url: 'https://www.isas.jaxa.jp/en/missions/spacecraft/future/litebird.html'
  },
  {
    id: 'elfs',
    name: 'ELFS (European Low Frequency Survey)',
    description: 'A project aimed at providing high-sensitivity maps of the sky at low frequencies to improve our understanding of galactic foregrounds.',
    contribution: 'I contribute to the analysis of low-frequency data to better characterize synchrotron radiation, which is a critical foreground for CMB polarization searches.',
    imageUrl: 'https://www.spiedigitallibrary.org/ContentImages/Proceedings/13102/1310225/FigureImages/00076_PSISDG13102_1310225_page_8_1.jpg',
    url: 'https://elfs.web.roma2.infn.it/'
  },
  {
    id: 'qubic',
    name: 'QUBIC',
    description: 'The Q&U Bolometric Interferometer for Cosmology, a ground-based experiment in Argentina that uses bolometric interferometry to study the CMB.',
    contribution: 'I previously contributed to the design, construction, and testing of the cryogenic systems.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/41/Qubic_instrument_shelter_1.jpg',
    url: 'https://en.wikipedia.org/wiki/Qubic_experiment'
  }
];

export const RESEARCH_AREAS: ResearchArea[] = [
  {
    id: 'cmb-analysis',
    title: 'CMB Analysis & Component Separation',
    description: 'Developing advanced pipelines to separate the faint primordial B-mode signal from complex galactic foregrounds. My work focuses on hybrid map-power spectrum methods, moment expansion techniques, and likelihood analysis to constrain inflationary physics using data from the Simons Observatory and LiteBIRD.',
    imageUrl: 'https://picsum.photos/seed/cmb_polarization/800/600'
  },
  {
    id: 'instrument-science',
    title: 'Instrument Science & Systematics',
    description: 'Characterizing systematic effects in next-generation CMB experiments. I lead analysis efforts for the Simons Observatory Small Aperture Telescopes (SATs), focusing on beam chromaticity, calibration, and half-wave plate non-linearities to ensure robust detection of primordial gravitational waves.',
    imageUrl: 'https://picsum.photos/seed/telescope_mirror/800/600'
  },
  {
    id: 'cryogenics',
    title: 'Cryogenic Instrumentation',
    description: 'Designing and building millikelvin environments for cosmological detectors. My background includes constructing miniature dilution refrigerators and developing active heat switches, bridging the gap between theoretical cosmology and the experimental hardware required to observe it.',
    imageUrl: 'https://picsum.photos/seed/cryogenics_lab/800/600'
  }
];

// Paste your BibTeX content here to update the website
const BIBTEX_SOURCE = `
@article{azzoni2025so,
  title={The Simons Observatory: Characterization of the Mid-Frequency Small Aperture Telescopes from Early Survey Maps},
  author={S. Azzoni and others},
  journal={In preparation},
  year={2025}
}
@article{rigouzzo2025planck,
  title={Re-Calibrating Planck without assuming no cosmic birefringence},
  author={C. Rigouzzo and E. Lim and S. Azzoni and J. Dunkley and A. Liu},
  journal={In preparation},
  year={2025}
}
@article{duivenvoorden2025bayesian,
  title={Bayesian map-based CMB B-mode analysis with the Needlet-ILC algorithm and simulation based inference},
  author={A. Duivenvoorden and K. Surrao and S. Azzoni and others},
  journal={In preparation},
  year={2025}
}
@article{liu2025dust,
  title={The Simons Observatory: Assessing the impact of dust complexity on the recovery of primordial B-modes},
  author={Y. Liu and S. Azzoni and S. E. Clark and B. S. Hensley and L. Vacher and others},
  journal={JCAP},
  volume={2025},
  pages={024},
  year={2025},
  doi={10.1088/1475-7516/2025/11/024}
}
@article{hervias2025so,
  title={The Simons Observatory: validation of reconstructed power spectra from simulated filtered maps for the small aperture telescope survey},
  author={C. Hervias-Caimapo and K. Wolz and A. La Posta and S. Azzoni and others},
  journal={JCAP},
  volume={06},
  pages={055},
  year={2025},
  doi={10.48550/arXiv.2502.00946}
}
@article{dachlythra2025beam,
  title={The Simons Observatory: Quantifying the impact of beam chromaticity on large-scale B-mode science},
  author={N. Dachlythra and K. Wolz and S. Azzoni and others},
  journal={arXiv e-prints},
  year={2025},
  eprint={2503.01791}
}
@article{hertig2024so,
  title={The Simons Observatory: Combining cross-spectral foreground cleaning with multitracer B-mode delensing for improved constraints on inflation},
  author={E. Hertig and K. Wolz and T. Namikawa and A. B. Lizancos and S. Azzoni and others},
  journal={Phys. Rev. D},
  volume={110},
  pages={043532},
  year={2024},
  doi={10.1103/PhysRevD.110.043532}
}
@article{wolz2024so,
  title={The Simons Observatory: Pipeline comparison and validation for large-scale B-modes},
  author={K. Wolz and S. Azzoni and C. Hervias-Caimapo and J. Errard and N. Krachmalnicoff and others},
  journal={Astronomy & Astrophysics},
  volume={686},
  pages={A16},
  year={2024},
  doi={10.1051/0004-6361/202347565}
}
@article{hadzhiyska2023cosmo,
  title={Cosmology with 6 parameters in the Stage-IV era: efficient marginalisation over nuisance parameters},
  author={B. Hadzhiyska and K. Wolz and S. Azzoni and D. Alonso and others},
  journal={The Open Journal of Astrophysics},
  volume={6},
  year={2023},
  doi={10.21105/astro.2301.11895}
}
@article{azzoni2023hybrid,
  title={A hybrid map-C_ell component separation method for primordial CMB B-mode searches},
  author={S. Azzoni and D. Alonso and M. H. Abitbol and J. Errard and N. Krachmalnicoff},
  journal={J. Cosmology Astropart. Phys.},
  volume={2023},
  pages={035},
  year={2023},
  doi={10.1088/1475-7516/2023/03/035}
}
@article{may2022active,
  title={An Active Convective 4He Heat Switch},
  author={A. May and S. Azzoni and S. Melhuish and L. Piccirillo and T. Sweetnam and J. Winnicki},
  journal={Cryogenics},
  volume={128},
  year={2022},
  doi={10.1016/j.cryogenics.2022.103585}
}
@article{vacher2022moment,
  title={Moment expansion of polarized dust SED: A new path towards capturing the CMB B-modes with LiteBIRD},
  author={L. Vacher and J. Aumont and L. Montier and S. Azzoni and others},
  journal={Astronomy & Astrophysics},
  volume={660},
  pages={A111},
  year={2022},
  doi={10.1051/0004-6361/202142664}
}
@article{azzoni2021minimal,
  title={A minimal power-spectrum-based moment expansion for CMB B-mode searches},
  author={S. Azzoni and M. H. Abitbol and D. Alonso and A. Gough and N. Katayama and T. Matsumura},
  journal={J. Cosmology Astropart. Phys.},
  volume={2021},
  pages={047},
  year={2021},
  doi={10.1088/1475-7516/2021/05/047}
}
@article{banys2020parametric,
  title={Parametric Amplification at Ka Band via Nonlinear Dynamics in Superconducting 3D Cavities},
  author={D. Banys and M. A. McCulloch and S. Azzoni and others},
  journal={Journal of Low Temperature Physics},
  volume={200},
  pages={295-304},
  year={2020},
  doi={10.1007/s10909-020-02439-w}
}
@article{azzoni2020closed,
  title={A Closed-Cycle Miniature Dilution Refrigerator for a Fast-Cooldown 100 mK Detector Wafer Test Cryostat},
  author={S. Azzoni and A. J. May and S. T. Chase and G. Coppi and L. C. Kenny and S. J. Melhuish and L. Piccirillo and A. Suzuki and J. Wenninger},
  journal={Journal of Low Temperature Physics},
  volume={199},
  pages={771-779},
  year={2020},
  doi={10.1007/s10909-020-02374-w}
}
`;

export const PUBLICATIONS: Publication[] = parseBibTex(BIBTEX_SOURCE);

export const NEWS: NewsItem[] = [
  {
    id: 'n1',
    date: 'Oct 2024',
    title: 'New Paper on arXiv',
    category: 'Publication',
    content: "Our latest paper discussing the effects of jet-mode feedback on cluster cores is now available on arXiv."
  },
  {
    id: 'n2',
    date: 'Aug 2024',
    title: 'Talk at NAM 2024',
    category: 'Talk',
    content: "Presented my research on AGN feedback loops at the National Astronomy Meeting in Hull."
  },
  {
    id: 'n3',
    date: 'June 2024',
    title: 'Research Visit',
    category: 'Award',
    content: "Visiting the Flatiron Institute CCA to collaborate on new simulation techniques."
  }
];

export const TALKS: Talk[] = [
  {
    id: 't1',
    date: 'Feb 2026',
    title: 'Exploring the Birth of the Universe with the CMB',
    event: 'KITP, Santa Barbara',
    type: 'Invited',
    url: 'https://online.kitp.ucsb.edu/online/cmblss26/azzoni/'
  },
  {
    id: 't2',
    date: 'Dec 2025',
    title: 'Probing the Early Universe with the Simons Observatory',
    event: 'Weinberg Institute, UT Austin',
    type: 'Seminar'
  },
  {
    id: 't3',
    date: 'July 2025',
    title: 'SAT status (maps and spectra), Filtering choices and ell knee, Towards first r, SO extended forecast, Constraining dust from ACT',
    event: 'Simons Observatory Collaboration Meeting, University of Manchester',
    type: 'Invited'
  },
  {
    id: 't4',
    date: 'Jun 2025',
    title: 'Simons Observatory: SAT Characterization From Early Survey Data',
    event: 'COSMO 2025, Carnegie Mellon University, USA',
    type: 'Contributed'
  },
  {
    id: 't5',
    date: 'Jun 2025',
    title: 'Simons Observatory: SAT Characterization From Early Survey Data',
    event: 'mmUniverse 2025, University of Chicago, USA',
    type: 'Contributed'
  },
  {
    id: 't6',
    date: 'Feb 2025',
    title: 'Probing the Early Universe with the Simons Observatory',
    event: 'BCCP Seminar, Berkeley University',
    type: 'Seminar',
    url: 'https://cosmology.lbl.gov/talks/Azzoni_25.pdf'
  },
  {
    id: 't7',
    date: 'Jan 2025',
    title: 'Probing the Early Universe with the Simons Observatory',
    event: 'University of Pennsylvania',
    type: 'Seminar'
  },
  {
    id: 't8',
    date: 'Nov 2024',
    title: 'Mapping the Early Universe with the Simons Observatory',
    event: 'University of Melbourne',
    type: 'Colloquium'
  },
  {
    id: 't9',
    date: 'Oct 2024',
    title: 'Early analysis from the Simons Observatory Small Aperture Telescopes',
    event: 'Kashiwa-no-ha Dark Matter and Cosmology Symposium, Tokyo, Japan',
    type: 'Contributed'
  },
  {
    id: 't10',
    date: 'Oct 2024',
    title: 'Early analysis from the Simons Observatory Small Aperture Telescopes',
    event: 'COSMO2024, Kyoto, Japan',
    type: 'Contributed'
  },
  {
    id: 't11',
    date: 'July 2024',
    title: 'From maps to C_ell with the Simons Observatory first data',
    event: 'Simons Observatory Collaboration Meeting, University of Chicago',
    type: 'Invited'
  },
  {
    id: 't12',
    date: 'July 2023',
    title: 'Early Universe with CMB B-mode: observational challenges',
    event: 'The National Astronomy Meeting 2023, Cardiff',
    type: 'Contributed'
  },
  {
    id: 't13',
    date: 'June 2023',
    title: 'CMB Spectral Distortion: foreground mitigation methods',
    event: 'UK Spectral Distortion Meeting, Royal Astronomical Society, London',
    type: 'Invited'
  },
  {
    id: 't14',
    date: 'Nov 2022',
    title: 'Detecting the Cosmic Microwave Background through foregrounds and systematics',
    event: 'Cosmology group meeting, Cambridge University',
    type: 'Invited'
  },
  {
    id: 't15',
    date: 'Nov 2022',
    title: 'Hybrid map-C_ell vs moments: component separation methods',
    event: 'Cosmology lunch, Princeton University',
    type: 'Invited'
  },
  {
    id: 't16',
    date: 'Nov 2022',
    title: 'Detecting the Cosmic Microwave Background through foregrounds and systematics',
    event: 'Princeton University Gravity Group',
    type: 'Seminar'
  },
  {
    id: 't17',
    date: 'Oct 2022',
    title: 'Hybrid map-C_ell vs moments: component separation methods',
    event: 'Cardiff University',
    type: 'Seminar',
    url: 'https://docs.google.com/presentation/d/1r7GHDxD_n4bqPByBNuIL6jx4KghxkbNDPwalC3DnEMU/edit?usp=sharing'
  },
  {
    id: 't18',
    date: 'Sep 2022',
    title: 'Hybrid map-C_ell vs moments: component separation methods',
    event: 'SISSA, Trieste, Italy',
    type: 'Seminar',
    url: 'https://docs.google.com/presentation/d/13gFP36zTjPtAQNxdJY27E-QgyZaAjN5jsSP6VVyzWdE/edit?usp=sharing'
  },
  {
    id: 't19',
    date: 'July 2022',
    title: 'Component separation and likelihood pipelines for SO CMB B-modes',
    event: 'SO Meeting, San Diego, California',
    type: 'Invited'
  },
  {
    id: 't20',
    date: 'May 2022',
    title: 'From Planck to the future of CMB',
    event: 'Ferrara, Italy',
    type: 'Poster',
    url: 'https://drive.google.com/file/d/1-ZHafHvx_vneE2XOlLWlIPUF3Bc2lU51/view?usp=sharing'
  },
  {
    id: 't21',
    date: 'May 2022',
    title: 'Systematic effects due to HWP rotational instabilities',
    event: 'Cosmoglobe virtual conference',
    type: 'Invited',
    url: 'https://youtu.be/YaGjVu8JqDY'
  },
  {
    id: 't22',
    date: 'Nov 2021',
    title: 'A hybrid map-C_ell component separation method for CMB B-mode searches',
    event: 'SO Analysis Working group B-mode Meeting at APC, Paris, France',
    type: 'Invited',
    url: 'https://docs.google.com/presentation/d/1crlOnDVuHZfiDz5EDMSCM1JUIpaA_5fszwXBfJS3MKM/edit?usp=sharing'
  },
  {
    id: 't23',
    date: 'Oct 2021',
    title: 'Systematic effects due to HWP rotational instabilities',
    event: 'LiteBIRD Collaboration Meeting',
    type: 'Invited',
    url: 'https://docs.google.com/presentation/d/19VyY2SgRHYk2wcTRllxgFXTXXR8sfSCUy3ebKdkFees/edit?usp=sharing'
  },
  {
    id: 't24',
    date: 'Oct 2021',
    title: 'Detecting the Cosmic Microwave Background through foregrounds and systematics',
    event: 'LiteBIRD Meeting',
    type: 'Talk',
    url: 'https://docs.google.com/presentation/d/19VyY2SgRHYk2wcTRllxgFXTXXR8sfSCUy3ebKdkFees/edit?usp=sharing'
  },
  {
    id: 't25',
    date: 'July 2021',
    title: 'Detecting the Cosmic Microwave Background through foregrounds and systematics',
    event: 'Simons Observatory Meeting',
    type: 'Talk',
    url: 'https://docs.google.com/presentation/d/1MAJHmWp19fxTMmWpI7x7NZUgkpntbUsb8cHBUj69snw/edit?usp=sharing'
  },
  {
    id: 't26',
    date: 'Feb 2021',
    title: 'A minimal power-spectrum-based moment expansion for CMB B-mode searches',
    event: 'LiteBIRD Collaboration Meeting',
    type: 'Invited',
    url: 'https://docs.google.com/presentation/d/1yXuNbObIXcXV1fCjfhcdQ29T3RSaD6uiUxBNjEfDjV0/edit?usp=sharing'
  },
  {
    id: 't27',
    date: 'Dec 2020',
    title: 'A minimal power-spectrum-based moment expansion for CMB B-mode searches',
    event: 'CMB systematics and calibration focus workshop, Kavli IPMU',
    type: 'Contributed',
    url: 'https://indico.ipmu.jp/event/380/contributions/5432/attachments/3511/4521/CMB_systematics_workshop_-_Susanna_Azzoni.pdf'
  },
  {
    id: 't28',
    date: 'July 2020',
    title: 'A Closed-Cycle Miniature Dilution Refrigerator for a Fast-Cooldown 100 mK Detector Wafer Test Cryostat',
    event: 'University of Chicago',
    type: 'Seminar',
    url: 'https://drive.google.com/file/d/16M8QzRhrMM082XoBhp3Dth0oJ1xSbZAH/view?usp=sharing'
  },
  {
    id: 't29',
    date: 'June 2020',
    title: 'Beam systematics and Component Separation in the Cl pipeline',
    event: 'Simons Observatory F2F Meeting',
    type: 'Fireslide',
    url: 'https://docs.google.com/presentation/d/1Rve5aVGvcBn-kOTCGExajP_spbmDuaskbE2fgIeZHUA/edit?usp=sharing'
  },
  {
    id: 't30',
    date: 'July 2019',
    title: 'A Closed-Cycle Miniature Dilution Refrigerator for a Fast-Cooldown 100 mK Detector Wafer Test Cryostat',
    event: '18th International Workshop on Low Temperature Detectors 18, Milan, Italy',
    type: 'Poster',
    url: 'https://agenda.infn.it/event/15448/contributions/95661/attachments/65653/80018/LTD_poster_final_-_Azzoni_S.pdf'
  }
];

// CV Data for Context (derived from PDF)
const CV_CONTEXT = `
CURRENT POSITION:
- Postdoctoral Research Associate, Department of Physics, Princeton University (Sep 2023 - Present).
- References: Jo Dunkley, Lyman Page.

EDUCATION:
- DPhil in Astrophysics, University of Oxford (Sep 2019 - Jul 2023). Thesis: "Early Universe from CMB B-modes: Observational Challenges". Advisors: David Alonso, Tomotake Matsumura.
- MSc by Research in Astronomy and Astrophysics, University of Manchester (Sep 2018 - Sep 2019). Distinction. Thesis Advisor: Lucio Piccirillo.
- BSc (Joint Honours) Physics and Philosophy, King's College London (Sep 2014 - Jun 2018).

ACADEMIC APPOINTMENTS:
- Visiting Scholar, Università di Milano, Italy (Sep - Oct 2021).
- Undergraduate Researcher, Kavli Institute for Cosmological Physics, USA (Jan - Jun 2017). Project: LIGO. Advisor: Daniel Holz.
- Undergraduate Researcher, Enrico Fermi Institute, USA (Mar - Jun 2017). Advisor: Richard G. Kron.
- Visiting Researcher, Max-Planck-Institut für Gravitationsphysik, Germany (Jun - Aug 2016). Advisor: Daniele Oriti.

HONOURS & GRANTS:
- Simons Foundation Grant (Award #457687, B.K), Jan 2025-Present.
- Princeton Physics Postdoctoral Fellowship, 2023-Present.
- Education, Diversity and Inclusion (EDI) Fellowship, Princeton University, 2024-Present.
- Kavli/IPMU PhD Fellowship, 2019-2023.
- European Space Agency Award: Technology Transfer and Innovation Workshop, Belgium, Nov 2018.
- Broadening Horizons Award, King's College London, May 2016.
- International Youth Leadership (IYLP) Award, Beijing Normal University, July 2015.

MAJOR COLLABORATIONS:
- Simons Observatory (300+ members): 2019-present. Co-Lead of B-mode and SAT Analysis Working Groups. Junior Representative for Theory and Analysis Committee.
- LiteBIRD (200+ members): 2019-present. Active member: Systematics and Foregrounds analysis groups.
- European Low Frequency Survey (~20 members): 2022-present.
- QUBIC (50+ members): 2018-2023. Past member: building and testing cryogenic systems.

ADVISING & MENTORING:
- Yiqi Andrew Liu (PhD Student), Princeton University (Sep 2023 - Present). Co-advised with Jo Dunkley.
- Heidi Gubser (Undergraduate), Princeton University (Aug 2025 - Present). Summer Project & Junior Thesis.
- Teodor Grosu (Undergraduate), Princeton University (Sep 2025 - Present). Senior Thesis.
- Claire Rigouzzo (PhD Student), King's College London (Sep 2024 - Present).
- Mentor for: 1 graduate student in Princeton Astrophysics (2023-Present), 4 undergrads in Princeton Physics Mentorship (2023-2025), 1 undergrad in Oxford Physics Gender Equity Network (2021-2022).

TEACHING:
- Guest Lecturer, Princeton University (Astrophysical Sciences 203), April 2025.
- Tutor of Physics, St Peter's College, Oxford (2021-2023). Taught Electromagnetism, Optics, Circuit Theory.

SCIENCE COMMUNICATION:
- Princeton EDI outreach organizer (ZAPP) 2024-2025.
- Pythagorean Astronomy podcast interview (Aug 2023).
- Organized High School Class: Calculating the Age of the Universe, Oxford (July 2021).

PROFESSIONAL ACTIVITIES:
- Proposal Reviewer for NSF (2025).
- Referee for A&A, JCAP, MNRAS.
- Organizer of Simons Observatory SAT Analysis Hackathon (Princeton, 2025).
- Cosmology lunch weekly meeting organizer (Princeton, 2023-Present).
- BIPAC Cosmology weekly meeting organizer (Oxford, 2021-2023).
- Undergraduate Hiring Committee, St. Peter's College, Oxford (Dec 2021).
`;

export const PROFILE = {
  name: "Susanna Azzoni",
  title: "Cosmologist & Astrophysicist",
  affiliation: "Department of Physics, Princeton University",
  email: "sazzoni@princeton.edu",
  scholarUrl: "https://scholar.google.com/citations?user=eWLv744AAAAJ&hl=it&oi=ao",
  githubUrl: "https://github.com/susannaaz",
  imageUrl: profileImg,
  researchImageUrl: researchImg,
  shortBio: `I am a postdoctoral researcher at Princeton University in cosmology and astrophysics. My work explores how the Universe began and how its earliest moments grew into the cosmic web we see today. Drawing on data from the Simons Observatory and LiteBIRD—and complementary large-scale-structure surveys—I study faint patterns in the cosmic microwave background to probe inflation, uncover new physics, and trace the evolution of cosmic structure. My path here has been shaped by curiosity more than a plan. I started in theory, drawn to quantum gravity and supersymmetry while studying physics and philosophy at King’s College London, and dipped into data through early projects with LIGO and SDSS. But I realized I didn’t understand how any of the instruments behind those discoveries actually worked. So for my master’s, I went into experimental cosmology—where I ended up building a working 100 mK miniature dilution refrigerator entirely from scratch (having started from not even knowing how to turn a screw the right way). During my PhD at Oxford, everything came together. I learned to code from the ground up, discovered the power of observational cosmology, and found my niche in building the tools that connect theory, data, and instruments. Ever since, my work has focused on using precision measurements of the sky to uncover new physics and tell the story of how our Universe came to be.`,
  fullBio: `I am currently working at Princeton University on the Cosmic Microwave Background (CMB). My research focuses on the search for primordial gravitational waves—ripples in spacetime from the earliest moments of the universe. I combine advanced data analysis techniques, instrument characterization, and cosmological theory to separate these faint signals from galactic foregrounds and systematic noise.`
};