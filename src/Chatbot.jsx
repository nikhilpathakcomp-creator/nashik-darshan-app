
import { useState, useRef, useEffect } from "react";
import { useLanguage } from "./LanguageContext";
import "./Chatbot.css";

const CHAT_API_URL =
  "https://nashik-darshan-ai.nikhilpathak-comp.workers.dev/api/chat";

const chatbotTranslations = {
  mr: {
    welcome:
      "नमस्कार! 🙏 मी Nashik Darshan AI Assistant आहे. नाशिकमधील पर्यटनस्थळे, मंदिरे, किल्ले आणि इतिहासाबद्दल मला प्रश्न विचारा!",
    subtitle: "तुमचा Nashik Travel Guide",
    placeholder: "तुमचा प्रश्न लिहा...",
    loading: "उत्तर तयार होत आहे... ⏳",
    connectionError:
      "माफ करा! 😕 AI शी संपर्क साधता आला नाही. कृपया इंटरनेट कनेक्शन तपासा आणि पुन्हा प्रयत्न करा.",
    genericError: "AI कडून उत्तर मिळू शकले नाही.",
    emptyReply: "माफ करा, उत्तर मिळाले नाही.",
    close: "चॅट बंद करा",
    open: "चॅट उघडा",
    inputLabel: "तुमचा प्रश्न",
    send: "संदेश पाठवा",
    assistant: "Nashik AI Assistant",
  },
  hi: {
    welcome:
      "नमस्ते! 🙏 मैं Nashik Darshan AI Assistant हूँ। नासिक के पर्यटन स्थलों, मंदिरों, किलों और इतिहास के बारे में मुझसे पूछें!",
    subtitle: "आपका Nashik Travel Guide",
    placeholder: "अपना प्रश्न लिखें...",
    loading: "उत्तर तैयार हो रहा है... ⏳",
    connectionError:
      "क्षमा करें! 😕 AI से संपर्क नहीं हो सका। कृपया इंटरनेट कनेक्शन जाँचें और दोबारा प्रयास करें।",
    genericError: "AI से उत्तर प्राप्त नहीं हो सका।",
    emptyReply: "क्षमा करें, कोई उत्तर नहीं मिला।",
    close: "चैट बंद करें",
    open: "चैट खोलें",
    inputLabel: "आपका प्रश्न",
    send: "संदेश भेजें",
    assistant: "Nashik AI Assistant",
  },
  en: {
    welcome:
      "Hello! 🙏 I'm the Nashik Darshan AI Assistant. Ask me about tourist attractions, temples, forts and the history of Nashik!",
    subtitle: "Your Nashik Travel Guide",
    placeholder: "Type your question...",
    loading: "Preparing an answer... ⏳",
    connectionError:
      "Sorry! 😕 I couldn't connect to the AI. Please check your internet connection and try again.",
    genericError: "The AI could not provide an answer.",
    emptyReply: "Sorry, no answer was received.",
    close: "Close chat",
    open: "Open chat",
    inputLabel: "Your question",
    send: "Send message",
    assistant: "Nashik AI Assistant",
  },
};

export default function Chatbot() {
  const { language } = useLanguage();

  const ui = chatbotTranslations[language] || chatbotTranslations.en;

  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [messages, setMessages] = useState(() => [
    {
      role: "bot",
      text: (
        chatbotTranslations[language] || chatbotTranslations.en
      ).welcome,
    },
  ]);

  const messagesEndRef = useRef(null);

  // Update the initial greeting when the selected language changes.
  useEffect(() => {
    setMessages((current) => {
      if (current.length === 1 && current[0].role === "bot") {
        return [{ role: "bot", text: ui.welcome }];
      }

      return current;
    });
  }, [language, ui.welcome]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isLoading]);

  async function handleSend(event) {
    event.preventDefault();

    const question = input.trim();

    if (!question || isLoading) return;

    setMessages((current) => [
      ...current,
      { role: "user", text: question },
    ]);

    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch(CHAT_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: question,
          language,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || ui.genericError);
      }

      setMessages((current) => [
        ...current,
        {
          role: "bot",
          text: data.reply || ui.emptyReply,
        },
      ]);
    } catch (error) {
      console.error("Nashik Darshan AI error:", error);

      setMessages((current) => [
        ...current,
        {
          role: "bot",
          text: ui.connectionError,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="chatbot-widget">
      {isOpen && (
        <section
          className="chatbot-panel"
          aria-label={ui.assistant}
        >
          <header className="chatbot-header">
            <div>
              <strong>🌄 {ui.assistant}</strong>
              <p>{ui.subtitle}</p>
            </div>

            <button
              type="button"
              className="chatbot-close"
              onClick={() => setIsOpen(false)}
              aria-label={ui.close}
            >
              ×
            </button>
          </header>

          <div className="chatbot-messages" aria-live="polite">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`chat-message ${message.role}`}
              >
                {message.text}
              </div>
            ))}

            {isLoading && (
              <div className="chat-message bot" role="status">
                {ui.loading}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <form className="chatbot-form" onSubmit={handleSend}>
            <input
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder={ui.placeholder}
              aria-label={ui.inputLabel}
              disabled={isLoading}
              maxLength={2000}
            />

            <button
              type="submit"
              aria-label={ui.send}
              disabled={isLoading || !input.trim()}
            >
              {isLoading ? "…" : "➤"}
            </button>
          </form>
        </section>
      )}

      <button
        type="button"
        className="chatbot-toggle"
        onClick={() => setIsOpen((open) => !open)}
        aria-label={isOpen ? ui.close : ui.open}
      >
        {isOpen ? "×" : "💬"}
      </button>
    </div>
  );
}
