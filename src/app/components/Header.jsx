import React from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Navbar from 'react-bootstrap/Navbar';
import { useHistory } from 'react-router-dom';

function Header({ user }) {
	const history = useHistory();

	const handleClick = e => {
		switch (e.target.name) {
			case 'login':
				history.push('/login');
				break;
			case 'register':
				history.push('/register');
				break;
			case 'logout':
				fetch('/user/logout', { method: 'POST' })
					.then(() => location.reload())
					.catch(console.error);
		}
	};

	return (
		<Navbar bg="dark" variant="dark" expand="sm">
			<Navbar.Brand href="/">Todo List</Navbar.Brand>
			<Navbar.Toggle />
			<Navbar.Collapse className="justify-content-end">
				<Navbar.Text>
					{!user ? (
						<ButtonGroup>
							<Button variant="info" name="login" onClick={handleClick}>
								Log In
							</Button>
							<Button variant="info" name="register" onClick={handleClick}>
								Register
							</Button>
						</ButtonGroup>
					) : (
						<>
							Logged in as: <span className="text-light">{user.username}</span>
							<Button
								className="ml-3"
								variant="outline-danger"
								name="logout"
								onClick={handleClick}>
								Log Out
							</Button>
						</>
					)}
				</Navbar.Text>
			</Navbar.Collapse>
		</Navbar>
	);
}

export default Header;
