import { useEffect, useState } from "react";
import moment from "moment";
import menu from "../assets/4w-menu.json";
import Season from "../model/SeasonEnum";
import Meal from "../model/Meal";

interface UseMenuJsonHookProps {
    date: Date;
    minDate: Date;
    maxDate: Date;
    disabledDates: Date[];
    disabledWeekDaysIndex: number[];
}

export const useMenuJson = (props: UseMenuJsonHookProps) => {
    const [date, setDate] = useState(props.date);
    const [menuItems, setMenuItems] = useState<Meal[]>([]);
    const disabledDatesTimestamp = props.disabledDates.map((x) => x.getTime());

    useEffect(() => {
        updateMenu(date);
    }, []);

    const checkAndFixDate = (newDate: Date, oldDate: Date): Date => {
        const newDateTimestamp = newDate.getTime();
        const oldDateTimestamp = oldDate.getTime();
        if (props.disabledWeekDaysIndex.includes(newDate.getDay()) ||
            disabledDatesTimestamp.includes(newDateTimestamp)) {
            //check if new date is after or before old date ang do 1 day + or -
            return checkAndFixDate(
                newDateTimestamp >= oldDateTimestamp ?
                    new Date(newDateTimestamp + 86400000) :
                    new Date(newDateTimestamp - 86400000),
                oldDate);
        }
        return newDate;
    };

    const updateMenu = (d: Date) => {
        d = checkAndFixDate(d, date);
        setDate(d);

        const month = d.getMonth() + 1;
        const day = d.getDate();

        //winter start first november end 15 april
        //summer start 16 april end 31 october
        //calc season
        const season = month < 4 || month >= 11 || (month == 5 && day <= 15) ? Season.Winter : Season.Summer;

        //calc weekNr and day in the week
        const momentDate = moment(d);
        const menuWeekNrIndex = momentDate.week() % 4;
        const dayOftheweekIndex = momentDate.day() - 1;

        if (dayOftheweekIndex < 0 || dayOftheweekIndex > 4) {
            setMenuItems([]);
            return;
        }

        //get menu
        let weekMenu = menu[menuWeekNrIndex][dayOftheweekIndex];
        //filter by season
        weekMenu = weekMenu.filter(x => x.season == season || x.season == Season.All);

        //set state
        setMenuItems(weekMenu);
    }
    return { updateMenu, menuItems, date };
};  
