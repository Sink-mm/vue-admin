<template>
  <div >
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view/>
  </div>
</template>

<script>
	export default {
		name: 'app',

	}
</script>

<style >
	body,
	html {
		width: 100%;
		height: 100%;
		margin: 0;
	}
	
	* {
		padding: 0;
		margin: 0;
	}
	
	a {
		color: #31404E;
		text-decoration: none;
	}

</style>
