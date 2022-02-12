import React from 'react';
import TodoListItem from './todo-list-item/todo-list-item';
import './todo-list.css';

const TodoList = ({ todos, onDeleted, onToggleImportant, onToggleDone }) => {

    const newTodoArray = [...todos];
    const elements = newTodoArray.reverse().map((item) => {
        const { id, ...itemProps } = item;
        return (
            <li key={id} className="list-group-item">
                <TodoListItem
                    id={id}
                    { ...itemProps }
                    onDeleted = {() => onDeleted(id)}
                    onToggleImportant = {() => onToggleImportant(id)}
                    onToggleDone = {() => onToggleDone(id)}
                />
            </li>
        );
    });

    return (
        <ul className="list-group todo-list">
            { elements }
        </ul>
    );
};

export default TodoList;
