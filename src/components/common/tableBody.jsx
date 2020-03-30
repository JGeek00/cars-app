import React, {Component} from "react";
import {Link} from "react-router-dom";
import Delete from './delete'

class TableBody extends Component {
    render() {
        const {data, handleDelete} = this.props;
        return (
            <tbody>
            {
                data.map(element => (
                    <tr key={element._id}>
                        <td><Link to={`/carslist/${element._id}`}>{element.model}</Link></td>
                        <td>{element.brand.map(brand => brand.name)}</td>
                        <td><Delete id={element._id} data={data} handleDelete={handleDelete}/></td>
                    </tr>
                ))
            }
            </tbody>
        )
    }
}

export default TableBody