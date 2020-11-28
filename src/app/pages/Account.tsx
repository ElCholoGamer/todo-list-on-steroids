import React from 'react';
import PlaceholderText from '../components/PlaceholderText';
import { User } from '../utils';

interface Props {
	user: User | null;
}

const Account: React.FC<Props> = ({ user }) => {
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
		</div>
	);
};

export default Account;
