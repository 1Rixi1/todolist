import React, { memo, useCallback, useEffect } from "react";
import { TodolistDomainType } from "features/TodolistsList/model/todolists/todolistsSlice";
import { tasksThunks } from "features/TodolistsList/model/tasks/tasksSlice";
import { useActions } from "common/hooks";
import { AddItemForm } from "common/components";
import { TaskType } from "../../api/tasks/tasksApi.types";
import { FilterTasksButtons } from "./FilterTasksButtons/FilterTasksButtons";
import Tasks from "./Tasks/Tasks";
import { TodolistTitle } from "./TodolistTitle/TodolistTitle";

type PropsType = {
  todolist: TodolistDomainType;
  tasks: TaskType[];
};

export const Todolist = memo((props: PropsType) => {
  const { fetchTasks, addTask } = useActions(tasksThunks);

  useEffect(() => {
    fetchTasks(props.todolist.id);
  }, []);

  const addTaskCallback = useCallback(
    function (title: string) {
      return addTask({ title, todolistId: props.todolist.id }).unwrap();
    },
    [props.todolist.id],
  );

  return (
    <div>
      <TodolistTitle todolist={props.todolist} />
      <AddItemForm addItem={addTaskCallback} disabled={props.todolist.entityStatus === "loading"} />
      <Tasks todolist={props.todolist} tasks={props.tasks} />
      <div style={{ paddingTop: "10px" }}>
        <FilterTasksButtons todolist={props.todolist} />
      </div>
    </div>
  );
});
