import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import Todo from './todo'

const flushPromises = () => new Promise(setImmediate);

describe('render tests', () => {
    beforeEach(() => {
        fetch.resetMocks();
        fetch.once(JSON.stringify({todos: [] }))
    });

    it('it renders the todo app', async () => {
        const spy1 = jest.spyOn(Todo.prototype, 'componentDidMount');
        render(<Todo />);
        await flushPromises();
        expect(spy1).toHaveBeenCalled();
        spy1.mockRestore();

        expect(screen.getByText('0 items left')).toBeInTheDocument();
    });
});

describe('input tests', () => {
    beforeEach(() => {
        fetch.resetMocks();
        fetch.once(JSON.stringify({todos: [] }))
    });

    it('it calls onchange and keydown events on the input', async () => {
        let spy1 = jest.spyOn(Todo.prototype, 'todoChangeHandler').mockImplementation(() => {});
        let spy2 = jest.spyOn(Todo.prototype, 'todoKeyDownHandler').mockImplementation(() => {});
        const {container} = render(<Todo />);

        expect(screen.getByText('0 items left')).toBeInTheDocument();
        // the todo input
        let todoInput = screen.getByTestId('todoInput');
        // verify the onchage handler is called when a new value is types in
        userEvent.type(todoInput, 'New task')
        expect(spy1).toHaveBeenCalledTimes(8);
        spy1.mockRestore();

        // verify the key down handler is called
        fireEvent.keyDown(todoInput, {key: 'Enter', keyCode: 13});
        expect(spy2).toHaveBeenCalledTimes(9);
        spy2.mockRestore();
    });

    it('it calls save when the user types enter', async () => {
        let spy1 = jest.spyOn(Todo.prototype, 'todoChangeHandler')
        let spy2 = jest.spyOn(Todo.prototype, 'todoKeyDownHandler')
        let spy3 = jest.spyOn(Todo.prototype, 'save').mockImplementation(() => {});
        
        const {container} = render(<Todo />);

        expect(screen.getByText('0 items left')).toBeInTheDocument();
        // the todo input
        let todoInput = screen.getByTestId('todoInput');
        // verify the onchage handler is called when a new value is types in
        fireEvent.change(todoInput, {target:{value:'New task'}})
        expect(spy1).toHaveBeenCalledTimes(1);
        spy1.mockRestore();

        expect(todoInput.value).toBe('New task')
        // verify the key down handler is called
        fireEvent.keyDown(todoInput, {key: 'Enter', keyCode: 13});
        expect(spy2).toHaveBeenCalledTimes(1);
        spy2.mockRestore();

        expect(spy3).toHaveBeenCalledTimes(1);
        spy3.mockRestore();
    });
});

describe('list tests', () => {
    let todos = [
        {id: 0, label: 'Task 1', completed: false},
        {id: 1, label: 'Task 2', completed: false},
        {id: 2, label: 'Task 3', completed: false}
    ]
    beforeEach(() => {
        fetch.resetMocks();
    });
    it('renders the app with 3 item', async () => {
        fetch.once(JSON.stringify({todos: todos }))
        const spy1 = jest.spyOn(Todo.prototype, 'componentDidMount');
        render(<Todo />);
        await flushPromises();
        expect(spy1).toHaveBeenCalled();
        spy1.mockRestore();

        expect(screen.getByText('3 items left')).toBeInTheDocument();
    })

    it('renders the app with 2 items that are not completed and one that is', async () => {
        todos[2].completed = true;
        fetch.once(JSON.stringify({todos: todos }))
        const spy1 = jest.spyOn(Todo.prototype, 'componentDidMount');
        render(<Todo />);
        await flushPromises();
        expect(spy1).toHaveBeenCalled();
        spy1.mockRestore();

        expect(screen.getByText('2 items left')).toBeInTheDocument();
        expect(screen.getByText('Task 3')).toBeInTheDocument();
    })
});

describe('action buttons test', () => {
    let todos = [
        {id: 0, label: 'Task 1', completed: false},
        {id: 1, label: 'Task 2', completed: false},
        {id: 2, label: 'Task 3', completed: true}
    ]
    beforeEach(() => {
        fetch.resetMocks();
        fetch.once(JSON.stringify({todos: todos }))
    });
    it('renders the app with all items', async () => {
        fetch.once(JSON.stringify({todos: todos }))
        const spy1 = jest.spyOn(Todo.prototype, 'componentDidMount');
        render(<Todo />);
        await flushPromises();
        expect(spy1).toHaveBeenCalled();
        spy1.mockRestore();

        expect(screen.getByText('Task 1')).toBeInTheDocument();
        expect(screen.getByText('Task 2')).toBeInTheDocument();
        expect(screen.getByText('Task 3')).toBeInTheDocument();

        expect(screen.getByText('All').classList.contains('selected')).toBe(true);
    })
    it('renders the app with only active items', async () => {
        fetch.once(JSON.stringify({todos: todos }))
        const spy1 = jest.spyOn(Todo.prototype, 'componentDidMount');
        render(<Todo />);
        await flushPromises();
        expect(spy1).toHaveBeenCalled();
        spy1.mockRestore();

        expect(screen.getByText('Task 1')).toBeInTheDocument();
        expect(screen.getByText('Task 2')).toBeInTheDocument();
        expect(screen.getByText('Task 3')).toBeInTheDocument();

        expect(screen.getByText('All').classList.contains('selected')).toBe(true);
        expect(screen.getByText('Active').classList.contains('selected')).toBe(false);

        fireEvent.click(screen.getByText('Active'));

        expect(screen.getByText('Task 1')).toBeInTheDocument();
        expect(screen.getByText('Task 2')).toBeInTheDocument();
        expect(screen.queryByText('Task 3')).not.toBeInTheDocument();

        expect(screen.getByText('All').classList.contains('selected')).toBe(false);
        expect(screen.getByText('Active').classList.contains('selected')).toBe(true);
        expect(screen.getByText('Completed').classList.contains('selected')).toBe(false);
    })

    it('renders the app with only completed items', async () => {
        fetch.once(JSON.stringify({todos: todos }))
        const spy1 = jest.spyOn(Todo.prototype, 'componentDidMount');
        render(<Todo />);
        await flushPromises();
        expect(spy1).toHaveBeenCalled();
        spy1.mockRestore();

        expect(screen.getByText('Task 1')).toBeInTheDocument();
        expect(screen.getByText('Task 2')).toBeInTheDocument();
        expect(screen.getByText('Task 3')).toBeInTheDocument();

        expect(screen.getByText('All').classList.contains('selected')).toBe(true);
        expect(screen.getByText('Completed').classList.contains('selected')).toBe(false);

        fireEvent.click(screen.getByText('Completed'));

        expect(screen.queryByText('Task 1')).not.toBeInTheDocument();
        expect(screen.queryByText('Task 2')).not.toBeInTheDocument();
        expect(screen.getByText('Task 3')).toBeInTheDocument();

        expect(screen.getByText('All').classList.contains('selected')).toBe(false);
        expect(screen.getByText('Active').classList.contains('selected')).toBe(false);
        expect(screen.getByText('Completed').classList.contains('selected')).toBe(true);
    })

    it('calls the clear button handler', async () => {
        fetch.once(JSON.stringify({todos: todos }))
        const spy1 = jest.spyOn(Todo.prototype, 'componentDidMount');
        const spy2 = jest.spyOn(Todo.prototype, 'clearCompletedHandler').mockImplementation(() => {});
        render(<Todo />);
        await flushPromises();
        expect(spy1).toHaveBeenCalled();
        spy1.mockRestore();

        let clearBtn = screen.getByText('Clear Completed');
        expect(clearBtn).toBeInTheDocument();

        fireEvent.click(clearBtn);
        expect(spy2).toHaveBeenCalled();
        spy2.mockRestore();
    })
});

