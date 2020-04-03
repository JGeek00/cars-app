import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class BrandsTable extends Component {
    render() { 
        const {brands} = this.props;
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th className="col">Name</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        brands.map(brand => (
                            <tr key={brand._id}>
                                <td><Link to={`/brands/${brand._id}`}>{brand.name}</Link></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        );
    }
}
 
export default BrandsTable;