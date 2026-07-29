export function trackEvent(
  eventName: string,
  parameters: Record<string, unknown> = {}
) {
  if (typeof window === "undefined") return;

  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, parameters);
  }
}