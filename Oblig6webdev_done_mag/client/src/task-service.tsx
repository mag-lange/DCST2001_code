import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000/api/v2';

export type Task = {
  id: number;
  title: string;
  done: boolean;
  description: string;
};

class TaskService {
  /**
   * Get task with given id.
   */
  get(id: number) {
    return axios.get<Task>('/tasks/' + id).then((response) => response.data);
  }

  /**
   * Get all tasks.
   */
  getAll() {
    return axios.get<Task[]>('/tasks').then((response) => response.data);
  }

  /**
   * Create new task having the given title.
   *
   * Resolves the newly created task id.
   */
  create(title: string, description: string, done: boolean) {
    return axios
      .post<{ id: number }>('/tasks', { title: title, description: description, done: done })
      .then((response) => response.data.id);
  }

  delete(id: number) {
    return axios.delete<{ id: number }>('/tasks/' + id);
  }

  update(id: number, title: string, description: string, done: boolean) {
    return axios
      .put<void>("/tasks/" + id, { id: id, title: title, description: description, done: done })
      .then((response) => response.data);
  }
  
}

const taskService = new TaskService();
export default taskService;
