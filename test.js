// TODO: delete me
const dayjs = require("dayjs");

const startOfDayDate = dayjs().startOf("day").subtract(1, "day").toDate();
const endOfDayDate = dayjs().endOf("day").subtract(1, "day").toDate();
// console.log(dayjs("2022-09-19T13:31:56.491Z").format('DD/MM/YYYY'));
// console.log(dayjs("2022-09-19T20:59:59.999Z"));
// console.log(dayjs(startOfDayDate));
// console.log(dayjs(endOfDayDate));

// console.log(dayjs("2022-09-19T20:59:59.000+00:00"));
console.log(dayjs("2022-09-18T21:00:00.000Z"));