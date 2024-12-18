// src/stores/shopStore.js
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getOrders, getProducts, getSearchProducts, deleteProductFromAPI, editProductFromAPI, addProductToAPI } from '../api';

export const useShopStore = defineStore('shop', () => {
const orders = ref([]);
const products = ref([]);
const searchResults = ref([]);

  const fetchOrders = async () => {
    try {
      const response = await getOrders();
      orders.value = response.data;
      console.log('Orders fetched:', orders.value);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await getProducts();
      products.value = response.data;
      console.log('Products fetched:', products.value);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const searchProducts = async (query) => {
    try {
      const response = await getSearchProducts(query); 
      searchResults.value = response.data; 
      console.log('Searched products:', searchResults.value);
    } catch (error) {
      console.error('Error searching products:', error);
    }
  };

 
 const deleteProduct = async (productId) => {
    try {
      // Remove from the backend
      await deleteProductFromAPI(productId); 

      // Remove from the local state
      products.value = products.value.filter((product) => product.id !== productId);
      console.log(`Product with id ${productId} deleted successfully`);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  
  const updateProduct = async (updatedProduct) => {
    try {
        // Update product on the backend
        // await updateProductInAPI(updatedProduct); 

        // Update the local state
        const index = products.value.findIndex((product) => product.id === updatedProduct.id);
        if (index !== -1) {
            products.value[index] = updatedProduct;
        }
        console.log(`Product with id ${updatedProduct.id} updated successfully`);
    } catch (error) {
        console.error('Error updating product:', error);
    }
  };

  
  const addProduct = async (newProduct) => {
    try {
        await addProductToAPI(newProduct);

        // Add to the local state
        products.value.push(newProduct);
      console.log(`Product with name ${newProduct.name} added successfully`);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };



  const addOrder = (order) => {
    orders.value.push(order);
  };

  const removeOrder = (orderId) => {
    orders.value = orders.value.filter((order) => order.id !== orderId);
  };




  return {
    orders,
    products,
    searchResults,
    fetchOrders,
    fetchProducts,
    searchProducts,
    deleteProduct,
    updateProduct,
    addProduct,
    addOrder,
  };
});
