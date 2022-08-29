import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { FormButton } from "./FormStyle";

export const DashboardContainer = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #e9f1f0;
  display: grid;
  grid-template-columns: 20% 80%;
  @media (max-width: 1024px) {
    display: block;
  }
`;

export const DashboardTopBar = styled.div`
  width: 100%;
  min-height: 70px;
  height: 10vh;
  max-height: 80px;
  display: flex;
  align-items: center;
  justify-content: ${(props) => props.justify || "space-between"};
  padding: 10px 40px;
`;

export const DashboardNavigation = styled.div`
  grid-template-column: 1/2;
  border-right: 1px solid #aaa;
  @media (max-width: 1024px) {
    display: none;
  }
`;

export const DashboardContentContainer = styled.div`
  grid-template-column: 2/3;
  background-color: #e9f1f0;
  overflow: auto;
`;

export const DashboardContent = styled.div`
  width: 90%;
  height: 85%;
  margin: auto;
`;

export const Heading = styled.h1`
  font-size: 24px;
  color: #465671;
`;

export const SideBarNav = styled.div`
  display: none;
  @media (max-width: 1024px) {
    display: block;
  }
`;

export const SearchInput = styled.input`
  max-width: 200px;
  width: 50vw;
  min-width: 150px;
  margin-right: 20px;
  padding: 8px 10px;
  font-size: 16px;
  border: 1px solid transparent;
  border-radius: 5px;
  background-color: #fff;
  @media (max-width: 1024px) {
    display: none;
  }
`;

export const LogoutButton = styled(FormButton)`
  font-size: 16px;
  width: 130px;
`;

export const DashboardLinksContainer = styled.div`
  width: 100%;
  max-width: 300px;
  padding: 20px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const TaskListContainer = styled.div`
  width: 100%;
  max-height: 80vh;
  overflow: auto;
`;

export const DashboardLink = styled(NavLink)`
  width: 80%;
  margin-bottom: 15px;
  padding: 10px;
  text-align: center;
  font-weight: 500;
  color: #666;
  cursor: pointer;
  @media (max-width: 1024px) {
    width: 100%;
  }
`;

export const CardsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;
  margin: auto;
  padding: 30px 0px;
`;

export const Card = styled.div`
  max-width: 300px;
  background-color: #fff;
  width: 80%;
  min-width: 260px;
  height: 150px;
  border-radius: 10px;
  margin: auto;
  border: 1px solid #aaa;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const CardTitle = styled.div`
  font-size: 28px;
  font-wight: 600;
  color: #444;
`;

export const CardNumber = styled.div`
  font-size: 26px;
  font-wight: 600;
  color: #444;
`;

export const CenterDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const AccordionTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  font-size: 20px;
  font-weight: 600;
  background-color: #fff;
  margin: 10px 0px;
`;

export const TaskListHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 420px) {
    flex-direction: column;
    gap: 20px;
  }
`;

export const AccordionDescription = styled.div`
  background-color: #fff;
  padding: 10px 15px 30px 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;

export const AccordionIcons = styled.div`
  width: 20%;
  max-width: 150px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 25px;
  margin-right: 20px;
`;

export const AccordionDescriptionTxt = styled.div`
  width: 75%;
`;

export const AccordionTime = styled.span`
  position: absolute;
  bottom: 5px;
  right: 25px;
  font-size: 12px;
  color: #666;
`;

export const Badge = styled.div`
  padding: 6px;
  color: ${(props) => (props.complete ? "#28a745" : "#ffc107")};
  border: 1px solid ${(props) => (props.complete ? "#28a745" : "#ffc107")};
  border-radius: 5px;
  font-size: 12px;
  margin: 0px 15px;
  cursor: pointer;
`;
