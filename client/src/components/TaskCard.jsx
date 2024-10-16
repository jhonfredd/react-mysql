import { useTask } from "../context/TaskProvider.jsx"
import { useNavigate } from "react-router-dom"

const TaskCard = ({ task }) => {

    const { deleteTask, changeState } = useTask()
    const navigate = useNavigate()

    const handleChangeState = async () => {
        await changeState(task.id)
    }

    return (
        <div className="bg-zinc-700 text-white rounded-md p-4 mt-3">
            <header className="flex justify-between">
                <h2 className="text-sm fond-bold">{task.title}</h2>
                <span>{task.done === 1 ? "✅" : "❌"}</span>
            </header>
            <p className="text-xs">{task.description}</p>
            <span>{task.createdAt}</span>
            <div className="text-center mt-2">
                <button className="bg-blue-500 px-2 py-1 rounded-md text-white mr-2" onClick={() => navigate(`/edit/${task.id}`)}>Editar</button>
                <button className="bg-red-500 px-2 py-1 rounded-md text-white mr-2" onClick={() => deleteTask(task.id)}>Eliminar</button>
                <button className="bg-green-500 px-2 py-1 rounded-md text-white" onClick={() => handleChangeState()}>Cambiar Estado</button>
            </div>
        </div>
    )
}

export default TaskCard
