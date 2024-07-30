import { describe, expect, it } from "vitest";
import getBusinessHours from "./getBusinessHours";
import { calculateMillisecondsInHours } from "./utilities";

describe("businessHours()", () => {
  it("returns 0 hours when start is greater than end", () => {
    const start = new Date("2021-10-07T17:53:14");
    const end = new Date("2021-10-07T16:53:14");

    expect(getBusinessHours(start, end)).toBe(0);
  });

  it("returns 4 hours in milliseconds when start and end are within business hours on the same day", () => {
    const start = new Date("2021-10-07T11:53:14");
    const end = new Date("2021-10-07T15:53:14");

    const result = calculateMillisecondsInHours(4);

    expect(getBusinessHours(start, end)).toBe(result);
  });

  it("returns 3 hours in milliseconds when start is outside of business hours and end is within business hours on the same day", () => {
    const start = new Date("2021-10-07T07:53:14");
    const end = new Date("2021-10-07T12:53:14");

    const result = calculateMillisecondsInHours(3);

    expect(getBusinessHours(start, end)).toBe(result);
  });

  it("returns 2 hours in milliseconds when start is within of business hours and end is outside business hours on the same day", () => {
    const start = new Date("2021-10-07T15:53:14");
    const end = new Date("2021-10-07T19:53:14");

    const result = calculateMillisecondsInHours(2);

    expect(getBusinessHours(start, end)).toBe(result);
  });

  it("returns total hours in milliseconds when start and end are within business hours on consecutive weekdays", () => {
    const start = new Date("2024-07-22T16:53:14");
    const end = new Date("2024-07-23T10:53:14");

    const result = calculateMillisecondsInHours(1);

    expect(getBusinessHours(start, end)).toBe(result);
  });
});
