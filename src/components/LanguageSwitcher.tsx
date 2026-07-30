"use client";

import {Link, usePathname} from "@/i18n/navigation";
import {useLocale} from "next-intl";

const languages = [
  {code: "en", label: "EN"},
  {code: "fr", label: "FR"},
  {code: "de", label: "DE"},
];

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-3 text-sm font-semibold uppercase">
      {languages.map((language) => (
        <Link
          key={language.code}
         href={pathname}
locale={language.code}
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