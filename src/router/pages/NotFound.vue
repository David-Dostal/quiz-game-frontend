<template>
    <div>
        <h1>404 Not Found</h1>
        <p>The page you are looking for does not exist.
            <router-link :to="{ name: 'homepage' }">Go home</router-link>
        </p>
    </div>
</template>
  
<style scoped>
h1 {
    font-size: 4rem;
    color: red;
}
</style>