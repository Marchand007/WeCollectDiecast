<template>
    <v-card elevation="0" flat>
        <v-card-text>
            <v-row class="ma-0">
            <v-rating size="small" v-model="user.rating" color="rgb(138, 103, 9)" density="compact" half-increments
                readonly></v-rating> (5)
                </v-row>   
            <v-row class="ma-0 no-gutters">
                <v-col cols="12" sm="6">
                    <p>Prénom: {{ user.firstName }} </p>
                    <p>Nom de famille: {{ user.lastName }} </p>
                    <p v-if="user.city"> Ville: {{ user.city }} </p>
                    <p v-if="user.state"> Province: {{ user.state }} </p>
                    <p v-if="user.country">Pays: {{ user.country }} </p>
                    <p>Membre depuis: {{ user.createdDate }} </p>
                </v-col>
                <v-col cols="12" sm="6">
                    <p>Nombre de diecast dans sa collection: 0 </p>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep';
import SvgIcon from '@jamescoyle/vue-icon';
import { DateTime } from 'luxon';
import userSession from '../session/UserSession';

export default {
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
        };
    },
    methods: {

    },
    watch: {

    },
    computed: {

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
}

.select {
    width: 60px;
}

.underline {
    text-decoration: underline;
    font-weight: normal;
}

.one-note {
    background-color: rgba(255, 0, 0, 0.2);
    border-radius: 10px;
}
</style>