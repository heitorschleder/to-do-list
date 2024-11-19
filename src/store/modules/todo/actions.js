export default {
    addTodo({ commit }, todo) {
        commit('addTodo', todo);
    },
    removeTodo({ commit }, todoId) {
        commit('removeTodo', todoId);
    },
    updateTodo({ commit }, updatedTodo ) {
        commit('updateTodo', { updatedTodo });
    }
}