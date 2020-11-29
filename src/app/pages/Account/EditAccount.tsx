import axios from 'axios';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import PlaceholderText from '../../components/PlaceholderText';
import { User } from '../../utils';

interface Props {
	user: User | null;
}

const EditAccount: React.FC<Props> = ({ user }) => {
	const [message, setMessage] = React.useState<['danger' | 'success', string]>([
		'danger',
		'',
	]);
	const [data, setData] = React.useState({
		username: user?.username,
		bio: user?.bio,
	});

	const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) =>
		setData(prev => ({ ...prev, [target.name]: target.value }));

	if (!user) {
		return <PlaceholderText>Log in to edit your account</PlaceholderText>;
	}

	const handleClick = ({
		currentTarget,
	}: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		if (!username) {
			setMessage(['danger', 'You must provide a username lol']);
			return;
		}

		currentTarget.disabled = true;
		axios
			.put('/user', data)
			.then(() => setMessage(['success', 'User updated']))
			.catch(console.error)
			.finally(() => (currentTarget.disabled = false));
	};

	const { username, bio } = data;
	return (
		<div className="p-3">
			<h1>Edit your account</h1>
			<hr />
			<Form>
				<Form.Group>
					<Form.Label>Username:</Form.Label>
					<Form.Control
						type="text"
						name="username"
						onChange={handleChange}
						value={username}
						placeholder="Your new username..."
					/>
				</Form.Group>

				<Form.Group>
					<Form.Label>Bio:</Form.Label>
					<Form.Control
						as="textarea"
						name="bio"
						rows={5}
						onChange={handleChange}
						value={bio}
						placeholder="Your bio... (Optional)"
					/>
				</Form.Group>

				<Button variant="primary" onClick={handleClick}>
					Save Changes
				</Button>
			</Form>
			<p className={`text-${message[0]} my-2`}>{message[1]}</p>
		</div>
	);
};

export default EditAccount;
