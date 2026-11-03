import { createHmac, timingSafeEqual } from "crypto";

const COOKIE_LIFETIME_SECONDS = 60 * 60;

function signingSecret() {
  const secret = process.env.PAGE_ACCESS_PASSWORD;
  if (!secret) throw new Error("PAGE_ACCESS_PASSWORD is not configured");
  return secret;
}

export function createAdminToken() {
  const issuedAt = Math.floor(Date.now() / 1000);
  const signature = createHmac("sha256", signingSecret()).update(String(issuedAt)).digest("hex");
  return `${issuedAt}.${signature}`;
}

export function isValidAdminToken(token?: string) {
  if (!token) return false;
  const [issuedAtText, suppliedSignature] = token.split(".");
  if (!issuedAtText || !suppliedSignature || !/^\d+$/.test(issuedAtText)) return false;
  const issuedAt = Number(issuedAtText);
  const now = Math.floor(Date.now() / 1000);
  if (!Number.isSafeInteger(issuedAt) || issuedAt > now || now - issuedAt > COOKIE_LIFETIME_SECONDS) return false;
  try {
    const expected = createHmac("sha256", signingSecret()).update(String(issuedAt)).digest("hex");
    const a = Buffer.from(suppliedSignature, "hex");
    const b = Buffer.from(expected, "hex");
    return a.length === b.length && timingSafeEqual(a, b);
  } catch {
    return false;
  }
}
