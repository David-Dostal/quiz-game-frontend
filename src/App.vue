
import LoggedUser from './components/LoggedUser.vue';

<template>
  <v-app>

    <v-main>
      <v-container class="py-10">
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
.appbar {
  background: #002626;
}
</style>

<script setup lang="ts">
import { onMounted } from "vue";


onMounted(() => {
});
</script>
