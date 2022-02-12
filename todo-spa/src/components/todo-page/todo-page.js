import React, { Component } from 'react';
import './todo-page.css';
import Header from './header/header';
import SearchPanel from "./search-panel/search-panel";
import ItemStatusFilter from "./item-status-filter/item-status-filter";
import TodoList from "./todo-list/todo-list";
import ItemAddForm from "./item-add-form/item-add-form";
import Loading from "./loading/loading";
import Pagination from "./pagination/pagination";

export default class TodoPage extends Component {
    constructor() {
        super();
        this.state = {
            isLoading: true,
            unknownError: null,
            serverErrorMessage: null,

            todoPages: null,
            page: 1,
            pageLimit: 10,

            todoData: [],
            term: '',
            filter: 'all',
        }
    }

    todoID = 1;
    addedTodoID = 1000;

    componentDidMount = async () => {
        const { pageLimit } =this.state;

        await fetch(`https://jsonplaceholder.typicode.com/todos`)
            .then(res => res.json())
            .then(json => this.setState({
                todoPages: Math.ceil(json.length/pageLimit),
            }))
            .catch((error) => {
                console.log(`Error happened. ${error}`);
                this.setState({
                    serverErrorMessage: `Server is not available now.`,
                })
            });

        this.fetchTodoData();
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.page !== this.state.page) {
            this.fetchTodoData();
        }
    }

    componentDidCatch(error, errorInfo) {
        console.log(`Error happened. ${error}`);
        this.setState({ unknownError: 'Sorry, we have some problems with site' })
    }

    fetchTodoData = async () => {
        const { page, pageLimit } =this.state;
        await fetch(`https://jsonplaceholder.typicode.com/todos?_page=${page}&_limit=${pageLimit}`)
            .then( res => res.json())
            .then( json => {
                let array = [];
                json.forEach((item) => {
                    array.push({
                        label: item.title,
                        important: false,
                        done: !!item.completed,
                        id: this.todoID++
                    })
                });
                this.setState({
                    todoData: array,
                    isLoading: false
                })
            })
            .catch((error) => {
                console.log(`Error happened. ${error}`);
                this.setState({
                    serverErrorMessage: `Server is not available now.`,
                    isLoading: false,
                })
            });
    };

    createTodoItem = (label) => {
        return {
            label,
            important: false,
            done: false,
            id: this.addedTodoID++
        }
    };

    deleteItem = (id) => {
        this.setState(({ todoData }) => {
            const idx = todoData.findIndex((el) => el.id === id);

            const newArray = [
                ...todoData.slice( 0, idx ),
                ...todoData.slice( idx + 1 )
            ];
            return {
                todoData: newArray,
            }
        })
    };

    addItem = (text) => {
        const newItem = this.createTodoItem(text);

        this.setState(({ todoData }) => {
            const newArr = [
                ...todoData,
                newItem,
            ];
            return {
                todoData: newArr,
            }
        })
    };

    toggleProperty = (arr, id, propName) => {
        const idx = arr.findIndex((el) => el.id === id);

        const oldItem = arr[idx];
        const newItem = {...oldItem, [propName]: !oldItem[propName]};

        return [
            ...arr.slice(0, idx),
            newItem,
            ...arr.slice(idx + 1)
        ];
    };

    onToggleDone = (id) => {
        this.setState(({ todoData }) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'done')
            }
        })
    };

    onToggleImportant = (id) => {
        this.setState(({ todoData }) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'important')
            }
        })
    };

    onSearchChange = (term) => {
        this.setState({ term })
    };

    search = (items, term) => {
        if (items.length === 0) {
            return items
        }
        return items.filter((item) => {
            return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
        })
    };

    onFilterChange = (filter) => {
        this.setState({ filter })
    };

    filter = (items, filter) => {
        switch (filter) {
            case 'all':
                return items;
            case 'active':
                return items.filter((item) => !item.done);
            case 'done':
                return items.filter((item) => item.done);
            default:
                return items;
        }
    };

    onPageSelect = ( page ) => {
        this.setState({ page: page })
    };

    render() {
        const { isLoading,
            unknownError,
            serverErrorMessage,
            todoData,
            todoPages,
            page,
            term,
            filter } = this.state;
        const visibleItems = this.filter(this.search(todoData, term), filter);
        const doneCount = todoData.filter((el) => el.done).length;
        const todoCount = todoData.length - doneCount;

        if ( isLoading || serverErrorMessage ||unknownError ) {
            return (
                <div className='todo-page'>
                    <Loading isLoading={isLoading}/>
                    <div className='server-error'>{serverErrorMessage}</div>
                    <div className='server-error'>{unknownError}</div>
                </div>
            )
        }

        return (
            <main className="todo-page">
                <Header toDo={todoCount} done={doneCount} />
                <div className="top-panel d-flex">
                    <SearchPanel onSearchChange={this.onSearchChange}/>
                    <ItemStatusFilter filter={filter}
                                      onFilterChange={this.onFilterChange}/>
                </div>

                <ItemAddForm onItemAdded={this.addItem}/>

                <TodoList todos={visibleItems}
                          onDeleted = { this.deleteItem }
                          onToggleImportant = { this.onToggleImportant }
                          onToggleDone = { this.onToggleDone }/>

                <Pagination pages={todoPages} page={page} onPageSelect={this.onPageSelect}/>
            </main>
        );
    }
};