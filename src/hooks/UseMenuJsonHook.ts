import { useEffect, useState } from "react";
import moment from "moment";
import menu from "../assets/4w-menu.json";
import Season from "../model/SeasonEnum";


export const useMenuJson = (d: Date) => {
    const [date, setDate] = useState(d);
    const [menuItems, setMenuItems] = useState<Meal[]>([]);

    useEffect(() => {
        updateMenu(date);
    }, [])

    const updateMenu = (d: Date) => {
        setDate(d);

        const month = d.getMonth() + 1;
        const day = d.getDate();

        //winter start first november end 15 april
        //summer start 16 april end 31 october
        //calc season
        var season = month < 4 || month >= 11 || (month == 5 && day <= 15) ? Season.Winter : Season.Summer;

        //calc weeknr and day in the week
        const momentDate = moment(d);
        const menuWeekNrIndex = momentDate.week() % 4;
        const dayOftheweekIndex = momentDate.day() - 1;
        //get menu
        var weekMenu = menu[menuWeekNrIndex][dayOftheweekIndex];
        //filter by season
        weekMenu = weekMenu.filter(x => x.season == season || x.season == Season.All);

        //set state
        setMenuItems(weekMenu);
    }
    return { updateMenu, menuItems, date };
};  