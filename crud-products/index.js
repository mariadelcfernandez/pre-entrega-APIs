import { inicioProceso } from './components/proceso.js';


// Captura los argumentos de la terminal (ej: ["GET", "products/1"])
const [, , ...args] = process.argv;
// Ejecuta el comando
inicioProceso(args).catch(console.error);


// Para ejecutar terminal
// GET - Mustra Todos los productos del servidor
// npm run start get products

// GET - MuestraUn producto por ID del servidor
// npm run start get products/15

// POST - Crear un producto en el servidor
// npm run start post products "title" "price" "category"
//npm run start post products 'Camisa' 58 'Ropa'

// DELETE - Eliminar un producto del servidor 
// npm run start delete products/1  