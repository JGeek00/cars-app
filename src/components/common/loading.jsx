import React from 'react';
import ReactLoading from 'react-loading';

const Loading = ({ type, color }) => (
	<div className="loading">
		<ReactLoading type={"spin"} color={"#007bff"} height={60} width={60} />
	</div>
);

export default Loading;