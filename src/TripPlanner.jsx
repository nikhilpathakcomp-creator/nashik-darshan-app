
import { useState } from "react";
import { useLanguage } from "./LanguageContext";

const tripPlans = {
  "1": [
    {
      time: { mr: "सकाळी 8:00", hi: "सुबह 8:00", en: "8:00 AM" },
      name: { mr: "त्र्यंबकेश्वर मंदिर", hi: "त्र्यंबकेश्वर मंदिर", en: "Trimbakeshwar Temple" },
      description: {
        mr: "प्रसिद्ध ज्योतिर्लिंग मंदिराचे दर्शन घ्या.",
        hi: "प्रसिद्ध ज्योतिर्लिंग मंदिर के दर्शन करें।",
        en: "Visit the famous Jyotirlinga temple.",
      },
      map: "Trimbakeshwar Temple Nashik",
      interest: "religious",
    },
    {
      time: { mr: "सकाळी 11:00", hi: "सुबह 11:00", en: "11:00 AM" },
      name: { mr: "ब्रह्मगिरी परिसर", hi: "ब्रह्मगिरि क्षेत्र", en: "Brahmagiri Area" },
      description: {
        mr: "डोंगर आणि निसर्गरम्य परिसराचा अनुभव घ्या.",
        hi: "पहाड़ियों और प्राकृतिक सुंदरता का आनंद लें।",
        en: "Enjoy the hills and natural surroundings.",
      },
      map: "Brahmagiri Hill Trimbakeshwar",
      interest: "nature",
    },
    {
      time: { mr: "दुपारी 2:00", hi: "दोपहर 2:00", en: "2:00 PM" },
      name: { mr: "पांडवलेणी", hi: "पांडवलेणी गुफाएँ", en: "Pandavleni Caves" },
      description: {
        mr: "प्राचीन बौद्ध लेणी आणि इतिहास जाणून घ्या.",
        hi: "प्राचीन बौद्ध गुफाओं और इतिहास को जानें।",
        en: "Explore ancient Buddhist caves and their history.",
      },
      map: "Pandavleni Caves Nashik",
      interest: "history",
    },
    {
      time: { mr: "सायंकाळी 4:30", hi: "शाम 4:30", en: "4:30 PM" },
      name: { mr: "रामकुंड आणि पंचवटी", hi: "रामकुंड और पंचवटी", en: "Ramkund and Panchavati" },
      description: {
        mr: "गोदावरी घाट आणि आसपासची धार्मिक स्थळे पाहा.",
        hi: "गोदावरी घाट और आसपास के धार्मिक स्थल देखें।",
        en: "Explore the Godavari ghats and nearby religious places.",
      },
      map: "Ramkund Panchavati Nashik",
      interest: "religious",
    },
  ],

  "2": [
    {
      time: { mr: "दिवस 1 — सकाळ", hi: "दिन 1 — सुबह", en: "Day 1 — Morning" },
      name: { mr: "त्र्यंबकेश्वर मंदिर", hi: "त्र्यंबकेश्वर मंदिर", en: "Trimbakeshwar Temple" },
      description: {
        mr: "दर्शन आणि त्र्यंबकेश्वर परिसराची सफर.",
        hi: "दर्शन करें और त्र्यंबकेश्वर क्षेत्र घूमें।",
        en: "Visit the temple and explore Trimbakeshwar.",
      },
      map: "Trimbakeshwar Temple Nashik",
      interest: "religious",
    },
    {
      time: { mr: "दिवस 1 — दुपार", hi: "दिन 1 — दोपहर", en: "Day 1 — Afternoon" },
      name: { mr: "ब्रह्मगिरी परिसर", hi: "ब्रह्मगिरि क्षेत्र", en: "Brahmagiri Area" },
      description: {
        mr: "निसर्ग आणि डोंगररांगांचा आनंद घ्या.",
        hi: "प्रकृति और पहाड़ियों का आनंद लें।",
        en: "Enjoy nature and the surrounding hills.",
      },
      map: "Brahmagiri Hill Trimbakeshwar",
      interest: "nature",
    },
    {
      time: { mr: "दिवस 1 — संध्याकाळ", hi: "दिन 1 — शाम", en: "Day 1 — Evening" },
      name: { mr: "गंगापूर धरण", hi: "गंगापुर बाँध", en: "Gangapur Dam" },
      description: {
        mr: "हवामान आणि स्थानिक नियम तपासून भेट द्या.",
        hi: "मौसम और स्थानीय नियम जाँचकर जाएँ।",
        en: "Check the weather and local rules before visiting.",
      },
      map: "Gangapur Dam Nashik",
      interest: "nature",
    },
    {
      time: { mr: "दिवस 2 — सकाळ", hi: "दिन 2 — सुबह", en: "Day 2 — Morning" },
      name: { mr: "पांडवलेणी", hi: "पांडवलेणी गुफाएँ", en: "Pandavleni Caves" },
      description: {
        mr: "प्राचीन लेणी आणि ऐतिहासिक वारसा पाहा.",
        hi: "प्राचीन गुफाएँ और ऐतिहासिक विरासत देखें।",
        en: "Explore ancient caves and historical heritage.",
      },
      map: "Pandavleni Caves Nashik",
      interest: "history",
    },
    {
      time: { mr: "दिवस 2 — दुपार", hi: "दिन 2 — दोपहर", en: "Day 2 — Afternoon" },
      name: { mr: "काळाराम मंदिर आणि पंचवटी", hi: "कालाराम मंदिर और पंचवटी", en: "Kalaram Temple and Panchavati" },
      description: {
        mr: "मंदिर, सीता गुंफा आणि रामकुंड परिसर पाहा.",
        hi: "मंदिर, सीता गुफा और रामकुंड क्षेत्र देखें।",
        en: "Visit the temple, Sita Gufa and Ramkund area.",
      },
      map: "Kalaram Temple Panchavati Nashik",
      interest: "religious",
    },
    {
      time: { mr: "दिवस 2 — संध्याकाळ", hi: "दिन 2 — शाम", en: "Day 2 — Evening" },
      name: { mr: "सोमेश्वर परिसर", hi: "सोमेश्वर क्षेत्र", en: "Someshwar Area" },
      description: {
        mr: "वेळ आणि स्थानिक परिस्थितीनुसार भेट द्या.",
        hi: "समय और स्थानीय परिस्थितियों के अनुसार जाएँ।",
        en: "Visit depending on available time and local conditions.",
      },
      map: "Someshwar Temple Nashik",
      interest: "nature",
    },
  ],

  weekend: [
    {
      time: { mr: "दिवस 1 — सकाळ", hi: "दिन 1 — सुबह", en: "Day 1 — Morning" },
      name: { mr: "त्र्यंबकेश्वर मंदिर", hi: "त्र्यंबकेश्वर मंदिर", en: "Trimbakeshwar Temple" },
      description: {
        mr: "दर्शनासाठी गर्दी आणि वेळेची माहिती आधी तपासा.",
        hi: "दर्शन से पहले भीड़ और समय की जानकारी जाँचें।",
        en: "Check opening times and expected crowds before visiting.",
      },
      map: "Trimbakeshwar Temple Nashik",
      interest: "religious",
    },
    {
      time: { mr: "दिवस 1 — दुपार", hi: "दिन 1 — दोपहर", en: "Day 1 — Afternoon" },
      name: { mr: "ब्रह्मगिरी परिसर", hi: "ब्रह्मगिरि क्षेत्र", en: "Brahmagiri Area" },
      description: {
        mr: "हवामान आणि शारीरिक क्षमतेनुसार निसर्गभ्रमंती.",
        hi: "मौसम और अपनी क्षमता के अनुसार प्रकृति भ्रमण करें।",
        en: "Explore nature according to the weather and your fitness.",
      },
      map: "Brahmagiri Hill Trimbakeshwar",
      interest: "nature",
    },
    {
      time: { mr: "दिवस 1 — संध्याकाळ", hi: "दिन 1 — शाम", en: "Day 1 — Evening" },
      name: { mr: "गंगापूर धरण परिसर", hi: "गंगापुर बाँध क्षेत्र", en: "Gangapur Dam Area" },
      description: {
        mr: "संध्याकाळी निसर्गाचा आनंद घ्या.",
        hi: "शाम को प्रकृति का आनंद लें।",
        en: "Enjoy the natural surroundings in the evening.",
      },
      map: "Gangapur Dam Nashik",
      interest: "nature",
    },
    {
      time: { mr: "दिवस 2 — सकाळ", hi: "दिन 2 — सुबह", en: "Day 2 — Morning" },
      name: { mr: "पांडवलेणी", hi: "पांडवलेणी गुफाएँ", en: "Pandavleni Caves" },
      description: {
        mr: "प्राचीन बौद्ध लेणी आणि शिलालेख पाहा.",
        hi: "प्राचीन बौद्ध गुफाएँ और शिलालेख देखें।",
        en: "Explore ancient Buddhist caves and inscriptions.",
      },
      map: "Pandavleni Caves Nashik",
      interest: "history",
    },
    {
      time: { mr: "दिवस 2 — दुपार", hi: "दिन 2 — दोपहर", en: "Day 2 — Afternoon" },
      name: { mr: "पंचवटी आणि काळाराम मंदिर", hi: "पंचवटी और कालाराम मंदिर", en: "Panchavati and Kalaram Temple" },
      description: {
        mr: "नाशिकचा धार्मिक आणि सांस्कृतिक वारसा अनुभवा.",
        hi: "नासिक की धार्मिक और सांस्कृतिक विरासत का अनुभव करें।",
        en: "Experience Nashik's religious and cultural heritage.",
      },
      map: "Kalaram Temple Panchavati Nashik",
      interest: "religious",
    },
    {
      time: { mr: "दिवस 2 — संध्याकाळ", hi: "दिन 2 — शाम", en: "Day 2 — Evening" },
      name: { mr: "स्थानिक खाद्यपदार्थ", hi: "स्थानीय व्यंजन", en: "Local Food" },
      description: {
        mr: "वेळेनुसार स्थानिक खाद्यपदार्थांचा आस्वाद घ्या.",
        hi: "समय के अनुसार स्थानीय व्यंजनों का आनंद लें।",
        en: "Enjoy local food if time permits.",
      },
      map: "Restaurants Panchavati Nashik",
      interest: "food",
    },
  ],
};

const interestLabels = {
  all: { mr: "सर्व ठिकाणे", hi: "सभी स्थान", en: "All places" },
  religious: { mr: "धार्मिक स्थळे", hi: "धार्मिक स्थल", en: "Religious places" },
  nature: { mr: "निसर्ग", hi: "प्रकृति", en: "Nature" },
  history: { mr: "इतिहास", hi: "इतिहास", en: "History" },
};

const durationLabels = {
  "1": { mr: "१ दिवस", hi: "१ दिन", en: "1 Day" },
  "2": { mr: "२ दिवस", hi: "२ दिन", en: "2 Days" },
  weekend: { mr: "वीकेंड — २ दिवस", hi: "वीकेंड — २ दिन", en: "Weekend — 2 Days" },
};

export default function TripPlanner() {
  const { language, t } = useLanguage();
  const [duration, setDuration] = useState("1");
  const [interests, setInterests] = useState("all");
  const [showPlan, setShowPlan] = useState(false);

  const selectedPlan = tripPlans[duration] || tripPlans["1"];

  const visiblePlan =
    interests === "all"
      ? selectedPlan
      : selectedPlan.filter((place) => place.interest === interests);

  const text = (value) => value[language] || value.en;

  return (
    <section
      id="trip-planner"
      style={{
        padding: "48px 20px",
        maxWidth: "1100px",
        margin: "0 auto",
      }}
    >
      <p className="eyebrow">PLAN YOUR NASHIK TRIP</p>

      <h2>🗺️ {t("tripTitle")}</h2>

      <p>
        {language === "mr"
          ? "तुमच्याकडे असलेल्या वेळेनुसार नाशिक दर्शनाचा प्रवास आराखडा तयार करा."
          : language === "hi"
            ? "अपने उपलब्ध समय के अनुसार नासिक यात्रा की योजना बनाएँ।"
            : "Create a Nashik itinerary based on the time you have available."}
      </p>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          margin: "24px 0",
        }}
      >
        <label>
          <strong>{t("tripDuration")}</strong>
          <br />
          <select
            value={duration}
            onChange={(event) => {
              setDuration(event.target.value);
              setShowPlan(false);
            }}
            style={{ padding: "12px", marginTop: "8px" }}
          >
            {Object.keys(durationLabels).map((key) => (
              <option key={key} value={key}>
                {text(durationLabels[key])}
              </option>
            ))}
          </select>
        </label>

        <label>
          <strong>{t("interests")}</strong>
          <br />
          <select
            value={interests}
            onChange={(event) => {
              setInterests(event.target.value);
              setShowPlan(false);
            }}
            style={{ padding: "12px", marginTop: "8px" }}
          >
            {Object.entries(interestLabels).map(([key, value]) => (
              <option key={key} value={key}>
                {text(value)}
              </option>
            ))}
          </select>
        </label>
      </div>

      <button
        type="button"
        className="primary-button"
        onClick={() => setShowPlan(true)}
      >
        {t("generatePlan")}
      </button>

      {showPlan && (
        <div style={{ marginTop: "28px" }}>
          <h3>
            {language === "mr"
              ? "तुमचा नाशिक दर्शन प्रवास आराखडा"
              : language === "hi"
                ? "आपकी नासिक यात्रा योजना"
                : "Your Nashik Travel Itinerary"}
          </h3>

          {visiblePlan.length === 0 ? (
            <p>
              {language === "mr"
                ? "या आवडीनुसार ठिकाणे सापडली नाहीत."
                : language === "hi"
                  ? "इस रुचि के अनुसार कोई स्थान नहीं मिला।"
                  : "No places found for this interest."}
            </p>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: "16px",
                marginTop: "20px",
              }}
            >
              {visiblePlan.map((place, index) => (
                <article
                  key={`${place.name.en}-${index}`}
                  style={{
                    border: "1px solid #ddd",
                    borderRadius: "12px",
                    padding: "18px",
                  }}
                >
                  <p>
                    <strong>📅 {text(place.time)}</strong>
                  </p>
                  <h4>{text(place.name)}</h4>
                  <p>{text(place.description)}</p>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.map)}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    🗺️ {t("mapRoute")}
                  </a>
                </article>
              ))}
            </div>
          )}

          <p style={{ marginTop: "20px", fontSize: "14px" }}>
            {language === "mr"
              ? "सूचना: हा सुचवलेला आराखडा आहे. प्रवासापूर्वी मंदिरांच्या वेळा, अंतर, वाहतूक, हवामान आणि प्रवेश नियम तपासा."
              : language === "hi"
                ? "ध्यान दें: यह एक सुझाई गई योजना है। यात्रा से पहले मंदिरों का समय, दूरी, यातायात, मौसम और प्रवेश नियम जाँचें।"
                : "Note: This is a suggested itinerary. Check temple timings, distances, traffic, weather and entry rules before travelling."}
          </p>
        </div>
      )}
    </section>
  );
}

