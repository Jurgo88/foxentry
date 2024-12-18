import axios from 'axios';

const api = axios.create({
  baseURL: '/api',  // Proxy, redirect  http://127.0.0.1/api
  headers: {
    'Content-Type': 'application/json',
  },
});

// Funkcie pre API volania
export const getOrders = async () => {
    try {
      const response = await api.get('/orders');
      console.log('API response:', response.data); 
      return response;
    } catch (error) {
      console.error('Chyba pri volaní API:', error); 
      throw error; 
    }
};

export const getProducts = async () => {
    try {
        const response = await api.get('/products');
        console.log('API response:', response.data); 
        return response;
    } catch (error) {
        console.error('Chyba pri volaní API:', error); 
        throw error; 
    }
};

export const getSearchProducts = (query) => {
    return api.get(`/products`, {
      params: { search: query },
    });
};

export const addProductToAPI = async (productData) => {
    try {
        // console.log('Adding product to the API...');
        // console.log('Product data:', productData);
        // console.log(axios.post('/products', productData));
      const response = await axios.post('/products', productData);
      console.log('Product added to the API.');
      return response.data;
    } catch (error) {
      console.error('Error adding product to the API:', error);
    }
  }

export const deleteProductFromAPI = async (productId) => {
    try {
      await axios.delete(`/products/${productId}`);
      console.log(`Product with id ${productId} deleted from the API.`);
    } catch (error) {
      console.error('Error deleting product from the API:', error);
    }
  };

export const editProductFromAPI = async (productId) => {
    try {
      await axios.put(`/products/${productId}`);
      console.log(`Product with id ${productId} edited from the API.`);
    } catch (error) {
      console.error('Error editing product from the API:', error);
    }
  };
  


export const getOrderById = (id) => {
  return api.get(`/orders/${id}`);
};

export const createOrder = (orderData) => {
  return api.post('/orders', orderData);
};
