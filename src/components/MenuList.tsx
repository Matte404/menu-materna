import SeasonBadge from "./SeasonBadge";

interface MenuListProps {
  menu: { name: string, season: string }[]
}; 

const MenuList = ({ menu }: MenuListProps) => {
  return (
    <>
      {menu.map((item, index) => (
        <p key={index} className="text-left">
          {item.name} <SeasonBadge season={item.season} />
        </p>
      ))}
    </>
  );
};

export default MenuList;
