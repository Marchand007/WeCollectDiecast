<template>
  <v-app :class="isDialogOpen ? 'blur-background' : ''" style="background-color: #121212; width: 100%">
    <header>
      <Navigation></Navigation>
    </header>
    <v-main>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />
      <v-row class="ma-0">
      <router-view class="my-5">

      </router-view>
    </v-row>
      <footer>
        <v-row class="ma-0 justify-center" style="border-top: 1px white solid">
          <p>Ceci sera un footer</p>
        </v-row>
      </footer>
    </v-main>
  </v-app>
</template>

<script>
import Navigation from './components/Navigation.vue';

export default {
  name: 'App',
  components: { Navigation },
  data()
  {
    return {
      isDialogOpen: false,
    };
  },
  methods: {
    dialogIsOpen(isOpen)
    {
      this.isDialogOpen = isOpen;
    }
  },
  provide()
  {
    return {
      dialogIsOpen: this.dialogIsOpen
    }
  }
}

</script>

<style>
*::-webkit-scrollbar {
  display: none;
}

h1 {
  text-align: center;
  font-size: 2rem;
  font-weight: bolder;
  margin-bottom: 1rem;
}


h2 {
  text-align: left;
  font-size: 1.5rem;
  font-weight: 300;
  margin-bottom: 1rem;
}

p {
  font-family: 'Roboto', sans-serif;
  color: white
}

h2 {
  color: white;
  text-align: left;
  font-size: 25px;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.link {
  color: blue;
  text-decoration: none;
  cursor: pointer;
  text-decoration: none;
}

.error-message {
  color: red !important;
  font-size: x-small !important;
  margin-bottom: 5px !important;
  text-align: center !important;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 1s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.authentication {
  max-height: 100vh;
  width: 400px;
  opacity: 1;
  left: 0;
  top: 0;
  bottom: 0;
  padding: 10px;
  background-color: beige;
  border-radius: 10px;
  box-shadow: rgba(138, 103, 9, 0.9) 0 0 70px 5px;

  /* background: radial-gradient(rgb(0, 228, 95), rgb(0, 26, 255), rgb(255, 0, 0)) 0% 0% / 100% 400%; */
  /* background: radial-gradient(rgba(50, 50, 50, 1) 20%, rgba(50, 50, 50, 0.1)); */
  /* background: radial-gradient(circle at 50%, rgba(50,50,50,0.9), rgba(50,50,50,0.8) 10%, rgba(50,50,50,0.0) 100%, rgba(50,50,50,0.1) 10%); */
}

@media (min-width: 960px) {
  .login {
    position: relative;
    max-height: 100vh;
    width: 50%;
    margin: auto;
    opacity: 1;
    left: 0;
    top: 0;
    bottom: 0;
    padding: 10px;
    background-color: beige;
    border-radius: 10px;
    box-shadow: rgba(138, 103, 9, 0.9) 0 0 70px 5px;

    /* background: radial-gradient(rgb(0, 228, 95), rgb(0, 26, 255), rgb(255, 0, 0)) 0% 0% / 100% 400%; */
    /* background: radial-gradient(rgba(50, 50, 50, 1) 20%, rgba(50, 50, 50, 0.1)); */
    /* background: radial-gradient(circle at 50%, rgba(50,50,50,0.9), rgba(50,50,50,0.8) 10%, rgba(50,50,50,0.0) 100%, rgba(50,50,50,0.1) 10%); */
  }

}

@media (max-width: 960px) {
  .login {
    position: relative;
    max-height: 100vh;
    width: 90%;
    margin: auto;
    opacity: 1;
    left: 0;
    top: 0;
    bottom: 0;
    padding: 10px;
    background-color: beige;
    border-radius: 10px;
    box-shadow: rgba(138, 103, 9, 0.9) 0 0 70px 5px;

    /* background: radial-gradient(rgb(0, 228, 95), rgb(0, 26, 255), rgb(255, 0, 0)) 0% 0% / 100% 400%; */
    /* background: radial-gradient(rgba(50, 50, 50, 1) 20%, rgba(50, 50, 50, 0.1)); */
    /* background: radial-gradient(circle at 50%, rgba(50,50,50,0.9), rgba(50,50,50,0.8) 10%, rgba(50,50,50,0.0) 100%, rgba(50,50,50,0.1) 10%); */
  }

}


@media (max-width: 960px) {
  .authentication {
    width: 100%;
  }
}
</style>

<style scoped>
.blur-background {
  filter: grayscale();
}
</style>