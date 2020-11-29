import axios from 'axios';
import React from 'react';
import FooterInput from '../components/FooterInput';
import PlaceholderText from '../components/PlaceholderText';
import TodoItem from '../components/TodoItem';
import { ITodoItem, User } from '../utils';

interface Props {
	user: User | null;
}

const TodoPage: React.FC<Props> = ({ user }) => {
	const [items, setItems] = React.useState<ITodoItem[] | null>(null);

	// Get Todo List when user is available
	React.useEffect(() => {
		if (!user) return;
		let mounted = true;

		// Get Todo List from server
		axios
			.get('/user/todo')
			.then(res => {
				if (mounted) setItems(res.data.items);
			})
			.catch(console.error);

		return () => {
			mounted = false;
		};
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
		return <PlaceholderText>Log in to access your Todo List!</PlaceholderText>;
	}

	return (
		<div className="p-3">
			<h1 className="text-center">Your Todo List</h1>
			<hr />

			<div>
				{!items ? (
					<h3 className="text-center">Loading list...</h3>
				) : !items.length ? (
					<h4 className="text-center">You don't have anything to-do!</h4>
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
			</div>
			{items && <FooterInput addTodo={addTodo} />}
		</div>
	);
};

export default TodoPage;
