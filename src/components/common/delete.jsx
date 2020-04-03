import React, {Component} from "react";

class Delete extends Component {

    render() {
        const {id, handleDelete, status} = this.props;
        return(
            <button type="button" id={id} className="btn btn-danger" onClick={() => handleDelete(id)} disabled={status === 'admin' ? true : false}>Delete</button>
        )
    }
}

export default Delete