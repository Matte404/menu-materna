interface MenuListProps {
  menu: string[];
}

const MenuList = ({ menu }: MenuListProps) => {
  return (
    <>
      <ul>
        {menu.map((item, index) => (
          <li key={index} style={{ listStyleType: "none" }}>
            {item}
          </li>
        ))}
      </ul>
    </>
  );
};

export default MenuList;
