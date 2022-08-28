const MONTHS: Record<string, string[]> = {
  en: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
};

export const getMonthText = (month: number, locale?: string) => {
  return MONTHS[locale || "en"][month];
};
