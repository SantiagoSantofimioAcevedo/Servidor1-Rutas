"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sqlite3_1 = require("sqlite3");
const express_1 = __importDefault(require("express"));
const db = new sqlite3_1.Database('Servidor 1.db');
const app = (0, express_1.default)();
const port = 5000;
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
app.use(express_1.default.json());
//devuelve todos los resultados de la consulta
db.all('SELECT * FROM Electrodomesticos', (err, row) => {
    if (err) {
        console.error(err.message);
    }
    else {
        console.log("TODOS LOS RESULTADOS: ", row);
    }
});
// Agregar electrodomesticos 1er
app.post('/api/electrodomesticos', (req, res) => {
    const { nombre, marca, modelo, precio, descripcion } = req.body;
    const sql = 'INSERT INTO electrodomesticos (nombre, marca, modelo, precio, descripcion) VALUES (?, ?, ?, ?, ?)';
    db.run(sql, [nombre, marca, modelo, precio, descripcion], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
        }
        else {
            res.status(201).json({ id: this.lastID });
        }
    });
});
// Consultar un electrodoméstico por ID 2do 
app.get('/api/electrodomesticos/{id}', (req, res) => {
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
