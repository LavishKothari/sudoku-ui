import React from "react"
import House from './House'
import axios from 'axios'

export default class Board extends React.Component {
    async getData() {
        var unfilledSudoku;
        var solvedSudoku;
        axios.get('http://localhost:8081/sudoku')
            .then((response) => {
                unfilledSudoku = response.data.grid;
                solvedSudoku = response.data.cachedSolvedGrid;
                this.setState(
                    {
                        loading: false,
                        unfilledSudoku: unfilledSudoku,
                        solvedSudoku: solvedSudoku
                    }
                );
            })
            .catch( (error) => {
                console.log(error);
            });
    }

    constructor(props) {
        super(props);
        this.getData = this.getData.bind(this);
        this.getData();
        this.state = {
            loading: true,
            unfilledSudoku: [[]],
            solvedSudoku: [[]]
        };
    }

    render() {
        if(this.state.loading) {
            return 'Loading!';
        }
        var rows = [];
        for(var i=0;i<3;i++) {
            let currentRow = [];
            for(var j=0;j<3;j++) {
                currentRow.push(
                    <td>
                        <House dim={9} houseValues={this.getHouseValues(i*3+j, 3)} />
                    </td>
                );
            }
            rows.push(<tr>{currentRow}</tr>)
        }

        return(
            <div>
                <table>
                    {rows}
                </table>
                <button onClick={this.getData}>New Puzzle</button>
            </div>
        );
    }

    getHouseValues(innerGridNumber, dim) {
        var Y = innerGridNumber % dim;
        var X = Math.floor(innerGridNumber / dim);
        var startXIndex = X * dim;
        var startYIndex = Y * dim;

        var resultList = [];
        for (var i = startXIndex; i < startXIndex + dim; i++) {
            for (var j = startYIndex; j < startYIndex + dim; j++) {
                resultList.push(this.state.unfilledSudoku[i][j]);
            }
        }
        return resultList;
    }

}