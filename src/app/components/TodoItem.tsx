import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

interface Props {
	content: string;
	done: boolean;
	id: string;
	deleteTodo(id: string): Promise<void>;
	changeDone(id: string, done: boolean): Promise<void>;
}

const TodoItem: React.FC<Props> = ({
	content,
	done,
	changeDone,
	deleteTodo,
	id,
}) => {
	const [disabled, setDisabled] = React.useState(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setDisabled(true);
		changeDone(id, e.target.checked).finally(() => setDisabled(false));
	};

	const handleClick = () => {
		setDisabled(true);
		deleteTodo(id).finally(() => setDisabled(false));
	};

	return (
		<div className="my-3">
			<Button
				variant="danger"
				onClick={handleClick}
				disabled={disabled}
				className="rounded-circle py-0 px-2 mr-2">
				&times;
			</Button>
			<Form.Check
				checked={done}
				inline
				disabled={disabled}
				className="mr-2"
				onChange={handleChange}
			/>
			<span style={{ textDecoration: done ? 'line-through' : 'none' }}>
				{content}
			</span>
		</div>
	);
};

export default TodoItem;
