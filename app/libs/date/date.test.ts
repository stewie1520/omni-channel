import { isIn } from "./index";

// test("validateEmail returns false for non-emails", () => {
//   expect(validateEmail(undefined)).toBe(false);
//   expect(validateEmail(null)).toBe(false);
//   expect(validateEmail("")).toBe(false);
//   expect(validateEmail("not-an-email")).toBe(false);
//   expect(validateEmail("n@")).toBe(false);
// });

// test("validateEmail returns true for emails", () => {
//   expect(validateEmail("kody@example.com")).toBe(true);
// });

describe("isIn", () => {
  let today: Date;
  let yesterday: Date;
  let tommorow: Date;

  beforeEach(() => {
    today = new Date();

    yesterday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 1
    );

    tommorow = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 1
    );
  });

  it("should return false if date is before min", () => {
    expect(isIn({ i: yesterday, unit: "day", min: today })).toBe(false);
  });

  it("should return false if date is after max", () => {
    expect(isIn({ i: tommorow, unit: "day", max: today })).toBe(false);
  });
});
