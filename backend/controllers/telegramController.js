const academyPrograms = require("../config/academyPrograms");
const { verifyTelegramInitData } = require("../utils/telegramInitData");

exports.getPrograms = (_req, res) => {
  res.json(academyPrograms);
};

exports.verifyIdentity = (req, res) => {
  try {
    const user = verifyTelegramInitData(
      req.body?.initData,
      process.env.TELEGRAM_BOT_TOKEN,
    );
    res.json({ success: true, user });
  } catch (error) {
    res.status(401).json({ success: false, message: error.message });
  }
};
