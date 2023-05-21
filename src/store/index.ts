import {create } from "zustand"
import { Task } from '../components/Task/Task';
import { devtools } from "zustand/middleware";

export enum State {
    DONE = "DONE",
    ONGOING = "ONGOING",
    PLANNED = "PLANNED"
}

type Task = {
    title: string,
    state: State,
};

type Store = {
    tasks: Task[]
    draggedTask: string,
    addTask: (task: Task) => void,
    deleteTask: (title: string) => void,
    setDraggedTask: (title: string) => void
    moveTask: (task: Task) => void,
}

export const useStore = create<Store>()(
    devtools(
        set => ({
            tasks: [{ title: "TestTask", state: State.DONE }],
            draggedTask: '',
            addTask: (task: Task) => 
                set(
                    (store: Store) => ({ tasks: [...store.tasks, { ...task }]}), 
                    false,
                    "addTask"
                ),
            deleteTask: (title: string) => 
                set(
                    (store: Store) => ({ tasks: store.tasks.filter((task: Task) => task.title !== title )}),
                    false,
                    "deleteTask"
            ),
            setDraggedTask: ( title: string) => 
                set(
                    { draggedTask: title },
                    false,
                    "setDraggedTask"
                ),
            moveTask: (moveTask: Task) => 
                set(
                    (store: Store) => ({ tasks: store.tasks.map((task: Task) => task.title === moveTask.title ? {...moveTask} : task)}),
                    false,
                    "moveTask"
                )
        })
    ));