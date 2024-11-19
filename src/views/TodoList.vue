<template>
  <div class=" container">
    <task-creator/>
    <task-filter @update-filter="applyFilter" />
    <task-list :todos="filteredTodos"/>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import TaskCreator from '../components/TaskCreator.vue';
import TaskFilter from '../components/TaskFilter.vue';
import TaskList from '../components/TaskList.vue';

export default {
  components: { TaskCreator, TaskFilter, TaskList },
  data() {
    return {
      filters: {
        searchQuery: '',
        sortOrder: 'default',
        statusFilter: 'all',
      },
    };
  },
  computed: {
    ...mapGetters([
      'todos'
    ]),

    filteredTodos() {
      let filtered = [...this.todos];

      if (this.filters.searchQuery) {
        const query = this.filters.searchQuery.toLowerCase();
        filtered = filtered.filter((todo) =>
          todo.title.toLowerCase().includes(query) || todo.description.toLowerCase().includes(query)
        );
      }

      if (this.filters.statusFilter === 'completed') {
        filtered = filtered.filter((todo) => todo.completed);
      } else if (this.filters.statusFilter === 'pending') {
        filtered = filtered.filter((todo) => !todo.completed);
      }

      if (this.filters.sortOrder !== 'default') {
        filtered = filtered.filter((todo) => todo.status === this.filters.sortOrder);
      }

      const statusOrder = { high: 1, medium: 2, low: 3 };
      return filtered.sort((a, b) => statusOrder[a.status] - statusOrder[b.status]);
    },
  },

  methods: {
    ...mapActions([
      'addTodo',
      'removeTodo',
      'updateTodo'
    ]),
    addTodo(newTodo) {
      this.addTodo(newTodo);
    },
    applyFilter(filters) {
      this.filters = { ...filters };
    },
    removeTodo(item) {
      this.removeTodo(item.id);
    },
  },
};
</script>

<style scoped>
.header {
  padding: 20px 0;
}

.animated-header {
  color: #000;
  animation: fadeIn 1s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>