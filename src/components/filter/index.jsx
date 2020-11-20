import React from "react";
import './style.css';
export default function Filter({ data, onChange }) {
    
    return (
        <select style={{width:100}}onChange={(e) => onChange(e.target.value, e)}>
            <option></option>
            {data.map( content => (
                <option key={content} value={content}>{content}</option>
            ))}
        </select>
    )
}