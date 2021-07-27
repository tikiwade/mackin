// require express
const express = require('express');
const bodyParser = require('body-parser');
const { json } = require('body-parser');
// create the express app and define the port
const app = express();
//Allow acces-control ‘cross origin support’
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});
// use the json body parser
app.use(bodyParser.json());
const port = 3004;
// define the todo array
let todoMap = new Map();
let todoIdCounter = 0;

// methods to manipulate the todo array
const insertTodo = (label) => {
    let id = (todoIdCounter++).toString();
    let todoData = {id: id, label: label, completed: false}
    todoMap.set(id, todoData)
    return todoData;
}
const updateTodo = (id, label, completed) => {
    // use == because todoId is a string and the actual id is a number
    let todoData = todoMap.get(id);
    // if we round a todo item
    if (todoData) {
        // create a new todo data object (could be wrapped in an async method)
        let updatedTodoData = {id: id, label: label, completed: completed};
        todoMap.set(id, updatedTodoData);
        return updatedTodoData;
    }
    return null;
}
const deleteTodo = (id) => {
    if (todoMap.has(id)) {
        // use splice to remove the todo data and add the new todo data
        todoMap.delete(id);
        return true;
    }
    return false;
}
// create the router
let router = express.Router();
// get the task list
router.get('/todos', (req, res) => {
    let todoArr = [];
    for (const item of todoMap.values()) {
        todoArr.push(item);
    }
    // be kind, sort
    res.json({todos: todoArr.sort((a, b) => {a.id>b.id?b:a.id<b.id?a:a})});
})
// add a task
router.post('/todo', (req, res) => {
    let jsonObj = req.body;
    let todoData = insertTodo(jsonObj.label);
    res.json({todo: todoData});
})
// update a single task
router.put('/todo/:id', (req, res) => {
    let id = req.params.id.toString()
    let jsonObj = {label: '', completed: false, ...req.body};
    let todoData =  updateTodo(id, jsonObj.label, jsonObj.completed);
    if (todoData) {
        res.json({todo: todoData});
    } else {
        res.status(404).send('Not found: todo ' + id);
    }
})
// update several tasks completed status
router.put('/todos', (req, res) => {
    let jsonObj = {completed: true, ...req.body};
    for (const item of todoMap.values()) {
        if (item.completed !== jsonObj.completed) {
            updateTodo(item.id, item.label, jsonObj.completed);
        }
    }
    res.json({success: true});
});
// delete a single task
router.delete('/todo/:id', (req, res) => {
    let success =  deleteTodo(req.params.id);
    if (success) {
        res.json({success: success});
    } else {
        res.status(404).send('Not found: todo ' + req.params.id);
    }
})
// delete all completed tasks
router.delete('/todos/completed', (req, res) => {
    let completed = [];
    for (const item of todoMap.values()) {
        if (item.completed) {
            completed.push(item.id);
        }
    }
    completed.forEach(id => {
        deleteTodo(id);
    });
    res.json({success: true});
})
// use the router
app.use('/', router);
// listen
app.listen(port, () => {
    console.log(`express server is listening at http://localhost:${port}`)
})
module.exports = app;