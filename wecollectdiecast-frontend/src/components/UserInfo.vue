<template>
    <v-card elevation="0" flat>
        <v-card-text>
            <!-- <v-row class="ma-0">
            <v-rating size="small" v-model="user.rating.average" color="rgb(138, 103, 9)" density="compact" half-increments
                readonly></v-rating> ({{ user.rating.count }})
                </v-row>    -->
            <v-row class="ma-0 no-gutters">
                <v-col cols="12" sm="6">
                    <p>{{ $t('firstName') }}: {{ user.firstName }} </p>
                    <p>{{ $t('lastName') }}: {{ user.lastName }} </p>
                    <p v-if="user.city">{{ $t('city') }}: {{ user.city }} </p>
                    <p v-if="user.state">{{ $t('state') }}: {{ user.state }} </p>
                    <p v-if="user.country">{{ $t('country') }}: {{ user.country }} </p>
                    <p>{{ $t('memberSince') }}: {{ formatedDate(user.createdDate) }} </p>
                </v-col>
                <v-col cols="12" sm="6">
                    <p>{{ $t('diecastQuantityInCollection') }}: 0 </p>
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
        formatedDate(date) {
            return DateTime.fromISO(date).setLocale(this.$i18n.locale).toLocaleString(DateTime.DATE_MED);
        }	
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
    margin-top: 1rem;
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