import { getLocaleDate, Locales } from "@/lib/locale";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import localeData from 'dayjs/plugin/localeData'
import isToday from 'dayjs/plugin/isToday'

dayjs.extend(localeData)
dayjs.extend(isToday)

export function useLocalizedDayjs(locale: Locales = 'en') {
  const [isLoaded, setIsLoaded] = useState(locale === "en");

  useEffect(() => {
    let isMounted = true;
    if (locale && locale !== "en") {
      getLocaleDate(locale).then(() => {
        if (isMounted) {
          setIsLoaded(true);
        }
      }).catch(() => {
        if (isMounted) {
          setIsLoaded(false);
        }
      });
    } else {
      setIsLoaded(true);
    }
    return () => {
      isMounted = false;
    };
  }, [locale]);

  const getDayjs = (date?: string | Date | Dayjs) => {
    return isLoaded ? dayjs(date).locale(locale) : dayjs(date).locale('en');
  }

  return { getDayjs };
}