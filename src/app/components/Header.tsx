import React from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavItem from 'react-bootstrap/NavItem';
import NavLink from 'react-bootstrap/NavLink';
import DefaultPicture from '../assets/default_profile.png';
import { User } from '../utils';
import LazyImage from './LazyImage';

interface Props {
	user: User | null;
}

const Header: React.FC<Props> = ({ user }) => {
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
								<LazyImage
									src={'/user/avatar'}
									fallbackSrc={DefaultPicture}
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
