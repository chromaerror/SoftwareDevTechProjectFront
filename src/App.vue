<template>
  <div id="app">
    <h1 id="title">CO2 Emissions</h1>
    <Capitacheck />
    <Searchbar />
  </div>
</template>

<script>
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import Searchbar from '@/components/Searchbar'
import Home from '@/components/Home'
import Capitacheck from '@/components/Capitacheck'
import Results from '@/components/Results'

Vue.use(BootstrapVue)

export default {
  name: 'App',
  components: {
    Home,
    Searchbar,
    Capitacheck,
    Results
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;

  #title {
    padding-top: 50px;
  }
}
</style>
