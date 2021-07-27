const expect = require('chai').expect;
const request = require('supertest');

describe('unit testing the todo route', function() {
    app = null;
    before(() => {
        app = require('../app');
    })
    it('should return a list of todo items with no items', function() {
        return request(app)
            .get('/todos')
            .then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.todos.length).to.eq(0);
            })
    })

    it('should insert a todo item', function() {
        return request(app)
            .post('/todo')
            .send({label: 'Testing Todo Route'})
            .then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.todo.label).to.eq('Testing Todo Route');
            })
    })

    it('should return a list of todo items with 1 item', function() {
        return request(app)
            .get('/todos')
            .then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.todos.length).to.eq(1);
            })
    })
    it('should update an existing todo item', function() {
        return request(app)
            .put('/todo/0')
            .send({label: 'Updating Testing Todo Route', completed: false})
            .then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.todo.label).to.eq('Updating Testing Todo Route');
            })
    })

    it('should return a 404 when asked to update an invalid item id', function() {
        return request(app)
            .put('/todo/10')
            .send({label: 'Updating Testing Todo Route', completed: false})
            .then((response) => {
                expect(response.status).to.eq(404);
            })
    })

    it('should return a 404 when asked to delete an invalid item id', function() {
        return request(app)
            .delete('/todo/10')
            .then((response) => {
                expect(response.status).to.eq(404);
            })
    })

    it('should delete an existing todo item', function() {
        return request(app)
            .delete('/todo/0')
            .then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.success).to.be.true;
            })
    })

    it('should insert 3 todo item s', function() {
        request(app)
            .post('/todo')
            .send({label: 'Todo Item 1'})
            .then((response) => {
                expect(response.status, 200);
                expect(response.body.todo.label).to.eq('Todo Item 1');
                expect(response.body.todo.id).to.eq(1);
            })
        request(app)
            .post('/todo')
            .send({label: 'Todo Item 2'})
            .then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.todo.label).to.eq('Todo Item 2');
                expect(response.body.todo.id).to.eq(2);
            })
        request(app)
            .post('/todo')
            .send({label: 'Todo Item 3'})
            .then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.todo.label).to.eq('Todo Item 3');
                expect(response.body.todo.id).to.eq(3);
            })
    })

    it('should return a list of 3 todo items', function() {
        return request(app)
            .get('/todos')
            .then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.todos.length).to.eq(3);
                expect(response.body.todos[0].label).to.contain('Todo Item 1');
                expect(response.body.todos[1].label).to.contain('Todo Item 2');
                expect(response.body.todos[2].label).to.contain('Todo Item 3');
            })
    })

    it('should set all todo items to completed', function() {
        request(app)
            .put('/todos')
            .send({completed: true})
            .then(response => {
                expect(response.status).to.eq(200);
                expect(response.success).to.be.true
            });
    })

    it('should set all todo items to not completed', function() {
        request(app)
            .put('/todos')
            .send({completed: false})
            .then(response => {
                expect(response.status).to.eq(200);
                expect(response.success).to.be.true
            });
    })

    it('should update 2 todo items to be complete', function() {
        request(app)
            .put('/todo/1')
            .send({label: 'Todo Item 1', completed: true})
            .then((response) => {
                expect(response.status).to.eq(200);
            })
        request(app)
            .put('/todo/2')
            .send({label: 'Todo Item 2', completed: true})
            .then((response) => {
                expect(response.status).to.eq(200);
            })
    })

    it('should return a list of 3 todo items', function() {
        return request(app)
            .get('/todos')
            .then((response) => {
                expect(response.status, 200);
                expect(response.body.todos.length, 3);
                expect(response.body.todos[0].label).to.contain('Todo Item 1');
                expect(response.body.todos[0].completed).to.be.true;
                expect(response.body.todos[1].label).to.contain('Todo Item 2');
                expect(response.body.todos[1].completed).to.be.true;
                expect(response.body.todos[2].label).to.contain('Todo Item 3');
                expect(response.body.todos[1].completed).to.be.true;
            })
    })

    it('should delete completed todos', function() {
        request(app)
            .delete('/todos/completed')
            .then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.success).to.be.true;
            })
    })

    it('should return a list of 1 todo item', function() {
        return request(app)
            .get('/todos')
            .then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.todos.length).to.eq(1);
                expect(response.body.todos[0].label).to.contain('Todo Item 3');
            })
    })
})