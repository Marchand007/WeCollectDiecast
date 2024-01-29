<template>
  <div class="login">

    <h1>Se connecter</h1>
    <p>Vous n'avez pas de compte ? <span class="link font-weight-bold" @click="toggleLogin">Créez-en
        un</span></p>
    <p class="error-message">{{ errorMessage }}</p>
    <v-form @submit.prevent="loginWithUsername" validate-on="blur" ref="loginForm">
      <v-row no-gutters>
        <v-col cols="12">
          <v-text-field v-model="loginUsername" label="Nom d'utilisateur" :rules="[rules.required]" clearable
            autocomplete="null" density="compact">
          </v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field v-model="loginPassword" label="Mot de passe" :type="seePassword ? 'text' : 'password'"
            :rules="[rules.required]" density="compact" ref="passwordInput"
            :append-inner-icon="loginPassword ? seePassword ? 'mdi-eye-off' : 'mdi-eye' : null"
            @click:append-inner="() => (seePassword = !seePassword)">
          </v-text-field>
          <p @click="openForgotPasswordSection" class="link">Mot de passe oublié ?</p>
        </v-col>
        <v-col cols="12" class="ma-0" no-gutters>
          <v-checkbox label="Se souvenir de moi">
          </v-checkbox>
        </v-col>
      </v-row>
      <v-row class="justify-right ma-0" no-gutters>
        <v-col cols="6">
          <v-btn @click="closeLoginSection" color="black" size="large" elevation="5">Annuler</v-btn>
        </v-col>
        <v-col cols="6">
          <v-btn type="submit" block color="rgba(138, 103, 9, 0.9)" size="large" elevation="5"
            :disabled="disabledLoginButton">Se connecter</v-btn>
        </v-col>

      </v-row>

    </v-form>
  </div>
  <v-dialog v-model="showForgotPasswordSection" class="animate__animated animate__bounceIn" persistent>
  <div class="lostpassword">
    <v-form @submit.prevent="sendForgotPasswordRequest" validate-on="blur" ref="lostpasswordForm">
      <v-row class="ma-0">
        <v-col cols="12">
          <p class="error-message">{{ lostpasswordErrorMessage }}</p>
        <p>Veuillez inscrire votre courriel</p>
          <v-text-field v-model="forgotPasswordEmail" label="Courriel" :rules="[rules.required]" clearable color="white" variant="solo"
            autocomplete="null" density="compact">
          </v-text-field>
        </v-col>
      </v-row>
      <v-row class="justify-right" no-gutters>
        <v-col cols="6">
          <v-btn @click="closeForgotPasswordSection" color="white" size="large" elevation="5">Annuler</v-btn>
        </v-col>
        <v-col cols="6">
          <v-btn type="submit" block color="rgba(138, 103, 9, 0.9)" size="large" elevation="5"
            :disabled="!forgotPasswordEmail">Réinitialiser</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </div>
  </v-dialog>
  <v-dialog v-model="forgotPasswordSent" class="animate__animated animate__bounceIn" persistent>
  <div class="lostpassword">
    <v-form @submit.prevent="sendForgotPasswordRequest" validate-on="blur" ref="lostpasswordForm">
      <v-row class="ma-0">
        <v-col cols="12">
        <p>Un courriel vous a été envoyé avec les instructions pour réinitialiser votre mot de passe</p>
        </v-col>
      </v-row>
    </v-form>
  </div>
  </v-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { validEmail, validPassword } from '../../REGEX/REGEXfrontend.js';
import userSession from '../session/UserSession.js'
import { resetUserPassword } from '../services/UserService'


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
      errorMessage: "",
      lostpasswordErrorMessage: "",
      seePassword: false,
      forgotPasswordEmail: "",
      showForgotPasswordSection: false,
      forgotPasswordSent: false
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
          const userUrl = '/user?u=' + user.username;
          this.$router.push(userUrl);
        })
        .catch(err =>
        {
          this.errorMessage = err.message;
        })
    },
    async sendForgotPasswordRequest()
    {
      this.lostpasswordErrorMessage = "";
      const validForm = await this.$refs.lostpasswordForm.validate();
      if (!validForm.valid) return;
      resetUserPassword(this.forgotPasswordEmail)
        .then(() =>
        {
          this.forgotPasswordSent = true;
          setTimeout(() =>
          {
            this.forgotPasswordSent = false;
            this.closeForgotPasswordSection();
          }, 3000);
        })
        .catch(err =>
        {
          this.lostpasswordErrorMessage = err.message;
        })
    },
    openForgotPasswordSection()
    {
      this.lostpasswordErrorMessage = "";
      this.showForgotPasswordSection = true;
    },
    closeForgotPasswordSection()
    {
      this.forgotPasswordEmail = "";
      this.showForgotPasswordSection = false;
    },
    switchToRegistrerSection()
    {
      this.closeLoginSection();
    },
    ...mapActions(['toggleLoginSection']), // Assurez-vous d'avoir une action appropriée définie dans votre store
    toggleLogin()
    {
      this.toggleLoginSection(); // Appel de l'action pour basculer la valeur de loginSectionOpen
    }
  },
  computed: {
    disabledLoginButton()
    {
      return !this.loginUsername
        || !this.loginPassword
    }
  },
  mounted()
  {
  }
};
</script>

<style scoped>
h1 {
  margin-bottom: 0px;
}

h2 {
  text-align: center;
}

p:not(.link) {
  color: black;
  font-size: small;
  text-align: center;
}

.lostpassword {
  padding: 10px;
  align-self: center;
  width: 400px;
  height: auto;
  opacity: 1 !important;
  background-color: beige;
  border-radius: 10px;
  box-shadow: rgba(138, 103, 9, 0.9) 0 0 70px 5px;
}

@media (max-width: 500px) {
  .lostpassword {
    width: 90%;
    opacity: 1 !important;
  }
}

.link {
  color: blue;
  text-align: right;
  cursor: pointer;
}

.v-btn {
  font-size: 0.8rem;
}
</style>
