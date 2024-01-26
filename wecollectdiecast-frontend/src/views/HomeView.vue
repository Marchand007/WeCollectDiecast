<template>
  <div class="home-view ma-10">
  <v-row class="ma-0 d-flex flex-column">
    <v-row style="margin: 0px 15%">
      <img class="w-100" src="@/assets/FullLogoNoBG.png" />
    </v-row>
    <v-row class="justify-center ma-0" no-gutters>
      <p style="font-size: 24px; text-align: center; color:white">We Collect Diecast sera bientôt disponible</p>
    </v-row>
    <v-row v-if="!userSession || !userSession.user" class="justify-center ma-0" no-gutters>
        <v-btn class="pointer btn-new-account" max-width="80%" outline @click="openCreateAccountSection">
          <p class="text-wrap">
            CLIQUEZ ICI POUR
            CREER UN COMPTE DÈS MAINTENANT</p>
        </v-btn>
    </v-row>
  </v-row>
  </div>
  <!-- transition="dialog-bottom-transition" -->

  <v-dialog v-model="showCreateAccountSection" class="animate__animated animate__bounceIn" scrollable persistent>
    <NewUserForm></NewUserForm>
  </v-dialog>
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
      showCreateAccountSection: false,
      userSession: userSession
    }
  },
  methods: {
    openCreateAccountSection()
    {
      this.showCreateAccountSection = true
    },
    closeCreateAccountSection()
    {
      this.showCreateAccountSection = false
    }
  },
  provide()
  {
    return {
      closeCreateAccountSection: this.closeCreateAccountSection
    }
  },
  watch:
  {
    showCreateAccountSection()
    {
      this.dialogIsOpen(this.showCreateAccountSection);
    }
  }
}

</script>

<style scoped>

div {
  margin-bottom: 10px;
}
p {

  color: black
}
.pointer {
  cursor: pointer;
}

.home-view {
  height: 75vh;
}
.v-btn.btn-new-account:hover,
.v-btn.btn-new-account:focus {
  background-color: #D9AF37;
  transform: scale(1.35);
}
</style>


