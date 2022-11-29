import { Day } from "./Day";
import { isLeapYear } from "./utils";

export class Month {
  lang: string;
  name: string;
  number: number;
  year: number;
  numberOfDays: number;
  iterator: any = [Symbol.iterator];

  constructor(date: Date = null, lang = "default") {
    const day = new Day(date, lang);
    const monthSize = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    this.lang = lang;
    this.name = day.month;
    this.number = day.monthNumber;
    this.year = day.year;
    this.numberOfDays = monthSize[this.number - 1];

    if (this.number === 2) {
      this.numberOfDays += isLeapYear(this.year) ? 1 : 0;
    }

    this.iterator = function* () {
      let number = 1;

      yield this.getDay(number);

      while (number < this.numberOfDays) {
        ++number;
        yield this.getDay(number);
      }
    };
  }

  getDay(date: number) {
    return new Day(new Date(this.year, this.number - 1, date), this.lang);
  }
}
