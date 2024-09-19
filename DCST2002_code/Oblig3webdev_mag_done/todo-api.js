import express from "express";
import taskService from "./task-service";
import listService from "./list-service";

const app = express();

app.use(express.json());

app.get("/api/v1/tasks", (request, response) => {
    taskService
        .getAll()
        .then((rows) => response.json(rows))
        .catch((error) => response.status(500).send(error));
});

app.get("/api/v1/tasks/:id", (request, response) => {
    const id = request.params.id;
    taskService
        .get(id)
        .then((row) => {
            if (row.length === 0) {
                response.status(404).send(`Task with id ${id} not found.`);
            } else {
                response.json(row);
            }
        })
        .catch((error) => response.status(500).send(error));
});

app.post("/api/v1/tasks", (request, response) => {
    const task = request.body;
    if (!task.hasOwnProperty("id") || !task.hasOwnProperty("title") || !task.hasOwnProperty("listid") || !task.hasOwnProperty("done")) {
        response.status(400).send("A task needs the following properties: id, title, listid and done.");
    } else {
        taskService
            .create(task)
            .then((result) => {
                response.status(201);
                response.location("tasks/" + task.id);
                response.send();
            })
            .catch((error) => response.status(500).send(error));
    }
});

app.delete("/api/v1/tasks/:id", (request, response) => {
    const id = request.params.id;

    taskService
        .delete(id)
        .then((result) => response.status(200).send())
        .catch((error) => response.status(500).send(error));
});

//List operations for the app (imported from list-service.js)


















app.get("/api/v1/lists", (request, response) => { //GET all lists
    listService
        .getAll()
        .then((rows) => response.json(rows))
        .catch((error) => response.status(500).send(error));
});

app.get("/api/v1/lists/:listid", (request, response) => { //GET a list with list-id
    const listid = request.params.listid;
    listService
        .get(listid)
        .then((row) => {
            if (row.length === 0) {
                response.status(404).send(`List with id ${listid} not found.`);
            } else {
                response.json(row);
            }
        })
        .catch((error) => response.status(500).send(error));
});

app.post("/api/v1/lists", (request, response) => { //POST a new list (with error checs)
    const list = request.body;
    if (!list.hasOwnProperty("listid") || !list.hasOwnProperty("listtitle") || !list.hasOwnProperty("completed")) {
        response.status(400).send("A list needs the following properties: listid, listtitle and completed.");

        //Here implement another check to see if the ID is already used and return an error if that is the case (if time)

    } else {
        listService
            .create(list)
            .then((result) => {
                response.status(201);
                response.location("lists/" + list.listid);
                response.send();
            })
            .catch((error) => response.status(500).send(error));
    }
});

app.delete("/api/v1/lists/:listid", (request, response) => { //DELETE a list with the tasks as well 
    const listid = request.params.listid;
    listService
        .delete(listid)
        .then((result) => response.status(200).send())
        .catch((error) => response.status(500).send(error));
});

app.get("/api/v1/lists/:listid/tasks", (request, response) => { //Get all tasks associated with a certain list
    const listid = request.params.listid;
    listService
        .getAllTasks(listid)
        .then((row) => {
            if (row.length === 0) {
                response.status(404).send(`List with listid ${listid} not found.`);
            } else {
                response.json(row);
            }
        })
        .catch((error) => response.status(500).send(error));
});

app.get("/api/v1/lists/:listid/tasks/:id", (request, response) => { //Get a certain task associated with a certain list, this can be tested by using listid 3 with id 5
    const listid = request.params.listid;
    const taskid = request.params.id
    listService
        .getTaskInList(listid, taskid)
        .then((row) => {
            if (row.length === 0) {
                response.status(404).send(`The task with id ${taskid} is not in list ${listid}`);
            } else {
                response.json(row);
            }
        })
        .catch((error) => response.status(500).send(error));
});


app.post("/api/v1/lists/:listid/tasks", (request, response) => { //POST a task within a specified task, here I am not writing any new methods

    //This can be tested with the following JSON: 
    /*
        {
  "id": 10,
  "title": "Finish oving",
  "done": false
}
    */
    const task = request.body; 
    const listid = request.params.listid;
    
    if (!task.hasOwnProperty("id") || !task.hasOwnProperty("title") || !task.hasOwnProperty("done") || task.hasOwnProperty("listid")) { //The last one means that a user cannot pass JSON with too much information
        response.status(400).send("Please only provide id and title and if it is done or not. Do not include a listid ");

        //Here implement another check to see if the ID is already used and return an error if that is the case (if time)

    } else {
        task.listid = listid
        taskService
            .create(task)
            .then((result) => {
                response.status(201);
                response.location("tasks/" + task.id);
                response.send();
            })
            .catch((error) => response.status(500).send(error));
    }
});


//Delete a task in list (stolen from task-service)
app.delete("/api/v1/lists/:listid/tasks/:taskId", (request, response) => {
    const id = request.params.taskId;

    taskService
        .delete(id)
        .then((result) => response.status(200).send())
        .catch((error) => response.status(500).send(error));
});







export default app;
