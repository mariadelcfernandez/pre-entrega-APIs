import readline from 'readline/promises';
import { stdin as input, stdout as output } from 'process';
const API_URL = 'https://fakestoreapi.com/products';

// GET - Mustra Todos los productos del servidor
export async function fetchAllProducts() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Error al obtener productos');
  return await res.json();
}

// GET - MuestraUn producto por ID del servidor
export async function fetchProductById(id) {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error(`Producto ${id} no encontrado`);
  return await res.json();
}

// POST - Crear un producto en el servidor
export async function createProduct({ title, price, category }) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, price, category }),
  });
  if (!res.ok) throw new Error('Error al crear el producto');
  return await res.json();
}

// DELETE - Eliminar un producto del servidor
export async function deleteProduct(productId) {
  const getProduct = await fetch(`${API_URL}/${productId}`);

  const getProducts = await fetch(`${API_URL}/${productId}`, {
    method: 'DELETE',
  })

    //  console.log(getProducts.ok? `Producto Eliminado ${productId}`:`Error el producto  no existe`); 

    .then(async response => {

      if (!getProduct.ok) {
        throw new Error(`Producto ${productId} no existe(${getProduct.status})`);

      }
      const product = await getProduct.json();
      //  const product = await JSON.parse(await getProduct.text());
      console.log('Eliminando el Producto :', {
        id: product.id,
        title: product.title,
        price: product.price,
        category: product.category,

      });

      // Response.status Indica que la petición fue exitosa pero no hay contenido en la respuesta
      //Si es 204, devolvemos un objeto manual indicando éxito (para evitar el error de JSON vacío
      //response.ok: Booleano que es true para códigos 200-299 y false para el resto.
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      try {
        // response.jsonC : Convierte el cuerpo de la respuesta de JSON a objeto JavaScript y 
        // Solo se ejecuta si pasó las verificaciones anteriores.ata: Contiene:
        //data El objeto manual {success: true} si fue 204
        //El JSON parseado si había contenido
        //Nunca llega aquí si hubo errores

        const data = await response.json();
        return data;
      }
      //Captura cualquier error que ocurra en la cadena:
        //Errores de red
        //Errores HTTP (los que lanzamos con throw)
        //Errores de parseo JSON (aunque ya los estamos controlando)

      catch (e) {
        if (e instanceof SyntaxError && e.message.includes('Unexpected end of JSON input')) {
          // Respuesta vacía pero exitosa
          return { success: true };
        }
        throw e; // captura  otros errores como desconexion a intertenet y no llega a la api.
      }
    })
    .then(data => {
      console.log('Resultado:', data.id);
    })
    .catch(error => {
      console.error('Error el producto  no existe');
    });
}
