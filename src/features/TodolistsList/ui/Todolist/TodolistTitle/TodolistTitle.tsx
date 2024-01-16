import React, { useCallback } from "react";
import { EditableSpan } from "../../../../../common/components";
import { IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { TodolistDomainType, todolistsThunks } from "../../../model/todolists/todolistsSlice";
import { useActions } from "../../../../../common/hooks";

type Props = {
  todolist: TodolistDomainType;
};

export const TodolistTitle = ({ todolist }: Props) => {
  const { title, entityStatus, id } = todolist;

  const { removeTodolist, changeTodolistTitle } = useActions(todolistsThunks);

  const removeTodolistHandler = () => {
    removeTodolist(id);
  };

  const changeTodolistTitleHandler = useCallback(function (title: string) {
    changeTodolistTitle({ id, title });
  }, []);

  return (
    <h3>
      <EditableSpan value={title} onChange={changeTodolistTitleHandler} />
      <IconButton onClick={removeTodolistHandler} disabled={entityStatus === "loading"}>
        <Delete />
      </IconButton>
    </h3>
  );
};
