import React from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

interface Props {
	addTodo(content: string): Promise<void>;
}

const FooterInput: React.FC<Props> = ({ addTodo }) => {
	const [text, setText] = React.useState('');
	const [disabled, setDisabled] = React.useState(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setText(e.target.value.trimStart());

	const handleClick = () => {
		if (!text) return;

		setDisabled(true);
		addTodo(text.trim()).finally(() => {
			setDisabled(false);
			setText('');
		});
	};

	return (
		<Form className="footer bg-secondary fixed-bottom p-2">
			<Row>
				<Col>
					<Form.Control
						value={text}
						disabled={disabled}
						onChange={handleChange}
						placeholder="Add some text"
					/>
				</Col>
				<Col>
					<Button onClick={handleClick} disabled={disabled} variant="info">
						{disabled ? 'Adding...' : 'Add new todo'}
					</Button>
				</Col>
			</Row>
		</Form>
	);
};

export default FooterInput;
