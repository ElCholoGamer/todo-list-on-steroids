import axios from 'axios';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Loading from './components/Loading';
import { User } from './utils';

const Home = React.lazy(() => import('./pages/Home'));
const Login = React.lazy(() => import('./pages/Login'));
const Register = React.lazy(() => import('./pages/Register'));
const Account = React.lazy(() => import('./pages/Account'));
const TodoPage = React.lazy(() => import('./pages/TodoPage'));
const EditAccount = React.lazy(() => import('./pages/Account/EditAccount'));

const App: React.FC = () => {
	const [user, setUser] = React.useState<User | null>(null);
	const [loaded, setLoaded] = React.useState(false);

	// Get user info from server
	React.useEffect(() => {
		axios
			.get('/user')
			.then(res => setUser(res.data.user)) // Set user info to state
			.catch(() => null)
			.finally(() => setLoaded(true)); // Ignore errors
	}, []);

	if (!loaded) return <Loading />;

	return (
		<React.Suspense fallback={<Loading />}>
			<Header user={user} />
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/todo" children={<TodoPage user={user} />} />
				<Route exact path="/login" component={Login} />
				<Route exact path="/register" component={Register} />
				<Route exact path="/account" children={<Account user={user} />} />
				<Route
					exact
					path="/account/edit"
					children={<EditAccount user={user} />}
				/>

				<Redirect to="/" />
			</Switch>
		</React.Suspense>
	);
};

export default App;
