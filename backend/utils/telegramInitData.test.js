const test = require("node:test");
const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const { verifyTelegramInitData } = require("./telegramInitData");

function signedInitData(token, authDate, user = { id: 42, first_name: "Ada" }) {
  const fields = new URLSearchParams({
    auth_date: String(authDate),
    user: JSON.stringify(user),
  });
  const dataCheckString = [...fields.entries()]
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([key, value]) => `${key}=${value}`)
    .join("\n");
  const secretKey = crypto
    .createHmac("sha256", "WebAppData")
    .update(token)
    .digest();
  fields.set(
    "hash",
    crypto
      .createHmac("sha256", secretKey)
      .update(dataCheckString)
      .digest("hex"),
  );
  return fields.toString();
}

test("accepts valid recent Telegram initData and returns a minimized identity", () => {
  const token = "test-token";
  const user = verifyTelegramInitData(signedInitData(token, 1000), token, 1001);
  assert.deepEqual(user, {
    id: 42,
    first_name: "Ada",
    last_name: "",
    username: "",
    language_code: "",
  });
});

test("rejects altered or expired Telegram initData", () => {
  const token = "test-token";
  const initData = signedInitData(token, 1000);
  assert.throws(
    () => verifyTelegramInitData(`${initData}&user=%7B%7D`, token, 1001),
    /signature/,
  );
  assert.throws(
    () => verifyTelegramInitData(initData, token, 1000 + 86401),
    /expired/,
  );
});
