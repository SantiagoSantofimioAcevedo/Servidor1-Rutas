import { Database } from 'sqlite3';
import express, { Request, Response } from 'express';
const db = new Database('Servidor 1.db');
const app = express();
const port = 5000;

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});

app.use(express.json());

//devuelve todos los resultados de la consulta
db.all('SELECT * FROM Electrodomesticos', (err, row) => {
if (err) {
console.error(err.message);
} else {
console.log("TODOS LOS RESULTADOS: ", row);
}
});

// Agregar electrodomesticos 1er
app.post('/api/electrodomesticos', (req, res) => {
    const { nombre, marca, modelo, precio, descripcion } = req.body;
    const sql = 'INSERT INTO electrodomesticos (nombre, marca, modelo, precio, descripcion) VALUES (?, ?, ?, ?, ?)';
    db.run(sql, [nombre, marca, modelo, precio, descripcion], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(201).json({ id: this.lastID });
        }
    });
});

// Consultar un electrodoméstico por ID 2do 
app.get('/api/electrodomesticos/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const sql = 'SELECT * FROM electrodomesticos WHERE id = ?';
    db.get(sql, [id], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (row) {
            res.json(row);
        } else {
            res.status(404).json({ message: 'Electrodoméstico no encontrado' });
        }
    });
});
//Consultar todos los electrodomesticos 3er 
app.get('/api/electrodomesticos', (req: Request, res: Response) => {
    const sql = 'SELECT * FROM electrodomesticos';
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows);
        }
    });
});

//Actualizar un electrodomestico por su ID 4to 
app.put('/api/electrodomesticos/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const { nombre, marca, modelo, precio, descripcion } = req.body;
    const sql = 'UPDATE electrodomesticos SET nombre = ?, marca = ?, modelo = ?, precio = ?, descripcion = ? WHERE id = ?';
    db.run(sql, [nombre, marca, modelo, precio, descripcion, id], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (this.changes === 0) {
            res.status(404).json({ message: 'Electrodoméstico no encontrado' });
        } else {
            res.json({ message: 'Electrodoméstico actualizado correctamente' });
        }
    });
});
// eliminar un electrodoméstico por su ID 5to 
app.delete('/api/electrodomesticos/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const sql = 'DELETE FROM electrodomesticos WHERE id = ?';
    db.run(sql, [id], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (this.changes === 0) {
            res.status(404).json({ message: 'Electrodoméstico no encontrado' });
        } else {
            res.status(204).send();
        }
    });
});



/*
inserta un usuario
db.run('INSERT INTO users (email, nombres, apellidos, password) VALUES (?, ?, ?, ?)',
['anagarcia@example.com', 'Ana', 'García', '12345'],
(err) => {
if (err) {
console.error(err.message);
} else {
console.log('Usuario insertado correctamente');
}
}
);
*/


/*
//devuelve solo un resultado mediante el filtrado de correo
db.get('SELECT * FROM users WHERE email = ?', ["adso@gmail.com"], (err, row) => {
if (err) {
console.error(err.message);
} else {
console.log("FILTRADO POR EMAIL: ", row); // Aquí tienes el registro encontrado, si
existe
}
});
*/