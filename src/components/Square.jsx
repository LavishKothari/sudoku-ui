import React from "react";
import "../css/square.css";

export default class Square extends React.Component {
    render() {
        const value = this.props.cellValue === 0 ? '' : this.props.cellValue;
        return(
            <button className="square">
                {value}
            </button>
        );
    }
}