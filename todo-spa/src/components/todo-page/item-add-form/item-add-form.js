import React, { Component } from 'react';

import './item-add-form.css';

export default class ItemAddForm extends Component {
    constructor() {
        super();
        this.state = {
            label: '',
        }
    }

    onLabelChange = (e) => {
      this.setState({
          label: e.target.value
      })
    };

    onSubmit = (e) => {
        e.preventDefault();
        this.props.onItemAdded(this.state.label);
        this.setState({
            label: '',
        })
    };

    render() {
        return (
            <form className='item-add-form'
                  onSubmit={this.onSubmit}>
                <button type='button'
                        className='btn btn-outline-secondary'
                        onClick={this.onSubmit}>
                    Add todo
                </button>
                <input type='text'
                       className='form-control'
                       onChange={this.onLabelChange}
                       placeholder='What needs to be done'
                       value={this.state.label}/>
            </form>
        )
    }
}