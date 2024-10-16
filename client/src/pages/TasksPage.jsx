import { useEffect } from "react"
import TaskCard from '../components/TaskCard.jsx'
import { useTask } from "../context/TaskProvider.jsx"

const TasksPage = () => {

    const { tasks, loadTasks } = useTask();

    useEffect(() => {
        loadTasks()
    }, [])

    function renderMain() {
        if (tasks.length === 0) return <h1>No hay tareas aun</h1>

        return tasks.map((task) => <TaskCard task={task} key={task.id} />)
    }

    return (
        <div>
            <h1 className="text-5xl text-white font-bold text-center">Tareas</h1>
            <div className="grid grid-cols-3 gap-2">
                {renderMain()}
            </div>
        </div>
    )
}

export default TasksPage
