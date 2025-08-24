import dayjs from "dayjs";
import "dayjs/locale/th";
import isBetween from "dayjs/plugin/isBetween";
import calendar from "dayjs/plugin/calendar";

dayjs.locale("th");
dayjs.extend(isBetween);
dayjs.extend(calendar);

export default dayjs;
export type { Dayjs } from "dayjs";
