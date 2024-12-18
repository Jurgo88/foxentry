<script setup>
import OrderList from './components/OrderList.vue';
import ProductList from './components/ProductList.vue';

import { useShopStore } from './stores/shopStore';
import { onMounted } from 'vue';


</script>

<template>
  <div>
    <img alt="Vue logo" src="https://foxentry.com/assets/img/logo-foxentry.svg" class="logo" />
    <div class="dashboard">
      <div class="products">
        <ProductList />
      </div>
      <div class="orders">
        <OrderList /> 
      </div>


    </div>
     
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
.dashboard {
  display: flex;
  gap: 2em;
  padding: 2em;
  background-color: #f5f5f5;
  border-radius: 1em;
  height: 80%;
}
.dashboard > * {
  padding: 1em;
  background-color: white;
  /* border-radius: 1em; */
}
.products {
  flex: 2;
}
.orders {
  flex: 1;
}

</style>
