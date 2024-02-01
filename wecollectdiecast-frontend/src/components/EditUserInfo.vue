<template>
    <v-card elevation="0" flat>
        <v-card-text>
            <v-form @submit.prevent="saveEdit" validate="on-blur" validate-on="blur" ref="createUserForm">
                <v-row class="ma-0" no-gutters>
                    <v-col cols="12" sm="6" md="4" order="2" order-sm="1">
                        <v-text-field :label="$t('firstName').concat(' *')" v-model.trim="editedUser.firstName"
                            :density="display.smAndDown.value ? 'compact' : 'comfortable'" variant="outlined"  bg-color="rgb(25,25,25)"
                            :rules="[rules.required]" autocomplete="null"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4" order="3" order-sm="2">
                        <v-text-field :label="$t('lastName').concat(' *')" v-model.trim="editedUser.lastName"
                            :density="display.smAndDown.value ? 'compact' : 'comfortable'" variant="outlined" bg-color="rgb(25,25,25)"
                            :rules="[rules.required]" autocomplete="null"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4" order="4" order-sm="3">
                        <v-text-field :label="$t('email').concat(' *')" v-model.trim="editedUser.email"
                            :density="display.smAndDown.value ? 'compact' : 'comfortable'" variant="outlined" bg-color="rgb(25,25,25)"
                            :rules="[rules.required, rules.validEmail]" autocomplete="null"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4" order="5" order-sm="4">
                        <v-text-field :label="$t('city')" v-model.trim="editedUser.city"
                            :density="display.smAndDown.value ? 'compact' : 'comfortable'" bg-color="rgb(25,25,25)"
                            variant="outlined" autocomplete="null"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4" order="6" order-sm="5">
                        <v-text-field :label="$t('state')" v-model.trim="editedUser.state"
                            :density="display.smAndDown.value ? 'compact' : 'comfortable'" bg-color="rgb(25,25,25)"
                            variant="outlined" autocomplete="null"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4" order="7" order-sm="6">
                        <v-text-field :label="$t('country')" v-model.trim="editedUser.country"
                            :density="display.smAndDown.value ? 'compact' : 'comfortable'" bg-color="rgb(25,25,25)"
                            variant="outlined" autocomplete="null"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4" order="8" order-sm="7">
                        <v-text-field :label="$t('birthdate')" type="date" v-model.trim="editedUser.birthdate"
                            :density="display.smAndDown.value ? 'compact' : 'comfortable'" bg-color="rgb(25,25,25)"
                            variant="outlined"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4" order="9" order-sm="9" order-md="8">
                        <v-text-field :label="$t('newPassword').concat(' *')" v-model.trim="editedUser.newPassword" type="password"
                            :density="display.smAndDown.value ? 'compact' : 'comfortable'" variant="outlined" bg-color="rgb(25,25,25)"
                            :rules="[rules.validPassword]" autocomplete="null"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4" order="10" order-sm="10" order-md="9">
                        <v-text-field :label="$t('confirmNewPassword').concat(' *')" v-model.trim="editedUser.newPasswordConfirmation"
                            type="password" :density="display.smAndDown.value ? 'compact' : 'comfortable'" bg-color="rgb(25,25,25)"
                            variant="outlined" :rules="[rules.passwordsMatch]" autocomplete="null"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4" order="11" order-sm="8" order-md="10">
                        <v-checkbox :label="$t('subscribedToNewsletter')" v-model.trim="editedUser.wantNewsletter"></v-checkbox>
                    </v-col>
                    
                    <v-col class="px-2" cols="12" sm="12" md="8" order="1" order-sm="11" order-md="11">
                    <v-row class="ma-0 mb-5">
                        <v-btn type="submit" block>{{ $t('save') }}</v-btn>
                    </v-row>
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
            editedUser: this.user,
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
                    if (!value)
                    {
                        return true;
                    }
                    return (
                        validPassword.test(value) ||
                        this.$t('passwordDontMatchRegex')
                    );
                },
                passwordsMatch: () =>
                {
                    if (!this.editedUser.newPassword || !this.editedUser.newPasswordConfirmation)
                    {
                        return true;
                    }
                    return this.editedUser.newPassword === this.editedUser.newPasswordConfirmation || this.$t('passwordsDontMatch');
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