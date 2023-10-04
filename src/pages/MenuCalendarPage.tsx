
import { Calendar } from "primereact/calendar";
import { Card } from "primereact/card";
import { useMenuJson } from "../hooks/UseMenuJsonHook";
import MenuList from "../components/MenuList";


const MenuCalendarPage = () => {
  const { updateMenu, menuItems, date } = useMenuJson(new Date());

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
  ]

  return (
    <div className="flex flex-row  justify-content-center">
      <Card title="Menu materna solari 2023/2024" className="p-5 w-12 md:w-8 lg:w-5">
        <Calendar
          value={date}
          dateFormat="dd/mm/yy"
          onChange={(e) => updateMenu(e.value!)}
          disabledDays={[0, 6]}
          disabledDates={disabledDates}
          minDate={minDate}
          maxDate={maxDate}
          locale="it"
        ></Calendar>
        <MenuList menu={menuItems} className="mt-5" />
      </Card>
    </div>

  );
};

export default MenuCalendarPage;


