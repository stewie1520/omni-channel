export const formatter = (
  date: Date,
  style: "medium" | "short" | "long" = "medium"
) => Intl.DateTimeFormat("en-US", { dateStyle: style }).format(date);

export const isSameYear = (i: null | Date, current: Date) => {
  return i !== null && current.getFullYear() === i.getFullYear();
};

export const isSameMonth = (i: null | Date, current: Date) =>
  i !== null && current.getMonth() === i.getMonth() && isSameYear(i, current);

export const isSameDate = (i: null | Date, current: Date) =>
  i !== null && current.getDate() === i.getDate() && isSameMonth(i, current);

export const isNow = (
  i: null | Date,
  viewMode: "year" | "month" | "day",
  today: Date
) => {
  if (viewMode === "day") {
    return isSameDate(i, today);
  }

  if (viewMode === "month") {
    return isSameMonth(i, today);
  }

  return isSameYear(i, today);
};

export const isIn = ({
  i,
  unit,
  min,
  max,
}: {
  i: null | Date;
  unit: "day" | "month" | "year";
  min?: Date;
  max?: Date;
}) => {
  if (i === null) {
    return false;
  }

  if (!min && !max) {
    return true;
  }

  if (min) {
    if (
      unit === "day" &&
      new Date(i.getFullYear(), i.getMonth(), i.getDate()) <
        new Date(min.getFullYear(), min.getMonth(), min.getDate())
    ) {
      return false;
    }

    if (
      unit === "month" &&
      new Date(i.getFullYear(), i.getMonth()) <
        new Date(min.getFullYear(), min.getMonth())
    ) {
      return false;
    }

    if (unit === "year" && i.getFullYear() < min.getFullYear()) {
      return false;
    }
  }

  if (max) {
    if (
      unit === "day" &&
      new Date(i.getFullYear(), i.getMonth(), i.getDate()) >
        new Date(max.getFullYear(), max.getMonth(), max.getDate())
    ) {
      return false;
    }

    if (
      unit === "month" &&
      new Date(i.getFullYear(), i.getMonth()) >
        new Date(max.getFullYear(), max.getMonth())
    ) {
      return false;
    }

    if (unit === "year" && i.getFullYear() > max.getFullYear()) {
      return false;
    }
  }

  return true;
};

export * from "./getMonthText";
