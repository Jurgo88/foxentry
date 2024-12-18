<template>
    <div class="product-list">
      <h1>Product List</h1>
  
      <search-bar v-if="!isAddingProduct" v-model:query="search" />
      <button @click="startAddProduct" v-if="!isAddingProduct && !editingProduct">Add Product</button>
      
      <button @click="startAddOrder" v-if="!isAddingProduct && !editingProduct">Create Order</button>
  
      <product-form
        v-if="isAddingProduct || editingProduct"
        :product="currentProduct"
        :isEditing="!!editingProduct"
        @submit="handleFormSubmit"
        @cancel="cancelAdd"
      />

      <order-form
        v-if="isAddingOrder"
        @submit="handleOrderSubmit"
        @cancel="cancelOrder"
      />
  
      <ul v-if="!isAddingProduct" >
        <product-item
          v-for="product in filteredProducts"
          :key="product.id"
          :product="product"
          :editProduct="editProduct"
          :deleteProduct="deleteProduct"
        />
      </ul>
    </div>
  </template>
  
  <script setup>
  import { computed, ref, onMounted, watch } from 'vue';
  import { useShopStore } from '../stores/shopStore';
  import ProductItem from './ProductItem.vue';
  import ProductForm from './ProductForm.vue';
  import SearchBar from './SearchBar.vue';
  import OrderForm from './OrderForm.vue';
  
  const store = useShopStore();
  
  const search = ref('');
  const isAddingProduct = ref(false);
  const editingProduct = ref(null);
  const currentProduct = ref({ name: '', price: 0, availability: 0 });
  const isAddingOrder = ref(false);
  
  const products = computed(() => store.products);
  const orders = computed(() => store.orders);
  
  const filteredProducts = computed(() => {
    if (!search.value) return products.value;
    return products.value.filter((product) =>
      product.name.toLowerCase().includes(search.value.toLowerCase())
    );
  });
  
  const startAddProduct = () => {
    isAddingProduct.value = true;
    currentProduct.value = { name: '', price: 0, availability: 0 };
    editingProduct.value = null;
  };
  
  const editProduct = (product) => {
    editingProduct.value = product;
    currentProduct.value = { ...product };
    isAddingProduct.value = true;
  };
  
  const deleteProduct = (id) => {
    store.deleteProduct(id);
  };

  const startAddOrder = () => {
    isAddingOrder.value = true;
  };
  
  const handleFormSubmit = async (product) => {
    if (editingProduct.value) {
      await store.updateProduct(product);
    } else {
      await store.addProduct(product);
    }
    cancelAdd();
  };

  const handleOrderSubmit = async (order) => {
    // console.log(order);
    await store.addOrder(order);
    updateProductList(order);

    cancelOrder();
  };

  const cancelOrder = () => {
    isAddingOrder.value = false;
  };
  
  const cancelAdd = () => {
    isAddingProduct.value = false;
    editingProduct.value = null;
    currentProduct.value = { name: '', price: 0, availability: 0 };
  };

  const updateProductList = async (order) => {
    const product = store.products.find((product) => product.id === order.product_id);
    product.availability -= order.amount;
    await store.updateProduct(product);
  };
  
  onMounted(() => {
    store.fetchProducts();
  });
  
  watch(search, (value) => {
    if (value.trim()) {
      store.searchProducts(value);
    } else {
      store.fetchProducts();
    }
  });
  </script>

  <style>
  .product-list {
    /* max-width: 800px; */
    margin: 0 auto;
  }
  .product-list li {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr auto auto;
    gap: 1rem;
    align-items: center;
    padding: 1rem;
    border: 1px solid #ccc;
    margin: 0.5rem 0;
    /* border-radius: 0.5rem; */
  }
  .product-list ul {
    padding: 0;
  }
  </style>

  