import { SyntheticEvent, useState } from "react";
import MenuList from "../components/MenuList";
import { Calendar } from "primereact/calendar";
import { FormEvent } from "primereact/ts-helpers";
import menu from "../assets/4w-menu.json";
import moment from "moment";
import { addLocale } from "primereact/api";

const MenuCalendarPage = () => {
  const [date, setDate] = useState(new Date());
  const [menuItems, setMenuItems] = useState<string[]>([]);

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


  function handleDataChange(
    event: FormEvent<Date, SyntheticEvent<Element, Event>>
  ): void {

    //calc weeknr and day in the week
    const momentDate = moment(event.value);
    const menuWeekNrIndex = momentDate.week() % 4;
    const dayOftheweekIndex = momentDate.day()-1;
    //get menu
    var weekMenu = menu[menuWeekNrIndex][dayOftheweekIndex];

    // TODO: filter season

    //set state
    setMenuItems(weekMenu.map(x=>x.name));
    setDate(event.value!);
  }

  return (
    <>
      <Calendar
        value={date}
        dateFormat="dd/mm/yy"
        onChange={handleDataChange}
        disabledDays={[6, 7]}
        locale="it"
      ></Calendar>
      <MenuList menu={menuItems} />
    </>
  );
};

export default MenuCalendarPage;
