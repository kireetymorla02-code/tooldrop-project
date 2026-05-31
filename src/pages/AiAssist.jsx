import { useState } from "react";
import { motion } from "framer-motion";
import { HiOutlineSparkles } from "react-icons/hi2";
import PageHeader from "../components/PageHeader";
import { AI_ASSISTANT_PROMPTS, AI_DEMO_RESPONSES } from "../data/customer";

export default function AiAssist() {
  const [messages, setMessages] = useState([
    { role: "assistant", text: AI_DEMO_RESPONSES.default },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const send = (text) => {
    const userText = text || input.trim();
    if (!userText) return;

    setMessages((m) => [...m, { role: "user", text: userText }]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      const reply =
        AI_DEMO_RESPONSES[userText] ||
        Object.entries(AI_DEMO_RESPONSES).find(([k]) => userText.toLowerCase().includes(k.toLowerCase().slice(0, 8)))?.[1] ||
        AI_DEMO_RESPONSES.default;
      setMessages((m) => [...m, { role: "assistant", text: reply }]);
      setTyping(false);
    }, 900);
  };

  return (
    <div className="ai-chat-page">
      <PageHeader
        eyebrow="ToolDrop AI"
        title="AI Assistant"
        subtitle="Booking help · maintenance advice · troubleshooting · center matching"
      />

      <div className="ai-prompt-row">
        {AI_ASSISTANT_PROMPTS.map(({ label, prompt }) => (
          <button key={label} type="button" className="tab-btn" onClick={() => send(prompt)}>
            {label}
          </button>
        ))}
      </div>

      <div className="ai-chat-window">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            className={`chat-bubble ${msg.role}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {msg.role === "assistant" && <HiOutlineSparkles size={16} />}
            <p>{msg.text}</p>
          </motion.div>
        ))}
        {typing && (
          <div className="chat-bubble assistant typing">
            <span className="typing-dots">···</span>
          </div>
        )}
      </div>

      <form
        className="ai-chat-input"
        onSubmit={(e) => {
          e.preventDefault();
          send();
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about bookings, maintenance, or troubleshooting…"
        />
        <button type="submit" className="glass-btn" style={{ margin: 0, width: "auto", padding: "12px 24px" }}>
          Send
        </button>
      </form>
    </div>
  );
}
