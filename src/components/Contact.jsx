import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import emailjs from "@emailjs/browser";
import { FiSend, FiCheck, FiMail, FiMapPin } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

// Set these via .env (see README) — EmailJS keys are safe to expose client-side.
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export default function Contact() {
  const formRef = useRef(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  useEffect(() => {
    gsap.fromTo(
      ".contact-fade",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        scrollTrigger: { trigger: "#contact", start: "top 75%" },
      }
    );
  }, []);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Valid email required";
    if (!form.subject.trim()) e.subject = "Subject is required";
    if (form.message.trim().length < 10)
      e.message = "Message should be at least 10 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      setStatus("error");
      return;
    }

    setStatus("sending");
    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, {
        publicKey: PUBLIC_KEY,
      });
      setStatus("sent");
      setForm({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 3500);
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="section-padding">
      <div className="max-w-3xl mx-auto text-center">
        <p className="contact-fade text-accent-cyan font-display tracking-widest text-sm mb-3">
          GET IN TOUCH
        </p>
        <h2 className="contact-fade font-display text-3xl md:text-5xl font-bold mb-4">
          Let's build something{" "}
          <span className="text-gradient">great together</span>
        </h2>
        <p className="contact-fade text-white/50 mb-12">
          Have a role, project, or idea in mind? My inbox is open.
        </p>

        <form
          ref={formRef}
          onSubmit={onSubmit}
          className="contact-fade gradient-border glass rounded-3xl p-6 md:p-10 text-left space-y-5"
        >
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <input
                name="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Your Name"
                className="w-full bg-white/5 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-accent-purple transition"
              />
              {errors.name && (
                <p className="text-red-400 text-xs mt-1">{errors.name}</p>
              )}
            </div>
            <div>
              <input
                name="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="Your Email"
                className="w-full bg-white/5 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-accent-purple transition"
              />
              {errors.email && (
                <p className="text-red-400 text-xs mt-1">{errors.email}</p>
              )}
            </div>
          </div>

          <div>
            <input
              name="subject"
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              placeholder="Subject"
              className="w-full bg-white/5 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-accent-purple transition"
            />
            {errors.subject && (
              <p className="text-red-400 text-xs mt-1">{errors.subject}</p>
            )}
          </div>

          <div>
            <textarea
              name="message"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Your Message"
              rows={5}
              className="w-full bg-white/5 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-accent-purple transition resize-none"
            />
            {errors.message && (
              <p className="text-red-400 text-xs mt-1">{errors.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={status === "sending"}
            data-cursor-hover
            className="btn-magnetic w-full bg-grad-primary shadow-glow hover:scale-[1.02] disabled:opacity-60"
          >
            {status === "sent" ? (
              <>
                <FiCheck /> Sent!
              </>
            ) : status === "sending" ? (
              "Sending..."
            ) : (
              <>
                <FiSend /> Send Message
              </>
            )}
          </button>

          {status === "error" && (
            <p className="text-red-400 text-sm text-center">
              Message couldn't be sent. Add your EmailJS keys to .env (see
              README) and try again.
            </p>
          )}
        </form>

        <div className="contact-fade mt-10 flex flex-wrap justify-center gap-8 text-white/50 text-sm">
          <span className="flex items-center gap-2">
            <FiMail /> hello@manjotsingh.dev
          </span>
          <span className="flex items-center gap-2">
            <FiMapPin /> India
          </span>
        </div>
      </div>
    </section>
  );
}
