const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database('./todo.db', (err) => {
  if (err) {
    console.error('Erro ao conectar no banco de dados', err);
  } else {
    console.log('Conectado ao banco de dados SQLite');
  }
});

db.run(`CREATE TABLE IF NOT EXISTS todos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  description TEXT NOT NULL,
  completed INTEGER DEFAULT 0,
  createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
  updatedAt TEXT DEFAULT CURRENT_TIMESTAMP
)`);

app.get('/', (req, res) => {
  res.send('API To-Do List funcionando ');
});

app.post('/todos', (req, res) => {
  const { description } = req.body;

  if (!description || description.trim() === "") {
    return res.status(400).json({ error: "Descrição da tarefa é obrigatória." });
  }

  const now = new Date().toISOString();

  db.run(
    `INSERT INTO todos (description, completed, createdAt, updatedAt) VALUES (?, 0, ?, ?)`,
    [description, now, now],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({
        id: this.lastID,
        description,
        completed: 0,
        createdAt: now,
        updatedAt: now
      });
    }
  );
});

app.get('/todos', (req, res) => {
  db.all(`SELECT * FROM todos`, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});


app.put('/todos/:id', (req, res) => {
  const { id } = req.params;
  const now = new Date().toISOString();

  db.run(
    `UPDATE todos SET completed = 1, updatedAt = ? WHERE id = ?`,
    [now, id],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (this.changes === 0) {
        return res.status(404).json({ error: "Tarefa não encontrada." });
      }
      res.json({ message: "Tarefa marcada como concluída." });
    }
  );
});

app.get('/todos/:id', (req, res) => {
  const { id } = req.params;

  db.get(`SELECT * FROM todos WHERE id = ?`, [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: "Tarefa não encontrada." });
    }
    res.json(row);
  });
});

app.delete('/todos/:id', (req, res) => {
  const { id } = req.params;

  db.run(`DELETE FROM todos WHERE id = ?`, [id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: "Tarefa não encontrada." });
    }
    res.json({ message: "Tarefa deletada com sucesso." });
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
