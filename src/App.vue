<template>
  <div id="app">
    <div id="nav">
      <router-link to="/create">Создать задание</router-link> |
      <router-link to="/list">Список заданий</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	margin-top: 60px;
	p {
		margin: 0;
	}
}
</style>
