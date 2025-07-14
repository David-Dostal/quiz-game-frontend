<script setup lang="ts">
import { useQuestionsStore } from '@/stores/questions';
import { computed, reactive, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { axiosInstance } from "@/code/api";
import Loading from "@/components/Loading.vue";
import ErrorComponent from "@/components/Error.vue";


const router = useRouter();
const isLoading = ref(false);
const error = ref<string | null>(null);


const LS_CURRENT_QUESTION_INDEX = "currentQuestionIndex";
const LS_SCORE = "score";
const LS_QUESTIONS = "questions";

const questionsStore = useQuestionsStore();





const state = reactive({
    difficulty: "easy",
    selectedCategory: "Unspecified",
    categories: ["Unspecified", 'Linux', 'DevOps', 'Networking', 'Programming', 'Docker'],
    questions: 1,
    snackbar: false,
    error: null as string | null,
});

const filteredSelectedCategory = computed(() => {
    // Return an empty string if selectedCategory is "Unspecified"
    return state.selectedCategory === "Unspecified"
        ? ""
        : state.selectedCategory;
});


const isGameInProgress = ref(false);


onMounted(() => {

    try {


        isLoading.value = true

        const savedCurrentQuestionIndex = Number(localStorage.getItem(LS_CURRENT_QUESTION_INDEX));
        const savedQuestions = JSON.parse(localStorage.getItem(LS_QUESTIONS) || "[]");

        // If currentQuestionIndex exists and is less than the size of savedQuestions, the user had a game in progress
        if (savedCurrentQuestionIndex < savedQuestions.length) {
            isGameInProgress.value = true;
        } else {
            isGameInProgress.value = false;
        }




    } catch (e: any) {
        console.error(e);
        error.value = "Problem with checking whether there is a game to be resumed. 😢";
    } finally {
        isLoading.value = false;
    }

});


const fetchQuestions = async () => {


    try {


        isLoading.value = true

        sessionStorage.clear();
        error.value = null;


        // smaze otazky z loudu po zapnuti ale pak po spusteni neni zadna
        questionsStore.questions.splice(0, questionsStore.questions.length)


        localStorage.removeItem('questions');
        localStorage.removeItem('currentQuestionIndex');
        localStorage.removeItem('score');


        // takze tady zavolam api dotaz a dam ho do toho storu protoze tady to neco dele a primo v tom storu ne 
        //throw new Error("Simulated error");

        const params: { apiKey: string; difficulty: string; limit: number; category?: string } = {
            apiKey: 'key', // replace with your API key
            difficulty: state.difficulty,
            limit: state.questions,
        };

        if (state.selectedCategory !== "Unspecified") {
            params.category = state.selectedCategory;
        }

        const response = await axiosInstance.get('https://quizapi.io/api/v1/questions', { params });

        questionsStore.questions = response.data
    } catch (e: any) {
        console.error(e);
        error.value = "Cannot download questions. 😢";
    } finally {
        isLoading.value = false;
    }


    await questionsStore.fetchSpecificQuestions(state.difficulty, state.questions, state.selectedCategory);
    isLoading.value = false

    if (!error.value || questionsStore.error) {
        router.push({ name: 'game' });
    }
};

const resumeGame = () => {
    try {

        isLoading.value = true

        const currentQuestionIndex = localStorage.getItem(LS_CURRENT_QUESTION_INDEX);
        const score = localStorage.getItem(LS_SCORE);
        const question = localStorage.getItem(LS_QUESTIONS);

        // If any of the localStorage items exist, the user had a game in progress
        if (currentQuestionIndex || score || question) {
            isGameInProgress.value = true;

            // Load the questions from localStorage into the store
            questionsStore.questions = JSON.parse(question || "[]");

        }

    } catch (e: any) {
        console.error(e);
        error.value = "Cannot resume game. 😢";
    } finally {
        isLoading.value = false;
    }

    if (!error.value) {


        router.push({ name: 'game' });
    }
};
</script>


<template>
    <div class="error-wrapper">
        <ErrorComponent v-if="questionsStore.error != null || state.error != null"
            :message="questionsStore.error || state.error" />

        <div v-else class="loading-wrapper">
            <Loading v-if="questionsStore.isLoading || isLoading" />

            <div v-else class="homepage">
                <div class="header">
                    <h1><router-link to="/" class="header-link">TechVia</router-link></h1>
                </div>

                <v-card class="box">
                    <v-card-text>
                        <v-row>
                            <v-col cols="4">
                                <p>Difficulty:</p>
                                <v-radio-group v-model="state.difficulty">
                                    <v-radio data-test-id="difficulty-radio-easy" label="Easy" value="easy"></v-radio>
                                    <v-radio data-test-id="difficulty-radio-medium" label="Medium" value="medium"></v-radio>
                                    <v-radio data-test-id="difficulty-radio-hard" label="Hard" value="hard"></v-radio>
                                </v-radio-group>
                            </v-col>
                            <v-col cols="4">
                                <p>Categories:</p>
                                <v-select data-test-id="category-select" v-model="state.selectedCategory"
                                    :items="state.categories" label="Select Category"></v-select>

                            </v-col>
                            <v-col cols="4">
                                <p>How many questions:</p>
                                <v-slider data-test-id="questions-slider" color="#DD4545" v-model="state.questions" min="1"
                                    max="20" step="1"></v-slider>
                                <p>{{ state.questions }}</p>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-card-actions class="button-container">
                        <v-btn data-test-id="start-game-button" @click="fetchQuestions" class="btn">Start game</v-btn>
                        <v-btn data-test-id="resume-game-button" v-if="isGameInProgress" @click="resumeGame"
                            class="btn">Resume game</v-btn>

                    </v-card-actions>
                </v-card>
            </div>
        </div>
    </div>
</template>


<style scoped>
.homepage {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
}

.button-container {
    display: flex;
    justify-content: center;
    width: 100%;
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

.btn {
    width: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 15px 25px;
    font-size: 20px;
    font-weight: bold;
    text-decoration: none;
    border-radius: 5px;
    border: none;
    color: #fff;
    background-color: #DD4545;
}

.btn:hover {
    background-color: #fff;
    color: #C0392B;
}
</style>