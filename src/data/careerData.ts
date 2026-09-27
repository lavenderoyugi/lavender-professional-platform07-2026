"use client";

import { useLocale } from "next-intl";
import { careerData as careerDataEn } from "./careerData.en";
import { careerData as careerDataFr } from "./careerData.fr";
import { careerDataAdditionalFr } from "./careerData.fr.additional";
import { careerData as careerDataDe } from "./careerData.de";
import { careerDataAdditionalDe } from "./careerData.de.additional";

export type Job = (typeof careerDataEn)[number];

function mergeCareerData(base: Job[], additional: Job[]): Job[] {
  const merged = new Map<number, Job>();

  [...base, ...additional].forEach((item) => {
    merged.set(item.id, item);
  });

  return Array.from(merged.values());
}

export function useCareerData(): Job[] {
  const locale = useLocale();

  if (locale === "fr") {
    return mergeCareerData(careerDataFr, careerDataAdditionalFr);
  }

  if (locale === "de") {
    return mergeCareerData(careerDataDe, careerDataAdditionalDe);
  }

  return careerDataEn;
}
