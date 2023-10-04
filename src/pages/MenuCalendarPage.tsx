import { Card } from "primereact/card";
import { useMenuJson } from "../hooks/UseMenuJsonHook";
import MenuList from "../components/MenuList";
import CalendarComponent from "../components/CalendarComponent";

export const MenuCalendarPage = () => {
  const { updateMenu, menuItems, date } = useMenuJson(new Date());
 
  return (
    <div className="flex flex-row  justify-content-center ">
      <Card title="Menu materna solari 2023/2024" className="p-5 w-12 md:w-8 lg:w-5 shadow-8">
        <CalendarComponent value={date} onChange={(x) => updateMenu(x)} />
        <MenuList menu={menuItems} className="mt-5" />
      </Card>
    </div>

  );
};
