<script setup>
async function submitFunction() {
  const nameInput = document.getElementById('name').value;
  const URL = 'http://localhost:5000/user';
  const response = await fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name: nameInput }),
  });
}
</script>

<template>
  <form>
    <label for="name">Name:</label><br />
    <input type="text" id="name" name="name" value="" /><br /><br />
    <input v-on:click="submitFunction" type="submit" value="Submit" />
  </form>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
