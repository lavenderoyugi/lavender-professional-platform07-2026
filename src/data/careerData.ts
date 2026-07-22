"use client";

import { useLocale } from "next-intl";
import { careerData as careerDataEn } from "./careerData.en";
import { careerData as careerDataFr } from "./careerData.fr";
import { careerData as careerDataDe } from "./careerData.de";

export type Job = (typeof careerDataEn)[number];

export function useCareerData(): Job[] {
  const locale = useLocale();

  if (locale === "fr") return careerDataFr;
  if (locale === "de") return careerDataDe;
  return careerDataEn;
}