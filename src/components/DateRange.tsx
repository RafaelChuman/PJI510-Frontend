import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import {
  DateRangePicker,
  DateRangePickerProps,
  RangeKeyDict,
} from "react-date-range";
import { Component } from "react";

export class DateRange extends Component {
  handleSelect(ranges: RangeKeyDict) {

    let startDate = new Date();
    let endDate = new Date();

    if (ranges["selection"].startDate)
      startDate = new Date(ranges["selection"].startDate);
    if (ranges["selection"].endDate)
      endDate = new Date(ranges["selection"].endDate);
    // {
    //   selection: {
    //     startDate: [native Date Object],
    //     endDate: [native Date Object],
    //   }
    // }
  }
  render() {
    const selectionRange = {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    };
    return (
      <DateRangePicker ranges={[selectionRange]} onChange={this.handleSelect} />
    );
  }
}
