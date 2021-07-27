import React from 'react';
import TodoData from '../data-mgmt/todoData'
import TodoItem from './todoItem';
import './todo.css'

class Todo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            todos: [],
            todo: {label: ''},
            display: 'all'
        };
        this.todoChangeHandler = this.todoChangeHandler.bind(this);
        this.todoKeyDownHandler = this.todoKeyDownHandler.bind(this);
        this.save = this.save.bind(this);
        this.clearCompletedHandler = this.clearCompletedHandler.bind(this);
        this.allCompleteHandler = this.allCompleteHandler.bind(this);
    }
    componentDidMount() {
        this.getTodos();
    }
    // get the todos from the server
    getTodos() {
        TodoData.getTodos().then(response => {
            this.setState({todos: response.todos});
        }).catch(error => {
            this.setState({error})
        })
    }
    todoChangeHandler(evt) {
        let todo = Object.assign({}, this.state.todo);
        todo.label = evt.target.value;
        this.setState({todo});
    }
    todoKeyDownHandler(evt) {
        if (evt.key === "Enter" || evt.keyCode === 13) {
            evt.preventDefault();
            const {todo} = this.state;
            this.save(todo);
        }
    }
    save(todo) {
        if (todo.id) {
            // update
            TodoData.updateTodo(todo).then(response => {
                this.setState({todo: {label: ''}})
                this.getTodos();
            }).catch(error => {
                this.setState({error})
            })
        } else {
            // create
            TodoData.createTodo(todo.label).then(response => {
                this.setState({todo: {label: ''}});
                this.getTodos();
            }).catch(error => {
                this.setState({error})
            })
        }
    }
    selectItemHandler = (item) => {
        this.setState({todo: item});
    }
    onDeleteHandler = (todo) => {
        TodoData.deleteTodo(todo).then(response => {
            this.getTodos();
        }).catch(error => {
            this.setState({error})
        })
    }
    setDisplay = (display) => {
        this.setState({display});
    }
    clearCompletedHandler() {
        TodoData.deleteCompleted().then(response => {
            this.getTodos();
        }).catch(error => {
            this.setState({error})
        })
    }
    allCompleteHandler() {
        const {todos} = this.state;
        let compltedItems = todos.filter((t) => t.completed).length;

        //if (compltedItems === todos.length) {
            TodoData.updateAllTodos(!(compltedItems === todos.length)).then(response => {
                this.getTodos();
            }).catch(error => {
                this.setState({error})
            })
            // mark all items as incomplete
        //} else {
            // mark all items as complete
        //}
    }
    render() {
        const {error, todos, todo, display} = this.state;
        let todoList = todos.map((t) => {
            if ((display === 'active' && !t.completed) || (display === 'completed' && t.completed) || display === 'all') {
                return <TodoItem key={t.id} todo={t} onChange={this.save} onDelete={this.onDeleteHandler} />
            }
            return null;
        });
        let itemsLeft = todos.filter((t) => !t.completed).length;
        if (error) {
            return <div>An error has occurred, most likely a networking issue. 
                Check your network connection and try reloading the page [ {JSON.stringify(error)} ]</div>
        }
        return (
            <div className='todo-app'>
                <div className='todo-input'>
                    <div className='complete-all-button' onClick={this.allCompleteHandler}>^</div>
                    <input type='text' 
                        value={todo.label} 
                        onChange={this.todoChangeHandler} 
                        onKeyDown={this.todoKeyDownHandler} 
                        placeholder='What needs to be done?'
                        data-testid='todoInput' />
                </div>
                <div className='todo-list'>
                    <ul>
                        {todoList}
                    </ul>
                </div>
                <div className='todo-actions'>
                    <div className='info'>{`${itemsLeft} item${itemsLeft !== 1 ? 's' : ''} left`}</div>
                    <div className='todo-buttons'>
                        <button className={display === 'all' ? 'selected' : ''} onClick={() => this.setDisplay('all')}>All</button>
                        <button className={display === 'active' ? 'selected' : ''} onClick={() => this.setDisplay('active')}>Active</button>
                        <button className={display === 'completed' ? 'selected' : ''} onClick={() => this.setDisplay('completed')}>Completed</button>
                    </div>
                    <div className='clear-button'>
                        {itemsLeft !== todos.length &&
                            <button onClick={this.clearCompletedHandler}>Clear Completed</button>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default Todo;