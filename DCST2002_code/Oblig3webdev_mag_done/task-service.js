import pool from "./mysql-pool";

class TaskService {
    get(taskId) {
        return new Promise((resolve, reject) => {
            pool.query("SELECT * FROM mag_tasks WHERE id = ?", [taskId], (error, results) => {
                if (error) return reject(error);
                resolve(results);
            });
        });
    }

    getAll() {
        return new Promise((resolve, reject) => {
            pool.query("SELECT * FROM mag_tasks", (error, results) => {
                if (error) return reject(error);
                resolve(results);
            });
        });
    }

    create(task) {
        return new Promise((resolve, reject) => {
            pool.query("INSERT INTO mag_tasks SET ?", task, (error, results) => {
                if (error) return reject(error);
                resolve(results);
            });
        });
    }

    delete(taskId) {
        return new Promise((resolve, reject) => {
            pool.query("DELETE FROM mag_tasks WHERE id = ?", [taskId], (error, results) => {
                if (error) return reject(error);
                resolve(results);
            });
        });
    }
}

const taskService = new TaskService();
export default taskService;
