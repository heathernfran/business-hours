import getBusinessHours from "./src";

const start = new Date("2021-10-07T11:53:14");
const end = new Date("2021-10-07T15:53:14");

const hours = getBusinessHours(start, end);

console.log({ hours });
