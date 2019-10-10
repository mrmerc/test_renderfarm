<template>
  <div id="app">
    <div id="nav">
      <router-link to="/create">Создать задание</router-link> |
      <router-link to="/">Список заданий</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">

html {
	background: rgb(246, 255, 255);
}

#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	margin-top: 28px;
	p {
		margin: 0;
	}

	a {
		text-decoration: none;
		color: #000;
	}
	
}
</style>
