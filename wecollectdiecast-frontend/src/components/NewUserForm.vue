<template>
  <div class="authentication">

    <h1> {{ $t('welcomeAboard') }}</h1>
    <p> {{ $t('alreadyHaveAccount') }} <span class="link font-weight-bold" @click="toggleLogin"> {{ $t('log in') }}</span></p>
    <p class="error-message">{{ errorMessage }}</p>
    <v-form @submit.prevent="createUserAccount" validate-on="blur" ref="createUserForm">
      <v-row no-gutters>
        <v-col cols="12">
          <v-text-field v-model.trim="user.username" :label="$t('username').concat(' *')" :rules="[rules.required]" clearable
            autocomplete="null" density="compact" required>
          </v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field class="mr-2" v-model.trim="user.firstName" :label="$t('firstName').concat(' *')" :rules="[rules.required]" clearable
            density="compact" autocomplete="given-name" required>
          </v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field class="ml-2" v-model.trim="user.lastName" :label="$t('lastName').concat(' *')" :rules="[rules.required]" clearable
            density="compact" autocomplete="family-name" required>
          </v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field v-model.trim="user.email" :label="$t('email').concat(' *')" :rules="[
            rules.required,
            rules.validEmail
          ]" density="compact" clearable required>
          </v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field class="mr-2" v-model="user.password" :label="$t('password').concat(' *')"
            :type="seePassword ? 'text' : 'password'"
            :append-inner-icon="user.password ? seePassword ? 'mdi-eye-off' : 'mdi-eye' : null"
            @click:append-inner="() => (seePassword = !seePassword)" :rules="[rules.required, rules.validPassword]"
            density="compact" ref="passwordInput" required>
          </v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field class="ml-2" v-model="user.passwordConfirmation" :label="$t('confirmPassword').concat(' *')"
            :rules="[rules.required, rules.passwordsMatch]" :type="seePasswordConfirmation ? 'text' : 'password'"
            @click:append-inner="() => (seePasswordConfirmation = !seePasswordConfirmation)"
            :append-inner-icon="user.passwordConfirmation ? seePasswordConfirmation ? 'mdi-eye-off' : 'mdi-eye' : null"
            density="compact" ref="passwordConfirmInput" required>
          </v-text-field>
        </v-col>
        <v-col cols="12">
          <v-checkbox v-model="user.wantNewsletter"
            :label="$t('acceptNewsletter')">
          </v-checkbox>
        </v-col>
        <v-row class="justify-right mt-5">
          <v-col cols="6">
            <v-btn @click="closeRegistrerSection" color="black" size="large" elevation="5">{{ $t('cancel') }}</v-btn>
          </v-col>
          <v-col cols="6">
            <v-btn type="submit" block color="rgba(138, 103, 9, 0.9)" size="large" elevation="5"
              :disabled="disabledCreateAccountButton">{{ $t('registrer') }}</v-btn>
          </v-col>
        </v-row>
      </v-row>
    </v-form>
  </div>
  <v-dialog v-model="newUserAddedDialog" class="animate__animated animate__bounceIn" width="100%" persistant>
    <v-card class="pa-2 text-center new-user-dialog">
      <v-card-title>
        <h2>Confirmation</h2>
      </v-card-title>
      <v-card-text>
        <p>{{ $t('congrats') }}, {{ user.username }}, {{ $t('accountCreated') }} </p>
        <p>{{ $t('youAreNowRegistered') }}</p>
      </v-card-text>
      <v-row class="justify-center">
        <v-col cols="12">
          <v-btn @click="closeRegistrerSection" color="black" size="large" elevation="5">OK</v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex';
import userSession from '../session/UserSession.js'
import { validEmail, validPassword } from '../../REGEX/REGEXfrontend.js';
import { createUser } from '../services/UserService'



export default {
  inject: ['closeRegistrerSection'],
  data()
  {
    return {
      userSession: this.userSession,
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
        required: (value) => !!value || this.$t('fieldRequired'),
        validEmail: (value) =>
        {
          return (
            validEmail.test(value) ||
            this.$t('invalidEmail')
          );
        },
        validPassword: (value) =>
        {
          return (
            validPassword.test(value) ||
            this.$t('passwordDontMatchRegex')
          );
        },
        passwordsMatch: () =>
        {
          if (!this.user.password && !this.user.passwordConfirmation)
          {
            return true;
          }
          return this.user.password === this.user.passwordConfirmation || this.$t('passwordsDontMatch');
        }
      },
      
      errorMessage: "",
      newUserAddedDialog: false,
      seePassword: false,
      seePasswordConfirmation: false,
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
              if (user)
              {
                this.newUserAddedDialog = true;
              } else
              {
                throw new Error(this.$t('errorCreationAccount'));
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
    ...mapActions(['toggleLoginSection']), // Assurez-vous d'avoir une action appropriée définie dans votre store
    toggleLogin()
    {
      this.toggleLoginSection(); // Appel de l'action pour basculer la valeur de loginSectionOpen
    }
  },
  computed: {
    disabledCreateAccountButton()
    {
      return !this.user.email
        || !validEmail.test(this.user.email)
        || !this.user.username
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
  font-size: small;
  text-align: center;
}

h1 {
margin-bottom: 0px;
}

h2 {
  text-align: center;
}

@media (max-width: 500px){
  .v-text-field:deep(label) {
    font-size: 12px !important;
  } 

}



</style>
