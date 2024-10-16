import { pool } from '../db.js'

export const getTasks = async(req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM tasks ORDER BY createdAt ASC')
    
        res.json(result)
    }catch(error) {
        return res.status(500).json({ message: error.message });
    }
}

export const getTask = async(req, res) => {
    try{
        const [result] = await pool.query('SELECT * FROM tasks WHERE id = ?',[req.params.taskId])
    
        if(result.length === 0) {
            return res.status(404).json({ message: "Task not found" });
        }
    
        res.json(result[0])
    }catch(error) {
        return res.status(500).json({ message: error.message });
    }
}

export const createTask = async(req, res) => {
    try{
        const { title, description } = req.body;
        const [result] = await pool.query('INSERT INTO tasks(title, description) values(?, ?)',[title, description])
        res.json({
            id: result.insertId,
            title,
            description
        })
    }catch(error) {
        return res.status(500).json({ message: error.message });
    }
}

export const updateTask = async(req, res) => {
    try {
        const [result] = await pool.query('UPDATE tasks SET ? WHERE id = ?',[ req.body, req.params.taskUpdateId])
    
        res.json(result)
    }catch(error) {
        return res.status(500).json({ message: error.message });
    }
}

export const deteleTask = async(req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM tasks WHERE id = ?',[req.params.taskDeleteId])
    
        if(result.affectedRows === 0) {
            return res.status(404).json({ message: "Task not found" });
        }
        
        res.send("Tarea eliminada")
    }catch(error) {
        return res.status(500).json({ message: error.message });
    }
}