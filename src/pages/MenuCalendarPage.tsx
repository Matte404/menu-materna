import { Card } from "primereact/card";
import MenuList from "../components/MenuList";
import CalendarComponent from "../components/CalendarComponent";
import { useMenuState } from "../state/MenuState";
import { useEffect } from "react";

export const MenuCalendarPage = () => {
  const minDate = new Date("10/4/2023");
  const maxDate = new Date("6/1/2024");
  const disabledDates = [
    "11/1/2023",
    "12/8/2023",
    "12/25/2023",
    "12/26/2023",
    "1/1/2024",
    "4/25/2024",
    "5/1/2024",
  ].map((x) => new Date(x));

  const {
    initialized,
    day,
    disabledWeekDaysIndex,
    menuItems,
    initialize,
    setDate,
  } = useMenuState((state) => state);

  useEffect(() => {
    initialize({ minDate, maxDate, disabledDates });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleCalendarChangeDate(x: Date): void {
    setDate(x);
  }

  if (initialized === false) return <div>Loading...</div>;

  return (
    <div className="flex flex-row  justify-content-center ">
      <Card
        title="Menu materna solari 2023/2024"
        className="p-5 w-12 md:w-8 lg:w-5 shadow-8"
      >
        <CalendarComponent
          selectedDate={day}
          minDate={minDate}
          maxDate={maxDate}
          disabledDates={disabledDates}
          disabledWeekDaysIndex={disabledWeekDaysIndex}
          onChange={(x) => handleCalendarChangeDate(x)}
        />
        <MenuList menu={menuItems} className="mt-5" />
      </Card>
    </div>
  );
};
