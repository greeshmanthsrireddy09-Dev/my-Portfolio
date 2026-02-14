import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Mail, Send, Sparkles } from "lucide-react";
import PageWrapper from "../components/PageWrapper";
import { ADMIN_EMAIL } from "../firebase";

const MotionSection = motion.section;

const initialForm = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const FORMSPREE_ENDPOINT = (import.meta.env.VITE_FORMSPREE_ENDPOINT || "").trim();
const CONTACT_RECEIVER_EMAIL =
  (import.meta.env.VITE_CONTACT_RECEIVER_EMAIL || ADMIN_EMAIL || "").trim();

function humanizeSendError(error) {
  if (error?.message === "missing-recipient") {
    return "Contact receiver email is not configured.";
  }
  if (error?.message === "provider-failed") {
    return "Message provider rejected the request. Check endpoint configuration.";
  }
  return error?.message || "Failed to send message.";
}

async function sendWithProvider(payload) {
  if (!FORMSPREE_ENDPOINT) return false;

  const response = await fetch(FORMSPREE_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("provider-failed");
  }

  return true;
}

function sendWithMailto(payload) {
  if (!CONTACT_RECEIVER_EMAIL) throw new Error("missing-recipient");

  const body = [
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    "",
    payload.message,
  ].join("\n");

  const mailto = `mailto:${encodeURIComponent(
    CONTACT_RECEIVER_EMAIL
  )}?subject=${encodeURIComponent(payload.subject)}&body=${encodeURIComponent(body)}`;

  window.location.href = mailto;
}

function Contact() {
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (submitted) setSubmitted(false);
    if (submitError) setSubmitError("");
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const nextErrors = {};

    if (!formData.name.trim()) nextErrors.name = "Name is required.";
    if (!formData.email.trim()) nextErrors.email = "Email is required.";
    if (formData.email && !/^\S+@\S+\.\S+$/.test(formData.email)) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (!formData.subject.trim()) nextErrors.subject = "Subject is required.";
    if (!formData.message.trim()) nextErrors.message = "Message is required.";

    return nextErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nextErrors = validate();
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setSubmitted(false);
      return;
    }

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      subject: formData.subject.trim(),
      message: formData.message.trim(),
    };

    setErrors({});
    setSubmitting(true);
    setSubmitError("");

    try {
      const sentByProvider = await sendWithProvider(payload);
      if (!sentByProvider) {
        sendWithMailto(payload);
      }

      setSubmitted(true);
      setFormData(initialForm);
    } catch (error) {
      setSubmitError(humanizeSendError(error));
      setSubmitted(false);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PageWrapper>
      <MotionSection
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <p className="text-violet-400 text-xs tracking-[0.28em] uppercase mb-3">
          Get In Touch
        </p>
        <h1 className="font-display text-3xl sm:text-5xl font-bold text-white leading-tight mb-4">
          Contact Me
        </h1>
        <p className="text-neutral-400 text-[15px] sm:text-[17px] leading-[1.7] max-w-2xl mb-8">
          Share your project details and I will get back to you soon.
        </p>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-neutral-800 bg-neutral-900/65 p-5 sm:p-6 space-y-4"
          noValidate
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              placeholder="Your name"
            />
            <Field
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              placeholder="you@example.com"
            />
          </div>

          <Field
            label="Subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            error={errors.subject}
            placeholder="Project inquiry"
          />

          <div>
            <label className="block text-sm font-medium text-neutral-200 mb-1.5">
              Message
            </label>
            <textarea
              name="message"
              rows={6}
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell me about your project..."
              className="w-full rounded-xl border border-neutral-700 bg-neutral-950/70 text-neutral-100 px-4 py-3 outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition"
            />
            {errors.message && (
              <p className="mt-1 text-xs text-rose-400">{errors.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center gap-2 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-60 text-white px-5 py-2.5 font-medium transition"
          >
            <Send size={16} />
            {submitting ? "Sending..." : "Send Message"}
          </button>

          {submitError && (
            <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-sm text-rose-300">
              {submitError}
            </div>
          )}

          {submitted && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4"
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5 h-8 w-8 rounded-full bg-emerald-400/20 text-emerald-300 flex items-center justify-center">
                  <CheckCircle2 size={18} />
                </div>
                <div className="min-w-0">
                  <p className="inline-flex items-center gap-1.5 text-emerald-200 font-medium">
                    <Sparkles size={14} />
                    Message Sent Successfully
                  </p>
                  <p className="text-sm text-emerald-100/85 mt-1 leading-relaxed">
                    Thanks for reaching out. Your message is on its way, and you
                    should receive a response soon.
                  </p>
                  <p className="inline-flex items-center gap-1.5 text-xs text-emerald-200/85 mt-2">
                    <Mail size={13} />
                    You can send another message anytime.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </form>
      </MotionSection>
    </PageWrapper>
  );
}

function Field({ label, name, type = "text", value, onChange, error, placeholder }) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-neutral-200 mb-1.5">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-xl border border-neutral-700 bg-neutral-950/70 text-neutral-100 px-4 py-3 outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition"
      />
      {error && <p className="mt-1 text-xs text-rose-400">{error}</p>}
    </div>
  );
}

export default Contact;
