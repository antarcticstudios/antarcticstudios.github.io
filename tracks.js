const heirarchy = {
  creditsBroad: {
    "Session & Performance":[
      "Keyboards",
      "Saxophone"
    ],
    "Mixing & Mastering":[
      "Mixing",
      "Mastering"
    ],
    "Production":[
      "Produced",
      "Writing",
      "Engineering",
      "Film Scoring",
      "Orchestration"
    ],
  },
  genresBroad: {
    "Rock":[
      "Progressive Rock",
      "Power Metal",
      "Metal",
      "Pop Punk",
      "Power Ballad",
      "Nu Metal"
    ],
    "Electronic":[
      "Synthwave",
      "Vaporwave",
      "Ambient",
      "Film Score"
    ],
    "Country":[
      "Contemporary Country"
    ],
    "Film Score":[
      "Film Score"
    ],
    "Hip Hop":[
      "Hip Hop"
    ]
  }
}

const tracks = [
  {
    title: "Gloryhammer - Wasteland Warrior Hoots Patrol",
    file: "audio/HOOTS.mp3",
    artwork: "img/portfolio/GH_WWHP.webp",
    creditsBroad: ["Session & Performance"],
    genresBroad: ["Rock"],
    credits: ["Saxophone"],
    genres: ["Power Metal"],
    //disclaimer: "Not the official mix.\nCourtesy of XYZ Academy."
  },
  {
    title: "Suite Clarity - Led To Disgrace",
    file: "audio/SuiteClarity.m4a",
    artwork: "img/portfolio/convergence.webp",
    creditsBroad: ["Session & Performance"],
    genresBroad: ["Rock"],
    credits: ["Keyboards"],
    genres: ["Progressive Rock"]
  },
  {
    title: "Taking Balfour - Hunting Delusions",
    file: "audio/hunting.mp3",
    artwork: "img/portfolio/hunting.jpg",
    creditsBroad: ["Session & Performance", "Production"],
    genresBroad: ["Rock"],
    credits: ["Keyboards", "Orchestration"],
    genres: ["Nu Metal", "Progressive Rock"],
    ttl: "2026-02-25"
  },
  {
    title: "Last II - Black Hole",
    file: "audio/BlackHole.mp3",
    artwork: "img/portfolio/last2.webp",
    creditsBroad: ["Session & Performance"],
    genresBroad: ["Rock"],
    credits: ["Keyboards"],
    genres: ["Metal"]
  },
  {
    title: "Made 4 U (Film) - Romantic String Theme & Credits",
    file: "audio/made4u/Hallmark.mp3",
    artwork: "img/portfolio/made4u.jpg",
    creditsBroad: ["Session & Performance", "Production"],
    genresBroad: ["Film Score"],
    credits: ["Film Scoring", "Keyboards", "Orchestration", "Writing"],
    genres: ["Film Score"]
  },
  {
    title: "Spectra - Meridian",
    file: "audio/Meridian.mp3",
    artwork: "img/portfolio/pwodo.webp",
    creditsBroad: ["Session & Performance", "Mixing & Mastering", "Production"],
    genresBroad: ["Rock"],
    credits: ["Keyboards", "Writing", "Produced",   "Mixing", "Mastering", "Engineering"],
    genres: ["Progressive Rock"]
  },
  {
    title: "FXRLY - I'll Be There",
    file: "audio/bthere.mp3",
    artwork: "img/portfolio/FXLRY.webp",
    creditsBroad: ["Session & Performance"],
    genresBroad: ["Rock"],
    credits: ["Keyboards"],
    genres: ["Pop Punk"]
  },
  {
    title: "Tyler Montague March - Hellbound",
    file: "audio/hellbound.mp3",
    artwork: "img/portfolio/tylermarch_secondact.jpg",
    creditsBroad: ["Session & Performance", "Mixing & Mastering", "Production"],
    genresBroad: ["Country"],
    credits: ["Mixing", "Mastering", "Keyboards", "Saxophone", "Engineering", "Produced"],
    genres: ["Contemporary Country"]
  },
  {
    title: "McVittie - Boss Fight",
    file: "audio/bossfight.mp3",
    artwork: "img/portfolio/bossfight.webp",
    creditsBroad: ["Session & Performance", "Mixing & Mastering", "Production"],
    genresBroad: ["Electronic"],
    credits: ["Keyboards", "Saxophone", "Produced", "Mixing", "Mastering",  "Writing", "Engineering"],
    genres: ["Synthwave"]
  },  
  {
    title: "Made 4 U (Film) - Main Title Theme",
    file: "audio/made4u/GlitchIntro.mp3",
    artwork: "img/portfolio/made4u.jpg",
    creditsBroad: ["Session & Performance", "Production"],
    genresBroad: ["Film Score"],
    credits: ["Film Scoring", "Keyboards",  "Writing"],
    genres: ["Film Score"]
  },
  {
    title: "Our Videotapes - Join Me For A Lifetime",
    file: "audio/jmfalt.mp3",
    artwork: "img/portfolio/jmfalt.webp",
    creditsBroad: ["Session & Performance"],
    genresBroad: ["Rock"],
    credits: ["Keyboards"],
    genres: ["Power Ballad"]
  },
  {
    title: "McVittie - Adrenaline",
    file: "audio/Adrenaline.mp3",
    artwork: "img/portfolio/adrenaline.webp",
    creditsBroad: ["Session & Performance", "Mixing & Mastering", "Production"],
    genresBroad: ["Electronic"],
    credits: ["Keyboards", "Produced", "Mixing", "Mastering",  "Writing", "Engineering"],
    genres: ["Synthwave"]
  },
  {
    title: "Tyler Montague March - Pink Pony Club",
    file: "audio/pinkpony.mp3",
    artwork: "img/portfolio/pinkpony.webp",
    creditsBroad: ["Session & Performance", "Mixing & Mastering", "Production"],
    genresBroad: ["Country"],
    credits: ["Mixing", "Mastering", "Keyboards", "Engineering", "Produced"],
    genres: ["Contemporary Country"]
  },
  {
    title: "Made 4 U (Film) - Soft Piano Cue",
    file: "audio/made4u/Piano.mp3",
    artwork: "img/portfolio/made4u.jpg",
    creditsBroad: ["Session & Performance", "Production"],
    genresBroad: ["Film Score"],
    credits: ["Film Scoring", "Keyboards",  "Writing"],
    genres: ["Film Score"]
  },
  {
    title: "McVittie - Lone Killer",
    file: "audio/LoneKiller.mp3",
    artwork: "img/portfolio/lonekiller.webp",
    creditsBroad: ["Session Musician"],
    genresBroad: ["Electronic"],
    credits: ["Keyboards", "Produced",  "Mixing", "Mastering",  "Writing"],
    genres: ["Electronic"]
  },
  {
    title: "Crimson Ash - In Twilight",
    file: "audio/InTwilight.mp3",
    artwork: "img/portfolio/meltingsky.webp",
    creditsBroad: ["Session Musician"],
    genresBroad: ["Rock"],
    credits: [ "Mixing", "Mastering"],
    genres: ["Progressive Rock"]
  },
  {
    title: "Last II - Never Forget",
    file: "audio/neverforget.mp4",
    artwork: "img/portfolio/last2.webp",
    creditsBroad: ["Session & Performance"],
    genresBroad: ["Rock"],
    credits: ["Keyboards"],
    genres: ["Rock", "Metal"]
  },
  {
    title: "Made 4 U (Film) - Vaporwave",
    file: "audio/made4u/Vaporwave.mp3",
    artwork: "img/portfolio/made4u.jpg",
    creditsBroad: ["Session & Performance", "Production"],
    genresBroad: ["Electronic", "Film Score"],
    credits: ["Film Scoring", "Keyboards",  "Writing"],
    genres: ["Film Score", "Vaporwave"]
  },
  {
    title: "McVittie - Discovery",
    file: "audio/solar3_discovery.mp3",
    artwork: "img/portfolio/solariii.webp",
    creditsBroad: ["Session & Performance", "Production", "Mixing & Mastering"],
    genresBroad: ["Electronic", "Film Score"],
    credits: ["Keyboards", "Produced",  "Mixing", "Mastering",  "Writing"],
    genres: ["Film Score", "Ambient"]
  },
  {
    title: "Reggo The God - Birds Eye View",
    file: "audio/birdseyeview.mp3",
    artwork: "img/portfolio/birdseye.webp",
    creditsBroad: ["Mixing & Mastering"],
    genresBroad: ["Hip Hop"],
    credits: [  "Mixing", "Mastering"],
    genres: ["Hip Hop"]
  },
  {
    title: "Spectra - Lost At Sea",
    file: "audio/LostAtSea.mp3",
    artwork: "img/portfolio/pwodo.webp",
    creditsBroad: ["Session & Performance", "Mixing & Mastering", "Production"],
    genresBroad: ["Rock"],
    credits: ["Keyboards", "Saxophone", "Writing", "Produced",   "Mixing", "Mastering", "Engineering",  "Orchestration"],
    genres: ["Progressive Rock"]
  },
  {
    title: "McVittie - The Final Kill",
    file: "audio/FinalKill_Sax.mp3",
    artwork: "img/portfolio/lonekiller.webp",
    creditsBroad: ["Session & Performance", "Mixing & Mastering", "Production"],
    genresBroad: ["Electronic", "Mixing & Mastering", "Production"],
    credits: ["Keyboards", "Saxophone", "Produced",  "Mixing", "Mastering",  "Writing", "Engineering"],
    genres: ["Synthwave"]
  },  
  {
    title: "Mortrem - Nonfiction",
    file: "audio/nonfiction.mp3",
    artwork: "img/portfolio/Mortrem.webp",
    creditsBroad: ["Session & Performance"],
    genresBroad: ["Rock"],
    credits: ["Keyboards"],
    genres: ["Progressive Rock"]
  },  
  {
    title: "McVittie - Ionosphere",
    file: "audio/ionosphere.mp3",
    artwork: "img/portfolio/voltage.webp",
    creditsBroad: ["Session & Performance", "Mixing & Mastering", "Production"],
    genresBroad: ["Electronic"],
    credits: ["Keyboards", "Produced", "Mixing", "Mastering",  "Writing", "Engineering"],
    genres: ["Synthwave"]
  },
  {
    title: "Robot Philosopher - Cosmic Orphan",
    file: "audio/cosmicorphan.mp3",
    artwork: "img/portfolio/astralmigration.jpg",
    creditsBroad: ["Session & Performance", "Production", "Mixing & Mastering"],
    genresBroad: ["Film Score"],
    credits: ["Orchestration",  "Mixing", "Mastering", "Writing", "Keyboards"],
    genres: ["Film Score"]
  }
];
