<template>
  <span v-if="userSession.user && userSession.user.isAdmin">
    <v-btn v-if="!editMode" @click="editMode = true" class="ma-5" color="black">Modifier les informations de cette
      page</v-btn>
    <v-btn v-if="editMode" @click="saveEditedBusinessInformations" class="ma-5" color="black">Sauvegarger les changements</v-btn>
    <v-btn v-if="editMode" @click="cancelEditing" class="mat5" color="black">Annuler</v-btn>
  </span>
  <div v-if="businessInformations">
    <div v-if="!editMode" class="contact-info">
      <v-row class="ma-0">
        <v-col cols="12" sm="4" md="4" class="d-flex flex-column align-center">
          <a class="text-center" :href="urlAddress" target="_blank">
            <v-icon color="white"> mdi-home</v-icon>
            <p class="text-center">{{ businessInformations.addressNumber }} {{ businessInformations.addressUnit }} {{
              businessInformations.addressStreet }}</p>
            <p class="text-center">{{ businessInformations.addressCity }}, {{ businessInformations.addressState }}</p>
            <p class="text-center">{{ businessInformations.addressPostalCode }}</p>
          </a>
        </v-col>

        <v-col cols="12" sm="4" md="4" class="d-flex flex-column align-center">
          <a class="text-center" :href="urlEmail" target="_blank"><v-icon color="white"> mdi-email</v-icon>
            <p class="text-center">{{ businessInformations.email }}</p>
          </a>
        </v-col>
        <v-col cols="12" sm="4" md="4" class="d-flex flex-column align-center">
          <a class="text-center" :href="urlPhoneNumber" target="_blank"><v-icon color="white"> mdi-phone</v-icon>
            <p class="text-center">{{ businessInformations.phoneNumber }}</p>
          </a>
        </v-col>
      </v-row>
    </div>
    <div v-else>
      <fieldset>
        <legend style="color:white; margin-left: 10px; padding: 0px 10px 0px 10px;">Informations générales</legend>
        <v-row v-if="editMode" class="ma-2">
          <v-col cols="12" sm="6" md="6">
            <v-text-field class="pre-wrap mr-2" label="Nom  *" variant="solo"
              v-model.trim="editedBusinessInformations.name" :rules="[rules.fieldLength255]" autocomplete="null"
              hide-spin-buttons>
            </v-text-field>
            <v-text-field class="pre-wrap mr-2" label="Email  *" variant="solo"
              v-model.trim="editedBusinessInformations.email" :rules="[rules.fieldLength255, rules.emailValidation]"
              autocomplete="null" hide-spin-buttons>
            </v-text-field>
            <v-text-field class="pre-wrap mr-2" label="Numéro de téléphone*" variant="solo"
              @input="patternedPhoneNumber()" hint="Format: xxx-xxx-xxx"
              v-model.trim="editedBusinessInformations.phoneNumber"
              :rules="[rules.fieldLength255, rules.phoneNumberValidation]" autocomplete="null" hide-spin-buttons>
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <v-row no-gutters>
              <v-col cols="12" sm="6" md="3">
                <v-text-field type="number" class="mr-2" label="Numero *" variant="solo"
                  v-model.trim="editedBusinessInformations.addressNumber" :rules="[rules.fieldLength255]"
                  autocomplete="null" hide-spin-buttons>
                </v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <v-text-field class="mr-2" label="App/Unit (opt)"
                  v-model.trim="editedBusinessInformations.addressUnit" variant="solo"
                  :rules="[rules.fieldLength255]" autocomplete="null">
                </v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field label="Rue *" v-model.trim="editedBusinessInformations.addressStreet"
                variant="solo" :rules="[rules.fieldLength255]">
                </v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field class="mr-2" label="Province *" v-model.trim="editedBusinessInformations.addressState"
                variant="solo" :rules="[rules.fieldLength255]" autocomplete="null">
                </v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field class="pre-wrap" label="Ville *" v-model.trim="editedBusinessInformations.addressCity"
                variant="solo" :rules="[rules.fieldLength255]" autocomplete="null">
                </v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="12">
                <v-text-field class="pre-wrap" label="Code Postal *"
                  v-model.trim="editedBusinessInformations.addressPostalCode" :rules="[rules.fieldLength255]"
                  variant="solo" clearable>
                </v-text-field>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </fieldset>
      <fieldset>
        <legend style="color:white; margin-left: 10px; padding: 0px 10px 0px 10px;">Lien réseaux sociaux</legend>
        <v-row v-if="editMode" class="ma-2 pa-4" no-gutters>
          <v-col cols="12" sm="6" lg="6">
            <v-text-field class="pre-wrap mr-2" label="Facebook" variant="solo" prepend-inner-icon="mdi-facebook"
              prefix="www.facebook.com/" v-model.trim="editedBusinessInformations.facebookLink"
              :rules="[rules.fieldLength255]" autocomplete="null" hide-spin-buttons>
            </v-text-field>
            <v-text-field class="pre-wrap mr-2" label="Instagram" variant="solo" prefix="www.instagram.com/"
              prepend-inner-icon="mdi-instagram" v-model.trim="editedBusinessInformations.instagramLink"
              :rules="[rules.fieldLength255]" autocomplete="null" hide-spin-buttons>
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="6" lg="6">
            <v-text-field class="pre-wrap mr-2" label="X (twitter)" variant="solo" prefix="www.x.com/"
              v-model.trim="editedBusinessInformations.xLinkl" :rules="[rules.fieldLength255]" autocomplete="null"
              hide-spin-buttons>
              <template v-slot:prepend-inner>
                <Icon icon="pajamas:x" width="25" />
              </template>
            </v-text-field>
            <v-text-field class="pre-wrap mr-2" label="Tiktok" variant="solo" prefix="www.tiktok.com/"
              v-model.trim="editedBusinessInformations.tiktokLink" :rules="[rules.fieldLength255]" autocomplete="null"
              hide-spin-buttons>
              <template v-slot:prepend-inner>
                <Icon icon="ic:baseline-tiktok" width="25" />
              </template>
            </v-text-field>
          </v-col>
        </v-row>
      </fieldset>
      <fieldset>
        <legend style="color:white; margin-left: 10px; padding: 0px 10px 0px 10px;">Heures d'ouverture</legend>
        <v-row v-if="editMode"  class="ma-2 pa-4 justify-center" no-gutters>
          <span v-for="(day, key) in editedBusinessInformations.openHours" class="span-day" style="background-color: white;">
            <p class="editPText">{{ translatedDays[key] }}</p>
            <v-btn @click="deleteOpenHours(day)" height="20">FERMER</v-btn>
            <v-text-field type="time" class="pre-wrap mr-2" label="Ouverture" variant="underlined"
              v-model.trim="day.open">
            </v-text-field>
            <v-text-field type="time" step="900" class="pre-wrap mr-2" label="Fermeture" variant="underlined"
              v-model.trim="day.close">
            </v-text-field>
          </span>
        </v-row>
      </fieldset>
    </div>
    <div v-if="!editMode" class="second-section">
      <v-row>
        <v-col order="1" order-sm="1" order-md="1" cols="12" sm="4" md="4" class="d-flex flex-column align-start">
          <h2>Horaires</h2>
          <p class="day-schedule">Lundi:
            <span v-if="businessInformations.openHours.monday.open">{{
              businessInformations.openHours.monday.open.split(':')[0] }} h {{
    businessInformations.openHours.monday.open.split(':')[1] }}
              - {{ businessInformations.openHours.monday.close.split(':')[0] }} h {{
                businessInformations.openHours.monday.close.split(':')[1] }} </span>
            <span v-else>Fermé</span>
          </p>

          <p class="day-schedule">Mardi:
            <span v-if="businessInformations.openHours.tuesday.open">{{
              businessInformations.openHours.tuesday.open.split(':')[0] }} h {{
    businessInformations.openHours.tuesday.open.split(':')[1] }}
              - {{ businessInformations.openHours.tuesday.close.split(':')[0] }} h {{
                businessInformations.openHours.tuesday.close.split(':')[1] }} </span>
            <span v-else>Fermé</span>
          </p>

          <p class="day-schedule">Mercredi:
            <span v-if="businessInformations.openHours.wednesday.open">{{
              businessInformations.openHours.wednesday.open.split(':')[0] }} h {{
    businessInformations.openHours.wednesday.open.split(':')[1] }}
              - {{ businessInformations.openHours.wednesday.close.split(':')[0] }} h {{
                businessInformations.openHours.wednesday.close.split(':')[1] }} </span>
            <span v-else>Fermé</span>
          </p>

          <p class="day-schedule">Jeudi:
            <span v-if="businessInformations.openHours.thursday.open">{{
              businessInformations.openHours.thursday.open.split(':')[0] }} h {{
    businessInformations.openHours.thursday.open.split(':')[1] }}
              - {{ businessInformations.openHours.thursday.close.split(':')[0] }} h {{
                businessInformations.openHours.thursday.close.split(':')[1] }} </span>
            <span v-else>Fermé</span>
          </p>

          <p class="day-schedule">Vendredi:
            <span v-if="businessInformations.openHours.friday.open">{{
              businessInformations.openHours.friday.open.split(':')[0] }} h {{
    businessInformations.openHours.friday.open.split(':')[1] }}
              - {{ businessInformations.openHours.friday.close.split(':')[0] }} h {{
                businessInformations.openHours.friday.close.split(':')[1] }} </span>
            <span v-else>Fermé</span>
          </p>

          <p class="day-schedule">Samedi:
            <span v-if="businessInformations.openHours.saturday.open">{{
              businessInformations.openHours.saturday.open.split(':')[0] }} h {{
    businessInformations.openHours.saturday.open.split(':')[1] }}
              - {{ businessInformations.openHours.saturday.close.split(':')[0] }} h {{
                businessInformations.openHours.saturday.close.split(':')[1] }} </span>
            <span v-else>Fermé</span>
          </p>

          <p class="day-schedule">Dimanche:
            <span v-if="businessInformations.openHours.sunday.open">{{
              businessInformations.openHours.sunday.open.split(':')[0] }} h {{
    businessInformations.openHours.sunday.open.split(':')[1] }}
              - {{ businessInformations.openHours.sunday.close.split(':')[0] }} h {{
                businessInformations.openHours.sunday.close.split(':')[1] }} </span>
            <span v-else>Fermé</span>
          </p>
        </v-col>

        <v-col :class="isMobile ? 'd-flex flex-row mt-10 align-center' : 'd-flex flex-column'" order="2" order-sm="4"
          order-md="2" cols="12" sm="12" md="1">
          <a :href="'https://www.facebook.com/'.concat(businessInformations.facebookLink)" target="_blank">
            <Icon v-if="businessInformations.facebookLink" class="pointer" icon="ic:baseline-facebook"
              :width="isMobile ? '75%' : '100%'" />
          </a>
          <a :href="'https://www.tiktok.com/'.concat(businessInformations.tiktokLink)" target="_blank">
            <Icon v-if="businessInformations.tiktokLink" class="pointer" icon="ic:baseline-tiktok"
              :width="isMobile ? '75%' : '100%'" />
          </a>
          <a :href="'https://www.x.com/'.concat(businessInformations.xLink)" target="_blank">
            <Icon v-if="businessInformations.xLink" class="pointer" icon="pajamas:x" :width="isMobile ? '75%' : '100%'" />
          </a>
          <a :href="'https://www.instagram.com/'.concat(businessInformations.instagramLink)" target="_blank">
            <Icon v-if="businessInformations.instagramLink" class="pointer" icon="mdi:instagram"
              :width="isMobile ? '75%' : '100%'" />
          </a>
        </v-col>
        <v-col order="3" order-sm="2" order-md="3" cols="12" sm="1" md="1" class="d-flex flex-column">
        </v-col>
        <v-col order="4" order-sm="3" order-md="4" cols="12" sm="7" md="6" class="d-flex flex-column">
          <v-form @submit.prevent="sendEmail" validate-on="input" ref="ContactUsForm">
            <h3>Envoyez-nous un email !</h3>
            <p v-if="confirmSentEmail">Le email a bien été envoyé. Merci de nous avoir contacté</p>
            <v-text-field label="Votre nom" v-model.trim="emailInformations.name" variant="solo"></v-text-field>
            <v-text-field label="Votre courriel" v-model.trim="emailInformations.email" :rules="[rules.emailValidation]"
              variant="solo"></v-text-field>
            <v-textarea label="Votre message (maximum 255 caractères)" v-model.trim="emailInformations.message" rows="5"
              :rules="[rules.fieldLength255]" variant="solo" autogrow no-resize></v-textarea>
            <v-btn type="submit" color="black" :disabled="sendButtonDisabled">Envoyer</v-btn>
          </v-form>
        </v-col>
      </v-row>
    </div>
    <div v-if="!editMode" class="d-flex align-center justify-center">
      <iframe class="ma-5" :width="isMobile ? '90%' : '90%'" height="400" style="border:0" loading="lazy" allowfullscreen
        referrerpolicy="no-referrer-when-downgrade" :src="urlForGoogleMapLocation">
      </iframe>
    </div>
  </div>
</template>

<script>
import userSession from '../session/UserSession.js'
import cloneDeep from 'lodash/cloneDeep';
import { getBusinessInformations, updateBusinessInformations, sendEmailContactForm } from '../services/BusinessService'
import { validEmail, validPhoneNumber } from '../../REGEX/REGEXfrontend.js';

import { Icon } from '@iconify/vue';

export default {
  components: {
    Icon
  },
  data()
  {
    return {
      userSession: userSession,
      editMode: false,
      businessInformations: null,
      editedBusinessInformations: null,
      emailInformations: {
        name: '',
        email: '',
        message: ''
      },
      confirmSentEmail: false,
      rules: {
        fieldLength255: value => ((value) ? !(value.length > 254) : true) || "255 caractères maximum.",
        phoneNumberValidation: value => validPhoneNumber.test(value) || 'Le champ numéro de téléphone ne respecte pas les critères d\'acceptation. (format: xxx-xxx-xxxx)',
        emailValidation: value =>
        {
          if (value) return validEmail.test(value) || "Format du courriel invalide"
          else return true
        },
      },
      translatedDays: {
        monday: 'Lundi',
        tuesday: 'Mardi',
        wednesday: 'Mercredi',
        thursday: 'Jeudi',
        friday: 'Vendredi',
        saturday: 'Samedi',
        sunday: 'Dimanche'
      },
    }
  },
  methods: {
    loadBusinessInformations()
    {
      getBusinessInformations().then(result =>
      {
        this.businessInformations = result;
        this.editedBusinessInformations = cloneDeep(this.businessInformations);
      }).catch(err =>
      {
        console.error(err);
      })
    },
    saveEditedBusinessInformations()
    {
      updateBusinessInformations(this.editedBusinessInformations).then(result =>
      {
        if (result)
        {
          this.businessInformations = result;
          this.editedBusinessInformations = cloneDeep(this.businessInformations);
          this.editMode = false;
        }
      }).catch(err =>
      {
        console.error(err);
      })
    },
    cancelEditing()
    {
      this.editedBusinessInformations = cloneDeep(this.businessInformations);
      this.editMode = false;
    },
    sendEmail()
    {
      this.confirmSentEmail = false;
      sendEmailContactForm(this.emailInformations).then(result =>
      {
        if (result)
        {
          if (result.sended)
          {
            this.confirmSentEmail = true;
            this.emailInformations.name = '';
            this.emailInformations.email = '';
            this.emailInformations.message = '';
          }
        }
      }).catch(err =>
      {
        console.error(err);
      })
    },
    deleteOpenHours(day)
    {
      day.open = null;
      day.close = null;
    }
  },
  computed: {
    isMobile()
    {
      return screen.width < 960;
    },
    sendButtonDisabled()
    {
      return !this.emailInformations.name
        || !this.emailInformations.email
        || !this.emailInformations.message
        || !validEmail.test(this.emailInformations.email);
    },
    urlForGoogleMapLocation()
    {
      return 'https://www.google.com/maps?q='.concat(this.businessInformations.name).concat('&output=embed')
    },
    urlAddress()
    {
      const completeAddress = this.businessInformations.addressNumber + " " + this.businessInformations.addressStreet + ", " + this.businessInformations.addressCity + ", " + this.businessInformations.addressState + ", " + this.businessInformations.addressPostalCode;
      return 'https://www.google.com/maps/place/'.concat(completeAddress);
    },
    urlEmail()
    {
      return 'mailto:'.concat(this.businessInformations.email);
    },
    urlPhoneNumber()
    {
      return 'tel:'.concat(this.businessInformations.phoneNumber);
    },
    patternedPhoneNumber()
    {
      if (this.editedBusinessInformations.phoneNumber)
      {
        const cleanedNumber = this.editedBusinessInformations.phoneNumber.replace(/\D/g, '');

        if (cleanedNumber.length <= 10)
        {
          this.editedBusinessInformations.phoneNumber = cleanedNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
        } else
        {
          this.editedBusinessInformations.phoneNumber = cleanedNumber.slice(0, 10).replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
        }
      }
    },
  },
  mounted()
  {
    this.loadBusinessInformations();
  }
}

</script>

<style scoped>
p {
  font-size: large;
  color: white;
  text-align: left;
}

.editPText {
  text-align: center;
  color: black;
}

h2 {
  text-align: center;
  font-size: xxx-large;
  font-weight: 900;
}

h3 {
  text-align: center;
  font-size: xx-large;

}

a {
  color: black;
  text-decoration: none;
}

.pointer {
  cursor: pointer;
  flex-shrink: 0;
}

.pointer:hover {
  color: white;
  flex-shrink: 0;
}

.day-schedule {
  margin-top: 2%;
}

.second-section {
  margin-left: 5%;
  margin-right: 5%;
  margin-top: 2%
}
.span-day {
  margin: 5px 10px;
  padding: 0px 10px;
  border: 1px solid black;
  border-radius: 5px;
}

@media (min-width: 1024px) {
  .contact-info {
    margin-left: 15%;
    margin-right: 15%;
    margin-top: 5%;
    width: 70%;
  }
}

@media (max-width: 1024px) {
  .contact-info {

    margin-top: 5%;
    width: 100%;
  }
}

@media (min-width: 1024px) {
  .contact-schedule {
    margin-left: 5%;
    margin-right: 5%;
    width: 90%;
    padding: 10px;
  }
}

@media (max-width: 1024px) {
  .contact-schedule {
    margin-left: 5%;
    margin-right: 5%;
    width: 90%;
    padding: 10px;
  }
}
</style>
