export const Styles = `
    :host {
        position: relative;
        font-family: sans-serif;
    }

    .date-toggle {
        padding: 8px 15px;
        border: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        background: #eee;
        color: #333;
        border-radius: 6px;
        font-weight: bold;
        cursor: pointer;
        text-transform: caritalize;
    }

    .calendar-dropdown {
        display: none;
        width: 300px;
        height: 300px;
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translate(-50%, 8px);
        padding: 20px;
        background: #fff;
        border-raduis: 5px;
        box-shadow: 0 0 8px rgba(0,0,0,0.2);
    }

    .calendar-dropdown.top {
        top: auto;
        bottom: 100%;
        transform: translate(-50%, -8px);
    }
      
    .calendar-dropdown.left {
        top: 50%;
        left: 0;
        transform: translate(calc(-8px + -100%), -50%);
    }
      
    .calendar-dropdown.right {
        top: 50%;
        left: 100%;
        transform: translate(8px, -50%);
    }

    .calendar-dropdown.visible {
        display: block;
    }

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 10px 0 30px;
    }

    .header h4 {
        margin: 0;
        text-transform: capitalize;
        font-size: 21px;
        font-weight: bold;
    }

    .header button {
        padding: 0;
        border: 8px solid transparent;
        width: 0;
        height: 0;
        border-radius: 2px;
        border-top-color: #222;
        transform: rotate(90deg);
        cursor: pointer;
        background: none;
        position: relative;
    }

    .header button::after {
        content: "";
        dispaly: block;
        width: 25px;
        height: 25px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }

    .header button:last-of-type {
        transform: rotate(-90deg);
    }

    .week-days {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        grid-gap: 5px;
        margin-bottom: 10px;
    }

    .week-days span {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 10px;
        text-transform: capitalize;
    }

    .month-days {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        grid-gap: 5px;
    }

    .month-day {
        padding: 8px 5px;
        background: #c7c9d3;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items; center;
        border-radius: 2px;
        cursor: pointer;
        border: none;
    }

    .month-day.current {
        opacity: 1;
        background: #444857;
    }

    .month-day.selected {
        background: #28a5a7;
        color: #fff;
    }

    .month-day:hover {
        background: #34bd61;
    }
`;
