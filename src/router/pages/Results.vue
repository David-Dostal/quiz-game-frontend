<template>
    <div class="error-wrapper"></div>
    <ErrorComponent v-if="error != null" :message="error" />



    <div class="loading-wrapper">

        <Loading v-if="isLoading === true" />
        <div v-else>

            <div class="homepage">
                <div class="header">
                    <h1><router-link to="/" class="header-link">TechVia</router-link></h1>
                </div>
                <v-card class="box">
                    <v-card-text>
                        <v-row v-if="gameHistory.length === 0">
                            <v-col cols="12" class="text-center">
                                <p>No game records found.</p>
                            </v-col>
                        </v-row>
                        <v-row v-else>
                            <v-col v-for="(record, index) in gameHistory" :key="index" cols="6" sm="4" md="3">
                                <v-card class="game-record">
                                    <v-card-title>
                                        <span class="game-number">Game {{ index + 1 }}</span>
                                    </v-card-title>
                                    <v-card-subtitle>

                                        <v-img v-if="record.score >= 80" src="@/assets/medals/gold.png" width="200"
                                            height="80"></v-img>
                                        <v-img v-else-if="record.score >= 55" src="@/assets/medals/silver.png" width="200"
                                            height="80"></v-img>
                                        <v-img v-else-if="record.score >= 35" src="@/assets/medals/bronze.png" width="200"
                                            height="80"></v-img>
                                        <div v-else class="try-again-container">
                                            <h3 class="try-again">Try</h3>
                                            <br>
                                            <h3 class="try-again">Again</h3>
                                        </div>

                                    </v-card-subtitle>
                                    <v-card-text>
                                        <span class="game-score">Score: {{ record.score.toFixed(0) }}</span><br>
                                        <span class="game-time">Time: {{ new Date(record.timestamp).toLocaleString()
                                        }}</span>
                                    </v-card-text>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Loading from "@/components/Loading.vue";

const error = ref<string | null>(null);

const LS_GAME_HISTORY = "gameHistory";

const isLoading = ref(false);


interface GameRecord {
    score: number;
    timestamp: string;
}

const gameHistory = ref<GameRecord[]>([]);


onMounted(() => {
    try {
        isLoading.value = true
        const savedGameHistory = localStorage.getItem(LS_GAME_HISTORY);

        if (savedGameHistory) gameHistory.value = JSON.parse(savedGameHistory);
    } catch (e: any) {
        console.error(e);
        error.value = "Cannot load game records. 😢";
    } finally {
        isLoading.value = false;
    }

    if (!error.value) {
    };
});



defineExpose({
    gameHistory,
});

</script>

<style scoped>
.try-again-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 80px;
}

.try-again {
    color: #fff;
    font-family: "Rock 3D";

    font-size: 20px;
    text-align: center;
}


.homepage {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
}

.header {
    text-align: center;
    margin-bottom: 50px;
}

.header h1 {

    font-size: 96px;
    font-family: "Rock 3D";
    margin-bottom: 20px;
}

.header-link {
    color: #DD4545;
    text-decoration: none;
}

.box {
    width: 100%;
    max-width: 800px;
    background-color: #0E4749;
    color: #fff;
}

.game-record {
    display: flex;
    flex-direction: column;
    background-color: #1f2f3b;
    color: #fff;
    margin: 5px;
}

.trophy-icon {
    color: #DD4545;
    font-size: 48px;
}

.game-details {
    display: flex;
    flex-direction: column;
}

.game-number,
.game-score,
.game-time {
    margin: 2px 0;
    color: #fff;
}

.game-number {
    font-weight: bold;
}

.game-score {
    color: #DD4545;
}

.game-time {
    color: #28B463;
}
</style>
