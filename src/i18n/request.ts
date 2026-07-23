import {getRequestConfig} from "next-intl/server";
import {routing} from "./routing";

export default getRequestConfig(async ({requestLocale}) => {
  let locale = await requestLocale;

  if (
    !locale ||
    !routing.locales.includes(
      locale as (typeof routing.locales)[number]
    )
  ) {
    locale = routing.defaultLocale;
  }

  const messages = (
    await import(`../../messages/${locale}.json`)
  ).default;

  console.log("================================");
  console.log("Locale:", locale);
  console.log("Keys:", Object.keys(messages));
  console.log("Has contact:", Object.hasOwn(messages, "contact"));
  console.log("================================");

  return {
    locale,
    messages
  };
});