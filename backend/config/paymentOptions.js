function getPaymentOptions(environment = process.env) {
  const amountEtb = Number(environment.PAYMENT_AMOUNT_ETB);
  const accountName = (environment.PAYMENT_ACCOUNT_NAME || "").trim();
  const cbeAccountNumber = (
    environment.PAYMENT_CBE_ACCOUNT_NUMBER || ""
  ).trim();
  const telebirrPhoneNumber = (
    environment.PAYMENT_TELEBIRR_NUMBER || ""
  ).trim();

  const methods = {
    cbe: {
      label: "CBE",
      accountName,
      accountNumber: cbeAccountNumber,
      configured: Boolean(accountName && cbeAccountNumber),
    },
    telebirr: {
      label: "Telebirr",
      accountName,
      phoneNumber: telebirrPhoneNumber,
      configured: Boolean(accountName && telebirrPhoneNumber),
    },
  };

  return {
    amountEtb: Number.isFinite(amountEtb) && amountEtb > 0 ? amountEtb : null,
    methods,
    configured:
      Number.isFinite(amountEtb) &&
      amountEtb > 0 &&
      methods.cbe.configured &&
      methods.telebirr.configured,
  };
}

module.exports = getPaymentOptions;
