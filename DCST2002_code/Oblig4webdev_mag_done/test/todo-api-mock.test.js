import axios from "axios";
import todoApi from "../todo-api";
import taskService from "../task-service";
import { response } from "express";

axios.defaults.baseURL = "http://localhost:3001";

jest.mock("../task-service");

const testData = [
    { id: 1, title: "Les leksjon", done: 1 },
    { id: 2, title: "Møt opp på forelesning", done: 0 },
    { id: 3, title: "Gjør øving", done: 0 },
];

let webServer;
beforeAll(() => webServer = todoApi.listen(3001));
afterAll(() => webServer.close());

describe("Fetch tasks (GET)", () => {
    test("Fetch all tasks (200 OK)", async () => {
        taskService.getAll = jest.fn(() => Promise.resolve(testData));
        const response = await axios.get("/api/v1/tasks");
        expect(response.status).toEqual(200);
        expect(response.data).toEqual(testData);
    });

    test("Fetch task (200 OK)", async () => {
        taskService.get = jest.fn(() => Promise.resolve(testData.find(task => task.id = 1)));
        const response = await axios.get("/api/v1/tasks/1");
        expect(response.status).toEqual(200);
        expect(response.data).toEqual(testData[0]);
    });

    test("Fetch all tasks (500 Internal Server Error)", async () => { 
        taskService.getAll = jest.fn(() => Promise.reject({
            response: { status: 500 }, 
            message: "Request failed with status code 500"   // This is the error that we are seeing
        }));
    
        try {
            await axios.get("/api/v1/tasks");
        } catch (error) {
            expect(error.response.status).toEqual(500);
            expect(error.message).toEqual("Request failed with status code 500");
        }
    });

    test("Fetch task (404 Not Found)", async () => {
        taskService.get = jest.fn(() => Promise.resolve([])); //If we make an empty task, it should not be found
        expect.assertions(1);
        try {
            const response = await axios.get("/api/v1/tasks/999"); // Task 999 will probably never exist:), this also returns 404 not found in postman
        } catch (error) {
            expect(error.response.status).toEqual(404);
        }
    });

    test("Fetch task (500 Internal Server error)", async () => {
        taskService.get = jest.fn(() => Promise.reject({
            response: { status: 500, message: "Internal Server Error" }
        }));
    
        try {
            await axios.get("/api/v1/tasks/1");
        } catch (error) {
            expect(error.response.status).toEqual(500);
            expect(error.response.message).toEqual(undefined);
        }
    });
});

describe("Create new task (POST)", () => {
    test("Create new task (201 Created)", async () => { 
        taskService.create = jest.fn(() => Promise.resolve()); //Since this is jest, the task is not posted anywhere
        const response = await axios.post("/api/v1/tasks", {"id": 100, "title": "test_task", "listid": 3, "done": 1})

        expect(response.status).toEqual(201)
    });

    test("Create new task (400 Bad Request)", async () => { //Creating a task that does not fit the requirement (no title, should set of the data integrity rules and create bas request
        taskService.create = jest.fn(() => Promise.resolve()); //Since this is jest, the task is not posted anywhere
        expect.assertions(1)
        try {
            const response = await axios.post("/api/v1/tasks", {"id": 100, "done": 1}) //no title gives an error message (400) when run on postman
        }
        catch (error) {
            expect(error.response.status).toEqual(400);
        }

        
    });

    test("Create new task (500 Internal Server error)", async () => { //internal server error is created when 
        taskService.create = jest.fn(() => Promise.reject())

        expect.assertions(1) //Forcing the create to fail and seeing what error status code is received (500)
        try {
            const response = await axios.post("/api/v1/tasks", {"id": 500, "title": "test_task", "listid": 1, "done": 0}) 
        }
        catch (error) {
            expect(error.response.status).toEqual(500);
        }

    });
});

describe("Delete task (DELETE)", () => {
    test("Delete task (200 OK)", async () => {
        taskService.delete = jest.fn(() => Promise.resolve())

        const response = await axios.delete("/api/v1/tasks/1") //jest is here deleting task 1
        expect(response.status).toEqual(200)
    });
});
