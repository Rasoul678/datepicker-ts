import { isLeapYear } from "./utils";
import { Day } from "./_day";
import { Month } from "./_month";

export class Calendar {
  today: Day;
  year: number;
  month: Month;
  lang: string;
  weekDays: string[] = Array.from({ length: 7 });

  constructor(
    year: number = null,
    monthNumber: number = null,
    lang = "default"
  ) {
    this.today = new Day(null, lang);
    this.year = year ?? this.today.year;
    this.month = new Month(
      new Date(this.year, (monthNumber || this.today.monthAsNumber) - 1),
      lang
    );
    this.lang = lang;

    this.weekDays.forEach((_, i) => {
      const day = this.month.getDay(i);

      if (!this.weekDays.includes(day.day)) {
        this.weekDays[day.dayAsNumber - 1] = day.day;
      }
    });
  }

  [Symbol.iterator] = function* () {
    let number = 1;

    yield this.getMonth(number);

    while (number < 12) {
      ++number;
      yield this.getMonth(number);
    }
  };

  getMonth(monthNumber: number) {
    return new Month(new Date(this.year, monthNumber - 1), this.lang);
  }

  get isLeapYear() {
    return isLeapYear(this.year);
  }

  getPreviousMonth() {
    if (this.month.number === 1) {
      return new Month(new Date(this.year - 1, 11), this.lang);
    }

    return new Month(new Date(this.year, this.month.number - 2), this.lang);
  }

  getNextMonth() {
    if (this.month.number === 12) {
      return new Month(new Date(this.year + 1, 0), this.lang);
    }

    return new Month(new Date(this.year, this.month.number + 2), this.lang);
  }

  goToDate(monthNumber: number, year: number) {
    this.month = new Month(new Date(year, monthNumber - 1), this.lang);
    this.year = year;
  }

  goToNextYear() {
    this.year += 1;
    this.month = new Month(new Date(this.year, 0), this.lang);
  }

  goToPreviousYear() {
    this.year -= 1;
    this.month = new Month(new Date(this.year, 11), this.lang);
  }

  goToNextMonth() {
    if (this.month.number === 12) {
      return this.goToNextYear();
    }

    this.month = new Month(
      new Date(this.year, this.month.number + 2),
      this.lang
    );
  }

  goToPreviousMonth() {
    if (this.month.number === 1) {
      return this.goToPreviousYear();
    }

    this.month = new Month(
      new Date(this.year, this.month.number - 2),
      this.lang
    );
  }
}
