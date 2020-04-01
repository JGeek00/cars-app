import React, {Component} from "react";
import {Link} from "react-router-dom";
import Delete from './common/delete'


class CarsTable extends Component {
    render() {
        const {data, tableHead, handleDelete, api} = this.props;
        return(
            <table className="table">
                <thead>
                    <tr>
                        {
                            tableHead.map(element => (
                                <th key={element.name}>{element.name}</th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map(element => (
                            <tr key={element._id}>
                                <td><Link to={`/${api}/${element._id}`}>{element.model}</Link></td>
                                <td>{element.brand.map(brand => brand.name)}</td>
                                <td><Delete id={element._id} data={data} handleDelete={handleDelete}/></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        )
    }
}

export default CarsTable