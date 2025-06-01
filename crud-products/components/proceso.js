import 
{
  fetchAllProducts,
  fetchProductById,
  createProduct,
  deleteProduct,
} from './api.js';

export async function inicioProceso(args) {

  const [method, path, ...data] = args;

  switch (method.toUpperCase()) {
    case 'GET':
      if (path === 'products') {
        const products = await fetchAllProducts()
       
        //filtro por propiedades
            const descProduct = products.map(({id,title,price,category}) => ({
              id,title,price,category
            })); 
              console.log(descProduct);// Muestra los argumentos de la terminal
      } else if (path.startsWith('products/')) {
        const productId = path.split('/')[1];
        const product = await fetchProductById(productId);
        //aca traigo en json
        //Solo muestro con destructuring title, price y category
        const {id,title, price, category} = product;   
        console.log({id,title,price, category});
            } else {
        throw new Error('Ruta no válida para GET');
      }
      break;

    case 'POST':
      if (path === 'products') {
        const [title, price, category] = data;
        const newProduct = await createProduct({ title, price, category });
        console.log('Producto creado:', newProduct);
      }
      break;

    case 'DELETE':
      if (path.startsWith('products/')) {
        const productId = path.split('/')[1];
        const deletedProduct = await deleteProduct(productId);
        console.log('Producto eliminado:', productId);
       
      }
      break;

    default:
      throw new Error(`Comando no soportado: ${method}`);
  }
}

