import React from 'react';
import ReactLoading from 'react-loading';

const Loading = ({ type, color }) => (
	<ReactLoading type={"spin"} color={"#007bff"} height={60} width={60} />
);

export default Loading;