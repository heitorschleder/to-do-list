<template>
  <div id="app">
    <TodoList />
    <AppFooter />
  </div>
</template>

<script>
import TodoList from './views/TodoList.vue';
import AppFooter from './components/Footer.vue';

export default {
  name: 'App',
  components: {
    TodoList,
    AppFooter,
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap');
#app {
  font-family: "Manrope", sans-serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  background: rgb(194,227,255);
  background: linear-gradient(180deg, rgba(194,227,255,1) 0%, rgba(229,243,255,1) 100%);
}

</style>
