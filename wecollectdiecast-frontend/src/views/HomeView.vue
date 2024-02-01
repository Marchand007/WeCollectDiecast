<template>
  <div class="home-view">
    <v-row class="ma-0 d-flex flex-column">
      <v-row class="ma-0 justify-center">
        <img class="logo" width="50%" src="@/assets/FullLogoNoBG.png" />
      </v-row>
      <v-row class="justify-center ma-0" no-gutters>
        <p style="font-size: 24px; text-align: center; color:white"> {{ $t('comingSoon') }}</p>
      </v-row>
      <v-row class="justify-center ma-10" no-gutters>
        <p style="font-size: 14px; text-align: left; color:white">{{ $t('createAccountNow') }}</p>
      </v-row>
    </v-row>
  </div>
</template>

<script>

import NewUserForm from '../components/NewUserForm.vue'
import userSession from '../session/UserSession'


export default {
  inheritAttrs: false,
  inject: ['dialogIsOpen'],
  components: {
    NewUserForm
  },
  data()
  {
    return {
      showRegistrerSection: false,
      userSession: userSession
    }
  },
  methods: {
    openRegistrerSection()
    {
      this.showRegistrerSection = true
    },
    closeRegistrerSection()
    {
      this.showRegistrerSection = false
    }
  },
  provide()
  {
    return {
      closeRegistrerSection: this.closeRegistrerSection
    }
  },
  watch:
  {
    showRegistrerSection()
    {
      this.dialogIsOpen(this.showRegistrerSection);
    }
  },
  mounted()
  {
    
  }
}

</script>

<style scoped>

@keyframes shake {
  0% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  50% { transform: translateX(5px); }
  75% { transform: translateX(-5px); }
  100% { transform: translateX(0); }
}

div {
  margin-bottom: 10px;
}

p {

  color: black
}

.logo:hover {
  animation: shake 0.5s;
  animation-iteration-count: infinite;


}
.home-view {
  margin-bottom: 50px;
  min-height: 75vh;
}

</style>


