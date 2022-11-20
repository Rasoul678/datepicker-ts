import { getWeekNumber } from "./utils";

class Day {
  Date: Date;
  date: number;
  day: string;
  dayAsNumber: number;
  dayAsShort: string;
  year: number;
  yearAsShort: number;
  month: string;
  monthAsShort: string;
  monthAsNumber: number;
  timestamp: number;
  week: number;

  constructor(date: Date = null, lang = "default") {
    date = date ?? new Date();

    this.Date = date;
    this.date = date.getDate();
    this.day = date.toLocaleString(lang, { weekday: "long" });
    this.dayAsNumber = date.getDay() + 1;
    this.dayAsShort = date.toLocaleString(lang, { weekday: "short" });
    this.year = date.getFullYear();
    this.yearAsShort = Number(date.toLocaleString(lang, { year: "2-digit" }));
    this.month = date.toLocaleString(lang, { month: "long" });
    this.monthAsShort = date.toLocaleString(lang, { month: "short" });
    this.monthAsNumber = Number(
      date.toLocaleString(lang, { month: "2-digit" })
    );
    this.timestamp = date.getTime();
    this.week = getWeekNumber(date);
  }

  get isToday() {
    return this.isEqualTo(new Date());
  }

  private isEqualTo(date: Date | Day) {
    date = date instanceof Day ? date.Date : date;

    return (
      date.getDate() === this.date &&
      date.getMonth() === this.monthAsNumber - 1 &&
      date.getFullYear() === this.year
    );
  }

  format(formatString: string) {
    return formatString
      .replace(/\bYYYY\b/, this.year.toString())
      .replace(/\bYYY\b/, this.yearAsShort.toString())
      .replace(/\bWW\b/, this.week.toString().padStart(2, "0"))
      .replace(/\bW\b/, this.week.toString())
      .replace(/\bDDDD\b/, this.day)
      .replace(/\bDDD\b/, this.dayAsShort)
      .replace(/\bDD\b/, this.date.toString().padStart(2, "0"))
      .replace(/\bD\b/, this.date.toString())
      .replace(/\bMMMM\b/, this.month)
      .replace(/\bMMM\b/, this.monthAsShort)
      .replace(/\bMM\b/, this.monthAsNumber.toString().padStart(2, "0"))
      .replace(/\bM\b/, this.monthAsNumber.toString());
  }
}
