import axios from 'axios';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import TodoPage from './pages/TodoPage';
import { User } from './utils';

const Home = React.lazy(() => import('./pages/Home'));
const Login = React.lazy(() => import('./pages/Login'));
const Register = React.lazy(() => import('./pages/Register'));

const App: React.FC = () => {
	const [user, setUser] = React.useState<User | null>(null);

	React.useEffect(() => {
		axios
			.get('/user') // Get user info
			.then(res => setUser(res.data.user)) // Set user info to state
			.catch(() => null); // Ignore errors
	}, []);

	return (
		<React.Suspense fallback={<h1>Loading...</h1>}>
			<Header user={user} />
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/todo" children={<TodoPage user={user} />} />
				<Route exact path="/login" component={Login} />
				<Route exact path="/register" component={Register} />

				<Redirect to="/" />
			</Switch>
		</React.Suspense>
	);
};

export default App;
