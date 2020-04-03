import React, {Component} from "react";
import {Link} from "react-router-dom";
import Delete from './common/delete'


class UsersTable extends Component {
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
                                <td><Link to={`/${api}/${element._id}`}>{element.name}</Link></td>
                                <td>{element.surname}</td>
                                <td>{element.email}</td>
                                <td>{element.username}</td>
                                {/* <td>{element.brand.map(brand => brand.name)}</td> */}
                                <td><Delete id={element._id} data={data} handleDelete={handleDelete} status={element.username}/></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        )
    }
}

export default UsersTable