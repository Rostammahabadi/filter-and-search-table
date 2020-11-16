import React from 'react';
import './style.css';
export default function Pagination({totalPages, handleClick, page}) {
    const pages = [...Array(totalPages).keys()].map(number => number+1);
    
    return (
        <div className="numbers">
            {pages.map(number => (
                <a
                key={number}
                onClick={() => handleClick(number)}
                className={`${page === number && 'active'}`}
                >
                {number}
                </a>
            ))}
        </div>
    );
};