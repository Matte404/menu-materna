import { Card } from "primereact/card";
import { ProgressSpinner } from "primereact/progressspinner";
import { useEffect } from "react";
import CalendarComponent from "../components/CalendarComponent";
import MenuList from "../components/MenuList";
import { useMenuState } from "../state/MenuState";

export const MenuCalendarPage = () => {
  const minDate = new Date("10/4/2024");
  const maxDate = new Date("6/1/2025");
  const disabledDates = [
    "12/23/2024",
    "12/24/2024",
    "12/27/2024",
    "12/28/2024",
    "12/30/2024",
    "12/31/2024",
    "01/02/2025",
    "01/03/2025",
    "01/04/2025",
    "04/17/2025",
    "04/18/2025",
    "04/19/2025",
    "05/02/2025",
    "05/03/2025",

    // Giorni di vacanza stabiliti a livello nazionale
    "11/01/2024",
    "12/08/2024",
    "12/25/2024",
    "12/26/2024",
    "01/01/2025",
    "01/06/2025",
    "04/21/2025",
    "04/25/2025",
    "05/01/2025",
    "06/02/2025",
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
    console.log("MenuCalendarPage useEffect", disabledDates);
    initialize({ minDate, maxDate, disabledDates });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleCalendarChangeDate(x: Date): void {
    setDate(x);
  }

  if (initialized === false)
    return (
      <div className="card flex justify-content-center mt-4">
        <ProgressSpinner />
      </div>
    );

  return (
    <div
      className=" bg-center w-screen h-screen"
      style={{ backgroundImage: "url(./background2425.png)" }}
    >
      <div className="flex flex-row  justify-content-center  ">
        <Card
          title="Menu materna 2024/2025"
          className="p-5 w-12 md:w-8 lg:w-5 shadow-8 my-4 mx-2 border-round-xl"
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
    </div>
  );
};
