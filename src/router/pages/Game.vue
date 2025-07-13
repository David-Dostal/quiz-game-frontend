<script setup lang="ts">

import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useQuestionsStore } from '@/stores/questions';
import ErrorComponent from "@/components/Error.vue";



let showAnswerAnimation: boolean = false
let nextAnimation: boolean = false
// Define your localStorage keys
const LS_CURRENT_QUESTION_INDEX = "currentQuestionIndex";
const LS_SCORE = "score";
const LS_GAME_HISTORY = "gameHistory";  // add this line


// Initialize state with default values
const currentQuestionIndex = ref(0);
const score = ref(0);
const timeRemaining = ref(15);  // Initialize timer at 20 seconds
let timerId = null;  // To keep track of the timer
const isLoading = ref(false);
const error = ref<string | null>(null);




// Load state from localStorage on mount
onMounted(() => {
  try {
    isLoading.value = true;

    const savedIndex = localStorage.getItem(LS_CURRENT_QUESTION_INDEX);
    const savedScore = localStorage.getItem(LS_SCORE);

    if (savedIndex) currentQuestionIndex.value = JSON.parse(savedIndex);
    if (savedScore) score.value = JSON.parse(savedScore);

  } catch (e: any) {
    console.error(e);
    error.value = "Problem with accessing local storage. 😢";
  } finally {
    isLoading.value = false;
  }

  try {
    isLoading.value = true;




    timerId = setInterval(() => {
      if (timeRemaining.value > 0) {
        timeRemaining.value--;
      } else {
        if (currentQuestionIndex.value != questionsStore.questions.length) {

          nextQuestion();
        }
      }
    }, 1000);  // Decrease time remaining every second

  } catch (e: any) {
    console.error(e);
    error.value = "Problem with setting up the timer. 😢";
  } finally {
    isLoading.value = false;
  }
});


onUnmounted(() => {
  try {
    if (timerId) {
      clearInterval(timerId);
    }
  } catch (e: any) {
    console.error(e);
    error.value = "Problem with clearing the timer. 😢";
  }
});

let questionsStore = useQuestionsStore();
const currentQuestion = computed(() => {
  return questionsStore.questions[currentQuestionIndex.value];
});

const nextQuestion = () => {

  try {
    nextAnimation = true

    setTimeout(() => {
      nextAnimation = false;

    }, 1000);




    currentQuestionIndex.value++;
    // Save current question index to localStorage when it changes
    localStorage.setItem(LS_CURRENT_QUESTION_INDEX, JSON.stringify(currentQuestionIndex.value));
    timeRemaining.value = 15;
  } catch (e: any) {
    console.error(e);
    error.value = "Problem with advancing to the next question. 😢";
  }
};

const saveGameRecord = () => {
  try {
    isLoading.value = true;
    questionsStore.saveGameHistory(score.value, new Date());
  } catch (e: any) {
    console.error(e);
    error.value = "Problem with saving the game record. 😢";
  } finally {
    isLoading.value = false;
  }
};

const deleteData = () => {
  try {
    localStorage.removeItem('questions');
    localStorage.removeItem('currentQuestionIndex');
    localStorage.removeItem('score');
  } catch (e: any) {
    console.error(e);
    error.value = "Problem with deleting data from local storage. 😢";
  }
};

type AnswerKeys = "answer_a" | "answer_b" | "answer_c" | "answer_d" | "answer_e" | "answer_f";

const submitAnswer = (answerKey: AnswerKeys) => {
  try {
    const isCorrect = currentQuestion.value.correct_answers[`${answerKey}_correct`] === "true";

    if (isCorrect) {
      const difficultyScore = getDifficultyScore(currentQuestion.value.difficulty);
      const timeScore = getTimeScore(timeRemaining.value);
      const questionScaleFactor = 20 / questionsStore.questions.length; // Compute the scaling factor based on total question count (api sends max 20)

      score.value += (difficultyScore + timeScore) * questionScaleFactor; // Apply the scaling factor
      showAnswerAnimation = true


      // Save score to localStorage when it changes
      localStorage.setItem(LS_SCORE, JSON.stringify(score.value));
    }

    setTimeout(() => {
      showAnswerAnimation = false;

    }, 2000);




    nextQuestion();
  } catch (e: any) {
    console.error(e);
    error.value = "Problem with submitting the answer. 😢";
  }
};

const getDifficultyScore = (difficulty: string) => {
  switch (difficulty) {
    case 'Easy':
      return 1;
    case 'Medium':
      return 2;
    case 'Hard':
      return 3;
    default:
      return 0;
  }
};

const getTimeScore = (remainingTime: number) => {
  if (remainingTime >= 10) {
    return 3;
  } else if (remainingTime >= 5) {
    return 2;
  } else {
    return 1;
  }
};

</script>


<template>
  <div class="error-wrapper">
    <ErrorComponent v-if="questionsStore.error != null || error != null" :message="questionsStore.error || error" />
    <div class="loading-wrapper">
      <Loading v-if="questionsStore.isLoading || isLoading === true" />
      <div v-else>

        <div class="homepage">
          <div class="header">
            <h1><router-link to="/" class="header-link">TechVia</router-link></h1>
          </div>



          <v-card :class="{ 'fade-in': nextAnimation }" class="box" v-if="currentQuestion">
            <v-card-text>
              <v-row>
                <v-col cols="4" class="text-left">
                  <p>{{ currentQuestion.category }}</p>
                </v-col>

                <v-col cols="4" class="text-center">
                  <p>{{ currentQuestionIndex + 1 }}/{{ questionsStore.questions.length }}</p>
                </v-col>

                <v-col cols="4" class="text-right">
                  <p>Score: {{ score.toFixed(0) }}</p>
                </v-col>
              </v-row>

              <p style="padding: 30px;">{{ currentQuestion.question }}</p>



            </v-card-text>


            <v-card-actions class="center-actions" v-if="showAnswerAnimation">
              <p class="correct-answer">Correct Answer!</p>
            </v-card-actions>

            <p>Time remaining:</p>
            <p :style="{ color: timeRemaining <= 5 ? '#DD4545' : '#fff' }">{{ timeRemaining }}</p>

          </v-card>


          <v-card class="buttons" v-if="currentQuestion">
            <v-card-text>


              <div class="button-container">


                <div v-for="(answer, key) in currentQuestion.answers" :key="key">
                  <v-btn style="height: 50px;" class="button-answer" v-if="answer && answer.trim() !== ''"
                    @click="submitAnswer(key)" :data-test-id="'answer-button-' + key">
                    <div class="multiline-text">{{ answer }}</div>
                  </v-btn>
                </div>
              </div>

            </v-card-text>
            <v-card-actions>

            </v-card-actions>
          </v-card>


          <v-card :class="{ 'fade-in': nextAnimation }" class="final"
            v-if="currentQuestionIndex === questionsStore.questions.length">
            <v-card-text class="d-flex flex-column align-center">
              <v-row class="mt-6">
                <v-col cols="12" class="text-center">
                  <v-img v-if="score >= 80" src="@/assets/medals/gold.png" width="200" height="80"></v-img>
                  <v-img v-else-if="score >= 55" src="@/assets/medals/silver.png" width="200" height="80"></v-img>
                  <v-img v-else-if="score >= 35" src="@/assets/medals/bronze.png" width="200" height="80"></v-img>
                  <p v-else class="end-text">Try again</p>
                </v-col>
              </v-row>

              <v-row align="center" class="mt-8">
                <v-col cols="12" class="text-center">
                  <p class="score">Score: {{ score.toFixed(0) }}</p>
                </v-col>
              </v-row>

              <v-row align="center" class="mt-16">
                <v-col cols="12" class="text-center">
                  <v-btn class="button mr-12" to="/start">Start</v-btn>
                  <v-btn data-test-id="results-button" class="button ml-12" to="/results">Results</v-btn>
                </v-col>
              </v-row>

              <save-game-record></save-game-record>
              <delete-data></delete-data>
            </v-card-text>
          </v-card>
        </div>
      </div>
    </div>
  </div>
</template>


<style>
.end-text {
  font-family: "Rock 3D";
  font-size: 60px;
  font-weight: bold;
}


.fade-in {
  animation: fadeAnimation 1s;
}

@keyframes fadeAnimation {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}





.center-actions {
  display: flex;
  justify-content: center;
  align-items: center;
}

@keyframes popOutAnimation {
  0% {
    opacity: 0;
    transform: scale(0);
  }

  50% {
    opacity: 1;
    transform: scale(1.2);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.correct-answer {
  animation: popOutAnimation 1s;
  background-color: green;
  color: white;
  padding: 10px;
  border-radius: 5px;
}


.multiline-text {
  padding: 5px;
  white-space: normal;
  word-wrap: break-word;
  height: auto;
  display: inline-block;
}


.button-answer {

  height: auto;
  font-size: 12px;
  width: 550px;
  color: #fff;
  background-color: #DD4545;



}

.button-answer:hover {
  color: #DD4545;
  background-color: #fff;
}

.score {
  font-size: 45px;
}

.button {
  font-size: 20px;
  font-weight: bold;
  width: 200px;
  color: #fff;
  background-color: #DD4545;
}

.button:hover {
  background-color: #fff;
  color: #C0392B;
}


.final {
  background-color: #0E4749;
}

.header {
  text-align: center;
}

.buttons {
  padding: 20px;
  background-color: #002626;
}

.button-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  justify-items: center;
}

.box {
  background-color: #0E4749;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
  padding: auto;
}

.box p {
  font-size: 24px;
  margin-bottom: 20px;
  color: #fff;
}

.header h1 {
  font-size: 96px;
  font-family: "Rock 3D";
  /* Ensure the correct name and it is available in your project */
  margin-bottom: 20px;
}

.header-link {
  color: #DD4545;
  /* The secondary color */
  text-decoration: none;
}
</style>