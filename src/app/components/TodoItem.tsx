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
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.target.disabled = true;
		changeDone(id, e.target.checked).finally(() => (e.target.disabled = false));
	};

	const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.currentTarget.disabled = true;
		deleteTodo(id).finally(() => (e.currentTarget.disabled = false));
	};

	return (
		<div className="my-3">
			<Button
				variant="danger"
				onClick={handleClick}
				className="rounded-circle py-0 px-2 mr-2">
				&times;
			</Button>
			<Form.Check
				checked={done}
				inline
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
