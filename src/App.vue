<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
html {
  -webkit-text-size-adjust: 100%;
  -ms-text-size-adjust: 100%;
  font-family: 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei';
  /* display: flex; */
}

* {
  margin: 0;
  padding: 0;
  border: none;
  box-sizing: border-box;
}

body {
  display: flex;
}

#app {
  flex: 1;
}
</style>
