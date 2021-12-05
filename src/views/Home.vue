<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">

    <h1>HOLA MUNDO</h1>
    <button @click="getToDayBook" class="btn btn-primary">Primary</button>

  </div>
</template>


<script>
export default {

  methods: {
    getToDayBook() {
      this.$router.push({name: 'no-entry'})
    }
  }

}
</script>