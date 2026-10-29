import { createContext, useCallback, useContext, useState } from "react";

const LanguageContext = createContext(null);

export const supportedLanguages = [
  { code: "mr", name: "मराठी" },
  { code: "hi", name: "हिंदी" },
  { code: "en", name: "English" },
  { code: "gu", name: "ગુજરાતી" },
  { code: "bn", name: "বাংলা" },
  { code: "ta", name: "தமிழ்" },
  { code: "te", name: "తెలుగు" },
  { code: "kn", name: "ಕನ್ನಡ" },
  { code: "ml", name: "മലയാളം" },
  { code: "pa", name: "ਪੰਜਾਬੀ" },
  { code: "or", name: "ଓଡ଼ିଆ" },
  { code: "as", name: "অসমীয়া" },
  { code: "ur", name: "اردو" },
  { code: "sa", name: "संस्कृतम्" },
  { code: "kok", name: "कोंकणी" },
];

// Common interface text is translated locally; no translation API is used.
// English is the fallback for keys not yet translated for a language.
export const translations = {
  mr: {
    siteName: "नाशिक दर्शन", home: "मुख्यपृष्ठ", places: "पर्यटन स्थळे",
    tripPlanner: "ट्रिप प्लॅनर", emergency: "आपत्कालीन मदत",
    templeTimings: "मंदिर दर्शन वेळा", about: "आमच्याबद्दल",
    logout: "बाहेर पडा", welcome: "नमस्कार", language: "भाषा",
    heroTitle: "नाशिक दर्शन",
    heroSubtitle: "नाशिकचा इतिहास, संस्कृती आणि निसर्ग एका ठिकाणी!",
    heroDescription: "तुमच्या पुढील सहलीसाठी आवडते ठिकाण शोधा.",
    explorePlaces: "ठिकाणे पाहा", planTrip: "ट्रिप प्लॅन करा",
    discoverNashik: "नाशिकचा शोध घ्या", placesHeading: "भेट देण्यासारखी ठिकाणे",
    placesDescription: "मंदिरे, किल्ले, धबधबे, इतिहास आणि निसर्ग.",
    searchPlaceholder: "ठिकाणाचे नाव शोधा...", all: "सर्व",
    temples: "मंदिरे", religiousPlaces: "धार्मिक स्थळे", forts: "किल्ले",
    nature: "निसर्ग", waterfalls: "धबधबे", museums: "संग्रहालये",
    historicalPlaces: "ऐतिहासिक स्थळे", tourism: "पर्यटन",
    nearbyPlaces: "जवळची ठिकाणे", noResults: "ठिकाण सापडले नाही.",
    viewMap: "Google Maps वर पहा", favorite: "आवडते",
    aboutTitle: "द्राक्षांची नगरी, मंदिरांची भूमी",
    aboutDescription: "नाशिक धार्मिक वारसा, ऐतिहासिक किल्ले, सह्याद्रीचे डोंगर, धबधबे आणि गोदावरी नदीसाठी प्रसिद्ध आहे.",
    safetyNote: "प्रवासापूर्वी वेळा, हवामान आणि सुरक्षा सूचना तपासा.",
    footerText: "नाशिकचा शोध घ्या, आठवणी जपा.",
  },
  hi: {
    siteName: "नासिक दर्शन", home: "मुखपृष्ठ", places: "पर्यटन स्थल",
    tripPlanner: "यात्रा योजनाकार", emergency: "आपातकालीन सहायता",
    templeTimings: "मंदिर दर्शन समय", about: "हमारे बारे में",
    logout: "लॉग आउट", welcome: "नमस्ते", language: "भाषा",
    heroTitle: "नासिक दर्शन", heroSubtitle: "नासिक का इतिहास, संस्कृति और प्रकृति एक ही जगह!",
    heroDescription: "अपनी अगली यात्रा के लिए पसंदीदा जगह खोजें।",
    explorePlaces: "स्थान देखें", planTrip: "यात्रा की योजना बनाएं",
    discoverNashik: "नासिक की खोज करें", placesHeading: "घूमने योग्य स्थान",
    placesDescription: "मंदिर, किले, झरने, इतिहास और प्रकृति।",
    searchPlaceholder: "स्थान का नाम खोजें...", all: "सभी",
    temples: "मंदिर", religiousPlaces: "धार्मिक स्थल", forts: "किले",
    nature: "प्रकृति", waterfalls: "झरने", museums: "संग्रहालय",
    historicalPlaces: "ऐतिहासिक स्थल", tourism: "पर्यटन",
    nearbyPlaces: "आसपास के स्थान", noResults: "कोई स्थान नहीं मिला।",
    viewMap: "Google Maps पर देखें", favorite: "पसंदीदा",
    aboutTitle: "अंगूरों का शहर, मंदिरों की भूमि",
    aboutDescription: "नासिक धार्मिक विरासत, ऐतिहासिक किलों, सह्याद्री के पहाड़ों, झरनों और गोदावरी नदी के लिए प्रसिद्ध है।",
    safetyNote: "यात्रा से पहले समय, मौसम और सुरक्षा जानकारी जांचें.",
    footerText: "नासिक की खोज करें, यादें संजोएं।",
  },
  en: {
    siteName: "Nashik Darshan", home: "Home", places: "Tourist Places",
    tripPlanner: "Trip Planner", emergency: "Emergency Help",
    templeTimings: "Temple Timings", about: "About Us", logout: "Logout",
    welcome: "Welcome", language: "Language", heroTitle: "Nashik Darshan",
    heroSubtitle: "Explore Nashik's history, culture and nature in one place!",
    heroDescription: "Find your favourite destination for your next trip.",
    explorePlaces: "Explore Places", planTrip: "Plan Your Trip",
    discoverNashik: "DISCOVER NASHIK", placesHeading: "Places to Visit",
    placesDescription: "Temples, forts, waterfalls, history and nature.",
    searchPlaceholder: "Search for a place...", all: "All",
    temples: "Temples", religiousPlaces: "Religious Places", forts: "Forts",
    nature: "Nature", waterfalls: "Waterfalls", museums: "Museums",
    historicalPlaces: "Historical Places", tourism: "Tourism",
    nearbyPlaces: "Nearby Places", noResults: "No places found.",
    viewMap: "View on Google Maps", favorite: "Favourite",
    tripTitle: "Smart Trip Planner", tripDuration: "Trip Duration",
    oneDay: "1 Day", twoDays: "2 Days", weekend: "Weekend",
    interests: "Interests", generatePlan: "Generate Trip Plan",
    emergencyTitle: "Emergency Contacts",
    emergencyDescription: "These contacts may help in an emergency.",
    nationalEmergency: "National Emergency Service", ambulance: "Ambulance",
    call: "Call", findHospitals: "Find Hospitals", findPolice: "Find Police Stations",
    templeTitle: "Nashik Temple Timings",
    templeDescription: "Temple darshan timings and directions.",
    searchTemple: "Search for a temple...", darshanTime: "Darshan Timings",
    darshan: "Darshan", aarti: "Puja / Aarti",
    officialTimeCheck: "Official timings need confirmation",
    mapRoute: "Get Directions on Google Maps", noTempleFound: "No temple found.",
    templeDisclaimer: "Temple timings may change. Confirm before visiting.",
    aboutTitle: "The City of Grapes, Land of Temples",
    aboutDescription: "Nashik is known for its religious heritage, historic forts, Sahyadri hills, waterfalls and the Godavari River.",
    safetyNote: "Check timings, weather and safety information before travelling.",
    footerText: "Explore Nashik, create memories.",
  },
  gu: {
    siteName: "નાશિક દર્શન", home: "મુખ્ય પૃષ્ઠ", places: "પ્રવાસન સ્થળો",
    tripPlanner: "ટ્રિપ પ્લાનર", emergency: "કટોકટી સહાય", templeTimings: "મંદિર દર્શન સમય",
    about: "અમારા વિશે", logout: "લૉગ આઉટ", welcome: "નમસ્તે", language: "ભાષા",
    heroTitle: "નાશિક દર્શન", heroSubtitle: "નાશિકનો ઇતિહાસ, સંસ્કૃતિ અને પ્રકૃતિ એક જ જગ્યાએ!",
    heroDescription: "તમારી આગામી મુસાફરી માટે મનપસંદ સ્થળ શોધો.",
    explorePlaces: "સ્થળો જુઓ", planTrip: "ટ્રિપની યોજના બનાવો",
    discoverNashik: "નાશિક શોધો", placesHeading: "મુલાકાત લેવા જેવા સ્થળો",
    searchPlaceholder: "સ્થળનું નામ શોધો...", all: "બધા", temples: "મંદિરો",
    forts: "કિલ્લાઓ", nature: "પ્રકૃતિ", waterfalls: "ધોધ", museums: "સંગ્રહાલયો",
    viewMap: "Google Maps પર જુઓ", favorite: "મનપસંદ",
    aboutTitle: "દ્રાક્ષનું શહેર, મંદિરોની ભૂમિ",
    footerText: "નાશિક શોધો, યાદો બનાવો.",
  },
  bn: {
    siteName: "নাশিক দর্শন", home: "হোম", places: "পর্যটন স্থান",
    tripPlanner: "ভ্রমণ পরিকল্পনা", emergency: "জরুরি সহায়তা",
    templeTimings: "মন্দির দর্শনের সময়", about: "আমাদের সম্পর্কে",
    logout: "লগ আউট", welcome: "নমস্কার", language: "ভাষা",
    heroTitle: "নাশিক দর্শন", heroSubtitle: "এক জায়গায় নাশিকের ইতিহাস, সংস্কৃতি ও প্রকৃতি!",
    heroDescription: "আপনার পরবর্তী ভ্রমণের জন্য পছন্দের স্থান খুঁজুন।",
    explorePlaces: "স্থান দেখুন", planTrip: "ভ্রমণ পরিকল্পনা করুন",
    discoverNashik: "নাশিক আবিষ্কার করুন", placesHeading: "দর্শনীয় স্থান",
    searchPlaceholder: "স্থানের নাম খুঁজুন...", all: "সব", temples: "মন্দির",
    forts: "দুর্গ", nature: "প্রকৃতি", waterfalls: "জলপ্রপাত",
    museums: "জাদুঘর", viewMap: "Google Maps-এ দেখুন", favorite: "পছন্দের",
    footerText: "নাশিক ঘুরে দেখুন, স্মৃতি তৈরি করুন।",
  },
  ta: {
    siteName: "நாசிக் தரிசனம்", home: "முகப்பு", places: "சுற்றுலா இடங்கள்",
    tripPlanner: "பயணத் திட்டம்", emergency: "அவசர உதவி",
    templeTimings: "கோவில் தரிசன நேரம்", about: "எங்களைப் பற்றி",
    logout: "வெளியேறு", welcome: "வணக்கம்", language: "மொழி",
    heroTitle: "நாசிக் தரிசனம்", heroSubtitle: "நாசிக்கின் வரலாறு, கலாசாரம், இயற்கை அனைத்தும் ஒரே இடத்தில்!",
    heroDescription: "உங்கள் அடுத்த பயணத்திற்குப் பிடித்த இடத்தைக் கண்டறியுங்கள்.",
    explorePlaces: "இடங்களைப் பாருங்கள்", planTrip: "பயணத்தைத் திட்டமிடுங்கள்",
    placesHeading: "பார்க்க வேண்டிய இடங்கள்", searchPlaceholder: "இடத்தின் பெயரைத் தேடுங்கள்...",
    all: "அனைத்தும்", temples: "கோவில்கள்", forts: "கோட்டைகள்",
    nature: "இயற்கை", waterfalls: "நீர்வீழ்ச்சிகள்", museums: "அருங்காட்சியகங்கள்",
    viewMap: "Google Maps-ல் பார்க்கவும்", favorite: "விருப்பமானவை",
    footerText: "நாசிக்கைக் கண்டறிந்து நினைவுகளை உருவாக்குங்கள்.",
  },
  te: {
    siteName: "నాసిక్ దర్శన్", home: "హోమ్", places: "పర్యాటక ప్రదేశాలు",
    tripPlanner: "ట్రిప్ ప్లానర్", emergency: "అత్యవసర సహాయం",
    templeTimings: "ఆలయ దర్శన సమయాలు", about: "మా గురించి",
    logout: "లాగ్ అవుట్", welcome: "నమస్కారం", language: "భాష",
    heroTitle: "నాసిక్ దర్శన్", heroSubtitle: "నాసిక్ చరిత్ర, సంస్కృతి, ప్రకృతి ఒకే చోట!",
    heroDescription: "మీ తదుపరి ప్రయాణానికి ఇష్టమైన ప్రదేశాన్ని కనుగొనండి.",
    explorePlaces: "ప్రదేశాలను చూడండి", planTrip: "ప్రయాణాన్ని ప్లాన్ చేయండి",
    placesHeading: "చూడదగిన ప్రదేశాలు", searchPlaceholder: "ప్రదేశం పేరు వెతకండి...",
    all: "అన్నీ", temples: "దేవాలయాలు", forts: "కోటలు", nature: "ప్రకృతి",
    waterfalls: "జలపాతాలు", museums: "మ్యూజియంలు",
    viewMap: "Google Mapsలో చూడండి", favorite: "ఇష్టమైనవి",
    footerText: "నాసిక్‌ను అన్వేషించండి, జ్ఞాపకాలను సృష్టించండి.",
  },
  kn: {
    siteName: "ನಾಸಿಕ್ ದರ್ಶನ", home: "ಮುಖಪುಟ", places: "ಪ್ರವಾಸಿ ಸ್ಥಳಗಳು",
    tripPlanner: "ಪ್ರವಾಸ ಯೋಜಕ", emergency: "ತುರ್ತು ಸಹಾಯ",
    templeTimings: "ದೇವಾಲಯದ ದರ್ಶನ ಸಮಯ", about: "ನಮ್ಮ ಬಗ್ಗೆ",
    logout: "ಲಾಗ್ ಔಟ್", welcome: "ನಮಸ್ಕಾರ", language: "ಭಾಷೆ",
    heroTitle: "ನಾಸಿಕ್ ದರ್ಶನ", heroSubtitle: "ನಾಸಿಕ್‌ನ ಇತಿಹಾಸ, ಸಂಸ್ಕೃತಿ ಮತ್ತು ಪ್ರಕೃತಿ ಒಂದೇ ಸ್ಥಳದಲ್ಲಿ!",
    heroDescription: "ನಿಮ್ಮ ಮುಂದಿನ ಪ್ರವಾಸಕ್ಕೆ ಇಷ್ಟವಾದ ಸ್ಥಳವನ್ನು ಹುಡುಕಿ.",
    explorePlaces: "ಸ್ಥಳಗಳನ್ನು ನೋಡಿ", planTrip: "ಪ್ರವಾಸ ಯೋಜಿಸಿ",
    placesHeading: "ನೋಡಬೇಕಾದ ಸ್ಥಳಗಳು", searchPlaceholder: "ಸ್ಥಳದ ಹೆಸರನ್ನು ಹುಡುಕಿ...",
    all: "ಎಲ್ಲಾ", temples: "ದೇವಾಲಯಗಳು", forts: "ಕೋಟೆಗಳು", nature: "ಪ್ರಕೃತಿ",
    waterfalls: "ಜಲಪಾತಗಳು", museums: "ಸಂಗ್ರಹಾಲಯಗಳು",
    viewMap: "Google Maps ನಲ್ಲಿ ನೋಡಿ", favorite: "ಮೆಚ್ಚಿನವು",
    footerText: "ನಾಸಿಕ್ ಅನ್ವೇಷಿಸಿ, ನೆನಪುಗಳನ್ನು ಉಳಿಸಿ.",
  },
  ml: {
    siteName: "നാസിക് ദർശൻ", home: "ഹോം", places: "വിനോദസഞ്ചാര കേന്ദ്രങ്ങൾ",
    tripPlanner: "യാത്രാ പ്ലാനർ", emergency: "അടിയന്തര സഹായം",
    templeTimings: "ക്ഷേത്ര ദർശന സമയം", about: "ഞങ്ങളെക്കുറിച്ച്",
    logout: "ലോഗ് ഔട്ട്", welcome: "നമസ്കാരം", language: "ഭാഷ",
    heroTitle: "നാസിക് ദർശൻ", heroSubtitle: "നാസിക്കിന്റെ ചരിത്രവും സംസ്കാരവും പ്രകൃതിയും ഒരിടത്ത്!",
    heroDescription: "അടുത്ത യാത്രയ്ക്കായി ഇഷ്ടപ്പെട്ട സ്ഥലം കണ്ടെത്തൂ.",
    explorePlaces: "സ്ഥലങ്ങൾ കാണുക", planTrip: "യാത്ര ആസൂത്രണം ചെയ്യുക",
    placesHeading: "സന്ദർശിക്കേണ്ട സ്ഥലങ്ങൾ", searchPlaceholder: "സ്ഥലത്തിന്റെ പേര് തിരയുക...",
    all: "എല്ലാം", temples: "ക്ഷേത്രങ്ങൾ", forts: "കോട്ടകൾ", nature: "പ്രകൃതി",
    waterfalls: "വെള്ളച്ചാട്ടങ്ങൾ", museums: "മ്യൂസിയങ്ങൾ",
    viewMap: "Google Maps-ൽ കാണുക", favorite: "പ്രിയപ്പെട്ടവ",
    footerText: "നാസിക് കണ്ടെത്തൂ, ഓർമ്മകൾ സൃഷ്ടിക്കൂ.",
  },
  pa: {
    siteName: "ਨਾਸਿਕ ਦਰਸ਼ਨ", home: "ਮੁੱਖ ਪੰਨਾ", places: "ਸੈਰ-ਸਪਾਟਾ ਸਥਾਨ",
    tripPlanner: "ਯਾਤਰਾ ਯੋਜਨਾ", emergency: "ਐਮਰਜੈਂਸੀ ਸਹਾਇਤਾ",
    templeTimings: "ਮੰਦਰ ਦਰਸ਼ਨ ਸਮਾਂ", about: "ਸਾਡੇ ਬਾਰੇ",
    logout: "ਲੌਗ ਆਉਟ", welcome: "ਸਤ ਸ੍ਰੀ ਅਕਾਲ", language: "ਭਾਸ਼ਾ",
    heroTitle: "ਨਾਸਿਕ ਦਰਸ਼ਨ", heroSubtitle: "ਨਾਸਿਕ ਦਾ ਇਤਿਹਾਸ, ਸੱਭਿਆਚਾਰ ਅਤੇ ਕੁਦਰਤ ਇੱਕ ਥਾਂ!",
    heroDescription: "ਆਪਣੀ ਅਗਲੀ ਯਾਤਰਾ ਲਈ ਮਨਪਸੰਦ ਥਾਂ ਲੱਭੋ।",
    explorePlaces: "ਥਾਵਾਂ ਵੇਖੋ", planTrip: "ਯਾਤਰਾ ਦੀ ਯੋਜਨਾ ਬਣਾਓ",
    placesHeading: "ਦੇਖਣ ਯੋਗ ਥਾਵਾਂ", searchPlaceholder: "ਥਾਂ ਦਾ ਨਾਮ ਲੱਭੋ...",
    all: "ਸਾਰੇ", temples: "ਮੰਦਰ", forts: "ਕਿਲ੍ਹੇ", nature: "ਕੁਦਰਤ",
    waterfalls: "ਝਰਨੇ", museums: "ਅਜਾਇਬ ਘਰ",
    viewMap: "Google Maps ਉੱਤੇ ਵੇਖੋ", favorite: "ਮਨਪਸੰਦ",
    footerText: "ਨਾਸਿਕ ਦੀ ਖੋਜ ਕਰੋ, ਯਾਦਾਂ ਬਣਾਓ।",
  },
  or: {
    siteName: "ନାସିକ ଦର୍ଶନ", home: "ମୁଖ୍ୟ ପୃଷ୍ଠା", places: "ପର୍ଯ୍ୟଟନ ସ୍ଥାନ",
    tripPlanner: "ଭ୍ରମଣ ଯୋଜନା", emergency: "ଜରୁରୀ ସହାୟତା",
    templeTimings: "ମନ୍ଦିର ଦର୍ଶନ ସମୟ", about: "ଆମ ବିଷୟରେ",
    logout: "ଲଗ୍ ଆଉଟ୍", welcome: "ନମସ୍କାର", language: "ଭାଷା",
    heroTitle: "ନାସିକ ଦର୍ଶନ", heroSubtitle: "ନାସିକର ଇତିହାସ, ସଂସ୍କୃତି ଓ ପ୍ରକୃତି ଗୋଟିଏ ସ୍ଥାନରେ!",
    heroDescription: "ଆପଣଙ୍କ ପରବର୍ତ୍ତୀ ଯାତ୍ରା ପାଇଁ ପସନ୍ଦର ସ୍ଥାନ ଖୋଜନ୍ତୁ।",
    explorePlaces: "ସ୍ଥାନ ଦେଖନ୍ତୁ", planTrip: "ଯାତ୍ରା ଯୋଜନା କରନ୍ତୁ",
    placesHeading: "ଦେଖିବା ଯୋଗ୍ୟ ସ୍ଥାନ", searchPlaceholder: "ସ୍ଥାନର ନାମ ଖୋଜନ୍ତୁ...",
    all: "ସମସ୍ତ", temples: "ମନ୍ଦିର", forts: "ଦୁର୍ଗ", nature: "ପ୍ରକୃତି",
    waterfalls: "ଜଳପ୍ରପାତ", museums: "ସଂଗ୍ରହାଳୟ",
    viewMap: "Google Maps ରେ ଦେଖନ୍ତୁ", favorite: "ପସନ୍ଦ",
    footerText: "ନାସିକ ଅନ୍ୱେଷଣ କରନ୍ତୁ, ସ୍ମୃତି ସୃଷ୍ଟି କରନ୍ତୁ।",
  },
  as: {
    siteName: "নাছিক দৰ্শন", home: "মুখ্য পৃষ্ঠা", places: "পৰ্যটনস্থলী",
    tripPlanner: "ভ্ৰমণ পৰিকল্পনা", emergency: "জৰুৰী সহায়",
    templeTimings: "মন্দিৰ দৰ্শনৰ সময়", about: "আমাৰ বিষয়ে",
    logout: "লগ আউট", welcome: "নমস্কাৰ", language: "ভাষা",
    heroTitle: "নাছিক দৰ্শন", heroSubtitle: "নাছিকৰ ইতিহাস, সংস্কৃতি আৰু প্ৰকৃতি একে ঠাইতে!",
    heroDescription: "আপোনাৰ পৰৱৰ্তী ভ্ৰমণৰ বাবে পছন্দৰ ঠাই বিচাৰক।",
    explorePlaces: "ঠাইসমূহ চাওক", planTrip: "ভ্ৰমণ পৰিকল্পনা কৰক",
    placesHeading: "চাবলগীয়া ঠাই", searchPlaceholder: "ঠাইৰ নাম বিচাৰক...",
    all: "সকলো", temples: "মন্দিৰ", forts: "দুৰ্গ", nature: "প্ৰকৃতি",
    waterfalls: "জলপ্ৰপাত", museums: "সংগ্ৰহালয়",
    viewMap: "Google Maps-ত চাওক", favorite: "প্ৰিয়",
    footerText: "নাছিক অন্বেষণ কৰক, স্মৃতি গঢ়ক।",
  },
  ur: {
    siteName: "ناسک درشن", home: "صفحۂ اول", places: "سیاحتی مقامات",
    tripPlanner: "سفر کا منصوبہ", emergency: "ہنگامی مدد",
    templeTimings: "مندر درشن کے اوقات", about: "ہمارے بارے میں",
    logout: "لاگ آؤٹ", welcome: "خوش آمدید", language: "زبان",
    heroTitle: "ناسک درشن", heroSubtitle: "ناسک کی تاریخ، ثقافت اور فطرت ایک ہی جگہ!",
    heroDescription: "اپنے اگلے سفر کے لیے پسندیدہ مقام تلاش کریں۔",
    explorePlaces: "مقامات دیکھیں", planTrip: "سفر کی منصوبہ بندی کریں",
    placesHeading: "دیکھنے کے قابل مقامات", searchPlaceholder: "مقام کا نام تلاش کریں...",
    all: "تمام", temples: "مندر", forts: "قلعے", nature: "فطرت",
    waterfalls: "آبشاریں", museums: "عجائب گھر",
    viewMap: "Google Maps پر دیکھیں", favorite: "پسندیدہ",
    footerText: "ناسک دریافت کریں، یادیں بنائیں۔",
  },
  sa: {
    siteName: "नाशिकदर्शनम्", home: "मुखपृष्ठम्", places: "पर्यटनस्थलानि",
    tripPlanner: "यात्रायोजनम्", emergency: "आपत्कालीनसहाय्यम्",
    templeTimings: "मन्दिरदर्शनसमयः", about: "अस्माकं विषये",
    logout: "निर्गच्छतु", welcome: "स्वागतम्", language: "भाषा",
    heroTitle: "नाशिकदर्शनम्", heroSubtitle: "नाशिकस्य इतिहासः संस्कृतिः प्रकृतिश्च एकस्मिन् स्थाने!",
    heroDescription: "आगामियात्रायै प्रियं स्थानं अन्विष्यताम्।",
    explorePlaces: "स्थानानि पश्यन्तु", planTrip: "यात्रां योजयन्तु",
    placesHeading: "दर्शनीयस्थानानि", searchPlaceholder: "स्थानस्य नाम अन्विष्यताम्...",
    all: "सर्वाणि", temples: "मन्दिराणि", forts: "दुर्गाणि", nature: "प्रकृतिः",
    waterfalls: "जलप्रपाताः", museums: "सङ्ग्रहालयाः",
    viewMap: "Google Maps मध्ये पश्यन्तु", favorite: "प्रियाणि",
    footerText: "नाशिकं अन्विष्यताम्, स्मृतीः रचयन्तु।",
  },
  kok: {
    siteName: "नाशिक दर्शन", home: "मुखेल पान", places: "पर्यटन सुवाती",
    tripPlanner: "सफरीचो आराखडो", emergency: "तातडीची मदत",
    templeTimings: "देवळांत दर्शनाची वेळ", about: "आमच्या विशीं",
    logout: "लॉग आउट", welcome: "देव बरें करूं", language: "भास",
    heroTitle: "नाशिक दर्शन", heroSubtitle: "नाशिकाचो इतिहास, संस्कृती आनी निसर्ग एकाच सुवातेर!",
    heroDescription: "तुमच्या फुडल्या सफरी खातीर आवडटी सुवात सोदात.",
    explorePlaces: "सुवाती पळयात", planTrip: "सफरीचो आराखडो करात",
    placesHeading: "पळोवपाक जाय आशिल्लीं सुवाती", searchPlaceholder: "सुवातेचें नांव सोदात...",
    all: "सगळें", temples: "देवळां", forts: "किल्ले", nature: "निसर्ग",
    waterfalls: "धबधबे", museums: "संग्रहालयां",
    viewMap: "Google Maps चेर पळयात", favorite: "आवडटीं",
    footerText: "नाशिक सोदात, यादि तयार करात.",
  },
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    try {
      const saved = localStorage.getItem("nashik-darshan-language");
      return supportedLanguages.some((item) => item.code === saved) ? saved : "mr";
    } catch {
      return "mr";
    }
  });

  const changeLanguage = useCallback((newLanguage) => {
    if (!supportedLanguages.some((item) => item.code === newLanguage)) return;
    setLanguage(newLanguage);
    try {
      localStorage.setItem("nashik-darshan-language", newLanguage);
    } catch {
      // Language remains active for this session if storage is unavailable.
    }
  }, []);

  const t = useCallback(
    (key) => translations[language]?.[key] ?? translations.en[key] ?? translations.mr[key] ?? key,
    [language]
  );

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider.");
  return context;
}
