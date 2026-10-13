const test = require("node:test");
const assert = require("node:assert/strict");
const getPaymentOptions = require("./paymentOptions");

test("returns configured CBE and Telebirr payment details", () => {
  const options = getPaymentOptions({
    PAYMENT_AMOUNT_ETB: "2500",
    PAYMENT_ACCOUNT_NAME: "Adonay TikTok Academy",
    PAYMENT_CBE_ACCOUNT_NUMBER: "1000457365344",
    PAYMENT_TELEBIRR_NUMBER: "0909567654",
  });

  assert.equal(options.amountEtb, 2500);
  assert.equal(options.methods.cbe.accountNumber, "1000457365344");
  assert.equal(options.methods.telebirr.phoneNumber, "0909567654");
  assert.equal(options.methods.cbe.accountName, "Adonay TikTok Academy");
  assert.equal(options.configured, true);
});

test("does not report payment instructions as configured when details are missing", () => {
  const options = getPaymentOptions({ PAYMENT_AMOUNT_ETB: "2500" });

  assert.equal(options.configured, false);
  assert.equal(options.methods.cbe.configured, false);
  assert.equal(options.methods.telebirr.configured, false);
});
