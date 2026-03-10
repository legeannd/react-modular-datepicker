import dayjs from "dayjs";
import localeData from 'dayjs/plugin/localeData'
import isToday from 'dayjs/plugin/isToday'
import { DayjsInstance } from "@/types";

dayjs.extend(localeData)
dayjs.extend(isToday)


export function useLocalizedDayjs(customDayjs?: DayjsInstance) {
  const getDayjs = customDayjs || ((date?: dayjs.ConfigType) => dayjs(date).locale('en'))

  return { getDayjs };
}