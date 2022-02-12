import React, { Component } from 'react';
import './main-page.css';
import logo from './todo-spa-logo.svg';

export default class MainPage extends Component {
    render() {
        return (
            <main className={'main-page'}>
                <img src={logo} alt="logo"/>
                <div className={'description'}>
                    <h1>TODO-SPA</h1>
                    <p>
                        Сногсшибательное приложение от
                        <a href="https://github.com/vp090391?tab=repositories" target='_blank' rel="noreferrer" >
                            "Vadimka corporation"
                        </a>
                    </p>
                    <h2>Требования:</h2>
                    <ol>
                        <li>Приложение должно содержать 2 страницы: главная и список todo</li>
                        <li>Переход между страницами должен быть реализован через navbar</li>
                        <li>На главной странице должно быть лого и краткое описание страницы</li>
                        <li>На странице для списка todo должен быть интерактивный список</li>
                        <li>Данные для списка должны быть запрошены с `https://jsonplaceholder.typicode.com/todos`</li>
                        <li>Должна быть реализована возможность добавления/изменения/удаления todo</li>
                        <li>Должна быть реализована пагинация без перезагрузки страницы</li>
                    </ol>
                </div>
            </main>
        )
    }
}