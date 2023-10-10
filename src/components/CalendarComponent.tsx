import moment from "moment";
import { Calendar } from "primereact/calendar";

interface CalendarComponentProps {
  selectedDate: Date;
  minDate: Date;
  maxDate: Date;
  disabledDates: Date[];
  disabledWeekDaysIndex: number[];
  onChange: (e: Date) => void;
}

const CalendarComponent = ({
  selectedDate,
  minDate,
  maxDate,
  disabledDates,
  disabledWeekDaysIndex,
  onChange,
}: CalendarComponentProps) => {
  const addDays = (n: number): void => {
    const increasedDate = new Date(selectedDate.getTime() + n * 86400000); //1 day in milliseconds
    onChange(increasedDate);
  };

  return (
    <>
      <div className="flex flex-row justify-content-between align-items-center">
        <i
          className="pi pi-backward cursor-pointer mr-2"
          style={{ fontSize: "1.5rem" }}
          onClick={() => addDays(-1)}
        ></i>
        <Calendar
          value={selectedDate}
          dateFormat="dd MM yy (DD)"
          onChange={(e) => onChange(e.value!)}
          disabledDays={disabledWeekDaysIndex}
          disabledDates={disabledDates}
          minDate={minDate}
          maxDate={maxDate}
          locale="it"
        ></Calendar>
        <i
          className="pi pi-forward cursor-pointer ml-2"
          style={{ fontSize: "1.5rem" }}
          onClick={() => addDays(1)}
        ></i>
      </div>
    </>
  );
};

export default CalendarComponent;
