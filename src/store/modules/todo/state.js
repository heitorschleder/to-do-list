const TODOS_KEY = 'todos';

export default {
    todos: JSON.parse(localStorage.getItem(TODOS_KEY)) || [],
}