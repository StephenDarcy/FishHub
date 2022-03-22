import React from "react";
import { ImHome3 as HomeIcon } from "react-icons/im";
import {
  GiDoubleFish as FishIcon,
  GiBubbles as C02Icon,
  GiResize as SizeIcon,
} from "react-icons/gi";
import { FaSearchPlus as SearchIcon } from "react-icons/fa";
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
    sidebarItem: "Advanced Search",
    path: "/adv-search",
    class: "sidebar-item",
    icon: <SearchIcon />,
  },
  {
    sidebarItem: "Dissolved C02 Calculator",
    path: "/c02",
    class: "sidebar-item",
    icon: <C02Icon />,
  },
  {
    sidebarItem: "Aquarium Size Calculator",
    path: "/size",
    class: "sidebar-item",
    icon: <SizeIcon />,
  },
  {
    sidebarItem: "Forums",
    path: "/forums",
    class: "sidebar-item",
    icon: <ForumsIcon />,
  },
];
