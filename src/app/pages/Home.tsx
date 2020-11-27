import React from 'react';
import SANESS from '../assets/SANESS.gif';

const Home: React.FC = () => {
	return (
		<div className="m-3">
			<h1>Todo-List On Steroids</h1>
			<h5 className="font-italic">
				The application absolutely no one asked for
			</h5>
			<hr />
			<p>
				So, uhh... like, you can write stuff you gotta do here. (Create an
				account first <a href="/register">here</a>, or login with an existing
				one <a href="/login">here</a>)
			</p>
			<p>
				I'm planning on adding a friends system or something, so stay tuned, I
				guess.
			</p>
			<img src={SANESS} alt="SANESS" />
		</div>
	);
};

export default Home;
