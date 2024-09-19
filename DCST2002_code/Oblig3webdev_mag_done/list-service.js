import pool from "./mysql-pool";

class ListService {
    get(listId) { 
        return new Promise((resolve, reject) => {
            pool.query("SELECT * FROM mag_lists WHERE listid = ?", [listId], (error, results) => {
                if (error) return reject(error);
                resolve(results);
            });
        });
    }

    getAll() {
        return new Promise((resolve, reject) => {
            pool.query("SELECT * FROM mag_lists", (error, results) => {
                if (error) return reject(error);
                resolve(results);
            });
        });
    }

    create(list) {
        return new Promise((resolve, reject) => {
            pool.query("INSERT INTO mag_lists SET ?", list, (error, results) => {
                if (error) return reject(error);
                resolve(results);
            });
        });
    }

    delete(listId) { //This deletes the list and the associated tasks (has to be done in two ways to prevent SQL injection attacks)
        return new Promise((resolve, reject) => {
            pool.query("DELETE FROM mag_tasks WHERE listid = ?", [listId], (error, results) => {
                if (error) return reject(error);
                
                pool.query("DELETE FROM mag_lists WHERE listid = ?", [listId], (error, results) => {
                    if (error) return reject(error);
                    resolve(results);
                });
            });
        });
    }
    

    getAllTasks(listId) {
        return new Promise((resolve, reject) => {
            pool.query("SELECT title FROM mag_tasks WHERE listid=?", [listId], (error, results) => {
                if (error) return reject(error);
                resolve(results)
            })
        })
    }

    getTaskInList(listId, taskId) {
        return new Promise((resolve, reject) => {
            pool.query("SELECT * FROM mag_tasks WHERE listid=? AND id=? ", [listId, taskId], (error, results) => {
                if (error) return reject(error);
                resolve(results);
            });
        });
    }

}




const listService = new ListService();
export default listService;
