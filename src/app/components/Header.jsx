import React from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Navbar from 'react-bootstrap/Navbar';

function Header({ user }) {
	const handleClick = e => {
		e.target.disabled = true; // Disable button
		fetch('/user/logout', { method: 'POST' }) // Post to logout route
			.then(() => location.reload()) // Reload page when done
			.catch(console.error);
	};

	return (
		<Navbar bg="dark" variant="dark" expand="sm">
			<Navbar.Brand href="/">Todo List</Navbar.Brand>
			<Navbar.Toggle />
			<Navbar.Collapse className="justify-content-end">
				<Navbar.Text>
					{!user ? (
						<ButtonGroup>
							<Button variant="primary" href="/login">
								Log In
							</Button>
							<Button variant="primary" href="/register">
								Register
							</Button>
						</ButtonGroup>
					) : (
						<>
							Logged in as: <span className="text-light">{user.username}</span>
							<Button
								className="ml-3"
								variant="outline-danger"
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
