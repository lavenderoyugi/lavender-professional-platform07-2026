export function trackEvent(
  eventName: string,
  parameters?: Record<string, string | number | boolean>
) {
  console.log("Analytics Event:", eventName, parameters);

  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, parameters);
  }
}