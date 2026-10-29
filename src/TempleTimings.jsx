
import { useState } from "react";
import { useLanguage } from "./LanguageContext";

const temples = [
  {
    name: "त्र्यंबकेश्वर मंदिर",
    english: "Trimbakeshwar Temple",
    location: {
      mr: "त्र्यंबकेश्वर, नाशिक",
      hi: "त्र्यंबकेश्वर, नासिक",
      en: "Trimbakeshwar, Nashik",
    },
    openingTime: {
      mr: "अधिकृत वेळेची पडताळणी करा",
      hi: "आधिकारिक समय की पुष्टि करें",
      en: "Confirm official timings",
    },
    darshan: {
      mr: "भेट देण्यापूर्वी वेळ तपासा",
      hi: "जाने से पहले समय जाँचें",
      en: "Check timings before visiting",
    },
    aarti: {
      mr: "आरतीची वेळ मंदिरात तपासा",
      hi: "आरती का समय मंदिर में जाँचें",
      en: "Confirm aarti timings with the temple",
    },
    map: "Trimbakeshwar Temple Nashik",
    url: "https://www.trimbakeshwartrust.com/",
  },
  {
    name: "काळाराम मंदिर",
    english: "Kalaram Temple",
    location: {
      mr: "पंचवटी, नाशिक",
      hi: "पंचवटी, नासिक",
      en: "Panchavati, Nashik",
    },
    openingTime: {
      mr: "अधिकृत वेळेची पडताळणी करा",
      hi: "आधिकारिक समय की पुष्टि करें",
      en: "Confirm official timings",
    },
    darshan: {
      mr: "भेट देण्यापूर्वी वेळ तपासा",
      hi: "जाने से पहले समय जाँचें",
      en: "Check timings before visiting",
    },
    aarti: {
      mr: "आरतीची वेळ मंदिरात तपासा",
      hi: "आरती का समय मंदिर में जाँचें",
      en: "Confirm aarti timings with the temple",
    },
    map: "Kalaram Temple Nashik",
    url: "https://www.incredibleindia.gov.in/en/maharashtra/nashik/kalaram-temple",
  },
  {
    name: "सप्तशृंगी देवी मंदिर",
    english: "Saptashrungi Devi Temple",
    location: {
      mr: "वणी, नाशिक जिल्हा",
      hi: "वणी, नासिक जिला",
      en: "Vani, Nashik District",
    },
    openingTime: {
      mr: "अधिकृत वेळेची पडताळणी करा",
      hi: "आधिकारिक समय की पुष्टि करें",
      en: "Confirm official timings",
    },
    darshan: {
      mr: "भेटीपूर्वी सद्यस्थिती तपासा",
      hi: "जाने से पहले वर्तमान स्थिति जाँचें",
      en: "Check current conditions before visiting",
    },
    aarti: {
      mr: "आरतीची वेळ मंदिरात तपासा",
      hi: "आरती का समय मंदिर में जाँचें",
      en: "Confirm aarti timings with the temple",
    },
    map: "Saptashrungi Devi Temple Vani Nashik",
    url: "https://ssndtonline.org/",
  },
  {
    name: "मुक्तिधाम मंदिर",
    english: "Muktidham Temple",
    location: {
      mr: "नाशिक रोड, नाशिक",
      hi: "नासिक रोड, नासिक",
      en: "Nashik Road, Nashik",
    },
    openingTime: {
      mr: "अधिकृत वेळेची पडताळणी करा",
      hi: "आधिकारिक समय की पुष्टि करें",
      en: "Confirm official timings",
    },
    darshan: {
      mr: "भेट देण्यापूर्वी वेळ तपासा",
      hi: "जाने से पहले समय जाँचें",
      en: "Check timings before visiting",
    },
    aarti: {
      mr: "आरतीची वेळ मंदिरात तपासा",
      hi: "आरती का समय मंदिर में जाँचें",
      en: "Confirm aarti timings with the temple",
    },
    map: "Muktidham Temple Nashik",
    url: "https://www.incredibleindia.gov.in/en/maharashtra/nashik/muktidham",
  },
  {
    name: "कपालेश्वर मंदिर",
    english: "Kapaleshwar Temple",
    location: {
      mr: "पंचवटी, नाशिक",
      hi: "पंचवटी, नासिक",
      en: "Panchavati, Nashik",
    },
    openingTime: {
      mr: "अधिकृत वेळेची पडताळणी आवश्यक",
      hi: "आधिकारिक समय की पुष्टि आवश्यक",
      en: "Official timings require confirmation",
    },
    darshan: {
      mr: "मंदिरात चौकशी करा",
      hi: "मंदिर में पूछताछ करें",
      en: "Confirm with the temple",
    },
    aarti: {
      mr: "आरतीची वेळ मंदिरात तपासा",
      hi: "आरती का समय मंदिर में जाँचें",
      en: "Confirm aarti timings with the temple",
    },
    map: "Kapaleshwar Temple Nashik",
    url: "",
  },
  {
    name: "नवश्या गणपती",
    english: "Navshya Ganpati",
    location: {
      mr: "आनंदवली, नाशिक",
      hi: "आनंदवल्ली, नासिक",
      en: "Anandvalli, Nashik",
    },
    openingTime: {
      mr: "अधिकृत वेळेची पडताळणी आवश्यक",
      hi: "आधिकारिक समय की पुष्टि आवश्यक",
      en: "Official timings require confirmation",
    },
    darshan: {
      mr: "मंदिरात चौकशी करा",
      hi: "मंदिर में पूछताछ करें",
      en: "Confirm with the temple",
    },
    aarti: {
      mr: "आरतीची वेळ मंदिरात तपासा",
      hi: "आरती का समय मंदिर में जाँचें",
      en: "Confirm aarti timings with the temple",
    },
    map: "Navshya Ganpati Nashik",
    url: "",
  },
  {
    name: "सुंदरनारायण मंदिर",
    english: "Sundarnarayan Temple",
    location: {
      mr: "नाशिक",
      hi: "नासिक",
      en: "Nashik",
    },
    openingTime: {
      mr: "अधिकृत वेळेची पडताळणी आवश्यक",
      hi: "आधिकारिक समय की पुष्टि आवश्यक",
      en: "Official timings require confirmation",
    },
    darshan: {
      mr: "मंदिरात चौकशी करा",
      hi: "मंदिर में पूछताछ करें",
      en: "Confirm with the temple",
    },
    aarti: {
      mr: "आरतीची वेळ मंदिरात तपासा",
      hi: "आरती का समय मंदिर में जाँचें",
      en: "Confirm aarti timings with the temple",
    },
    map: "Sundarnarayan Temple Nashik",
    url: "",
  },
];

const translations = {
  mr: {
    eyebrow: "तुमच्या दर्शनाचे नियोजन करा",
    title: "नाशिक मंदिर दर्शन वेळा",
    description: "मंदिरांच्या दर्शनाच्या वेळा, पूजा आणि मार्गाची माहिती.",
    search: "मंदिराचे नाव शोधा...",
    location: "स्थान",
    timing: "दर्शन वेळ",
    darshan: "दर्शन",
    aarti: "पूजा / आरती",
    source: "माहितीचा स्रोत",
    map: "Google Maps वर मार्ग पहा",
    noResults: "मंदिर सापडले नाही.",
    disclaimer: "महत्त्वाची सूचना: मंदिरांच्या वेळा सण, गर्दी आणि विशेष पूजेनुसार बदलू शकतात. प्रवासापूर्वी मंदिराच्या अधिकृत वेबसाइटवरून किंवा मंदिर प्रशासनाकडून वेळांची खात्री करा.",
  },
  hi: {
    eyebrow: "अपने दर्शन की योजना बनाएँ",
    title: "नासिक मंदिर दर्शन समय",
    description: "मंदिरों के दर्शन समय, पूजा और रास्ते की जानकारी।",
    search: "मंदिर का नाम खोजें...",
    location: "स्थान",
    timing: "दर्शन का समय",
    darshan: "दर्शन",
    aarti: "पूजा / आरती",
    source: "जानकारी का स्रोत",
    map: "Google Maps पर रास्ता देखें",
    noResults: "कोई मंदिर नहीं मिला।",
    disclaimer: "महत्वपूर्ण सूचना: त्योहारों, भीड़ और विशेष पूजा के कारण मंदिरों का समय बदल सकता है। यात्रा से पहले मंदिर की आधिकारिक वेबसाइट या प्रशासन से समय की पुष्टि करें।",
  },
  en: {
    eyebrow: "PLAN YOUR DARSHAN",
    title: "Nashik Temple Timings",
    description: "Temple darshan timings, worship information and directions.",
    search: "Search for a temple...",
    location: "Location",
    timing: "Darshan Timings",
    darshan: "Darshan",
    aarti: "Puja / Aarti",
    source: "Information source",
    map: "Get Directions on Google Maps",
    noResults: "No temple found.",
    disclaimer: "Important: Temple timings may change during festivals, busy periods and special ceremonies. Confirm timings with the temple administration or official website before travelling.",
  },
};

export default function TempleTimings() {
  const [search, setSearch] = useState("");
  const { language } = useLanguage();

  const t = translations[language] || translations.en;

  const filteredTemples = temples.filter((temple) => {
    const query = search.trim().toLowerCase();

    return (
      temple.name.toLowerCase().includes(query) ||
      temple.english.toLowerCase().includes(query) ||
      temple.location[language].toLowerCase().includes(query)
    );
  });

  return (
    <section className="temple-timings-section" id="temple-timings">
      <div className="temple-timings-container">
        <p className="eyebrow">{t.eyebrow}</p>

        <h2>🛕 {t.title}</h2>

        <p className="temple-intro">{t.description}</p>

        <input
          type="search"
          className="search-input"
          placeholder={t.search}
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          aria-label={t.search}
        />

        <div className="temple-timings-grid">
          {filteredTemples.map((temple) => (
            <article className="temple-timing-card" key={temple.english}>
              <div className="temple-card-icon">🛕</div>

              <h3>
                {language === "en" ? temple.english : temple.name}
              </h3>

              {language !== "en" && (
                <p className="temple-english">{temple.english}</p>
              )}

              <p>📍 {temple.location[language] || temple.location.en}</p>

              <div className="temple-info-row">
                <strong>🕒 {t.timing}:</strong>
                <span>{temple.openingTime[language] || temple.openingTime.en}</span>
              </div>

              <div className="temple-info-row">
                <strong>🙏 {t.darshan}:</strong>
                <span>{temple.darshan[language] || temple.darshan.en}</span>
              </div>

              <div className="temple-info-row">
                <strong>🪔 {t.aarti}:</strong>
                <span>{temple.aarti[language] || temple.aarti.en}</span>
              </div>

              {temple.url && (
                <p className="temple-source">
                  {t.source}:{" "}
                  <a href={temple.url} target="_blank" rel="noreferrer">
                    {language === "en"
                      ? "Official / tourism information"
                      : language === "hi"
                        ? "आधिकारिक / पर्यटन जानकारी"
                        : "अधिकृत / पर्यटन माहिती"}
                  </a>
                </p>
              )}

              <a
                className="map-button"
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(temple.map)}`}
                target="_blank"
                rel="noreferrer"
              >
                🗺️ {t.map}
              </a>
            </article>
          ))}
        </div>

        {filteredTemples.length === 0 && (
          <p className="empty-state">{t.noResults}</p>
        )}

        <p className="temple-disclaimer">{t.disclaimer}</p>
      </div>
    </section>
  );
}
