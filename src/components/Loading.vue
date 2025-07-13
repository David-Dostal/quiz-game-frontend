<template>
  <div class="loading-wrapper">
    <div class="loading-element">
      <div class="loading-bar"></div>
      <div class="loading-bar"></div>
      <div class="loading-bar"></div>
      <div class="loading-bar"></div>
    </div>
  </div>
</template>
  
<style scoped>
.loading-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.loading-element {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 60px;
}

.loading-bar {
  width: 10px;
  height: 40px;
  margin: 0 2px;
  background-color: #DD4545;
  ;
  animation: loading-animation 1.2s infinite;
}

@keyframes loading-animation {
  0% {
    height: 40px;
  }

  50% {
    height: 20px;
  }

  100% {
    height: 40px;
  }
}</style>