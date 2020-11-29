import axios from 'axios';
import React from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavItem from 'react-bootstrap/NavItem';
import NavLink from 'react-bootstrap/NavLink';
import DefaultPicture from '../assets/default_profile.png';
import { User } from '../utils';

interface Props {
	user: User | null;
}

const Header: React.FC<Props> = ({ user }) => {
	const [picture, setPicture] = React.useState(DefaultPicture);

	React.useEffect(() => {
		if (!user?.avatar) return;

		// Get and set user avatar
		axios
			.get('/user/avatar')
			.then(res => {
				const bytes = new Uint8Array(res.data.picture.data.data);
				const reader = new FileReader();

				reader.onload = e => setPicture(e.target?.result);
				reader.readAsDataURL(new Blob([bytes.buffer]));
			})
			.catch(console.error);
	}, [user]);

	const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.currentTarget.disabled = true; // Disable button

		fetch('/user/logout', { method: 'POST' }) // Post to logout route
			.then(() => location.reload()) // Reload page when done
			.catch(console.error);
	};

	return (
		<Navbar bg="dark" variant="dark" expand="sm">
			<Navbar.Brand href="/">Todo List</Navbar.Brand>
			<Navbar.Toggle />
			<Navbar.Collapse className="justify-content-between">
				<Nav>
					{user && (
						<NavItem>
							<NavLink href="/todo">My Todo List</NavLink>
						</NavItem>
					)}
				</Nav>
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
							Logged in as:{' '}
							<a href="/account" className="text-light font-weight-bold">
								{user.username}
								<img
									src={picture}
									className="mx-2 rounded-circle"
									width={40}
									height={40}
								/>
							</a>
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
};

export default Header;
