<template>
    <li>
      <h2>{{ product.name }}</h2>
      <p>Price: {{ product.price }}</p>
      <p>Stock: {{ product.availability }}</p>
      <button @click="editProduct(product)">Edit</button>
      <button @click="deleteProduct(product.id)">Delete</button>
    </li>
  </template>
  
  <script setup>
  const props = defineProps({
    product: Object,
    editProduct: Function,
    deleteProduct: Function,
  });
  </script>
  