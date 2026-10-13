const crypto = require("crypto");

const MAX_AUTH_AGE_SECONDS = 24 * 60 * 60;

function verifyTelegramInitData(
  initData,
  botToken,
  nowSeconds = Math.floor(Date.now() / 1000),
) {
  if (
    typeof initData !== "string" ||
    !initData ||
    initData.length > 4096 ||
    !botToken
  ) {
    throw new Error("Telegram authentication data is missing or invalid.");
  }

  const fields = new URLSearchParams(initData);
  const receivedHash = fields.get("hash");
  const authDate = Number(fields.get("auth_date"));
  if (
    !receivedHash ||
    !Number.isInteger(authDate) ||
    authDate > nowSeconds ||
    nowSeconds - authDate > MAX_AUTH_AGE_SECONDS
  ) {
    throw new Error("Telegram authentication data is invalid or expired.");
  }

  const dataCheckString = [...fields.entries()]
    .filter(([key]) => key !== "hash")
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([key, value]) => `${key}=${value}`)
    .join("\n");
  const secretKey = crypto
    .createHmac("sha256", "WebAppData")
    .update(botToken)
    .digest();
  const expectedHash = crypto
    .createHmac("sha256", secretKey)
    .update(dataCheckString)
    .digest();
  let suppliedHash;
  try {
    suppliedHash = Buffer.from(receivedHash, "hex");
  } catch {
    throw new Error("Telegram authentication data signature is invalid.");
  }
  if (
    suppliedHash.length !== expectedHash.length ||
    !crypto.timingSafeEqual(suppliedHash, expectedHash)
  ) {
    throw new Error("Telegram authentication data signature is invalid.");
  }

  let user;
  try {
    user = JSON.parse(fields.get("user") || "null");
  } catch {
    throw new Error("Telegram user data is invalid.");
  }
  if (!user || !Number.isSafeInteger(user.id)) {
    throw new Error("Telegram user data is invalid.");
  }

  return {
    id: user.id,
    first_name: typeof user.first_name === "string" ? user.first_name : "",
    last_name: typeof user.last_name === "string" ? user.last_name : "",
    username: typeof user.username === "string" ? user.username : "",
    language_code:
      typeof user.language_code === "string" ? user.language_code : "",
  };
}

module.exports = { verifyTelegramInitData };
