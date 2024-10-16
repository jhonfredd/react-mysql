import { useContext, useState } from "react";
import { getTasksRequest, getTaskRequest, createTaskRequest, updateTaskRequest, deleteTaskRequest, changeStateTaskRequest } from '../api/TasksApi.js'
import { TaskContext } from "./TaskContext.jsx"

export const useTask = () => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error("useTasks must be used within a TasksContext")
    }
    return context
}

export const TaskContextProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);

    async function loadTasks() {
        const response = await getTasksRequest();
        setTasks(response.data);
    }

    const getTask = async (id) => {
        try {
            const response = await getTaskRequest(id)
            return response.data
        } catch (error) {
            console.error(error)
        }
    }

    const createTask = async (task) => {
        try {
            if (task.title != '') {
                const response = await createTaskRequest(task)
            } else {
                alert("por favor completar campos");
            }
        } catch (error) {
            console.error(error)
        }
    }

    const updateTask = async (id, newFields) => {
        try {
            if (newFields.title != '') {
                const response = await updateTaskRequest(id, newFields)
            } else {
                alert("por favor completar campos");
            }
        } catch (error) {
            console.error(error)
        }
    }

    const deleteTask = async (id) => {
        try {
            const response = await deleteTaskRequest(id);
            setTasks(tasks.filter(task => task.id !== id));
        } catch (error) {
            console.error(error);
        }
    }

    const changeState = async (id) => {
        try {
            const taskFound = tasks.find(task => task.id === id);

            await changeStateTaskRequest(id, taskFound.done === 0 ? true : false);

            setTasks( tasks.map((task) =>
                (task.id === id ? { ...task, done: task.done === 0 ? 1 : 0 } : task)
            ))
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <TaskContext.Provider value={{ tasks, loadTasks, getTask, createTask, updateTask, deleteTask, changeState }}>
            {children}
        </TaskContext.Provider>
    );
}