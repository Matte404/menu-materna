import { SyntheticEvent, useEffect, useState } from "react";
import MenuList from "../components/MenuList";
import { Calendar } from "primereact/calendar";
import { FormEvent } from "primereact/ts-helpers";
import menu from "../assets/4w-menu.json";
import moment from "moment";
import { addLocale } from "primereact/api";
import { Card } from "primereact/card";

const MenuCalendarPage = () => {
  const [date, setDate] = useState(new Date());
  const [menuItems, setMenuItems] = useState<string[]>([]);

  useEffect(() => {
    loadMenuFromDate(date);
  }, [])

  addLocale('it', {
    firstDayOfWeek: 1,
    dayNames: ['domenica', 'lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato'],
    dayNamesShort: ['dom', 'lun', 'mar', 'mer', 'gio', 'ven', 'sab'],
    dayNamesMin: ['D', 'L', 'M', 'M', 'G', 'V', 'S'],
    monthNames: ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre'],
    monthNamesShort: ['gen', 'feb', 'mar', 'apr', 'mag', 'giu', 'lug', 'ago', 'set', 'ott', 'nov', 'dic'],
    today: 'Oggi',
    clear: 'Pulisci',
  });

  const disabledDates = [
    new Date("11/1/2023"),
    new Date("12/8/2023"),
    new Date("12/25/2023"),
    new Date("12/26/2023"),
    new Date("1/1/2024"),
    new Date("4/25/2024"),
    new Date("5/1/2024")
  ]

  const minDate = new Date("10/4/2023");
  const maxDate = new Date("6/1/2024");


  const handleDataChange = (
    { value }: FormEvent<Date, SyntheticEvent<Element, Event>>
  ): void => {

    loadMenuFromDate(value!);
    setDate(value!);
  }

  const loadMenuFromDate = (date: Date) => {
    //calc weeknr and day in the week
    const momentDate = moment(date);
    const menuWeekNrIndex = momentDate.week() % 4;
    const dayOftheweekIndex = momentDate.day() - 1;
    //get menu
    var weekMenu = menu[menuWeekNrIndex][dayOftheweekIndex];

    // TODO: filter season

    //set state
    setMenuItems(weekMenu.map(x => x.name));
  }

  return (
    <div className="flex flex-row  justify-content-center">
      <Card title="Menu materna solari 2023/2024" className="p-5 w-12 md:w-8 lg:w-5">
        <Calendar
          value={date}
          dateFormat="dd/mm/yy"
          onChange={handleDataChange}
          disabledDays={[0, 6]}
          disabledDates={disabledDates}
          minDate={minDate}
          maxDate={maxDate}
          locale="it"
        ></Calendar>
        <div className="mt-5">
          <MenuList menu={menuItems} />
        </div>
      </Card></div>

  );
};

export default MenuCalendarPage;
