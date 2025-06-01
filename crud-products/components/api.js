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
  const getProduct = await fetch(`${API_URL}/${productId}` );
    if (!getProduct.ok) throw new Error(`Producto ${productId} no existe`);
        const product = await getProduct.json();
        console.log('Eliminando el Producto :', {
          id: product.id,
          title: product.title,
          price: product.price,
          category: product.category,
         
  });
    const getProducts = await fetch(`${API_URL}/${productId}`, {
    method: 'DELETE',
  });
  if (!getProducts.ok) throw new Error(`Error al eliminar el producto ${productId}`);
  return await getProducts.json();
}

