import { getWeekNumber } from "./utils";

export class Day {
    Date: Date;
    date: number;
    day: string;
    dayNumber: number;
    dayShort: string;
    year: number;
    yearShort: number;
    month: string;
    monthShort: string;
    monthNumber: number;
    timestamp: number;
    week: number;
  
    constructor(date: Date = null, lang = "default") {
      date = date ?? new Date();
  
      this.Date = date;
      this.date = date.getDate();
      this.day = date.toLocaleString(lang, { weekday: "long" });
      this.dayNumber = date.getDay() + 1;
      this.dayShort = date.toLocaleString(lang, { weekday: "short" });
      this.year = date.getFullYear();
      this.yearShort = Number(date.toLocaleString(lang, { year: "2-digit" }));
      this.month = date.toLocaleString(lang, { month: "long" });
      this.monthShort = date.toLocaleString(lang, { month: "short" });
      this.monthNumber = date.getMonth() + 1;
      this.timestamp = date.getTime();
      this.week = getWeekNumber(date);
    }
  
    get isToday() {
      return this.isEqualTo(new Date());
    }
  
    isEqualTo(date: Date | Day) {
      date = date instanceof Day ? date.Date : date;
  
      return (
        date.getDate() === this.date &&
        date.getMonth() === this.monthNumber - 1 &&
        date.getFullYear() === this.year
      );
    }
  
    format(formatString: string) {
      return formatString
        .replace(/\bYYYY\b/, this.year.toString())
        .replace(/\bYYY\b/, this.yearShort.toString())
        .replace(/\bWW\b/, this.week.toString().padStart(2, "0"))
        .replace(/\bW\b/, this.week.toString())
        .replace(/\bDDDD\b/, this.day)
        .replace(/\bDDD\b/, this.dayShort)
        .replace(/\bDD\b/, this.date.toString().padStart(2, "0"))
        .replace(/\bD\b/, this.date.toString())
        .replace(/\bMMMM\b/, this.month)
        .replace(/\bMMM\b/, this.monthShort)
        .replace(/\bMM\b/, this.monthNumber.toString().padStart(2, "0"))
        .replace(/\bM\b/, this.monthNumber.toString());
    }
  }