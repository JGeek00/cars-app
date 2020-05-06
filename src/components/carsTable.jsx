import React, {Component} from "react";
import {Link} from "react-router-dom";
import Delete from './common/delete'


const CarsTable = (props) =>{ 
    const convertDate = (date) => {
        if (date) {
            var d = new Date(date);
            return d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear() + " - " + d.getHours() + ":" + d.getMinutes();
        }
    }

    const {data, tableHead, handleDelete, api} = props;
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
                            <td>{convertDate(element.creationDate)}</td>
                            <td>
                                {
                                    props.userType === "admin" ? (
                                        <Delete id={element._id} data={data} handleDelete={handleDelete}/>
                                    ) : (
                                        <React.Fragment/>
                                    )
                                }
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}

export default CarsTable