import React, { useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { LogoutUser, GetAllTask } from "../context/GlobalAction";
import GlobalContext from "../context/GlobalContext";
import AuthRoutes from "../routes/AuthRoutes";
import {
  DashboardContainer,
  DashboardContent,
  DashboardContentContainer,
  DashboardLink,
  DashboardLinksContainer,
  DashboardNavigation,
  DashboardTopBar,
  Heading,
  LogoutButton,
  SearchInput,
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

const DashboardLayout = () => {
  const path = useLocation().pathname;
  const { dispatch } = useContext(GlobalContext);
  const [btnTxt, setBtnTxt] = useState("Logout");

  useEffect(() => {
    GetAllTask(dispatch);
  }, [dispatch]);

  const handleLogout = async () => {
    setBtnTxt("Logging out");
    const isLogout = await LogoutUser(dispatch);
    if (isLogout) {
      setBtnTxt("Logout");
    } else {
      setBtnTxt("Log Out");
    }
  };

  return (
    <DashboardContainer>
      <DashboardNavigation>
        <DashboardTopBar justify="center">
          <Heading>My Tasks</Heading>
        </DashboardTopBar>
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
      </DashboardNavigation>
      <DashboardContentContainer>
        <DashboardTopBar>
          <SearchInput type="text" placeholder="search ..." />
          <LogoutButton onClick={handleLogout}>{btnTxt}</LogoutButton>
        </DashboardTopBar>
        <DashboardContent>
          <AuthRoutes />
        </DashboardContent>
      </DashboardContentContainer>
    </DashboardContainer>
  );
};

export default DashboardLayout;
