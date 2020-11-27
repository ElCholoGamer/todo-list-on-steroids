const { Schema, model } = require('mongoose');

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

TodoListSchema.methods.getItem = function (id) {
	return this.items.find(item => item._id.toString() === id);
};

const TodoList = model('TodoList', TodoListSchema);

module.exports = TodoList;
