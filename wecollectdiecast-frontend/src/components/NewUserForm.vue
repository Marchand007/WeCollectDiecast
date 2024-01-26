<template>
  <div class="authentication">

    <h1>Bienvenue à bord</h1>
    <p class="error-message">{{ errorMessage }}</p>
    <v-form @submit.prevent="createUserAccount" validate-on="blur" ref="createUserForm">
      <v-row no-gutters>
        <v-col cols="12">
          <v-text-field v-model="user.username" label="Nom d'utilisateur *" :rules="[rules.required]"
            clearable autocomplete="null" density="compact">
          </v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field class="mr-2" v-model="user.firstName" label="Prénom *" :rules="[rules.required]" clearable
            density="compact" autocomplete="given-name">
          </v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field class="ml-2" v-model="user.lastName" label="Nom de famille *" :rules="[rules.required]" clearable
            density="compact" autocomplete="family-name">
          </v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field v-model="user.email" label="Adresse courriel *" :rules="[
            rules.required,
            rules.validEmail
          ]" density="compact" clearable>
          </v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field class="mr-2" v-model="user.password" label="Mot de passe" type="password"
            :rules="[rules.required, rules.validPassword]" density="compact" ref="passwordInput" clearable>
          </v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field class="ml-2" v-model="user.passwordConfirmation" label="Confirmer le mot de passe"
            :rules="[rules.required, rules.passwordsMatch]" type="password" density="compact" ref="passwordConfirmInput"
            clearable>
          </v-text-field>
        </v-col>
        <v-col cols="12">
          <v-checkbox v-model="user.wantNewsletter"
            label="J'accepte de recevoir des courriels d'information à propos de la plateforme">
          </v-checkbox>
        </v-col>
        <v-row class="justify-right mt-5">
          <v-col cols="6">
            <v-btn @click="closeCreateAccountSection" color="black" size="large" elevation="5">Annuler</v-btn>
          </v-col>
          <v-col cols="6">
            <v-btn type="submit" block color="rgba(138, 103, 9, 0.9)" size="large" elevation="5"
              :disabled="disabledCreateAccountButton">S'inscrire</v-btn>
          </v-col>
        </v-row>
      </v-row>
      <!-- <p
                class=" text-muted font-weight-medium d-flex justify-center align-center mt-3"
              >
                Vous avez déjà un compte?
                <RouterLink
                  to="/auth/login"
                  class="text-red text-decoration-none text-body-1 opacity-1 font-weight-medium pl-2"
                >
                  Connectez-vous</RouterLink
                >
            </p> -->
    </v-form>
  </div>
  <v-dialog v-model="newUserAddedDialog" class="animate__animated animate__bounceIn" width="100%" persistant>
    <v-card class="pa-2 text-center new-user-dialog">
      <v-card-title>
        <h2>Confirmation</h2>
      </v-card-title>
      <v-card-text>
        <p>Félicitations {{ user.username }}, votre compte utilisateur a bien été créé. </p>
        <p>Un courriel vous sera envoyé lorsque la plateforme
          sera prête pour l'utilisation</p>
      </v-card-text>
      <v-row class="justify-center">
        <v-col cols="12">
          <v-btn @click="closeCreateAccountSection" color="black" size="large" elevation="5">OK</v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script>
import { validEmail, validPassword } from '../../REGEX/REGEXfrontend.js';
import { createUser } from '../services/UserService'



export default {
  inject: ['closeCreateAccountSection'],
  data()
  {
    return {
      user: {
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        wantNewsletter: false,
        password: "",
        passwordConfirmation: ""
      },
      rules: {
        required: (value) => !!value || "Le champ est requis",
        validEmail: (value) =>
        {
          return (
            validEmail.test(value) ||
            "Veuillez entrer une adresse courriel valide"
          );
        },
        validPassword: (value) =>
        {
          ;
          return (
            validPassword.test(value) ||
            "Le mot de passe doit contenir au moins 8 caractères, 1 majuscule, 1 chiffre et 1 caractère spécial"
          );
        },
        passwordsMatch: () =>
        {
          if (!this.user.password && !this.user.passwordConfirmation)
          {
            return true;
          }
          return this.user.password === this.user.passwordConfirmation || "Les mots de passe ne correspondent pas";
        }
      },
      errorMessage: "",
      newUserAddedDialog: false
    }
  },
  methods: {
    async createUserAccount()
    {
      this.errorMessage = "";

      createUser(this.user).then(user =>
      {
        if (user)
        {
          userSession.login(this.user.username, this.user.password)
            .then(user =>
            {
              if (user) {
              this.newUserAddedDialog = true;
              } else
              {
                throw new Error("Une erreur est survenue lors de la création de votre compte. Veuillez réessayer plus tard.");
            }
            })
            .catch(err =>
            {
              this.errorMessage = err.message;
            })
        }
      }).catch(err =>
      {
        this.errorMessage = err.message;
        console.error(err);
      })
    },
  },
  computed: {
    disabledCreateAccountButton()
    {
      return !this.user.email
        || !validEmail.test(this.user.email)
        || !this.user.username
        || this.user.username.length > 10
        || !this.user.firstName
        || !this.user.lastName
        || !this.user.password
        || !validPassword.test(this.user.password)
        || !this.user.passwordConfirmation
        || (this.user.passwordConfirmation != this.user.passwordConfirmation)
    }
  }
};
</script>

<style scoped>
p {
  color: black;
  text-align: center;
}

h2 {
  text-align: center;
}
</style>
