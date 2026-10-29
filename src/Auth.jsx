import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "./firebase";
import { useLanguage } from "./LanguageContext";
import "./Auth.css";

export default function Auth({ onLogin }) {
  const { language } = useLanguage();
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  const text = {
    mr: {
      eyebrow: "NASHIK DARSHAN", title: "नाशिक दर्शनमध्ये स्वागत आहे",
      subtitle: "तुमच्या खात्यात लॉगिन करा किंवा नवीन खाते तयार करा.",
      login: "लॉगिन", signup: "नवीन खाते", name: "पूर्ण नाव",
      email: "ईमेल", password: "पासवर्ड", submitLogin: "लॉगिन करा",
      submitSignup: "खाते तयार करा", forgot: "पासवर्ड विसरलात?",
      loading: "कृपया थांबा...", switch: "खाते नाहीये?",
      switchLogin: "आधीच खाते आहे?", create: "खाते तयार करा", back: "लॉगिन करा",
    },
    en: {
      eyebrow: "NASHIK DARSHAN", title: "Welcome to Nashik Darshan",
      subtitle: "Sign in to your account or create a new one.",
      login: "Login", signup: "Sign Up", name: "Full name",
      email: "Email", password: "Password", submitLogin: "Sign in",
      submitSignup: "Create account", forgot: "Forgot password?",
      loading: "Please wait...", switch: "Don't have an account?",
      switchLogin: "Already have an account?", create: "Sign up", back: "Log in",
    },
  };
  const ui = text[language] || text.en;

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");
    setBusy(true);
    try {
      let result;
      if (mode === "signup") {
        result = await createUserWithEmailAndPassword(auth, email.trim(), password);
        if (name.trim()) {
          await updateProfile(result.user, { displayName: name.trim() });
        }
      } else {
        result = await signInWithEmailAndPassword(auth, email.trim(), password);
      }
      onLogin?.(result.user);
    } catch (error) {
      const messages = {
        "auth/invalid-credential": "Email किंवा password चुकीचा आहे.",
        "auth/email-already-in-use": "या email वर खाते आधीच आहे. Login करा.",
        "auth/weak-password": "Password किमान 6 characters चा ठेवा.",
        "auth/invalid-email": "योग्य email address टाका.",
        "auth/too-many-requests": "खूप प्रयत्न झाले. थोड्या वेळाने पुन्हा प्रयत्न करा.",
        "auth/operation-not-allowed": "Firebase Console मध्ये Email/Password sign-in enable करा.",
        "auth/network-request-failed": "Internet connection तपासा.",
      };
      setMessage(messages[error.code] || error.message || "Authentication अयशस्वी. पुन्हा प्रयत्न करा.");
    } finally {
      setBusy(false);
    }
  }

  async function handleForgotPassword() {
    if (!email.trim()) {
      setMessage(language === "mr" ? "आधी Email टाका." : "Enter your email first.");
      return;
    }
    setBusy(true);
    setMessage("");
    try {
      await sendPasswordResetEmail(auth, email.trim());
      setMessage(language === "mr" ? "Password reset link ईमेलवर पाठवली आहे." : "Password reset link sent to your email.");
    } catch (error) {
      setMessage(error.message || "Could not send reset email.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="auth-section">
      <div className="auth-card">
        <div className="auth-logo" aria-hidden="true">🧭</div>
        <p className="auth-eyebrow">{ui.eyebrow}</p>
        <h2>{ui.title}</h2>
        <p className="auth-subtitle">{ui.subtitle}</p>

        <div className="auth-tabs">
          <button type="button" className={mode === "login" ? "selected" : ""} onClick={() => { setMode("login"); setMessage(""); }}>
            {ui.login}
          </button>
          <button type="button" className={mode === "signup" ? "selected" : ""} onClick={() => { setMode("signup"); setMessage(""); }}>
            {ui.signup}
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {mode === "signup" && (
            <label>
              {ui.name}
              <input autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} placeholder={ui.name} required />
            </label>
          )}
          <label>
            {ui.email}
            <input type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" required />
          </label>
          <label>
            {ui.password}
            <input type="password" autoComplete={mode === "login" ? "current-password" : "new-password"} value={password} onChange={(event) => setPassword(event.target.value)} minLength={6} placeholder="••••••••" required />
          </label>
          {mode === "login" && (
            <button className="forgot-button" type="button" onClick={handleForgotPassword} disabled={busy}>
              {ui.forgot}
            </button>
          )}
          {message && <p className="auth-message" role="alert">{message}</p>}
          <button className="auth-submit" type="submit" disabled={busy}>
            {busy ? ui.loading : mode === "login" ? ui.submitLogin : ui.submitSignup}
          </button>
        </form>

        <p className="auth-switch">
          {mode === "login" ? ui.switch : ui.switchLogin}{" "}
          <button type="button" onClick={() => { setMode(mode === "login" ? "signup" : "login"); setMessage(""); }}>
            {mode === "login" ? ui.create : ui.back}
          </button>
        </p>
      </div>
    </section>
  );
}
