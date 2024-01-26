<template>
  <div class="login">

    <h2>Se connecter</h2>
    <p class="error-message">{{ errorMessage }}</p>
    <v-form @submit.prevent="loginWithUsername" validate-on="blur" ref="loginForm">
      <v-row no-gutters>
        <v-col cols="12">
          <v-text-field v-model="loginUsername" label="Nom d'utilisateur" :rules="[rules.required]" clearable
            autocomplete="null" density="compact">
          </v-text-field>
        </v-col>

        <v-col cols="12">
          <v-text-field class="mr-2" v-model="loginPassword" label="Mot de passe" type="password"
            :rules="[rules.required]" density="compact" ref="passwordInput" clearable>
          </v-text-field>
        </v-col>

        <v-row class="justify-right mt-5">
          <v-col cols="6">
            <v-btn @click="closeLoginSection" color="black" size="large" elevation="5">Annuler</v-btn>
          </v-col>
          <v-col cols="6">
            <v-btn type="submit" block color="rgba(138, 103, 9, 0.9)" size="large" elevation="5"
              :disabled="disabledLoginButton">Se connecter</v-btn>
          </v-col>
        </v-row>
      </v-row>

    </v-form>
  </div>
</template>

<script>
import { validEmail, validPassword } from '../../REGEX/REGEXfrontend.js';
import userSession from '../session/UserSession.js'



export default {
  inject: ['closeLoginSection'],
  data()
  {
    return {
      loginUsername: "",
      loginPassword: "",
      rules: {
        required: (value) => !!value || "Le champ est requis",
      },
      errorMessage: ""
    }
  },
  methods: {
    async loginWithUsername()
    {
      this.errorMessage = "";
      const validForm = await this.$refs.loginForm.validate();
      if (!validForm.valid) return;

      userSession.login(this.loginUsername, this.loginPassword)
        .then(user =>
        {
          this.closeLoginSection();
        })
        .catch(err =>
        {
          this.errorMessage = err.message;
        })
    }
  },
  computed: {
    disabledLoginButton()
    {
      return !this.loginUsername
        || !this.loginPassword
    }
  }
};
</script>

<style scoped>
h2 {
  text-align: center;
}
.v-btn {
  font-size: 0.8rem;
}
</style>
