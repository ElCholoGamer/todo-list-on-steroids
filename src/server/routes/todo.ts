import express from 'express';
import validator from '../middleware/validator';

const router = express.Router();

router.get('/', async (req, res) => {
	const { items } = await req.user!.getTodoList();

	res.json({
		status: 200,
		items,
	});
});

router.post(
	'/',
	validator({
		content: { type: 'string', minLength: 1 },
		done: { type: 'boolean', required: false },
	}),
	async (req, res) => {
		const { content, done = false } = req.body;

		const todoList = await req.user!.getTodoList();
		todoList.items.push({ content, done });
		await todoList.save();

		res.json({
			status: 200,
			items: todoList.items,
		});
	}
);

router.get('/:id', async (req, res) => {
	const { id } = req.params;

	const todoList = await req.user!.getTodoList(); // Get user's Todo List
	const item = todoList.getItem(id); // Get item from list

	if (!item) {
		res.status(404).json({
			status: 404,
			message: `Item by ID "${id}" not found`,
		});
	} else {
		res.json({
			status: 200,
			item,
		});
	}
});

router.put(
	'/:id',
	validator({
		content: { type: 'string', required: false },
		done: { type: 'boolean', required: false },
	}),
	async (req, res) => {
		const { id } = req.params;
		const todoList = await req.user!.getTodoList();

		// Get list item
		const item = todoList.getItem(id);
		if (!item) {
			return res.status(404).json({
				status: 200,
				message: `Todo item by ID "${id}" not found`,
			});
		}

		// Update item data
		const { content = item.content, done = item.done } = req.body;
		item.content = content;
		item.done = done;

		await todoList.save(); // Save Todo List
		res.json({
			status: 200,
			items: todoList.items,
		});
	}
);

router.delete('/:id', async (req, res) => {
	const { id } = req.params;

	const todoList = await req.user!.getTodoList();

	// Check if item exists
	const item = todoList.getItem(id);
	if (!item) {
		return res.status(404).json({
			status: 404,
			message: `Todo item by ID "${id}" not found`,
		});
	}

	// Remove item and save
	todoList.items = todoList.items.filter(item => item._id!.toString() !== id);
	await todoList.save();

	res.json({
		status: 200,
		items: todoList.items,
	});
});

export default router;
