<template>
  <div>
    <h2>Orders</h2>
    <ul>
      <div v-if="!orders.length">No orders</div>
      <div v-else class="orders-header">
        <span>Product</span>
        <span>Customer</span>
        <span>Amount</span>
        <span>Price</span>
      </div>
      <li v-for="order in orders" :key="order.id">
        <div class="order-list">
          <span>{{ order.product_name }}</span>
          <span>{{ order.customer_name }}</span>
          <span>{{ order.amount }}</span>
          <span>{{ calculateOrderPrice(order) }}</span>
        </div>
      </li>
    </ul>
    <div v-if="orders.length" class="total-price">
      <strong>Total Price: {{ totalPrice }}</strong>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import { useShopStore } from '../stores/shopStore';

const store = useShopStore();

const orders = computed(() => store.orders);


const calculateOrderPrice = (order) => {
  const product = store.products.find((product) => product.id === order.product_id);
  const price = product ? order.amount * product.price : 0; 
  return price.toFixed(2);
};


const totalPrice = computed(() => {
  return orders.value.reduce((acc, order) => {
    const product = store.products.find((product) => product.id === order.product_id);
    return product ? acc + order.amount * product.price : acc;
  }, 0);
});


onMounted(() => {
  store.fetchOrders();
  store.fetchProducts();
});
</script>

<style scoped>
ul {
  list-style: none;
  padding: 0;
  display: grid;
  gap: 1em;
}

li {
  padding: 0.5em;
  border-bottom: 1px solid #ccc;
}

li span {
  display: inline-block;
}

.orders-header {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  font-weight: bold;
}

.order-list {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 1em;
}

.total-price {
  margin-top: 1em;
  font-size: 1.2em;
}
</style>
