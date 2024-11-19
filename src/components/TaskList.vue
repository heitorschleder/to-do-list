<template>
  <virtual-list :data-key="'id'" :data-sources="todos" :data-component="item" :estimate-size="50"
    class="list-group z-3" />
</template>

<script>
import TaskItem from './TaskItem.vue'

export default {
  props: {
    todos: {
      type: Array
    }
  },
  data() {
    return {
      item: TaskItem,
    };
  },
};
</script>

<style scoped>
.list-group {
  max-height: 550px;
  overflow-y: auto;
}
</style>