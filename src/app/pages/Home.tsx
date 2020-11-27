import axios from 'axios';
import React from 'react';
import Form from 'react-bootstrap/Form';
import FooterInput from '../components/FooterInput';
import TodoItem from '../components/TodoItem';
import { ITodoItem, User } from '../utils';

interface Props {
	user: User | null;
}

const Home: React.FC<Props> = ({ user }) => {
	const [items, setItems] = React.useState<ITodoItem[] | null>(null);

	React.useEffect(() => {
		if (!user) return;

		// Get Todo List from server
		axios
			.get('/user/todo')
			.then(res => setItems(res.data.items))
			.catch(console.error);
	}, [user]);

	// Post new Todo item
	const addTodo = async (content: string) => {
		await axios
			.post('/user/todo', { content })
			.then(res => setItems(res.data.items))
			.catch(console.error);
	};

	// Delete a Todo item
	const deleteTodo = async (id: string) => {
		await axios
			.delete(`/user/todo/${id}`)
			.then(res => setItems(res.data.items))
			.catch(console.error);
	};

	// Update the "done" property of a Todo item
	const changeDone = async (id: string, done: boolean) => {
		await axios
			.put(`/user/todo/${id}`, { done })
			.then(res => setItems(res.data.items))
			.catch(console.error);
	};

	if (!user) {
		return (
			<div className="container text-center d-flex min-vh mt-5">
				<h3 className="m-auto">Log in to access your Todo List!</h3>
			</div>
		);
	}

	return (
		<div className="p-3">
			<h1 className="text-center">Todo List</h1>
			<hr />

			<Form>
				{!items ? (
					<h3 className="text-center">Loading list...</h3>
				) : (
					items.map(item => (
						<TodoItem
							changeDone={changeDone}
							deleteTodo={deleteTodo}
							key={item._id}
							id={item._id}
							content={item.content}
							done={item.done}
						/>
					))
				)}
			</Form>
			<FooterInput addTodo={addTodo} />
		</div>
	);
};

export default Home;
