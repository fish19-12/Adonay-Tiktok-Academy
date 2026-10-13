function getPaymentOptions(environment = process.env) {
  const amountEtb = Number(environment.PAYMENT_AMOUNT_ETB || 2500);
  const accountName = (
    environment.PAYMENT_ACCOUNT_NAME || "Adonay TikTok Academy"
  ).trim();
  const cbeAccountNumber = (
    environment.PAYMENT_CBE_ACCOUNT_NUMBER || "1000457365344"
  ).trim();
  const telebirrPhoneNumber = (
    environment.PAYMENT_TELEBIRR_NUMBER || "0909567654"
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
