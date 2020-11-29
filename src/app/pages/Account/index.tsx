import React from 'react';
import Button from 'react-bootstrap/esm/Button';
import { useRouteMatch } from 'react-router-dom';
import PlaceholderText from '../../components/PlaceholderText';
import { User } from '../../utils';

interface Props {
	user: User | null;
}

const Account: React.FC<Props> = ({ user }) => {
	const match = useRouteMatch();

	if (!user) {
		return <PlaceholderText>Log in to access your account</PlaceholderText>;
	}

	const { username, bio } = user;
	return (
		<div className="p-3">
			<h1>Your account</h1>
			<hr />

			<h5>Username: {username}</h5>
			<br />
			<h5>Your bio:</h5>
			<p className="rounded border border-secondary p-3">
				{bio || "(You don't have a bio yet!)"}
			</p>
			<hr />
			<Button href={`${match.path}/edit`}>Edit Account</Button>
		</div>
	);
};

export default Account;
