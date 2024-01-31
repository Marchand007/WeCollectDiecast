<template>
    <v-card elevation="0" flat>
        <v-card-text>
            <v-form @submit.prevent="saveEdit" validate="on-blur" validate-on="blur" ref="createUserForm">
                <v-row class="ma-0" no-gutters>
                    <v-col cols="12" sm="6" md="4" order="1">
                        <v-text-field label="Prénom" v-model.trim="editedUser.firstName"
                            :density="display.smAndDown.value ? 'compact' : 'comfortable'" variant="outlined"  bg-color="rgb(25,25,25)"
                            :rules="[rules.required]"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4" order="2">
                        <v-text-field label="Nom de famille" v-model.trim="editedUser.lastName"
                            :density="display.smAndDown.value ? 'compact' : 'comfortable'" variant="outlined" bg-color="rgb(25,25,25)"
                            :rules="[rules.required]"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4" order="3">
                        <v-text-field label="Courriel" v-model.trim="editedUser.email"
                            :density="display.smAndDown.value ? 'compact' : 'comfortable'" variant="outlined" bg-color="rgb(25,25,25)"
                            :rules="[rules.required, rules.validEmail]"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4" order="4">
                        <v-text-field label="Ville" v-model.trim="editedUser.city"
                            :density="display.smAndDown.value ? 'compact' : 'comfortable'" bg-color="rgb(25,25,25)"
                            variant="outlined"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4" order="5">
                        <v-text-field label="Province" v-model.trim="editedUser.state"
                            :density="display.smAndDown.value ? 'compact' : 'comfortable'" bg-color="rgb(25,25,25)"
                            variant="outlined"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4" order="6">
                        <v-text-field label="Pays" v-model.trim="editedUser.country"
                            :density="display.smAndDown.value ? 'compact' : 'comfortable'" bg-color="rgb(25,25,25)"
                            variant="outlined"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4" order="7">
                        <v-text-field label="Date de naissance" type="date" v-model.trim="editedUser.birthdate"
                            :density="display.smAndDown.value ? 'compact' : 'comfortable'" bg-color="rgb(25,25,25)"
                            variant="outlined"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4" order="8" order-sm="9" order-md="8">
                        <v-text-field label="Nouveau mot de passe" v-model.trim="newPassword" type="password"
                            :density="display.smAndDown.value ? 'compact' : 'comfortable'" variant="outlined" bg-color="rgb(25,25,25)"
                            :rules="[rules.validPassword]"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4" order="9" order-sm="10" order-md="9">
                        <v-text-field label="Confirmation nouveau mot de passe" v-model.trim="newPasswordConfirmation"
                            type="password" :density="display.smAndDown.value ? 'compact' : 'comfortable'" bg-color="rgb(25,25,25)"
                            variant="outlined" :rules="[rules.passwordsMatch]"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4" order="10" order-sm="8" order-md="10">
                        <v-checkbox label="Abonné a l'infolettre" v-model.trim="editedUser.wantNewsletter"></v-checkbox>
                    </v-col>
                    <v-col class="px-2" cols="12" sm="12" md="8" order="11">
                        <v-btn type="submit" block>Sauvegarder</v-btn>
                    </v-col>
                </v-row>
            </v-form>
        </v-card-text>
    </v-card>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep';
import SvgIcon from '@jamescoyle/vue-icon';
import { useDisplay } from 'vuetify'
import { validEmail, validPassword } from '../../REGEX/REGEXfrontend.js';
import userSession from '../session/UserSession';

export default {
    setup()
    {
        const display = useDisplay()
        return { display }
    },
    props: {
        user: {
            type: Object,
            required: true
        }
    },
    components: {
        SvgIcon
    },
    data()
    {
        return {
            userSession: userSession,
            editedUser: cloneDeep(this.user),
            newPassword: '',
            newPasswordConfirmation: '',
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
                    if (!value)
                    {
                        return true;
                    }
                    return (
                        validPassword.test(value) ||
                        `Le mot de passe doit contenir: 8 caractères minimum, 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial`
                    );
                },
                passwordsMatch: () =>
                {
                    if (!this.newPassword || !this.newPasswordConfirmation)
                    {
                        return true;
                    }
                    return this.newPassword === this.newPasswordConfirmation || "Les mots de passe ne correspondent pas";
                }
            },
        };
    },
    methods: {
        async saveEdit()
        {
            const valid = await this.$refs.createUserForm.validate();
            if (!valid) return

            this.$emit('saveEdit', this.editedUser);
        },
        customBirthdateIcon()
        {
            return '<v-icon style="color: green;">$vuetify.icons.calendar</v-icon>';
        },
    },
    watch: {

    },
    computed: {

    },
    mounted()
    {
        console.log("this.user", this.user)
    },

}


</script>

<style scoped>
p {
    font-size: 1rem;
    color: white;
    margin-top: 0.5px;
    margin-bottom: 0.5px;
}

li {
    color: white;
    font-weight: bolder;
}

a {
    cursor: pointer;
    color: rgb(255, 255, 255);
    text-decoration: none;
}

h2 {
    margin-bottom: 0px;
}

legend {
    color: white;
    padding: 5px 10px;
}

.pointer {
    cursor: pointer;
    flex-shrink: 0;
    /* Empêche le rétrécissement des svg-icon */
}

.v-input {
    color: white;
    --v-icon-fill: green;
}
@media (min-width: 600px) {
    .v-input {
        margin: 0px 10px;
    }

}
</style>