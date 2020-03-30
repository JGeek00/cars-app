import React, {Component} from "react";
import axios from 'axios'

class Delete extends Component {

    render() {
        const {id, handleDelete} = this.props;
        return(
            <button type="button" id={id} className="btn btn-danger" onClick={() => handleDelete(id)}>Delete</button>
        )
    }
}

export default Delete