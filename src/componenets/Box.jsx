import React from "react";

export function Box({ index, onClick }) {
    return <button className="box" id={`box-${index}`} onClick={onClick}></button>;
}
