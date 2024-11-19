export default {
    addTodo({ commit }, todo) {
        commit('addTodo', todo);
    },
    removeTodo({ commit }, todoId) {
        commit('removeTodo', todoId);
    },
    updateTodo({ commit }, { id, updatedTodo }) {
        commit('updateTodo', { id, updatedTodo });
    }
}