import React from "react";
import {Link} from "react-router-dom";
import Delete from './common/delete'


const CarsTable = (props) =>{ 
    const convertDate = (date) => {
        if (date) {
            var d = new Date(date);
            return d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear() + " - " + d.getHours() + ":" + d.getMinutes();
        }
    }
    
    const {ids, cars, brands, tableHead, handleDelete, api} = props;

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
                    ids.map(id => (
                        <tr key={id}>
                            <td><Link to={`/${api}/${id}`}>{cars[id].model}</Link></td>
                            <td>{brands[cars[id].brand_id].name}</td>
                            <td>{convertDate(cars[id].creationDate)}</td>
                            <td>
                                {
                                    props.userType === "admin" ? (
                                        <Delete id={id} data={cars[id]} handleDelete={handleDelete}/>
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