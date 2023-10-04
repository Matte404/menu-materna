interface MenuListProps {
  menu: string[];
}

const MenuList = ({ menu }: MenuListProps) => {
  return (
    <>
      {menu.map((item, index) => (
        <p key={index} className="text-left">
           {item}
        </p>
      ))}
    </>
  );
};

export default MenuList;
