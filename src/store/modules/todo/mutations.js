import Vue from "vue";

const TODOS_KEY = 'todos';

export default {
    addTodo(state, todo) {
        state.todos.push(todo);
        localStorage.setItem(TODOS_KEY, JSON.stringify(state.todos));
    },
    removeTodo(state, todoId) {
        const index = state.todos.findIndex(todo => todo.id === todoId);
        if (index !== -1) {
            state.todos.splice(index, 1);
            localStorage.setItem(TODOS_KEY, JSON.stringify(state.todos));
        }
    },
    updateTodo(state, { id, updatedTodo }) {
        const index = state.todos.findIndex(todo => todo.id === id);
        if (index !== -1) {
            Vue.set(state.todos, index, { ...state.todos[index], ...updatedTodo });
            localStorage.setItem(TODOS_KEY, JSON.stringify(state.todos));
        }
    }
}