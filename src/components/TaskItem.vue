<template>
  <li class="listitem mb-2 list-group-item d-flex border justify-content-between align-items-center p-3 z-3">
    <div class="check-div">
      <button class="checkbtn btn-toggle" @click="toggleCompletion(source)">
        <span class="check" v-if="source.completed">
          <CheckIcon />
        </span>
        <span class="square-icon" v-else>
          <SquareIcon />
        </span>
      </button>
    </div>
    <div class="todo-content align-items-center flex-grow-1">
      <div v-if="!isEditing" class="responsived d-flex align-items-center flex-grow-1">
        <div class="textArea d-flex">
          <strong 
            class="todo-title d-inline-block text-truncate ms-1 me-2"
            @mouseover="toogleTooltip"
            @mouseleave="toogleTooltip"
          >
            {{ source.title }}
            <span class="tooltip" v-if="tooltipVisible">{{ source.title }}</span>
          </strong>
        </div>
        <div class="description-order">
          <div class="todo-description text-center">
            <small class="description d-inline-block text-truncate" @mouseover="toogleTooltip" @mouseleave="toogleTooltip">
              {{ source.description }}
            </small>
            <div v-if="tooltipVisible" class="tooltip">{{ source.description }}</div>
          </div>
        </div>
        <div class="badges d-flex justify-content-between">
          <span class="badgeicon badge me-2" :class="getStatusClass(source.status)">{{ source.status }}</span>
          <span class="badgeicon badge" :class="source.completed ? 'completed' : 'pending'">
            {{ source.completed ? 'Completed' : 'Pending' }}
          </span>
        </div>
      </div>
      <div v-else class="responsived-edit d-flex align-items-center flex-grow-1">
        <input type="text" v-model="tempTitle" @keyup.enter="saveEdit(source)" placeholder="Edit Title"
          class="form-control me-2" />
        <input type="text" v-model="tempDesc" @keyup.enter="saveEdit(source)" placeholder="Edit Description"
          class="form-control me-2" />
        <select v-model="tempStatus" class="form-control" @change="saveEdit(source)">
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
    </div>
    <div>
      <div class="buttonsArea d-flex justify-content-around">
        <button class="editbtn" v-if="!isEditing" @click="toggleEdit">
          <PencilIcon />
        </button>
        <div class="d-flex" v-else>
          <button class="savebtn btn-sm mx-2" @click="saveEdit(source)">Save</button>
          <button class="cancelbtn btn btn-sm mx-2" @click="toggleEdit">
            <CancelIcon />
          </button>
        </div>
        <button class="removebtn btn btn-danger mx-2" @click="removeTodo(source.id)">
          <TrashIcon />
        </button>
      </div>
    </div>
  </li>
</template>

<script>
import { mapActions } from 'vuex';
import CheckIcon from './icons/CheckIcon.vue';
import PencilIcon from './icons/PencilIcon.vue';
import TrashIcon from './icons/TrashIcon.vue';
import SquareIcon from './icons/SquareIcon.vue';
import CancelIcon from './icons/CancelIcon.vue';

export default {
  components: {
    CheckIcon,
    PencilIcon,
    TrashIcon,
    SquareIcon,
    CancelIcon
  },
  name: 'TaskItem',
  data() {
    return {
      isEditing: false,
      tooltipVisible: false,
      tempTitle: this.source.title,
      tempDesc: this.source.description,
      tempStatus: this.source.status,
    }
  },
  methods: {
    ...mapActions([
      'removeTodo',
      'updateTodo'
    ]),
    toggleCompletion(source) {
      let completion = {
        ...source,
        completed: !source.completed
      }
      this.updateTodo(completion)
    },
    getStatusClass(status) {
      return {
        'danger': status === 'high',
        'warning': status === 'medium',
        'low': status === 'low',
      }
    },
    toggleEdit() {
      this.isEditing = !this.isEditing
    },
    saveEdit(source) {
      let newItem = {
        id: source.id,
        title: this.tempTitle,
        description: this.tempDesc,
        status: this.tempStatus,
      }
      this.updateTodo(newItem)
      this.toggleEdit()
    },
    toogleTooltip(){
      this.tooltipVisible = !this.tooltipVisible
    }
  },
  props: {
    remove: {
      type: Function,
    },
    source: {
      type: Object,
      default() {
        return {
          title: '',
          description: '',
          status: 'low',
        }
      }
    }
  }
}
</script>

<style scoped>
.description {
  position: relative;
}

/* Botões de status */
.btn-toggle {
  background-color: transparent;
  cursor: pointer;
  padding: 0;
  width: 30px;
  height: 30px;
  border: none;
  display: flex;
  border-radius: 25%;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s, transform 0.2s;
}

.btn-toggle:hover {
  background-color: #dde0dd95;
  border-radius: 25%;

}

.checkbtn {
  color: #028d02;
}

.square-icon {
  color: #030400;
}

.tooltip {
  position: absolute;
  top: -10px;
  left: 20;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 5px;
  border-radius: 4px;
  z-index: 20;
  transition: opacity 0.2s;
  opacity: 0;
}

.description:hover+.tooltip {
  z-index: 20;
  opacity: 1;
}

.todo-title:hover .tooltip {
  opacity: 1;
  z-index: 20;
}

.list {
  margin-top: 140px;
}

.description {
  max-width: 240px;
  font-size: 1rem;
}

.listitem {
  border-radius: 10px !important;
}

.danger {
  border: 1px solid #cb121c;
  border-radius: 5px;
  border-style: outset;
  color: black;
  font-size: 1rem;
  font-weight: 500;
}

.savebtn {
  padding: 2px;
  border: 1px solid #0d4d00;
}

.cancelbtn {
  border: 1px solid #2d312d;
}

.savebtn,
.cancelbtn {
  background: none;
  border-radius: 5px;
  color: black;
  padding: 0px 4px 0px 4px;
  font-size: 1rem;
  font-weight: 500;
  font-size: 0.9rem;
  transition: background-color 0.4s ease, color 0.5s ease;
}

.savebtn:hover {
  background-color: #0d4d00;
  color: white;

}

.cancelbtn:hover {
  background-color: #4a4d4a;
  color: white;
}

.removebtn {
  border: 1px solid #cb121c;
  border-radius: 5px;
  color: white;
  padding: 0px 4px 0px 4px;
  font-size: 1rem;
  font-weight: 500;
  transition: background-color 0.4s ease, color 0.5s ease;
}

.editbtn:hover {
  background-color: #3374d5dc;
  color: white;
}

.editbtn {
  border: 1px solid #0B5ED7;
  border-radius: 5px;
  border-style: outset;
  color: #0B5ED7;
  padding: 0px 4px 0px 4px;
  background-color: #fff;
  font-size: 1rem;
  font-weight: 500;
  transition: background-color 0.4s ease, color 0.5s ease;
}

.warning {
  border: 1px solid #ffa200;
  border-radius: 5px;
  border-style: outset;
  color: black;
  font-size: 1rem;
  font-weight: 500;
}

.low {
  border: 1px solid #17a2b8;
  border-radius: 5px;
  border-style: outset;
  color: black;
  font-size: 1rem;
  font-weight: 500;
}

.completed {
  border: 1px solid #06c106;
  border-radius: 5px;
  border-style: outset;
  color: black;
  font-size: 1rem;
  font-weight: 500;
}

.pending {
  border: 1px solid #c16406;
  border-radius: 5px;
  border-style: outset;
  color: black;
  font-size: 1rem;
  font-weight: 500;
}

.todo-content {
  width: 100%;
}

.todo-title {
  width: 200px;
  font-size: 1.2rem;
}

.todo-description {
  width: 250px;
  font-size: 0.8rem;
}


@media (max-width: 995px) {

  .todo-title,
  .todo-description {
    width: auto;
    font-size: 1rem;
  }

  .todo-content,
  .actions {
    flex-wrap: wrap;
  }

  .actions button {
    width: 100%;
    margin-bottom: 8px;
  }

  .todo-title {
    font-size: 1.1rem;
  }

  .todo-description {
    font-size: 0.9rem;
  }

  .todo-title {
    font-size: 1.2rem;
    width: 90px;
    max-width: 90px;
  }

  .description {
    width: 120px;
    max-width: 120px;
  }

  .checkbtn {
    margin-left: -10px;
    margin-right: 10px;
  }
}

@media (max-width: 768px) {
  .todo-title {
    font-size: 1rem;
    max-width: 120px;
  }

  .description {
    font-size: 0.9rem;
    font-weight: 500;
    margin-right: -30px;
    max-width: 140px;
  }

  .checkbtn {
    width: 20px;
    height: 20px;
    font-size: 10px;
    margin-left: -10px;
    margin-right: 3px;
  }

  .badges {
    margin-left: 65px;
  }

  .badgeicon {
    max-width: 90px;
    padding: 4px;
    font-size: 10px;
  }

  .cancelbtn,
  .editbtn,
  .savebtn {
    padding: 1px;
    font-size: 0.8rem;
  }
}

@media (max-width: 500px) {
  .listitem {
    height: 235px;
  }

  .buttonsArea {
    order: -1;
    display: flex;
    flex-direction: column;
    gap: 8px;
    justify-content: flex-end;
    margin-bottom: 147px;
    margin-right: -18px;
  }

  .editbtn {
    padding: 0px;
    margin: 0px 8px 2px 8px;
  }

  .responsived {
    display: flex;
    flex-direction: column;
    align-items: center;
    /* Centraliza os elementos na vertical */
    justify-content: flex-start;
    height: 100%;
    text-align: center;
  }

  .responsived-edit {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .description-order {
    order: 2;
  }

  .badges {
    order: 1;
  }

  .description {
    margin: 0px;
  }

  .textArea {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    text-align: center;
  }

  .todo-title {
    display: block;
    font-size: 18px;
    max-width: 300px;
    font-weight: bold;
    overflow: visible;
    margin-bottom: 10px;
  }

  .todo-description {
    margin-top: 10px;
  }

  .badges {
    display: flex;
    width: 35%;
    margin-bottom: 15px;
    margin-left: 0px;
  }

  .badgeicon {
    max-width: 120px;
    padding: 4px;
    text-align: center;
    font-size: 15px;
    margin-right: 5px;
  }

  .check-div {
    height: 100%;
    align-self: flex-start;
  }

  .checkbtn {
    width: 30px;
    height: 30px;
    font-size: 15px;

  }
}
</style>