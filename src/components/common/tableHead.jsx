import React, {Component} from "react";

class TableHead extends Component {
    render() {
        const {tableHead} = this.props;
        return (
            <thead>
                <tr>
                    {
                        tableHead.map(element => (
                            <th key={element.name}>{element.name}</th>
                        ))
                    }
                </tr>
            </thead>
        )
    }
}

export default TableHead