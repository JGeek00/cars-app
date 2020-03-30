import React, {Component} from "react";
import TableHead from "./common/tableHead";
import TableBody from "./common/tableBody";

class Table extends Component {
    render() {
        const {data, tableHead, handleDelete} = this.props;
        return(
            <table className="table">
                <TableHead tableHead={tableHead}/>
                <TableBody data={data} handleDelete={handleDelete}/>
            </table>
        )
    }
}

export default Table