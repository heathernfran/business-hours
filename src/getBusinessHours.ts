import { DateTime, Interval } from "luxon";
import { BUSINESS_END_HOUR, BUSINESS_START_HOUR } from "./constants";

export default function getBusinessHours(start: Date, end: Date): number {
  if (start > end) return 0;

  const startDate = DateTime.fromJSDate(start);
  const endDate = DateTime.fromJSDate(end);

  let totalMilliseconds = 0;

  for (
    let dateCounter = startDate;
    dateCounter < endDate;
    dateCounter = dateCounter.plus({ days: 1 }).startOf("day")
  ) {
    if (dateCounter.weekday < 6) {
      const { businessStartTime, businessEndTime } = getStartAndEndTimes(
        startDate,
        endDate,
        dateCounter
      );

      if (businessStartTime < businessEndTime) {
        totalMilliseconds += Interval.fromDateTimes(
          businessStartTime,
          businessEndTime
        )
          .toDuration()
          .as("milliseconds");
      }
    }
  }

  return totalMilliseconds;
}

function getStartAndEndTimes(
  startDate: DateTime,
  endDate: DateTime,
  dateCounter: DateTime
) {
  let businessStartTime = startDate.set({
    hour: BUSINESS_START_HOUR,
  });
  let businessEndTime = startDate.set({
    hour: BUSINESS_END_HOUR,
  });

  if (dateCounter > businessStartTime) {
    businessStartTime = dateCounter;
  }
  if (endDate < businessEndTime) {
    businessEndTime = endDate;
  }

  return { businessStartTime, businessEndTime };
}
