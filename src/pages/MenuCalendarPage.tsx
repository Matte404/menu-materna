import { SyntheticEvent, useState } from "react";
import MenuList from "../components/MenuList";
import { Calendar } from "primereact/calendar";
import { FormEvent } from "primereact/ts-helpers";

const MenuCalendarPage = () => {
  const [date, setDate] = useState(new Date());
  const [menuItems, setMenuItems] = useState<string[]>([]);

  //temp function to generate random menu
  function generateRandomMenu() {
    const menu = ["Pane", "Pasta", "Torta", "Pizza", "Insalata"];
    const randomMenu = menu.sort(() => Math.random() - 0.5);
    randomMenu.splice(0, Math.floor(Math.random() * 5));
    return randomMenu;
  }

  function handleDataChange(
    event: FormEvent<Date, SyntheticEvent<Element, Event>>
  ): void {
    setDate(event.value!);
    setMenuItems(generateRandomMenu());
  }

  return (
    <>
      <Calendar
        value={date}
        dateFormat="dd/mm/yy"
        onChange={handleDataChange}
      ></Calendar>
      <p>{date.toDateString()}</p>
      <MenuList menu={menuItems} />
    </>
  );
};

export default MenuCalendarPage;
