<template>
  <div class="product-form">
    <h3>{{ isEditing ? 'Edit Product' : 'Add Product' }}</h3>
    <form @submit.prevent="handleSubmit">
      <div class="form-row">
        <label for="name">Name:</label>
        <input type="text" v-model="localProduct.name" id="name" required />

        <label for="price">Price:</label>
        <input type="number" v-model="localProduct.price" id="price" step="0.01" required />

        <label for="availability">Stock:</label>
        <input type="number" v-model="localProduct.availability" id="availability" required />

        <button type="submit">{{ isEditing ? 'Save' : 'Add' }}</button>
        <button type="button" @click="cancelForm">Cancel</button>
      </div>
    </form>
  </div>
</template>

  
  <script setup>
  import { ref, watch } from 'vue';
  import {onMounted } from 'vue';
  

  const props = defineProps({
    product: Object, 
    isEditing: Boolean, 
  });
  
  
    onMounted(() => {
        document.getElementById('name').focus();
    });



  const emit = defineEmits(['submit', 'cancel']);
  

  const localProduct = ref({ ...props.product });
  

  watch(
    () => props.product,
    (newProduct) => {
      localProduct.value = { ...newProduct };
    },
    () => props.isEditing, 
    (isEditing) => {
      if (isEditing) {
        document.getElementById('name').focus();
      }
    },
    { immediate: true } 
  );
  

  const handleSubmit = () => {
    emit('submit', { ...localProduct.value }); 
  };
  
 
  const cancelForm = () => {
    emit('cancel');
  };
  </script>

  <style scoped>
  .product-form {
    border-top: 1px solid #ccc;
  }
    form {
        border: 1px solid #ccc;
        padding: 1rem 0;
    }
    label {
        font-weight: bold;
        padding: 0.5rem;
    }
    input {
        padding: 0.5rem;
        margin: 0.5rem;
        border: 1px solid #ccc;
    }

    </style>
  