import React from 'react';

class TodoItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            label: null
        }
        this.completeItem = this.completeItem.bind(this);
        this.editLabelHandler = this.editLabelHandler.bind(this);
        this.labelChangeHandler = this.labelChangeHandler.bind(this);
        this.labelKeyDownHandler = this.labelKeyDownHandler.bind(this);
    }
    completeItem() {
        let todo = Object.assign({}, this.props.todo);
        todo.completed = !todo.completed;
        this.props.onChange(todo);
    }
    editLabelHandler() {
        if (this.props.todo.completed) {
            return;
        }
        this.setState({label: this.props.todo.label});
    }
    labelChangeHandler(evt) {
        this.setState({label: evt.target.value});
    }
    labelKeyDownHandler(evt) {
        if (evt.key === "Enter" || evt.keyCode === 13) {
            evt.preventDefault();
            let todo = Object.assign({}, this.props.todo);
            todo.label = this.state.label;
            this.props.onChange(todo);
            this.setState({label: null});
        }
    }
    render() {
        const {label} = this.state;
        const {todo} = this.props;

        return (
            <li className={todo.completed ? 'completed' : 'todo-item'}>
                <div data-testid='completeBtn' 
                    className='complete-button' 
                    onClick={this.completeItem} 
                    style={{backgroundColor:todo.completed ? 'gray' : 'white'}}></div>
                {label ?
                    <div className='label'>
                        <input type='text' 
                            value={label} 
                            onChange={this.labelChangeHandler}
                            onKeyDown={this.labelKeyDownHandler}  />
                    </div>
                : 
                    <div data-testid='editBtn' 
                        className='label' 
                        onDoubleClick={this.editLabelHandler}>{todo.label}</div>
                }
                <div className='remove-button' onClick={() => this.props.onDelete(todo)}>X</div>
            </li>
        )
    }
}

export default TodoItem;