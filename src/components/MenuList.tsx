import Meal from "../model/Meal";
import SeasonBadge from "./SeasonBadge";

interface MenuListProps {
  menu: Meal[];
  className?: string;
}

const MenuList = ({ menu, className }: MenuListProps) => {
  return (
    <div className={className}>
      {menu.map((item, index) => (
        <p key={index} className="text-left">
          {item.name} <SeasonBadge season={item.season} />
        </p>
      ))}
    </div>
  );
};

export default MenuList;
