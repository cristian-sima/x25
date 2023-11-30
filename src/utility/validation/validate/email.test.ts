import { describe, expect, test } from "vitest";
import { isValidEmail } from "./email";

const valid = true,
  notValid = false;

describe("given an email without @ [email]", () => {
  test("should not be valid", () => {
    expect(isValidEmail("email")).toBe(notValid);
  });
});
describe("given an email without the user [email@]", () => {
  test("should not be valid", () => {
    expect(isValidEmail("email@")).toBe(notValid);
  });
});
describe("given an email without domain [email@email]", () => {
  test("should not be valid", () => {
    expect(isValidEmail("email@email")).toBe(notValid);
  });
});
describe("given a good email (email@email.ro)", () => {
  test("should be valid", () => {
    expect(isValidEmail("email@email.ro")).toBe(valid);
  });
});
