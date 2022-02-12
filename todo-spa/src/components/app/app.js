import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import './app.css';
import MainPage from "../main-page/main-page";
import TodoPage from "../todo-page/todo-page";
import Nav from "../nav/nav";

export default class App extends Component {
  render() {
    return (
        <div className={'app'}>
            <header className={'header'}>
                <Nav/>
            </header>

            <Routes>
                <Route path='/' element={<MainPage/>}/>
                <Route path='/todo' element={<TodoPage/>}/>
            </Routes>
        </div>
    )
  }
}
