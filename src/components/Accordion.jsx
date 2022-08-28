import Collapsible from "react-collapsible";
import dayjs from "dayjs";
import { IconContext } from "react-icons";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { BsCheck2Circle } from "react-icons/bs";
import {
  AccordionTitle,
  AccordionDescription,
  Badge,
  TaskListHeader,
  AccordionDescriptionTxt,
  AccordionTime,
  AccordionIcons,
} from "../style-components/DashboardLayout";
import Swal from "sweetalert2";
import { CompleteTask, DeleteTask } from "../context/GlobalAction";
import { useCallback, useContext, useState } from "react";
import GlobalContext from "../context/GlobalContext";
import EditTodoModal from "./EditTodoModal";

const Title = ({ ind, val, icon }) => (
  <AccordionTitle>
    {ind + 1}. {val.title}{" "}
    <TaskListHeader>
      <Badge complete={val.isCompleted ? true : false}>
        {val.isCompleted ? "completed" : "pending"}
      </Badge>{" "}
      {icon}
    </TaskListHeader>
  </AccordionTitle>
);

const Accordion = ({ val, ind }) => {
  const { dispatch } = useContext(GlobalContext);
  const [edit, setEdit] = useState(false);

  const handleComplete = (currentTodo) => {
    Swal.fire({
      title: "Do you want to complete the task?",
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const isUpdated = await CompleteTask(dispatch, currentTodo);
        if (isUpdated) {
          Swal.fire("Saved!", "", "success");
        }
      }
    });
  };

  const handleDelete = (currentTodo) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const idDeleted = await DeleteTask(dispatch, currentTodo);
        if (idDeleted) {
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        }
      }
    });
  };

  const handleOpen = useCallback((todo) => {
    setEdit({ isOpen: true, todo });
  }, []);

  const handleClose = useCallback(() => {
    setEdit({ isOpen: false, todo: {} });
  }, []);

  return (
    <>
      <Collapsible
        trigger={
          <Title
            ind={ind}
            val={val}
            icon={<span style={{ cursor: "pointer" }}>&#43;</span>}
          />
        }
        triggerWhenOpen={
          <Title
            ind={ind}
            val={val}
            icon={<span style={{ cursor: "pointer" }}>&#215;</span>}
          />
        }
      >
        <AccordionDescription>
          <AccordionDescriptionTxt>{val.description}</AccordionDescriptionTxt>
          <AccordionIcons>
            {!val.isCompleted && (
              <IconContext.Provider
                value={{ className: "complete-icon", size: 21 }}
              >
                <BsCheck2Circle onClick={() => handleComplete(val)} />
              </IconContext.Provider>
            )}
            {!val.isCompleted && (
              <IconContext.Provider
                value={{ className: "edit-icon", size: 21 }}
              >
                <FiEdit onClick={() => handleOpen(val)} />
              </IconContext.Provider>
            )}
            <IconContext.Provider
              value={{ className: "delete-icon", size: 23 }}
            >
              <AiOutlineDelete onClick={() => handleDelete(val)} />
            </IconContext.Provider>
          </AccordionIcons>
          <AccordionTime>
            {dayjs(val.time).format("DD/MM/YYYY hh:mm a")}
          </AccordionTime>
        </AccordionDescription>
      </Collapsible>
      {edit.isOpen && <EditTodoModal edit={edit} handleClose={handleClose} />}
    </>
  );
};

export default Accordion;
