import { useContext, useEffect, useState } from "react";
import GlobalContext from "../../context/GlobalContext";
import {
  Heading,
  TaskListHeader,
  TaskListContainer,
  CenterDiv,
} from "../../style-components";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { purple } from "@mui/material/colors";
import Accordion from "../Accordion";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Loading from "../Loading";
import { GetAllTask } from "../../context/GlobalAction";

const Todo = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const [sort, setSort] = useState("");
  const handleChange = (event) => {
    setSort(event.target.value);
  };

  useEffect(() => {
    GetAllTask(dispatch);
  }, [dispatch]);

  const innerTheme = createTheme({
    palette: {
      primary: {
        main: purple[400],
      },
    },
  });

  const todoFilter = state.todo.filter((val) => {
    if (sort === "completed") {
      return val.isCompleted;
    }
    if (sort === "pending") {
      return !val.isCompleted;
    }
    return val;
  });

  return (
    <>
      <TaskListHeader>
        <Heading>All Tasks</Heading>
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
              <MenuItem value={"completed"}>Completed</MenuItem>
              <MenuItem value={"pending"}>Pending</MenuItem>
            </Select>
          </FormControl>
        </ThemeProvider>
      </TaskListHeader>
      {state.isLoading && <Loading />}
      {!todoFilter?.length ? (
        <CenterDiv>
          <Heading>No Todo Found</Heading>
        </CenterDiv>
      ) : null}
      <TaskListContainer>
        {todoFilter?.length
          ? todoFilter.map((val, ind) => (
              <Accordion key={val.id} val={val} ind={ind} />
            ))
          : null}
      </TaskListContainer>
    </>
  );
};

export default Todo;
