const test = require("node:test");
const assert = require("node:assert/strict");
const { getPrograms } = require("./telegramController");

test("returns verified academy programs with the published availability states", () => {
  let programs;
  getPrograms(
    {},
    {
      json: (value) => {
        programs = value;
      },
    },
  );

  assert.equal(programs.length, 3);
  assert.equal(programs[0].title, "Real Estate Agency Training");
  assert.equal(programs[0].status, "available");
  assert.ok(
    programs.slice(1).every((program) => program.status === "coming_soon"),
  );
});
