import  { Router }  from "express";
import { 
    getTasks,
    getTask,
    createTask,
    updateTask,
    deteleTask
 } from "../controllers/tasks.controller.js"

const router = Router();

router.get('/tasks',getTasks)

router.get('/tasks/:taskId',getTask)

router.post('/tasks',createTask)

router.put('/tasks/:taskUpdateId',updateTask)

router.delete('/tasks/:taskDeleteId',deteleTask)

export default router