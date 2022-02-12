import React, { Component } from 'react';
import './pagination.css';

export default class Pagination extends Component {
    render() {
        const { pages, page, onPageSelect } = this.props;

        const buttonsCount = [];
        for ( let step = 0; step < pages; step++ ){
            buttonsCount.push(step+1)
        }

        return (
            <div className={'pagination'}>
                {buttonsCount.map((item) => {
                    const isActive = item === page;
                    const clazz = isActive ? "btn btn-info" : 'bnt-outline-secondary';
                    return (
                        <button type={'button'}
                                className={`btn ${clazz}`}
                                onClick={() => onPageSelect(item)}
                                key={item}>
                            {item}
                        </button>
                    )
                })}
            </div>
        )
    }
}