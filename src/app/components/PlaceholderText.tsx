import React from 'react';

interface Props {
	text?: string;
}

const PlaceholderText: React.FC<Props> = ({ text, children }) => (
	<div className="container text-center d-flex min-vh mt-5">
		<h3 className="m-auto">{text || children}</h3>
	</div>
);

export default PlaceholderText;
