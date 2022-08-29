import React from "react";
import { SwipeableDrawer, Button } from "@mui/material";
import { GiHamburgerMenu } from "react-icons/gi";
import { IconContext } from "react-icons";
import { useLocation } from "react-router-dom";
import {
  SideBarNav,
  DashboardLinksContainer,
  DashboardLink,
} from "../style-components";

const routes = [
  {
    name: "Dashboard",
    route: "/dashboard",
  },
  {
    name: "All Tasks",
    route: "/todo",
  },
  {
    name: "Create Task",
    route: "/create-todo",
  },
];

const SideNav = () => {
  const [state, setState] = React.useState(false);
  const path = useLocation().pathname;

  return (
    <SideBarNav>
      <Button onClick={() => setState(true)}>
        <IconContext.Provider value={{ size: 24, color: "#96f" }}>
          <GiHamburgerMenu />
        </IconContext.Provider>
      </Button>
      <SwipeableDrawer
        anchor={"left"}
        open={state}
        onClose={() => setState(false)}
        onOpen={() => setState(true)}
      >
        <DashboardLinksContainer>
          {routes.map((val, ind) => (
            <DashboardLink
              key={ind}
              to={val.route}
              className={path === val.route ? "active-link" : "link-hover"}
            >
              {val.name}
            </DashboardLink>
          ))}
        </DashboardLinksContainer>
      </SwipeableDrawer>
    </SideBarNav>
  );
};

export default SideNav;
