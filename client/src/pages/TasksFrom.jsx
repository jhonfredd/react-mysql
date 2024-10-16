import { useState, useEffect } from 'react';
import { Form, Formik } from 'formik';
import { useTask } from "../context/TaskProvider.jsx"
import { useParams, useNavigate } from "react-router-dom"

const TasksFrom = () => {
    const { getTask, createTask, updateTask } = useTask()
    const params = useParams()
    const [task, setTask] = useState({
        title: "",
        description: ""
    })
    const navigate = useNavigate()

    useEffect(() => {
        const loadTask = async () => {
            if (params.id) {
                const response = await getTask(params.id)
                setTask({
                    title: response.title,
                    description: response.description
                })
            }
        }
        loadTask()
    }, [])

    return (
        <div>
            <Formik
                initialValues={task}
                enableReinitialize={true}
                onSubmit={async (values, actions) => {
                    if (params.id) {
                        await updateTask(params.id, values)
                    } else {
                        await createTask(values)
                    }
                    navigate("/")
                    actions.resetForm()
                }}
            >
                {({ handleChange, handleSubmit, values, isSubmitting }) => (
                    <Form onSubmit={handleSubmit} className="bg-slate-300 max-w-sm rounded-md p-4 mx-auto mt-10">
                        <h1 className="text-xl font-bold mb-2 uppercase text-center">{params.id ? "Editar Tarea" : "Crear Tarea"}</h1>
                        <div className="mt-3 text-center">
                            <label className="block">Titulo</label>
                            <input
                                type="text"
                                name="title"
                                placeholder="Titulo de la tarea"
                                onChange={handleChange}
                                value={values.title}
                                className="px-2 py-1 rounded-sm w-full"
                            ></input>
                        </div>
                        <div className="mt-3 text-center">
                            <label className="block">Descripcion</label>
                            <textarea
                                name="description"
                                row="3"
                                placeholder="Descripcion de la tarea"
                                onChange={handleChange}
                                value={values.description}
                                className="px-2 py-1 rounded-sm w-full"
                            ></textarea>
                        </div>
                        <div className="flex justify-center mt-3">
                            {params.id && (
                                <button type="submit" disabled={isSubmitting} className="block bg-blue-500 px-2 py-1 rounded-md text-white">
                                    {isSubmitting ? "Actualizando..." : "Actualizar"}
                                </button>
                            )}
                            {!params.id && (
                                <button type="submit" disabled={isSubmitting} className="block bg-green-500 px-2 py-1 rounded-md text-white">
                                    {isSubmitting ? "Guardando..." : "Guardar"}
                                </button>
                            )}
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default TasksFrom
