<template>
  <div>
    <div class="creator-component">
      <button class="btn-hundred mt-2 btn btn-primary z-3" @click="hundredTodo">Add 100 Tasks</button>
    </div>
    <div class="input-group mb-5 z-3">
      <input type="text" class="form-control me-2" v-model="localTitle" @keyup.enter="submitTodo"
        placeholder="Task Title" />
      <input type="text" class="form-control me-2" v-model="localDescription" @keyup.enter="submitTodo"
        placeholder="Task Description" />
      <select v-model="localStatus" class="form-control">
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button class="btn btn-primary" @click="submitTodo">
        <AddIcon />
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import AddIcon from './icons/AddIcon.vue';


export default {
  components: {
    AddIcon
  },
  data() {
    return {
      localId: this.generateID(),
      localTitle: '',
      localDescription: '',
      localStatus: 'low',
      existingIds: new Set(),
    };
  },
  methods: {
    ...mapActions(['addTodo']),
    hundredTodo() {
      for (let i = 1; i <= 100; i++) {
        this.addTodo({
          id: this.generateID(),
          title: `Task ${i}`,
          description: `Desc ${i}`,
          status: 'low',
          isEditing: false,
          completed: false,
        })
      }
    },
    generateID() {
      return `${Math.floor(Math.random() * 1000000) + 1} - ${new Date().getTime()}`;
    },
    submitTodo() {
      if (this.localTitle.trim() && this.localDescription.trim()) {
        const newTodo = {
          id: this.localId,
          title: this.localTitle,
          description: this.localDescription,
          status: this.localStatus,
          isEditing: false,
          completed: false,
        };
        this.addTodo(newTodo);
        this.localId = this.generateID(),
        this.localTitle = '';
        this.localDescription = '';
        this.localStatus = 'low';
      }
    },
  },
};
</script>
<style scoped>
.creator-component {
  display: flex;
  justify-content: center;
  text-align: center;
  padding: 20px;
}

.btn-hundred {
  text-align: center;
  width: 300px;
}

.form-control {
  border-radius: 4px !important;
}
</style>