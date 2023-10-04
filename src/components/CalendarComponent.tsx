import moment from "moment";
import { Calendar } from "primereact/calendar"

interface CalendarComponentProps {
    value: Date,
    onChange: (e: Date) => void
}

const CalendarComponent = ({ value, onChange }: CalendarComponentProps) => {

    const minDate = new Date("10/4/2023");
    const maxDate = new Date("6/1/2024");
    const disabledDates = [
        new Date("11/1/2023"),
        new Date("12/8/2023"),
        new Date("12/25/2023"),
        new Date("12/26/2023"),
        new Date("1/1/2024"),
        new Date("4/25/2024"),
        new Date("5/1/2024")
    ];

    const addDays = (n: number): void => {
        var increasedDate = new Date(value.getTime() + (n * 86400000));

        if (increasedDate < minDate || increasedDate > maxDate)
            return;
        const dayNr = moment(increasedDate).day();
        console.log(dayNr)
        if (
            dayNr > 5 ||
            dayNr == 0 ||
            disabledDates.map(x => x.getTime()).includes(increasedDate.getTime())
        )
            addDays(n < 0 ? n - 1 : n + 1);
        else
            onChange(increasedDate);
    }

    return <>
        <div className="flex flex-row justify-content-around align-items-center">
            <i className="pi pi-backward cursor-pointer" style={{ fontSize: '1.5rem' }} onClick={() => addDays(-1)}></i>
            <Calendar
                value={value}
                dateFormat="dd/mm/yy"
                onChange={(e) => onChange(e.value!)}
                disabledDays={[0, 6]}
                disabledDates={disabledDates}
                minDate={minDate}
                maxDate={maxDate}
                locale="it"
            ></Calendar>
            <i className="pi pi-forward cursor-pointer" style={{ fontSize: '1.5rem' }} onClick={() => addDays(1)}></i>
        </div></>
}

export default CalendarComponent;