import moment from "moment";
import { create } from "zustand";
import Meal from "../model/Meal";

import { devtools } from "zustand/middleware";
import menu from "../assets/4w-2425-menu.json";
import Season from "../model/SeasonEnum";

const production = process.env.NODE_ENV === "production" ? true : false;

type MenuState = {
  day: Date;
  menuItems: Meal[];
  minDate: Date;
  maxDate: Date;
  disabledDates: Date[];
  disabledWeekDaysIndex: number[];
  initialized: boolean;
};

type MenuActions = {
  initialize: (initialValue: Partial<MenuState>) => void;
  setDate: (date: Date) => void;
};

export const useMenuState = create<MenuState & MenuActions>()(
  devtools(
    (set) => ({
      day: new Date(),
      menuItems: [],
      minDate: new Date(-8640000000000000),
      maxDate: new Date(8640000000000000),
      disabledDates: [],
      disabledWeekDaysIndex: [0, 6],
      initialized: false,

      initialize: (initialValue: Partial<MenuState>) =>
        set(
          (state) => {
            const newState = { ...state, ...initialValue, initialized: true };

            //validate date or get next/prev valid date based on disabled dates and disabled week days
            newState.day = checkAndFixDate(newState.day, newState);
            newState.menuItems = updateMenu(newState.day); // get menu from json

            return newState;
          },
          false,
          `initialize`
        ),

      setDate: (date: Date) =>
        set(
          (state) => {
            if (!state.initialized)
              throw new Error("MenuState not initialized");

            //validate date or get next/prev valid date based on disabled dates and disabled week days
            const newDate = checkAndFixDate(date, state);

            return {
              day: newDate,
              menuItems: updateMenu(newDate), //get menu from json
            };
          },
          false,
          `setDate`
        ),
    }),
    { name: "menu-state", enabled: !production, log: !production }
  )
);

const checkAndFixDate = (newDate: Date, state: MenuState): Date => {
  const newDateTimestamp = newDate.getTime();
  if (
    state.disabledWeekDaysIndex.includes(newDate.getDay()) ||
    state.disabledDates.map((x) => x.getTime()).includes(newDateTimestamp)
  ) {
    const oldDateTimestamp = state.day.getTime();
    //check if new date is after or before old date ang do 1 day + or -
    return checkAndFixDate(
      newDateTimestamp >= oldDateTimestamp
        ? new Date(newDateTimestamp + 86400000)
        : new Date(newDateTimestamp - 86400000),
      state
    );
  }
  return newDate;
};

const isWinter = (month: number, day: number, year: number): boolean => {
  // Get the date of the first Monday in November
  const firstMondayOfNovember = new Date(year, 10, 1);
  firstMondayOfNovember.setDate(
    firstMondayOfNovember.getDate() + ((8 - firstMondayOfNovember.getDay()) % 7)
  );

  // Get the date of the second Friday in April
  const secondFridayOfApril = new Date(year, 3, 1);
  secondFridayOfApril.setDate(
    secondFridayOfApril.getDate() +
      ((12 - secondFridayOfApril.getDay() + 7) % 7)
  );

  // Check if the current date is within the winter range
  const currentDate = new Date(year, month - 1, day);
  return (
    currentDate >= firstMondayOfNovember || currentDate < secondFridayOfApril
  );
};

const updateMenu = (newDate: Date) => {
  const month = newDate.getMonth() + 1;
  const day = newDate.getDate();

  //winter start first november end 15 april
  //summer start 16 april end 31 october
  //calc season
  const season = isWinter(month, day, newDate.getFullYear())
    ? Season.Winter
    : Season.Summer;

  //calc weekNr and day in the week
  const momentDate = moment(newDate);
  const menuWeekNrIndex = (momentDate.week() % 4) - 1;
  const dayOftheweekIndex = momentDate.day() - 1;

  if (dayOftheweekIndex < 0 || dayOftheweekIndex > 4) {
    return [];
  }

  //get menu
  let weekMenu = menu[menuWeekNrIndex][dayOftheweekIndex];
  //filter by season
  weekMenu = weekMenu.filter(
    (x) => x.season == Season.All || x.season == season
  );

  return weekMenu;
};
