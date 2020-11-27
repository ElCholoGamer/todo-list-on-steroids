import axios from 'axios';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { stringify } from '../utils';

const Login: React.FC = () => {
	const [data, setData] = React.useState({ username: '', password: '' });
	const [message, setMessage] = React.useState('');

	const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) =>
		setData({ ...data, [target.name]: target.value });

	const handleClick = () => {
		// Check that all values aren't empty
		if (Object.values(data).some(v => !v.trim())) return;

		// Post data to login route
		axios
			.post('/auth/login', stringify(data), {
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			})
			.then(() => (location.href = '/')) // Redirect to homepage after login
			.catch(err => {
				const { data = {} } = err.response || {};
				setMessage(data.message || 'Unknown error');
			});
	};

	const { username, password } = data;
	return (
		<div className="p-4">
			<h1>Log In</h1>
			<hr />

			<Form>
				<Form.Group>
					<Form.Label>Username:</Form.Label>
					<Form.Control
						value={username}
						onChange={handleChange}
						name="username"
						type="text"
					/>
				</Form.Group>

				<Form.Group>
					<Form.Label>Password:</Form.Label>
					<Form.Control
						value={password}
						onChange={handleChange}
						name="password"
						type="password"
					/>
					<Form.Text className="text-muted">
						We will never share your password with anyone. (Even though some
						hacker could leak our database)
					</Form.Text>
				</Form.Group>

				<Button onClick={handleClick}>Log In</Button>
			</Form>
			<p className="text-danger mt-3">{message}</p>
		</div>
	);
};

export default Login;
