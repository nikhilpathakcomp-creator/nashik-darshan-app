
import { useEffect, useMemo, useState } from "react";
import {
  LanguageProvider,
  useLanguage,
  supportedLanguages,
} from "./LanguageContext";

import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";

import Auth from "./Auth";
import Chatbot from "./Chatbot";
import TripPlanner from "./TripPlanner";
import EmergencyContacts from "./EmergencyContacts";
import TempleTimings from "./TempleTimings";
import CabBooking from "./CabBooking";
import HotelBooking from "./HotelBooking";
import ReviewsRatings from "./ReviewsRatings";
import TripCostCalculator from "./TripCostCalculator";
import PhotoGallery from "./PhotoGallery";

import "./App.css";
import NashikAI from "./NashikAI";
// Keep the original places array from your existing App.jsx here.
// Each place should contain:
// name, english, category, location, description.

const places = [
  { name: "त्र्यंबकेश्वर मंदिर", english: "Trimbakeshwar Temple", category: "मंदिरे", location: "त्र्यंबकेश्वर", description: "प्राचीन ज्योतिर्लिंग मंदिर आणि प्रसिद्ध धार्मिक स्थळ." },
  { name: "गोंदेश्वर मंदिर", english: "Gondeshwar Temple", category: "मंदिरे", location: "सिन्नर", description: "हेमाडपंती स्थापत्यशैलीसाठी प्रसिद्ध असलेले ऐतिहासिक मंदिर." },
  { name: "काळाराम मंदिर", english: "Kalaram Temple", category: "मंदिरे", location: "पंचवटी, नाशिक", description: "प्रभू श्रीरामांना समर्पित प्रसिद्ध मंदिर." },
  { name: "रामकुंड", english: "Ramkund", category: "धार्मिक स्थळे", location: "पंचवटी, नाशिक", description: "गोदावरी नदीच्या काठावरील प्रसिद्ध पवित्र कुंड." },
  { name: "सीता गुंफा", english: "Sita Gufa", category: "धार्मिक स्थळे", location: "पंचवटी, नाशिक", description: "रामायणाशी संबंधित धार्मिक स्थळ." },
  { name: "कपालेश्वर मंदिर", english: "Kapaleshwar Temple", category: "मंदिरे", location: "नाशिक", description: "गोदावरी घाटाजवळील प्रसिद्ध शिवमंदिर." },
  { name: "नवश्या गणपती", english: "Navshya Ganpati", category: "मंदिरे", location: "आनंदवली, नाशिक", description: "गोदावरी नदीजवळील प्रसिद्ध गणपती मंदिर." },
  { name: "मुक्तिधाम मंदिर", english: "Muktidham Temple", category: "मंदिरे", location: "नाशिक रोड", description: "संगमरवरी वास्तुकलेसाठी प्रसिद्ध मंदिरसंकुल." },
  { name: "सुंदरनारायण मंदिर", english: "Sundarnarayan Temple", category: "मंदिरे", location: "नाशिक", description: "प्राचीन स्थापत्यशैली असलेले ऐतिहासिक मंदिर." },
  { name: "भद्रकाली मंदिर", english: "Bhadrakali Temple", category: "मंदिरे", location: "नाशिक", description: "देवी भद्रकालीचे प्रसिद्ध मंदिर." },
  { name: "तपोवन", english: "Tapovan", category: "धार्मिक स्थळे", location: "पंचवटी, नाशिक", description: "धार्मिक महत्त्व आणि निसर्गासाठी ओळखला जाणारा परिसर." },
  { name: "सोमेश्वर मंदिर", english: "Someshwar Temple", category: "मंदिरे", location: "गंगापूर रोड, नाशिक", description: "गोदावरी नदीजवळील शिवमंदिर." },
  { name: "सप्तशृंगी गड", english: "Saptashrungi Gad", category: "धार्मिक स्थळे", location: "वणी परिसर", description: "देवी सप्तशृंगीचे प्रसिद्ध शक्तिपीठ." },
  { name: "बालाजी मंदिर", english: "Balaji Temple", category: "मंदिरे", location: "नाशिक परिसर", description: "भाविकांसाठी महत्त्वाचे धार्मिक स्थळ." },
  { name: "ब्रह्मगिरी पर्वत", english: "Brahmagiri Hill", category: "निसर्ग", location: "त्र्यंबकेश्वर", description: "गोदावरी नदीच्या उगमाशी संबंधित पर्वतरांग." },

  { name: "हरिहर किल्ला", english: "Harihar Fort", category: "किल्ले", location: "त्र्यंबकेश्वर परिसर", description: "खडकात कोरलेल्या प्रसिद्ध पायऱ्यांसाठी ओळखला जाणारा किल्ला." },
  { name: "अंजनेरी किल्ला", english: "Anjaneri Fort", category: "किल्ले", location: "त्र्यंबकेश्वर रोड", description: "ट्रेकिंग आणि निसर्गसौंदर्यासाठी प्रसिद्ध पर्वत." },
  { name: "रामशेज किल्ला", english: "Ramsej Fort", category: "किल्ले", location: "नाशिकजवळ", description: "मराठा इतिहासाशी संबंधित ऐतिहासिक किल्ला." },
  { name: "साल्हेर किल्ला", english: "Salher Fort", category: "किल्ले", location: "बागलाण तालुका", description: "सह्याद्रीतील उंच आणि ऐतिहासिक किल्ला." },
  { name: "मुल्हेर किल्ला", english: "Mulher Fort", category: "किल्ले", location: "बागलाण तालुका", description: "इतिहास आणि ट्रेकिंगसाठी प्रसिद्ध किल्ला." },
  { name: "त्रिंगलवाडी किल्ला", english: "Tringalwadi Fort", category: "किल्ले", location: "इगतपुरी परिसर", description: "डोंगररांगा आणि निसर्गदृश्यांसाठी प्रसिद्ध." },
  { name: "पट्टा किल्ला", english: "Patta Fort", category: "किल्ले", location: "अकोले-नाशिक परिसर", description: "ऐतिहासिक महत्त्व असलेला डोंगरी किल्ला." },
  { name: "औंढा किल्ला", english: "Aundha Fort", category: "किल्ले", location: "नाशिक जिल्हा", description: "सह्याद्रीतील ऐतिहासिक गड." },
  { name: "धोडप किल्ला", english: "Dhodap Fort", category: "किल्ले", location: "कळवण परिसर", description: "विशिष्ट डोंगररचनेसाठी ओळखला जाणारा किल्ला." },
  { name: "रवळ्या-जवळ्या किल्ले", english: "Ravlya-Javlya Forts", category: "किल्ले", location: "नाशिक जिल्हा", description: "सह्याद्रीतील ऐतिहासिक दुर्गसमूह." },
  { name: "भास्करगड", english: "Bhaskargad", category: "किल्ले", location: "त्र्यंबकेश्वर परिसर", description: "ट्रेकिंगसाठी ओळखला जाणारा ऐतिहासिक गड." },
  { name: "गाळणा किल्ला", english: "Galna Fort", category: "किल्ले", location: "बागलाण परिसर", description: "ऐतिहासिक वास्तू आणि दुर्गरचनेसाठी प्रसिद्ध." },

  { name: "सोमेश्वर धबधबा", english: "Someshwar Waterfall", category: "धबधबे", location: "गंगापूर रोड, नाशिक", description: "पावसाळ्यात लोकप्रिय असलेला धबधबा." },
  { name: "दुगारवाडी धबधबा", english: "Dugarwadi Waterfall", category: "धबधबे", location: "त्र्यंबकेश्वर परिसर", description: "हिरवाई आणि पावसाळी निसर्गासाठी प्रसिद्ध." },
  { name: "विहिगाव धबधबा", english: "Vihigaon Waterfall", category: "धबधबे", location: "इगतपुरी परिसर", description: "पावसाळ्यात आकर्षक दिसणारा धबधबा." },
  { name: "भावली धबधबा", english: "Bhavali Waterfall", category: "धबधबे", location: "इगतपुरी परिसर", description: "निसर्गप्रेमींसाठी लोकप्रिय ठिकाण." },
  { name: "दरी-मातोरी", english: "Dari-Matori", category: "निसर्ग", location: "नाशिक परिसर", description: "निसर्गरम्य ग्रामीण परिसर." },
  { name: "गंगापूर धरण", english: "Gangapur Dam", category: "निसर्ग", location: "नाशिक", description: "जलाशय आणि सूर्यास्ताच्या दृश्यांसाठी लोकप्रिय." },
  { name: "वालदेवी धरण", english: "Valdevi Dam", category: "निसर्ग", location: "नाशिक जिल्हा", description: "जलाशय आणि आसपासच्या निसर्गासाठी ओळखले जाते." },
  { name: "दारणा धरण", english: "Darna Dam", category: "निसर्ग", location: "इगतपुरी परिसर", description: "धरण आणि निसर्गरम्य परिसर." },
  { name: "इगतपुरी", english: "Igatpuri", category: "निसर्ग", location: "नाशिक जिल्हा", description: "डोंगर, पाऊस आणि हिरवाईसाठी प्रसिद्ध पर्यटनस्थळ." },
  { name: "पहिने", english: "Pahine", category: "निसर्ग", location: "त्र्यंबकेश्वर परिसर", description: "पावसाळी निसर्ग आणि डोंगररांगांसाठी लोकप्रिय." },
  { name: "वैतरणा धरण परिसर", english: "Vaitarna Dam Area", category: "निसर्ग", location: "नाशिक विभाग", description: "जलाशय आणि निसर्गदृश्यांसाठी प्रसिद्ध परिसर." },

  { name: "नाणे संग्रहालय", english: "Coin Museum", category: "संग्रहालये", location: "अंजनेरी रोड परिसर", description: "भारतीय नाण्यांचा इतिहास जाणून घेण्याचे संग्रहालय." },
  { name: "आर्टिलरी संग्रहालय", english: "Artillery Museum", category: "संग्रहालये", location: "देवळाली, नाशिक", description: "लष्करी तोफखाना आणि इतिहासाशी संबंधित संग्रहालय. प्रवेश नियम तपासा." },
  { name: "पांडवलेणी", english: "Pandavleni Caves", category: "ऐतिहासिक स्थळे", location: "नाशिक", description: "प्राचीन बौद्ध लेणी आणि शिलालेखांसाठी प्रसिद्ध." },
  { name: "सरकारवाडा", english: "Sarkarwada", category: "ऐतिहासिक स्थळे", location: "जुने नाशिक", description: "नाशिकच्या ऐतिहासिक वारशाशी संबंधित वास्तू." },
  { name: "होळकर पूल", english: "Holkar Bridge", category: "ऐतिहासिक स्थळे", location: "गोदावरी नदी, नाशिक", description: "गोदावरीवरील ऐतिहासिक पूल." },
  { name: "गोदावरी घाट", english: "Godavari Ghats", category: "ऐतिहासिक स्थळे", location: "पंचवटी, नाशिक", description: "नाशिकच्या धार्मिक आणि सांस्कृतिक जीवनाचे महत्त्वाचे केंद्र." },
  { name: "जुने नाशिक", english: "Old Nashik", category: "ऐतिहासिक स्थळे", location: "नाशिक", description: "जुन्या शहरातील बाजारपेठा, मंदिरे आणि ऐतिहासिक परिसर." },

  { name: "सुला व्हाइनयार्ड्स", english: "Sula Vineyards", category: "पर्यटन", location: "गंगापूर रोड परिसर", description: "द्राक्षबागा आणि पर्यटन अनुभवासाठी प्रसिद्ध. प्रवेश नियम तपासा." },
  { name: "गंगापूर धरण परिसर", english: "Gangapur Dam Area", category: "पर्यटन", location: "नाशिक", description: "निसर्गदृश्ये आणि संध्याकाळच्या सहलीसाठी लोकप्रिय." },
  { name: "नाशिक वाईन टुरिझम", english: "Nashik Wine Tourism", category: "पर्यटन", location: "नाशिक परिसर", description: "द्राक्षबागा आणि पर्यटनस्थळांचा अनुभव." },
  { name: "देवळाली", english: "Deolali", category: "पर्यटन", location: "नाशिक जिल्हा", description: "ऐतिहासिक आणि निसर्गरम्य परिसर." },

  { name: "भंडारदरा", english: "Bhandardara", category: "जवळची ठिकाणे", location: "अहिल्यानगर जिल्हा", description: "धरण, धबधबे आणि पर्वतरांगांसाठी प्रसिद्ध; नाशिक जिल्ह्याबाहेर." },
  { name: "कळसूबाई शिखर", english: "Kalsubai Peak", category: "जवळची ठिकाणे", location: "अहिल्यानगर जिल्हा", description: "महाराष्ट्रातील सर्वोच्च शिखर; नाशिक जिल्ह्याबाहेर." },
  { name: "रतनगड", english: "Ratangad Fort", category: "जवळची ठिकाणे", location: "अहिल्यानगर जिल्हा", description: "ट्रेकिंगसाठी प्रसिद्ध किल्ला; नाशिक जिल्ह्याबाहेर." },
  { name: "शिर्डी", english: "Shirdi", category: "जवळची ठिकाणे", location: "अहिल्यानगर जिल्हा", description: "साईबाबांच्या मंदिरासाठी प्रसिद्ध; नाशिक जिल्ह्याबाहेर." },
  { name: "सापुतारा", english: "Saputara", category: "जवळची ठिकाणे", location: "डांग जिल्हा, गुजरात", description: "डोंगराळ पर्यटनस्थळ; महाराष्ट्राबाहेर." }
];


// Local category fallback images (used only when a place-specific photo is not available).
const categoryImages = {
  "मंदिरे": "/places/trimbakeshwar.jpg.webp",
  "धार्मिक स्थळे": "/places/ramkund.jpg.avif",
  "किल्ले": "/places/Pandav-Leni.jpg.webp",
  "निसर्ग": "/places/someshwar.jpg.webp",
  "धबधबे": "/places/someshwar.jpg.webp",
  "संग्रहालये": "/places/Pandav-Leni.jpg.webp",
  "ऐतिहासिक स्थळे": "/places/Pandav-Leni.jpg.webp",
  "पर्यटन": "/places/someshwar.jpg.webp",
  "जवळची ठिकाणे": "/places/Pandav-Leni.jpg.webp",
};

// These filenames must match the files inside public/places exactly.
// Windows is usually case-insensitive, but keep the spelling consistent.
const placeImages = {
  "Trimbakeshwar Temple": "/places/trimbakeshwar.jpg.webp",
  "Kalaram Temple": "/places/kalaram-temple.jpg.webp",
  "Ramkund": "/places/ramkund.jpg.avif",
  "Muktidham Temple": "/places/mukti-dham.jpg.jpg",
  "Pandavleni Caves": "/places/Pandav-Leni.jpg.webp",
  "Someshwar Temple": "/places/someshwar.jpg.webp",
  "Someshwar Waterfall": "/places/someshwar.jpg.webp",
};



// CSS-only covers: no photos, AI, external APIs, or image files required.
const placeVisuals = {
  "मंदिरे": { icon: "🛕", label: "Sacred Places", theme: "temple" },
  "धार्मिक स्थळे": { icon: "🪔", label: "Spiritual Heritage", theme: "spiritual" },
  "किल्ले": { icon: "⛰️", label: "Historic Forts", theme: "fort" },
  "निसर्ग": { icon: "🌿", label: "Nature Escapes", theme: "nature" },
  "धबधबे": { icon: "🌊", label: "Waterfalls", theme: "waterfall" },
  "संग्रहालये": { icon: "🏛️", label: "Museums", theme: "museum" },
  "ऐतिहासिक स्थळे": { icon: "🪨", label: "Heritage", theme: "heritage" },
  "पर्यटन": { icon: "🍇", label: "Explore Nashik", theme: "tourism" },
  "जवळची ठिकाणे": { icon: "🧭", label: "Nearby Destinations", theme: "nearby" },
};

const categoryKeys = [
  { source: "सर्व", key: "all" },
  { source: "मंदिरे", key: "temples" },
  { source: "धार्मिक स्थळे", key: "religiousPlaces" },
  { source: "किल्ले", key: "forts" },
  { source: "निसर्ग", key: "nature" },
  { source: "धबधबे", key: "waterfalls" },
  { source: "संग्रहालये", key: "museums" },
  { source: "ऐतिहासिक स्थळे", key: "historicalPlaces" },
  { source: "पर्यटन", key: "tourism" },
  { source: "जवळची ठिकाणे", key: "nearbyPlaces" },
];

const extraText = {
  mr: {
    greeting: "नमस्कार",
    logout: "लॉगआउट",
    loading: "लोड होत आहे...",
    heroTitle: "नाशिकमध्ये तुमचे स्वागत आहे",
    heroSubtitle: "नाशिकचा इतिहास, संस्कृती आणि निसर्ग शोधा",
    heroDescription:
      "प्रसिद्ध मंदिरे, ऐतिहासिक किल्ले, सुंदर धबधबे आणि नाशिकमधील खास पर्यटनस्थळे एक्सप्लोर करा.",
    explore: "ठिकाणे एक्सप्लोर करा",
    plan: "ट्रिप प्लॅन करा",
    placesTitle: "नाशिकमधील पर्यटनस्थळे",
    placesDescription: "तुमच्या आवडीचे ठिकाण शोधा आणि नाशिकची सफर करा.",
    search: "ठिकाणाचे नाव किंवा परिसर शोधा...",
    noResults: "तुमच्या शोधाशी जुळणारी ठिकाणे सापडली नाहीत.",
    map: "Google Maps वर पाहा",
    favorite: "आवडते ठिकाण",
    aboutTitle: "नाशिक दर्शनाबद्दल",
    aboutDescription:
      "नाशिकमधील मंदिरे, किल्ले, निसर्गरम्य ठिकाणे आणि सांस्कृतिक वारसा शोधण्यासाठी तुमचा डिजिटल प्रवास मार्गदर्शक.",
    footer: "नाशिक दर्शन. सर्व हक्क राखीव.",
    results: "ठिकाणे",
  },
  hi: {
    greeting: "नमस्ते",
    logout: "लॉग आउट",
    loading: "लोड हो रहा है...",
    heroTitle: "नासिक में आपका स्वागत है",
    heroSubtitle: "नासिक का इतिहास, संस्कृति और प्रकृति जानें",
    heroDescription:
      "प्रसिद्ध मंदिरों, ऐतिहासिक किलों, सुंदर झरनों और नासिक के पर्यटन स्थलों की खोज करें।",
    explore: "स्थल देखें",
    plan: "यात्रा की योजना बनाएँ",
    placesTitle: "नासिक के पर्यटन स्थल",
    placesDescription: "अपनी पसंद का स्थान खोजें और नासिक की यात्रा करें।",
    search: "स्थान का नाम या क्षेत्र खोजें...",
    noResults: "आपकी खोज से मेल खाने वाले स्थान नहीं मिले।",
    map: "Google Maps पर देखें",
    favorite: "पसंदीदा स्थान",
    aboutTitle: "नासिक दर्शन के बारे में",
    aboutDescription:
      "नासिक के मंदिरों, किलों, प्राकृतिक स्थलों और सांस्कृतिक विरासत को खोजने के लिए आपका डिजिटल यात्रा मार्गदर्शक।",
    footer: "नासिक दर्शन। सर्वाधिकार सुरक्षित।",
    results: "स्थान",
  },
  en: {
    greeting: "Hello",
    logout: "Logout",
    loading: "Loading...",
    heroTitle: "Welcome to Nashik",
    heroSubtitle: "Discover Nashik's history, culture and nature",
    heroDescription:
      "Explore famous temples, historic forts, beautiful waterfalls and popular attractions across Nashik.",
    explore: "Explore Places",
    plan: "Plan Your Trip",
    placesTitle: "Explore Places in Nashik",
    placesDescription:
      "Find your favourite destination and discover the beauty of Nashik.",
    search: "Search by place name or location...",
    noResults: "No places match your search.",
    map: "View on Google Maps",
    favorite: "Favourite place",
    aboutTitle: "About Nashik Darshan",
    aboutDescription:
      "Your digital travel guide to Nashik's temples, forts, natural attractions and cultural heritage.",
    footer: "Nashik Darshan. All rights reserved.",
    results: "places",
  },
};

function LanguageSelector() {
  const { language, changeLanguage } = useLanguage();

  return (
    <label className="language-selector">
      <span aria-hidden="true">🌐</span>{" "}
      <select
        value={language}
        onChange={(event) => changeLanguage(event.target.value)}
        aria-label="Select language"
      >
        {supportedLanguages.map((item) => (
          <option key={item.code} value={item.code}>
            {item.name}
          </option>
        ))}
      </select>
    </label>
  );
}

function MainApp() {
  const { language, t } = useLanguage();
  const ui = extraText[language] || extraText.mr;

  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("सर्व");
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        setUser(currentUser);
        setAuthLoading(false);
      },
      (error) => {
        console.error("Firebase auth state error:", error);
        setAuthLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const filteredPlaces = useMemo(() => {
    const query = search.trim().toLowerCase();

    return places.filter((place) => {
      const matchesCategory =
        category === "सर्व" || place.category === category;

      const matchesSearch =
        !query ||
        place.name.toLowerCase().includes(query) ||
        place.english.toLowerCase().includes(query) ||
        place.location.toLowerCase().includes(query) ||
        place.description.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [search, category]);

  const toggleFavorite = (placeName) => {
    setFavorites((current) =>
      current.includes(placeName)
        ? current.filter((name) => name !== placeName)
        : [...current, placeName]
    );
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  if (authLoading) {
    return <div className="loading-screen">{ui.loading}</div>;
  }

  if (!user) {
    return <Auth onLogin={setUser} />;
  }

  return (
    <div className="app">
      <header className="site-header">
        <a className="brand" href="#home">
          <span className="brand-icon">🏞️</span>
          <span>{t("siteName") || "Nashik Darshan"}</span>
        </a>

        <nav className="main-nav" aria-label="Main navigation">
          <a href="#home">{t("home")}</a>
          <a href="#places">{t("places")}</a>
          <a href="#trip-planner">{t("tripPlanner")}</a>
          <a href="#photo-gallery">Photo Gallery</a>
          <a href="#trip-planner">Plan Trip</a>
          <a href="#reviews-ratings">Reviews</a>
          <a href="#about">About</a>
          <a href="#hotel-booking">Hotels</a>
          <a href="#cab-booking">Cabs</a>
          <a href="#about">{t("about")}</a>
        </nav>

        <div className="header-actions">
          <LanguageSelector />
          <span className="user-greeting">
            {ui.greeting}
            {user.displayName ? `, ${user.displayName}` : ""}
          </span>
          <button className="logout-button" onClick={handleLogout}>
            {ui.logout}
          </button>
        </div>
      </header>

      <main>
        <section className="hero-section" id="home">
          <div className="hero-content">
            <p className="hero-eyebrow">{t("discoverNashik")}</p>
            <h1>{ui.heroTitle}</h1>
            <h2>{ui.heroSubtitle}</h2>
            <p>{ui.heroDescription}</p>

            <div className="hero-actions">
              <button onClick={() => scrollTo("places")}>
                {ui.explore}
              </button>
              <button
                className="secondary-button"
                onClick={() => scrollTo("trip-planner")}
              >
                {ui.plan}
              </button>
            </div>
          </div>
        </section>

        <section className="places-section" id="places">
          <div className="section-heading">
            <h2>{ui.placesTitle}</h2>
            <p>{ui.placesDescription}</p>
          </div>

          <div className="places-controls">
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={ui.search}
              aria-label={ui.search}
            />

            <div className="category-filters">
              {categoryKeys.map((item) => (
                <button
                  key={item.source}
                  className={
                    category === item.source ? "category active" : "category"
                  }
                  onClick={() => setCategory(item.source)}
                >
                  {t(item.key)}
                </button>
              ))}
            </div>
          </div>

          <p className="results-count">
            {filteredPlaces.length} {ui.results}
          </p>

          {filteredPlaces.length === 0 ? (
            <div className="no-results">{ui.noResults}</div>
          ) : (
            <div className="places-grid">
              {filteredPlaces.map((place) => {
                const isFavorite = favorites.includes(place.name);
                const displayName =
                  language === "mr" ? place.name : place.english;

                return (
                  <article className="place-card" key={place.english}>
                    <div
                      className={`place-card-cover cover-${(placeVisuals[place.category] || placeVisuals["निसर्ग"]).theme}`}
                      aria-label={`${place.english} decorative cover`}
                      role="img"
                    >
                      <span className="place-cover-orb place-cover-orb-one" aria-hidden="true" />
                      <span className="place-cover-orb place-cover-orb-two" aria-hidden="true" />
                      <span className="place-cover-icon" aria-hidden="true">
                        {(placeVisuals[place.category] || placeVisuals["निसर्ग"]).icon}
                      </span>
                      <span className="place-cover-label">
                        {(placeVisuals[place.category] || placeVisuals["निसर्ग"]).label}
                      </span>
                      <span className="place-cover-title">{place.english}</span>
                    </div>
                    <div className="place-card-content">
                      <span className="place-category">
                        {t(
                          categoryKeys.find(
                            (item) => item.source === place.category
                          )?.key || "all"
                        )}
                      </span>

                      <h3>{displayName}</h3>

                      {language !== "mr" && (
                        <p className="place-native-name">{place.name}</p>
                      )}

                      <p className="place-location">
                        📍 {place.location}
                      </p>
                      <p className="place-description">{place.description}</p>

                      <div className="place-card-actions">
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                            `${place.english}, Nashik, Maharashtra`
                          )}`}
                          target="_blank"
                          rel="noreferrer"
                          className="map-button"
                        >
                          {ui.map}
                        </a>

                        <button
                          className={
                            isFavorite
                              ? "favorite-button favorited"
                              : "favorite-button"
                          }
                          onClick={() => toggleFavorite(place.name)}
                          aria-label={`${ui.favorite}: ${displayName}`}
                          aria-pressed={isFavorite}
                        >
                          {isFavorite ? "❤️" : "🤍"}
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        <section id="trip-planner" className="content-section">
          <TripPlanner />
        </section>

        <section id="hotel-booking" className="content-section"><HotelBooking /></section>
        <section id="cab-booking" className="content-section"><CabBooking /></section>
        <section id="trip-cost-calculator" className="content-section"><TripCostCalculator /></section>
        <section id="reviews-ratings" className="content-section"><ReviewsRatings /></section>
        <section id="photo-gallery" className="content-section"><PhotoGallery /></section>

        <section id="emergency" className="content-section">
          <EmergencyContacts />
        </section>

        <section id="temple-timings" className="content-section">
          <TempleTimings />
        </section>

        <section className="about-section" id="about">
          <div className="section-heading">
            <h2>{ui.aboutTitle}</h2>
            <p>{ui.aboutDescription}</p>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <p>
          © {new Date().getFullYear()} {ui.footer}
        </p>
      </footer>

      <NashikAI />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <MainApp />
    </LanguageProvider>
  );
}
