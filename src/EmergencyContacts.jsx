
import { useLanguage } from "./LanguageContext";

const emergencyServices = [
  {
    number: "112",
    icon: "🚨",
    phone: "112",
    title: {
      mr: "राष्ट्रीय आपत्कालीन सेवा",
      hi: "राष्ट्रीय आपातकालीन सेवा",
      en: "National Emergency Service",
    },
    description: {
      mr: "पोलीस आणि इतर आपत्कालीन मदतीसाठी.",
      hi: "पुलिस और अन्य आपातकालीन सहायता के लिए।",
      en: "For police and other emergency assistance.",
    },
  },
  {
    number: "108",
    icon: "🚑",
    phone: "108",
    title: {
      mr: "रुग्णवाहिका",
      hi: "एम्बुलेंस",
      en: "Ambulance",
    },
    description: {
      mr: "वैद्यकीय आपत्कालीन परिस्थितीसाठी.",
      hi: "चिकित्सा आपातकालीन स्थिति के लिए।",
      en: "For medical emergencies.",
    },
  },
];

export default function EmergencyContacts() {
  const { language, t } = useLanguage();

  const text = (value) => value[language] || value.en;

  const content = {
    mr: {
      eyebrow: "तुमची सुरक्षितता महत्त्वाची",
      title: "आपत्कालीन संपर्क",
      intro: "नाशिकला भेट देताना आपत्कालीन मदतीसाठी हे संपर्क उपयोगी पडू शकतात.",
      call: "कॉल करा",
      hospitals: "नाशिकमधील हॉस्पिटल्स शोधा",
      police: "पोलीस स्टेशन शोधा",
      note: "महत्त्वाचे: 112 हा भारतातील एकत्रित आपत्कालीन क्रमांक आहे. 108 ही रुग्णवाहिका सेवा अनेक ठिकाणी उपलब्ध आहे. गंभीर आपत्कालीन परिस्थितीत 112 वर संपर्क करा.",
    },
    hi: {
      eyebrow: "आपकी सुरक्षा महत्वपूर्ण है",
      title: "आपातकालीन संपर्क",
      intro: "नासिक की यात्रा के दौरान आपातकालीन सहायता के लिए ये संपर्क उपयोगी हो सकते हैं।",
      call: "कॉल करें",
      hospitals: "नासिक में अस्पताल खोजें",
      police: "पुलिस स्टेशन खोजें",
      note: "महत्वपूर्ण: 112 भारत का एकीकृत आपातकालीन नंबर है। 108 एम्बुलेंस सेवा कई स्थानों पर उपलब्ध है। गंभीर आपातकाल में 112 पर संपर्क करें।",
    },
    en: {
      eyebrow: "YOUR SAFETY MATTERS",
      title: "Emergency Contacts",
      intro: "These contacts may help you get emergency assistance while visiting Nashik.",
      call: "Call",
      hospitals: "Find Hospitals in Nashik",
      police: "Find Police Stations",
      note: "Important: 112 is India's integrated emergency number. The 108 ambulance service is available in many locations. Contact 112 in a serious emergency.",
    },
  };

  const current = content[language] || content.en;

  const hospitalSearchUrl =
    "https://www.google.com/maps/search/hospitals+near+Nashik";

  const policeSearchUrl =
    "https://www.google.com/maps/search/police+station+near+Nashik";

  return (
    <section className="emergency-section" id="emergency">
      <div className="emergency-container">
        <p className="eyebrow">{current.eyebrow}</p>

        <h2>🚨 {t("emergencyTitle")}</h2>

        <p className="emergency-intro">{t("emergencyDescription")}</p>

        <div className="emergency-grid">
          {emergencyServices.map((service) => (
            <article className="emergency-card" key={service.number}>
              <div className="emergency-icon">{service.icon}</div>

              <h3>{text(service.title)}</h3>

              <p>{text(service.description)}</p>

              <a
                className="emergency-call-button"
                href={`tel:${service.phone}`}
              >
                📞 {current.call} {service.number}
              </a>
            </article>
          ))}
        </div>

        <div className="emergency-links">
          <a href={hospitalSearchUrl} target="_blank" rel="noreferrer">
            🏥 {t("findHospitals")}
          </a>

          <a href={policeSearchUrl} target="_blank" rel="noreferrer">
            👮 {t("findPolice")}
          </a>
        </div>

        <p className="emergency-note">{current.note}</p>
      </div>
    </section>
  );
}
