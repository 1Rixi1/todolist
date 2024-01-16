import React, { useCallback } from "react";
import { Button } from "@mui/material";
import { FilterValuesType, TodolistDomainType, todolistsActions } from "../../../model/todolists/todolistsSlice";
import { useActions } from "../../../../../common/hooks";

type Props = {
  todolist: TodolistDomainType;
};

export const FilterTasksButtons = ({ todolist }: Props) => {
  const { filter, id } = todolist;

  const { changeTodolistFilter } = useActions(todolistsActions);

  const changeFilterHandler = (filter: FilterValuesType) => {
    changeTodolistFilter({ id, filter });
  };

  return (
    <>
      <Button
        variant={filter === "all" ? "outlined" : "text"}
        onClick={() => changeFilterHandler("all")}
        color={"inherit"}
      >
        All
      </Button>
      <Button
        variant={filter === "active" ? "outlined" : "text"}
        onClick={() => changeFilterHandler("active")}
        color={"primary"}
      >
        Active
      </Button>
      <Button
        variant={filter === "completed" ? "outlined" : "text"}
        onClick={() => changeFilterHandler("completed")}
        color={"secondary"}
      >
        Completed
      </Button>
    </>
  );
};
