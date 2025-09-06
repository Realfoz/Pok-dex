import { cleanInput } from "./repl";
import { describe, expect, test } from "vitest";

describe.each([
  {
    input: "  hello  world  ",
    expected: ["hello", "world"],
  },
  {
    input: "hello world",
    expected: ["hello","world"],
  },{
    input: "FozOlozADingDongDay",
    expected: ["fozolozadingdongday"],
  },{
    input: "My frog is infact a grung ",
    expected: ["my","frog","is","infact","a","grung"],
  },{
    input: "",
    expectedError: "Input must contain at least one word",
  },
  {
    input: "       ",
    expectedError: "Input must contain at least one word",
  },
  {
    input: "    ",
    expectedError: "Input must contain at least one word",
  },
  {
    input: " ",
    expectedError: "Input must contain at least one word",
  }
])
("cleanInput($input)", ({ input, expected, expectedError }) => {
  test("Is not on fire", () => {
    if (expectedError) {
      expect(() => cleanInput(input)).toThrow(expectedError);
    } else {
      const actual = cleanInput(input);
      expect(actual).toHaveLength(expected.length);
      expected.forEach((v, i) => expect(actual[i]).toBe(v));
    }
  });
});