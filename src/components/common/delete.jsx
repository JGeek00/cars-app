import React from 'react';

function Delete (props) {
    const {id, handleDelete, status} = props;
    
    return(
        <button type="button" id={id} className="btn btn-danger" onClick={() => handleDelete(id)} disabled={status === 'admin' ? true : false}>Delete</button>
    )
}

export default Delete