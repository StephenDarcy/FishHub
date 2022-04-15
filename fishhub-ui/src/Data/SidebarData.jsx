import React from "react";
import { ImHome3 as HomeIcon } from "react-icons/im";
import { GiDoubleFish as FishIcon, GiBubbles as C02Icon } from "react-icons/gi";
import { AiFillCopy as ForumsIcon } from "react-icons/ai";

export const SidebarData = [
  {
    sidebarItem: "Home",
    path: "/",
    class: "sidebar-item",
    icon: <HomeIcon />,
  },
  {
    sidebarItem: "Fish Compatibility Tool",
    path: "/compatibility",
    class: "sidebar-item",
    icon: <FishIcon />,
  },
  {
    sidebarItem: "Aquarium Calculators",
    path: "/calculators",
    class: "sidebar-item",
    icon: <C02Icon />,
  },
  {
    sidebarItem: "Forums",
    path: "/forums",
    class: "sidebar-item",
    icon: <ForumsIcon />,
  },
];
