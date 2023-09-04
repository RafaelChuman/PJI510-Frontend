import React from "react";
import { Component } from "react";

import { format } from "date-fns";

interface ComponentProps {
  date: Date;
  setDate: (newDateBegin: Date) => void;
}

export class DateInput extends Component<ComponentProps> {
  render() {
    const handleChangeDate = (
      dateInput: React.ChangeEvent<HTMLInputElement>
    ) => {
      let validated = true;
      let dateConverted: number[] =[];

      //This Replace is a crazy think of JavaScript that don't convert correctly dates with the caracter "-"
      let DateValues = dateInput.target.value.split("-");
      if (DateValues && DateValues.length == 3) {
        dateConverted = DateValues.map((item) => {
          if (item) return parseInt(item);
          validated = false;
          return 0;
        });
      } else {
        validated = false;
      }

      if (validated) {
        let newDate = new Date(dateConverted[0], dateConverted[1]-1, dateConverted[2]);

        this.props.setDate(newDate);
      }
    };

    const date = new Date();

    const today = format(date, "yyyy-MM-dd");

    date.setFullYear(date.getFullYear() - 1);

    const lastYear = format(date, "yyyy-MM-dd");

    return (
      <input
        type="date"
        min={lastYear}
        max={today}
        defaultValue={format(this.props.date, "yyyy-MM-dd")}
        onChange={(e) => handleChangeDate(e)}
        required
      ></input>
    );
  }
}
