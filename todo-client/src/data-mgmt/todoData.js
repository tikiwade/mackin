const server = 'http://localhost:3004'

class TodoData {
    static getTodos() {
        return fetch(server + '/todos', {
            method: "GET"
        })
        .then(res => res.json())
    }
    static createTodo(label) {
        let body = {label: label};
        return fetch(server + '/todo', {
            method: "POST",
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(body)
        })
        .then(res => res.json())
    }
    static updateTodo(todo) {
        let f = fetch(server + '/todo/' + todo.id, {
            method: "PUT",
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(todo)
        })
        .then(res => res.json())
        return f;
    }
    static updateAllTodos(completed) {
        let f = fetch(server + '/todos', {
            method: "PUT",
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({completed: completed})
        })
        .then(res => res.json())
        return f;
    }
    static deleteTodo(todo) {
        let f = fetch(server + '/todo/' + todo.id, {
            method: "DELETE"
        })
        .then(res => res.json())
        return f;
    }
    static deleteCompleted() {
        let f = fetch(server + '/todos/completed', {
            method: "DELETE"
        })
        .then(res => res.json())
        return f;
    }
}

export default TodoData;