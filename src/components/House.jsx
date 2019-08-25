import React from 'react'
import Square from './Square'

export default class House extends React.Component {
    render() {
        let rows = [];
        for(var i=0;i<3;i++) {
            let currentRow = [];
            for(var j=0;j<3;j++) {
                currentRow.push(<Square cellValue={this.props.houseValues[i*3+j]} />);
            }
            rows.push(<div>{currentRow}</div>);
        }
        return (rows);
    }
}