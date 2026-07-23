"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { socialLinks } from "@/data/socialLinks";

export default function ContactSection() {
  const t = useTranslations("contact");
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const sendEmail = () => {
    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.subject.trim() ||
      !form.message.trim()
    ) {
      alert(t("alert"));
      return;
    }

    const subject = encodeURIComponent(form.subject);

    const body = encodeURIComponent(
      `Name: ${form.name}

Email: ${form.email}

${form.message}`
    );

    window.location.href = `mailto:lavenderoyugi@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section
      id="contact"
      className="bg-zinc-950 px-6 py-24 text-white md:px-12 lg:px-24"
    >
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-violet-400">
            {t("label")}
          </p>

          <h2 className="mt-4 text-5xl font-extrabold tracking-tight md:text-6xl">
            {t("heading")}
          </h2>

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-zinc-400">
            {t("paragraph1")}
          </p>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-zinc-400">
            {t("paragraph2")}
          </p>

          <div className="mx-auto mt-10 h-1 w-24 rounded-full bg-gradient-to-r from-violet-500 to-purple-300" />
        </div>

        {/* Two Column Layout */}
        <div className="mt-20 grid gap-12 lg:grid-cols-2">
          {/* Left Card */}
          <div className="rounded-3xl border border-white/10 bg-zinc-900 p-10 shadow-xl">
            <div className="flex flex-col items-center text-center">
              <Image
  src="/images/lavender-oyugi.png"
  alt="Lavender Oyugi"
  width={160}
  height={160}
  className="rounded-full border-4 border-violet-500 object-cover shadow-lg"
/>
              <h3 className="mt-6 text-3xl font-bold">
                Lavender Oyugi
              </h3>

              <p className="mt-2 text-sm uppercase tracking-[0.3em] text-violet-400">
                Business Operations • Entrepreneurship • Data Solutions
              </p>
            </div>

            <h4 className="mt-10 text-2xl font-bold">
              {t("whyTitle")}
            </h4>

            <p className="mt-6 leading-8 text-zinc-400">
              {t("whyDescription")}
            </p>

            <h4 className="mt-10 text-xl font-semibold text-violet-400">
  {t("explore")}
</h4>

<div className="mt-6 space-y-4">
  {socialLinks.map((link) => (
    <a
      key={link.name}
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-between rounded-2xl border border-white/10 bg-zinc-800 p-4 transition-all duration-300 hover:border-violet-500 hover:bg-zinc-700"
    >
      <div className="flex items-center gap-4">
        <span className="text-2xl">{link.emoji}</span>

        <div>
          <h5 className="font-semibold">{link.name}</h5>

          <p className="text-sm text-zinc-400">
            {link.description}
          </p>
        </div>
      </div>

      <span className="text-violet-400">↗</span>
    </a>
  ))}
</div>
          </div>

          {/* Right Card */}
          <div className="rounded-3xl border border-white/10 bg-zinc-900 p-10 shadow-xl">
  <h3 className="text-3xl font-bold">{t("sendMessage")}</h3>

  <p className="mt-4 text-zinc-400">
    {t("contactText")}
  </p>

  <div className="mt-8 space-y-3 text-sm text-zinc-300">
    <p>📧 lavenderoyugi@gmail.com</p>
    <p>📍 Saint-Nazaire, France</p>
    <p>🌍 English • French • Swahili</p>
  </div>

  <div className="mt-10 space-y-5">
    <input
      type="text"
      placeholder={t("fullName")}
      value={form.name}
      onChange={(e) =>
        setForm({ ...form, name: e.target.value })
      }
      className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 outline-none transition focus:border-violet-500"
    />

    <input
      type="email"
      placeholder={t("email")}
      value={form.email}
      onChange={(e) =>
        setForm({ ...form, email: e.target.value })
      }
      className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 outline-none transition focus:border-violet-500"
    />

    <input
      type="text"
      placeholder={t("subject")}
      value={form.subject}
      onChange={(e) =>
        setForm({ ...form, subject: e.target.value })
      }
      className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 outline-none transition focus:border-violet-500"
    />

    <textarea
      rows={6}
      placeholder={t("message")}
      value={form.message}
      onChange={(e) =>
        setForm({ ...form, message: e.target.value })
      }
      className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 outline-none transition focus:border-violet-500"
    />

    <button
      onClick={sendEmail}
      className="w-full rounded-xl bg-violet-600 px-6 py-4 font-semibold transition hover:bg-violet-500"
    >
      {t("send")}
    </button>
  </div>
</div>
        </div>
      </div>
    </section>
  );
}