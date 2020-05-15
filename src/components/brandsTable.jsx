import React from 'react';
import {Link} from 'react-router-dom';

const BrandsTable = ({brands, ids}) => {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th className="col">Name</th>
                </tr>
            </thead>
            <tbody>
                {
                    ids.map(id => (
                        <tr key={id}>
                            <td><Link to={`/brands/${id}`}>{brands[id].name}</Link></td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    );
}
 
export default BrandsTable;