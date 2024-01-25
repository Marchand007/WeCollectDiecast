<template>
    <v-row class="justify-center">

    </v-row>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep';
import SvgIcon from '@jamescoyle/vue-icon';
import { DateTime } from 'luxon';
import userSession from '../session/UserSession';

export default {
    props: {
        clientId: Number,
        editMode: Boolean
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
    color: white;
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