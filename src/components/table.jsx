import React, {Component} from "react";
import TableHead from "./common/tableHead";
import TableBody from "./common/tableBody";

class Table extends Component {
    render() {
        const {data, tableHead, handleDelete, page} = this.props;
        return(
            <table className="table">
                <TableHead tableHead={tableHead}/>
                <TableBody data={data} handleDelete={handleDelete} page={page}/>
            </table>
        )
    }
}

export default Table