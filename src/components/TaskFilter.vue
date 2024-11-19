<template>
  <div class="input-group mb-3 z-3">
    <input
      type="text"
      class="form-control formTitle"
      v-model="localSearchQuery"
      @input="emitFilter"
      placeholder="Search tasks by title or description..."
    />
    <div class="ms-2">
      <select v-model="localSortOrder" class="status-form form-control" @change="emitFilter">
        <option value="default">Status</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
    </div>
    <div class="ms-2">
      <select v-model="localStatusFilter" class="form-control" @change="emitFilter">
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="pending">Pending</option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      localSearchQuery: '',
      localSortOrder: 'default',
      localStatusFilter: 'all',
    };
  },
  methods: {
    emitFilter() {
      this.$emit('update-filter', {
        searchQuery: this.localSearchQuery,
        sortOrder: this.localSortOrder,
        statusFilter: this.localStatusFilter,
      });
    },
  },
};
</script>
<style scoped>
.formTitle {
  max-width: 1060px;
}
.status-form{
  width: 10vw;
}
.form-control {
   border-radius: 4px !important;
}
@media (max-width: 768px) {
  .status-form{
  width: 15vw;
}
}
</style>