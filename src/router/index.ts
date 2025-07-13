import Homepage from "@/router/pages/Homepage.vue";
import Start from "@/router/pages/Start.vue";
import Game from "@/router/pages/Game.vue";
import ResultPage from "@/router/pages/Results.vue";

import NotFound from "@/router/pages/NotFound.vue";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  { path: "/", component: Homepage, name: "homepage" },

  { path: "/start", component: Start, name: "start" },

  { path: "/game", component: Game, name: "game" },

  { path: "/results", component: ResultPage, name: "results" },
  
  { path: "/:pathMatch(.*)*", component: NotFound, name: "notfound" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


export default router;
