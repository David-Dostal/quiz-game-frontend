<template>
  <div class="error">
    <p>{{ message }}</p>
  </div>
</template>
  
<script setup lang="ts">
defineProps<{
  message: string;
}>();
</script>
  
<style scoped>
.error {
  background-color: #f2dede;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
  color: #a94442;
  font-weight: bold;
  margin: 20px 0;
}

.error p {
  margin: 0;
}
</style>