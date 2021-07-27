import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react';
import TodoItem from './todoItem'

const todo = {id: 0, label: 'Item 1', completed: false}
let changeHandler = jest.fn()
let deleteHandler = jest.fn()

beforeEach(() => {
    changeHandler.mockRestore();
    deleteHandler.mockRestore();
});

it('renders', () => {
    let todo = {id: 0, label: 'Item 1', completed: false}
    render(<TodoItem todo={todo} onChange={changeHandler} onDelete={deleteHandler} />)

    expect(screen.getByText('Item 1')).toBeInTheDocument();
})

it('renders compeleted', () => {
    let todo = {id: 0, label: 'Item 1', completed: true}
    render(<TodoItem todo={todo} onChange={changeHandler} onDelete={deleteHandler} />)

    expect(screen.getByText('Item 1')).toBeInTheDocument();

    let completeBtn = screen.getByTestId('completeBtn');
    expect(completeBtn.style.backgroundColor).toBe('gray');
});

it('calls the change handler when item is marked as complete', () => {
    let todo = {id: 0, label: 'Item 1', completed: false}
    render(<TodoItem todo={todo} onChange={changeHandler} onDelete={deleteHandler} />)

    expect(screen.getByText('Item 1')).toBeInTheDocument();

    let completeBtn = screen.getByTestId('completeBtn');
    expect(completeBtn.style.backgroundColor).toBe('white');
    fireEvent.click(completeBtn);
    expect(changeHandler).toHaveBeenCalledTimes(1);
});

it('calls the delete handler when item is deleted', () => {
    let todo = {id: 0, label: 'Item 1', completed: false}
    render(<TodoItem todo={todo} onChange={changeHandler} onDelete={deleteHandler} />)

    expect(screen.getByText('Item 1')).toBeInTheDocument();

    let deleteBtn = screen.getByText('X');
    fireEvent.click(deleteBtn);
    expect(deleteHandler).toHaveBeenCalledTimes(1);
});

it('becomes editable when the label is double clicked', () => {
    let todo = {id: 0, label: 'Item 1', completed: false}
    render(<TodoItem todo={todo} onChange={changeHandler} onDelete={deleteHandler} />)

    expect(screen.getByText('Item 1')).toBeInTheDocument();

    let editBtn = screen.getByText('Item 1');
    fireEvent.doubleClick(editBtn);

    let input = screen.getByDisplayValue('Item 1');
    expect(input).not.toBeNull()
    expect(input.value).toBe('Item 1');
});

it('can change the label', () => {
    let todo = {id: 0, label: 'Item 1', completed: false}
    let spy1 = jest.spyOn(TodoItem.prototype, 'labelChangeHandler');
    let spy2 = jest.spyOn(TodoItem.prototype, 'labelKeyDownHandler');
    render(<TodoItem todo={todo} onChange={changeHandler} onDelete={deleteHandler} />)

    expect(screen.getByText('Item 1')).toBeInTheDocument();

    let editBtn = screen.getByText('Item 1');
    fireEvent.doubleClick(editBtn);

    let input = screen.getByDisplayValue('Item 1');
    expect(input).not.toBeNull()
    expect(input.value).toBe('Item 1');

    fireEvent.change(input, {target:{value:'Modified task'}})
    expect(spy1).toHaveBeenCalledTimes(1);
    spy1.mockRestore();

    expect(input.value).toBe('Modified task');
    // verify the key down handler is called
    fireEvent.keyDown(input, {key: 'Enter', keyCode: 13});
    expect(spy2).toHaveBeenCalledTimes(1);
    spy2.mockRestore();

    expect(changeHandler).toHaveBeenCalledTimes(1);
});
