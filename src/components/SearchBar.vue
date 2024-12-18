<template>
    <div>
      <label>Search:</label>
      <br>
      <input
        type="text"
        :value="query" 
        @input="updateQuery($event.target.value)"
        placeholder="Search products..."
      />
      <button @click="clearSearch" v-if="query">Clear</button>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    query: String, 
  });
  
  const emit = defineEmits(['update:query']); 
  
  
  const updateQuery = (value) => {
    emit('update:query', value); 
  };
  
  
  const clearSearch = () => {
    emit('update:query', ''); 
  };

 
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      clearSearch();
    }
  });
  </script>

  <style scoped>
    input {
      width: -webkit-fill-available;
      /* height: 2rem; */
      font-size: large;
      padding: 0.5rem;
    }
    label {
      margin-right: 0.5rem;
      width: 100%;
    }
  </style>
  