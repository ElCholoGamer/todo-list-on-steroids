import { Document, model, Schema } from 'mongoose';

interface ITodoItem {
	_id?: string;
	content: string;
	done: boolean;
}

export interface ITodoList extends Document {
	items: ITodoItem[];
	getItem(id: string): ITodoItem | undefined;
}

const TodoItemSchema = new Schema({
	content: { type: String, required: true, trim: true },
	done: { type: Boolean, required: true, default: false },
});

const TodoListSchema = new Schema(
	{
		items: {
			type: [TodoItemSchema],
			required: true,
			default: [],
		},
	},
	{
		timestamps: true,
	}
);

TodoListSchema.methods.getItem = function (id: string) {
	return this.items.find((item: ITodoItem) => item._id?.toString() === id);
};

const TodoList = model<ITodoList>('TodoList', TodoListSchema);

export default TodoList;
