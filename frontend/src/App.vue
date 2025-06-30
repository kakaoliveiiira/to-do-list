<template>
  <div class="container">
    <h1>Lista de Tarefas</h1>

    <!-- Formulário para adicionar nova tarefa -->
    <form @submit.prevent="addTodo">
      <input v-model="newTodo" placeholder="Digite uma nova tarefa" />
      <button type="submit">Adicionar</button>
    </form>

    <!-- Lista de tarefas -->
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        <span :class="{ done: todo.completed, next: pendingTasks.includes(todo.id) }">
          {{ todo.description }}
        </span>
        <div class="actions">
          <button
            @click="toggleNext(todo.id)"
            :disabled="todo.completed"
            title="A completar"
          >🕒</button>
          <button
            @click="markAsDone(todo.id)"
            :disabled="todo.completed"
            title="Concluir"
          >✔</button>
          <button
            @click="deleteTodo(todo.id)"
            title="Excluir"
          >🗑</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newTodo: '',
      todos: [],
      pendingTasks: []
    }
  },
  mounted() {
    this.fetchTodos()
  },
  methods: {
    async fetchTodos() {
      const response = await fetch('http://localhost:3000/todos')
      const data = await response.json()
      this.todos = data
    },
    async addTodo() {
      if (!this.newTodo.trim()) return

      await fetch('http://localhost:3000/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description: this.newTodo })
      })

      this.newTodo = ''
      this.fetchTodos()
    },
    async markAsDone(id) {
      await fetch(`http://localhost:3000/todos/${id}`, {
        method: 'PUT'
      })
      this.fetchTodos()
    },
    async deleteTodo(id) {
      await fetch(`http://localhost:3000/todos/${id}`, {
        method: 'DELETE'
      })
      this.fetchTodos()
    },
    toggleNext(id) {
      if (this.pendingTasks.includes(id)) {
        this.pendingTasks = this.pendingTasks.filter(pid => pid !== id)
      } else {
        this.pendingTasks.push(id)
      }
    }
  }
}
</script>

<style>
body {
  font-family: sans-serif;
  background: rgb(31, 31, 31);
  color: black;
  margin: 0;
  padding: 2rem;
}

.container {
  max-width: 600px;
  margin: auto;
  background: rgb(128, 128, 128);
  padding: 2rem;
  border-radius: 10px;
}

form {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

input {
  flex: 1;
  padding: 10px;
  background: rgb(59, 59, 59);
  border: 1px solid #444;
  color: white;
  border-radius: 5px;
}

button {
  background: #00b894;
  color: white;
  border: none;
  padding: 10px 12px;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;
}

button:hover {
  background: #019875;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  background: rgb(87, 87, 87);
  padding: 10px;
  border-radius: 5px;
}

li span {
  flex: 1;
  text-align: left;
  margin-right: 10px;
  word-break: break-word;
}

.done {
  color: green;
  font-weight: bold;
  text-decoration: line-through;
  opacity: 0.6;
}

.next {
  color: #f1c40f;
  font-weight: bold;
}

.actions {
  display: flex;
  gap: 0;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
}

.actions button {
  background-color: #00b894;
  color: white;
  border: none;
  padding: 10px 14px;
  cursor: pointer;
  font-size: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;
  border-radius: 0;
}

.actions button:hover {
  background-color: #019875;
}

.actions button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
