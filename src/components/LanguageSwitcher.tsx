"use client";

import Link from "next/link";
import {useLocale} from "next-intl";

const languages = [
  {code: "en", label: "EN"},
  {code: "fr", label: "FR"},
  {code: "de", label: "DE"},
];

export default function LanguageSwitcher() {
  const locale = useLocale();

  return (
    <div className="flex items-center gap-3 text-sm font-semibold uppercase">
      {languages.map((language) => (
        <Link
          key={language.code}
          href={`/${language.code}`}
          className={`transition ${
            locale === language.code
              ? "text-violet-400"
              : "text-gray-400 hover:text-white"
          }`}
        >
          {language.label}
        </Link>
      ))}
    </div>
  );
}