import { useContext, useState } from "react";
import GlobalContext from "../../context/GlobalContext";
import {
  Heading,
  TaskListHeader,
  CardsContainer,
  Card,
  CardTitle,
  CardNumber,
  TaskListContainer,
} from "../../style-components";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { purple } from "@mui/material/colors";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Loading from "../Loading";
import Accordion from "../Accordion";
import { GetAllTask } from "../../context/GlobalAction";

const Dashboard = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const [sort, setSort] = useState("");
  const handleChange = async (event) => {
    setSort(event.target.value);
    await GetAllTask(dispatch, event.target.value);
  };

  const innerTheme = createTheme({
    palette: {
      primary: {
        main: purple[400],
      },
    },
  });

  const CompleteTasks = state.todo.filter((val) => {
    return val.isCompleted;
  });

  const PendingTasks = state.todo.filter((val) => {
    return !val.isCompleted;
  });

  const HighlightTodo = state?.todo?.slice(0, 2);
  return (
    <>
      <TaskListHeader>
        <Heading>All Tasks Report</Heading>
        <ThemeProvider theme={innerTheme}>
          <FormControl
            sx={{ m: 1, minWidth: 130, marginRight: "20px" }}
            size="small"
          >
            <InputLabel id="sort-by">Sort by</InputLabel>
            <Select
              labelId="sort-by"
              id="sort-by"
              value={sort}
              label="Sort By"
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"7"}>Last 7 Days</MenuItem>
              <MenuItem value={"30"}>Last 30 Days</MenuItem>
            </Select>
          </FormControl>
        </ThemeProvider>
      </TaskListHeader>
      {state.isLoading && <Loading />}
      <CardsContainer>
        <Card>
          <CardTitle>All Tasks</CardTitle>
          <CardNumber>{state?.todo?.length}</CardNumber>
        </Card>
        <Card>
          <CardTitle>Complete Tasks</CardTitle>
          <CardNumber>{CompleteTasks?.length}</CardNumber>
        </Card>
        <Card>
          <CardTitle>Pending Tasks</CardTitle>
          <CardNumber>{PendingTasks?.length}</CardNumber>
        </Card>
      </CardsContainer>
      <Heading>Highlight Task</Heading>
      <TaskListContainer>
        {HighlightTodo.length
          ? HighlightTodo.map((val, ind) => {
              return <Accordion key={val.id} val={val} ind={ind} />;
            })
          : null}
      </TaskListContainer>
    </>
  );
};

export default Dashboard;
