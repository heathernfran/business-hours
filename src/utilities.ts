import { MS_IN_HOURS } from "./constants";

export function calculateMillisecondsInHours(hours: number = 1) {
  return MS_IN_HOURS * hours;
}
