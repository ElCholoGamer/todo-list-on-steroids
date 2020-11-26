import axios from 'axios';
import React from 'react';
import { Button, Form } from 'react-bootstrap';

const stringify = obj =>
	Object.keys(obj)
		.map(key => `${key}=${obj[key]}`)
		.join('&');

function Login() {
	const [data, setData] = React.useState({ username: '', password: '' });
	const [message, setMessage] = React.useState('');

	const handleChange = ({ target }) =>
		setData({ ...data, [target.name]: target.value });

	const handleClick = () => {
		if (!data.username || !data.password) return;

		axios
			.post('/login', stringify(data), {
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			})
			.then(res => {
				if (res.status !== 200) setMessage(res.data.message || 'Unknown error');
				else location.href = '/';
			})
			.catch(console.error);
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
						We will never share your password with anyone.
					</Form.Text>
				</Form.Group>

				<Button onClick={handleClick}>Log In</Button>
			</Form>
			<p className="text-danger mt-3">{message}</p>
		</div>
	);
}

export default Login;
