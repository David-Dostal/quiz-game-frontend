
<template>
    <div class="homepage">
        <div class="header">
            <h1><router-link to="/" class="header-link">TechVia</router-link></h1>
        </div>
        <div class="box">
            <p>Welcome to TechVia, the future of technology exploration.</p>
            <div class="buttons">
                <router-link to="/start" class="btn start">Start</router-link>
                <router-link to="/results" class="btn results">Results</router-link>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
// Import any necessary scripts here
</script>

<style scoped>
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
    /* Ensure the correct name and it is available in your project */
    margin-bottom: 20px;
}

.header-link {
    color: #DD4545;
    /* The secondary color */
    text-decoration: none;
}


.box {
    background-color: #0E4749;
    padding: 20px;
    border-radius: 5px;
    text-align: center;
}

.box p {
    font-size: 24px;
    margin-bottom: 20px;
    color: #fff;
}

.buttons {
    display: flex;
    justify-content: space-around;
    width: 100%;
    margin-top: 20px;
    background-color: #0E4749;
}

.btn {
    width: 200px;
    display: inline-block;
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