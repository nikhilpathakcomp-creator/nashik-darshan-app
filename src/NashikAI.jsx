
import { useState, useRef, useEffect } from "react";
import "./NashikAI.css";

const QUICK_QUESTIONS = [
  "नाशिकमध्ये फिरायला कुठे जावे?",
  "त्र्यंबकेश्वर मंदिराची माहिती दे",
  "Best places for trekking near Nashik",
  "Plan a one-day Nashik trip",
];

const INITIAL_MESSAGE = {
  role: "assistant",
  content:
    "नमस्कार! 🙏 मी Nashik AI Assistant आहे.\n\nनाशिकमधील मंदिरे, किल्ले, धबधबे आणि पर्यटनस्थळांविषयी मला विचारा!",
};

export default function NashikAI() {
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function handleSend(text = input) {
    const question = text.trim();

    if (!question || loading) return;

    const updatedMessages = [
      ...messages,
      { role: "user", content: question },
    ];

    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      // Calls your backend endpoint. The API key must stay on the server.
      const response = await fetch("/api/nashik-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: question,
          history: updatedMessages.slice(-10),
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.error || `Server error (${response.status})`
        );
      }

      const answer = data.reply || data.answer;

      if (!answer) {
        throw new Error("AI server returned an empty response.");
      }

      setMessages((current) => [
        ...current,
        { role: "assistant", content: answer },
      ]);
    } catch (error) {
      console.error("Nashik AI Assistant error:", error);

      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content:
            "माफ करा! 😕 सध्या AI service शी कनेक्ट होता येत नाही.\n\nकृपया पुन्हा प्रयत्न करा. Server/API configuration तपासण्याची गरज असू शकते.",
          error: true,
        },
      ]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  }

  function handleKeyDown(event) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  }

  function clearChat() {
    setMessages([INITIAL_MESSAGE]);
    setInput("");
  }

  return (
    <>
      {!isOpen && (
        <button
          className="nashik-ai-launcher"
          onClick={() => {
            setIsOpen(true);
            setTimeout(() => inputRef.current?.focus(), 100);
          }}
          aria-label="Open Nashik AI Assistant"
        >
          <span className="nashik-ai-launcher-icon">🤖</span>
          <span>Ask Nashik AI</span>
        </button>
      )}

      {isOpen && (
        <section
          className="nashik-ai-panel"
          aria-label="Nashik AI Assistant"
        >
          <header className="nashik-ai-header">
            <div className="nashik-ai-brand">
              <div className="nashik-ai-avatar">🏞️</div>
              <div>
                <h2>Nashik AI</h2>
                <p>
                  <span className="nashik-ai-status-dot" />
                  Travel Assistant
                </p>
              </div>
            </div>

            <div className="nashik-ai-header-actions">
              <button
                type="button"
                onClick={clearChat}
                title="Clear chat"
                aria-label="Clear chat"
              >
                ↻
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                title="Close assistant"
                aria-label="Close assistant"
              >
                ✕
              </button>
            </div>
          </header>

          <div className="nashik-ai-messages">
            <div className="nashik-ai-welcome">
              🌿 Explore Nashik with AI
            </div>

            {messages.map((message, index) => (
              <div
                key={`${index}-${message.role}`}
                className={`nashik-ai-message ${
                  message.role === "user" ? "user-message" : "bot-message"
                }`}
              >
                {message.role === "assistant" && (
                  <span className="nashik-ai-message-avatar">🤖</span>
                )}

                <div className="nashik-ai-bubble">
                  {message.content}
                </div>
              </div>
            ))}

            {messages.length === 1 && (
              <div className="nashik-ai-quick-questions">
                <p>Try asking:</p>
                {QUICK_QUESTIONS.map((question) => (
                  <button
                    type="button"
                    key={question}
                    disabled={loading}
                    onClick={() => handleSend(question)}
                  >
                    {question} <span>↗</span>
                  </button>
                ))}
              </div>
            )}

            {loading && (
              <div className="nashik-ai-message bot-message">
                <span className="nashik-ai-message-avatar">🤖</span>
                <div className="nashik-ai-bubble nashik-ai-typing">
                  <span />
                  <span />
                  <span />
                  <small>Thinking...</small>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <form
            className="nashik-ai-input-area"
            onSubmit={(event) => {
              event.preventDefault();
              handleSend();
            }}
          >
            <textarea
              ref={inputRef}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about places in Nashik..."
              rows={1}
              maxLength={2000}
              aria-label="Your message"
              disabled={loading}
            />

            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label="Send message"
            >
              ➤
            </button>
          </form>

          <footer className="nashik-ai-footer">
            Nashik Darshan • AI Travel Guide
          </footer>
        </section>
      )}
    </>
  );
}
