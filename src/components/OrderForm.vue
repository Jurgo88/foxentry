<template>
    <h3>Create Order</h3>
    <div class="order-form">
      <form @submit.prevent="handleSubmit">
        <div class="form-row">
          <label for="product">Product:</label>
          <select v-model="selectedProductId" id="product" @change="updateSelectedProduct" required>
            <option v-for="product in products" :key="product.id" :value="product.id">
              {{ product.name }} ({{ product.availability }})
            </option>
          </select>
        </div>
  
        <p v-if="selectedProduct">
          Available: {{ selectedProduct.availability }} | Price: ${{ selectedProduct.price.toFixed(2) }}
        </p>
  
        <div v-if="selectedProduct && selectedProduct.availability < 1">
          <p>Not enough stock</p>
        </div>
  
        <div class="form-row" v-else>
          <label for="amount">Amount:</label>
          <input
            type="number"
            v-model.number="amount"
            id="amount"
            :max="selectedProduct ? selectedProduct.availability : null"
            min="1"
            required
          />
  
          <label for="customer">Customer Name:</label>
          <input type="text" v-model="customerName" id="customer" required />
        </div>
  
        <div class="buttons">
          <button v-if="selectedProduct && selectedProduct.availability > 0" type="submit">Add Order</button>
          <button type="button" @click="cancelForm">Cancel</button>
        </div>
      </form>
    </div>
  </template>
  
  
  <script setup>
  import { ref, watch } from 'vue';
  import { useShopStore } from '../stores/shopStore';
  
  const store = useShopStore();
  const products = store.products;
  
  const selectedProductId = ref(null);
  const amount = ref(1);
  const customerName = ref('');
  const selectedProduct = ref(null);
  
  const emit = defineEmits(['submit', 'cancel']);
  
  const updateSelectedProduct = () => {
    selectedProduct.value = products.find((product) => product.id === selectedProductId.value) || null;
  };
  
  watch(selectedProductId, updateSelectedProduct);


  const handleSubmit = () => {
    if (!selectedProductId.value || !customerName.value || !selectedProduct.value) return;
  
    if (selectedProduct.value.availability < amount.value) {
      alert('Not enough stock');
      return;
    }
  
    const order = {
      product_id: selectedProduct.value.id,
      product_name: selectedProduct.value.name,
      amount: amount.value,
      customer_name: customerName.value,
    };
  
    emit('submit', order);
  };

  const cancelForm = () => {
    emit('cancel');
  };
  </script>
  
  <style scoped>
  .order-form {
    margin: 1rem auto;
    padding: 1rem;
    border: 1px solid #ccc;
  }
  
  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .form-row {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  .form-row label {
    min-width: 100px; 
    text-align: right;
  }
  
  .form-row select,
  .form-row input {
    flex: 1; 
  }
  
  .buttons {
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
  }
  </style>
  
  