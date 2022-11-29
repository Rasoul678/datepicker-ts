import { Calendar } from "./Calendar";
import { Styles } from "./constant";
import { Day } from "./Day";

class DatePeaker extends HTMLElement {
  format: string = "MMM DD, YYY";
  position: string = "bottom";
  visible: boolean = false;
  date: Day = null;
  shadow: ShadowRoot;
  calendar: Calendar;
  mounted: boolean = false;
  //* Elements
  toggleButton: HTMLElement = null;
  calendarDropDown: HTMLElement = null;
  calendarDateElement: HTMLElement = null;
  calendarDaysContainer: HTMLElement = null;
  selectedDayElement: HTMLButtonElement = null;

  constructor() {
    super();

    const lang = window.navigator.language;

    const date = new Date(this.getAttribute("date") || Date.now());

    this.shadow = this.attachShadow({ mode: "open" });

    this.date = new Day(date, lang);

    this.calendar = new Calendar(this.date.year, this.date.monthNumber, lang);

    this.format = this.getAttribute("format") || this.format;

    this.position = DatePeaker.position.includes(this.getAttribute("position"))
      ? this.getAttribute("position")
      : this.position;

    this.visible =
      this.getAttribute("visible") === "" ||
      this.getAttribute("visible") === "true" ||
      this.visible;

    this.render();
  }

  connectedCallback() {
    this.mounted = true;
    this.toggleButton = this.shadow.querySelector(".date-toggle");
    this.calendarDropDown = this.shadow.querySelector(".calendar-dropdown");

    const [prevButton, calendarDateElement, nextButton] = Array.from(
      this.calendarDropDown.querySelector(".header").children
    );

    this.calendarDateElement = calendarDateElement as HTMLElement;

    this.calendarDaysContainer =
      this.calendarDropDown.querySelector(".month-days");

    this.toggleButton.addEventListener("click", (e: MouseEvent) => {
      this.toggleCalendar();

      this.dispatchEvent(
        new CustomEvent("onClickButton", {
          detail: e,
        })
      );
    });

    prevButton.addEventListener("click", (e: MouseEvent) => {
      this.prevMonth();

      this.dispatchEvent(
        new CustomEvent("onClickPrevious", {
          detail: e,
        })
      );
    });

    nextButton.addEventListener("click", (e: MouseEvent) => {
      this.nextMonth();

      this.dispatchEvent(
        new CustomEvent("onClickNext", {
          detail: e,
        })
      );
    });

    document.addEventListener("click", (e: MouseEvent) =>
      this.handleClickOutside(e)
    );

    this.renderCalendarDays();
  }

  toggleCalendar(visible: boolean | null = null) {
    if (visible === null) {
      this.calendarDropDown.classList.toggle("visible");
    } else if (visible) {
      this.calendarDropDown.classList.add("visible");
    } else {
      this.calendarDropDown.classList.remove("visible");
    }

    this.visible = this.calendarDropDown.className.includes("visible");

    if (this.visible) {
      this.calendarDateElement.focus();
    } else {
      this.toggleButton.focus();

      if (!this.isCurrentCalendarMonth()) {
        this.calendar.goToDate(this.date.monthNumber, this.date.year);
        this.renderCalendarDays();
      }
    }
  }

  prevMonth() {
    this.calendar.goToPreviousMonth();
    this.renderCalendarDays();
  }

  nextMonth() {
    this.calendar.goToNextMonth();
    this.renderCalendarDays();
  }

  updateHeaderText() {
    this.calendarDateElement.textContent = `${this.calendar.month.name}, ${this.calendar.year}`;

    const monthYear = `${this.calendar.month.name}, ${this.calendar.year}`;
    this.calendarDateElement.setAttribute(
      "aria-label",
      `current month ${monthYear}`
    );
  }

  isSelectedDate(date: Day) {
    return (
      date.date === this.date.date &&
      date.monthNumber === this.date.monthNumber &&
      date.year === this.date.year
    );
  }

  isCurrentCalendarMonth() {
    return (
      this.calendar.month.number === this.date.monthNumber &&
      this.calendar.year === this.date.year
    );
  }

  handleClickOutside(e: MouseEvent) {
    if (this.visible && this !== e.target) {
      this.toggleCalendar(false);
    }
  }

  getWeekDaysElementString() {
    return this.calendar.weekDays
      .map((weekDay) => `<span>${weekDay.substring(0, 3)}</span>`)
      .join("");
  }

  getMonthDaysGrid() {
    const firstDayOfTheMonth = this.calendar.month.getDay(1);
    const prevMonth = this.calendar.getPreviousMonth();

    const totalLastMonthFinalDays = firstDayOfTheMonth.dayNumber - 1;
    const totalDays =
      this.calendar.month.numberOfDays + totalLastMonthFinalDays;
    const monthList = Array.from({ length: totalDays });

    for (let i = totalLastMonthFinalDays; i < totalDays; i++) {
      monthList[i] = this.calendar.month.getDay(
        i + 1 - totalLastMonthFinalDays
      );
    }

    for (let i = 0; i < totalLastMonthFinalDays; i++) {
      const inverted = totalLastMonthFinalDays - (i + 1);
      monthList[i] = prevMonth.getDay(prevMonth.numberOfDays - inverted);
    }

    return monthList;
  }

  selectDay(el: HTMLButtonElement, day: Day) {
    if (day.isEqualTo(this.date)) return;

    this.date = day;

    if (day.monthNumber !== this.calendar.month.number) {
      this.prevMonth();
    } else {
      el.classList.add("selected");
      this.selectedDayElement.classList.remove("selected");
      this.selectedDayElement = el;
    }

    this.toggleCalendar();
    this.updateToggleText();
  }

  updateMonthDays() {
    this.calendarDaysContainer.innerHTML = "";

    this.getMonthDaysGrid().forEach((day: Day) => {
      const el = document.createElement("button");
      el.className = "month-day";

      el.textContent = String(day.date);

      el.addEventListener("click", (e) => this.selectDay(el, day));

      el.setAttribute("aria-label", day.format(this.format));

      if (day.monthNumber === this.calendar.month.number) {
        el.classList.add("current");
      }

      if (this.isSelectedDate(day)) {
        el.classList.add("selected");
        this.selectedDayElement = el;
      }

      this.calendarDaysContainer.appendChild(el);
    });
  }

  updateToggleText() {
    const date = this.date.format(this.format);
    this.toggleButton.textContent = date;
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (!this.mounted) return;

    switch (name) {
      case "date":
        this.date = new Day(new Date(newValue));
        this.calendar.goToDate(this.date.monthNumber, this.date.year);
        this.renderCalendarDays();
        this.updateToggleText();
        break;
      case "format":
        this.format = newValue;
        this.updateToggleText();
        break;
      case "visible":
        this.visible = ["", "true", "false"].includes(newValue)
          ? newValue === "" || newValue === "true"
          : this.visible;
        this.toggleCalendar(this.visible);
        break;
      case "position":
        this.position = DatePeaker.position.includes(newValue)
          ? newValue
          : this.position;
        this.calendarDropDown.className = `calendar-dropdown ${
          this.visible ? "visible" : ""
        } ${this.position}`;
        break;
    }
  }

  renderCalendarDays() {
    this.updateHeaderText();
    this.updateMonthDays();
    this.calendarDateElement.focus();
  }

  static get observedAttributes() {
    return ["date", "format", "visible", "position"];
  }

  static get position() {
    return ["top", "left", "bottom", "right"];
  }

  getStyle() {
    return Styles;
  }

  render() {
    const monthYear = `${this.calendar.month.name}, ${this.calendar.year}`;
    const date = this.date.format(this.format);

    this.shadow.innerHTML = `
      <style>${this.getStyle()}</style>
      <button type="button" class="date-toggle">${date}</button>
      <div class="calendar-dropdown ${this.visible ? "visible" : ""} ${
      this.position
    }">
      <div class="header">
        <button type="button" class="prev-month" aria-label="previous month"></button>
        <h4 tabindex="0" aria-label="current month ${date}">${monthYear}</h4>
        <button type="button" class="prev-month" aria-label="next month"></button>
      </div>
      <div class="week-days">${this.getWeekDaysElementString()}</div>
      <div class="month-days"></div>
    </div>
    `;
  }
}

window.customElements.define("date-peaker", DatePeaker);
