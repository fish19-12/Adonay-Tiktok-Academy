const test = require("node:test");
const assert = require("node:assert/strict");
const controller = require("./telegramAdminController");

function responseRecorder() {
  return {
    statusCode: 200,
    body: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(value) {
      this.body = value;
      return this;
    },
  };
}

test("chat diagnostics return safe transport and setup instructions", () => {
  const response = responseRecorder();
  controller.getChatDiagnostics({}, response);

  assert.equal(response.body.success, true);
  assert.equal(response.body.transport, "long_polling");
  assert.ok(response.body.instructions.studentGroup);
  assert.ok(response.body.instructions.announcementsChannel);
  assert.equal(
    JSON.stringify(response.body).includes("TELEGRAM_BOT_TOKEN="),
    false,
  );
  assert.equal(
    JSON.stringify(response.body).includes("WEBHOOK_SECRET="),
    false,
  );
});

test("broadcast rejects an unconfigured destination", async () => {
  const previousGroupId = process.env.TELEGRAM_STUDENT_GROUP_ID;
  delete process.env.TELEGRAM_STUDENT_GROUP_ID;

  const response = responseRecorder();
  await controller.sendTelegramBroadcast(
    { body: { target: "community", text: "Test message" } },
    response,
  );

  assert.equal(response.statusCode, 400);
  assert.equal(response.body.success, false);

  if (previousGroupId === undefined)
    delete process.env.TELEGRAM_STUDENT_GROUP_ID;
  else process.env.TELEGRAM_STUDENT_GROUP_ID = previousGroupId;
});
