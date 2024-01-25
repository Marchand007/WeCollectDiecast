<template>
    <v-row class="name-banner ma-0 align-center">
        <p class="d-flex align-center">
            <span>{{ user.username }}&nbsp;</span>
            <span>( </span>
            <v-rating size="small" v-model="user.rating" color="black" density="compact" half-increments
                readonly></v-rating>
            <span> )</span>
        </p>
    </v-row>

    <v-icon v-if="display.smAndDown.value" @click="showMenu = !showMenu" color="white" size="40"
        :icon="showMenu ? 'mdi-close' : 'mdi-menu'"> </v-icon>

    <div :class="display.smAndDown.value ? 'd-flex flex-row ma-0 pa-0' : 'd-flex flex-column ma-0 pa-0'">
        <v-tabs v-show="showMenu || display.mdAndUp.value == true" v-model="tab" :direction="display.smAndDown.value ? 'vertical' : 'horizontal'">
            <v-tab selected-class="active-tab" value="userinformations">
                <v-icon start>
                    mdi-account
                </v-icon>
                Informations
            </v-tab>
            <v-tab selected-class="active-tab" value="usercollection">
                <v-icon start>
                    mdi-car
                </v-icon>
                Collection
            </v-tab>
            <v-tab selected-class="active-tab" value="contactuser">
                <v-icon start>
                    mdi-email
                </v-icon>
                Le contacter
            </v-tab>
            <v-tab v-if="userSession.user" selected-class="active-tab" value="editinformations">
                <v-icon start>
                    mdi-email
                </v-icon>
                <p style="font-size:x-small">Modifier mes informations</p>
            </v-tab>
            <v-tab v-if="userSession.user" selected-class="active-tab" value="additem">
                <v-icon start>
                    mdi-email
                </v-icon>
                <span style="font-size:x-small">Ajouter un item</span>
            </v-tab>
            <v-tab v-if="userSession.user" selected-class="active-tab" value="managecollection">
                <v-icon start>
                    mdi-email
                </v-icon>
                <span style="font-size:x-small">Gerer sa collection</span>
            </v-tab>
            <v-tab v-if="userSession.user" selected-class="active-tab" value="option-x">
                <v-icon start>
                    mdi-email
                </v-icon>
                <span style="font-size:x-small">Un autre options</span>
            </v-tab>

        </v-tabs>
        <v-window v-model="tab">
            <v-window-item value="userinformations">
                <v-card elevation="0" flat>
                    <v-card-text >
                        <h2>Informations de l'utilisateur</h2>
                        <p> Prénom: {{ user.firstName }} </p>
                        <p> Nom de famille: {{ user.lastName }} </p>
                        <p v-if="user.city"> Ville: {{ user.city }} </p>
                        <p v-if="user.state"> Province: {{ user.state }} </p>
                        <p v-if="user.country">Pays: {{ user.country }} </p>
                        <p>Membre depuis: {{ user.createdDate }} </p>
                    </v-card-text>
                </v-card>
            </v-window-item>
            <v-window-item  value="usercollection">
                <v-card elevation="0" flat>
                        <v-card-text>
                            <h2>Collection</h2>
                        </v-card-text>
                    </v-card>
            </v-window-item>
            <v-window-item value="contactuser">
                <v-card elevation="0" flat>
                    <v-card-text>
                        <h2>Envoyez-lui un message!</h2>
                        <p>
                            Fusce a quam. Phasellus nec sem in justo pellentesque facilisis. Nam eget dui. Proin viverra,
                            ligula sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac eros.
                            In dui magna, posuere eget, vestibulum et, tempor auctor, justo.
                        </p>

                        <p class="mb-0">
                            Cras sagittis. Phasellus nec sem in justo pellentesque facilisis. Proin sapien ipsum, porta a,
                            auctor quis, euismod ut, mi. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,
                            sem. Nam at tortor in tellus interdum sagittis.
                        </p>
                    </v-card-text>
                </v-card>
            </v-window-item>
            <span v-if="userSession.user">
                <v-window-item value="editinformations">
                    <v-card elevation="0" flat>
                        <v-card-text>
                            <h2>Modification de ses informations</h2>
                            <p>
                                Fusce a quam. Phasellus nec sem in justo pellentesque facilisis. Nam eget dui. Proin
                                viverra,
                                ligula sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac
                                eros.
                                In dui magna, posuere eget, vestibulum et, tempor auctor, justo.
                            </p>

                            <p class="mb-0">
                                Cras sagittis. Phasellus nec sem in justo pellentesque facilisis. Proin sapien ipsum, porta
                                a,
                                auctor quis, euismod ut, mi. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,
                                sem. Nam at tortor in tellus interdum sagittis.
                            </p>
                        </v-card-text>
                    </v-card>
                </v-window-item>
                <v-window-item value="additem">
                    <v-card elevation="0" flat>
                        <v-card-text>
                            <h2>Ajout d'un item a sa collection</h2>
                            <p>
                                Fusce a quam. Phasellus nec sem in justo pellentesque facilisis. Nam eget dui. Proin
                                viverra,
                                ligula sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac
                                eros.
                                In dui magna, posuere eget, vestibulum et, tempor auctor, justo.
                            </p>

                            <p class="mb-0">
                                Cras sagittis. Phasellus nec sem in justo pellentesque facilisis. Proin sapien ipsum, porta
                                a,
                                auctor quis, euismod ut, mi. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,
                                sem. Nam at tortor in tellus interdum sagittis.
                            </p>
                        </v-card-text>
                    </v-card>
                </v-window-item>
                <v-window-item value="managecollection">
                    <v-card elevation="0" flat>
                        <v-card-text>
                            <h2>Gerer sa collection</h2>
                            <p>
                                Fusce a quam. Phasellus nec sem in justo pellentesque facilisis. Nam eget dui. Proin
                                viverra,
                                ligula sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac
                                eros.
                                In dui magna, posuere eget, vestibulum et, tempor auctor, justo.
                            </p>

                            <p class="mb-0">
                                Cras sagittis. Phasellus nec sem in justo pellentesque facilisis. Proin sapien ipsum, porta
                                a,
                                auctor quis, euismod ut, mi. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,
                                sem. Nam at tortor in tellus interdum sagittis.
                            </p>
                        </v-card-text>
                    </v-card>
                </v-window-item>
                <v-window-item value="option-x">
                    <v-card elevation="0" flat>
                        <v-card-text>
                            <h2>Un autre option a venir</h2>
                            <p>
                                Fusce a quam. Phasellus nec sem in justo pellentesque facilisis. Nam eget dui. Proin
                                viverra,
                                ligula sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac
                                eros.
                                In dui magna, posuere eget, vestibulum et, tempor auctor, justo.
                            </p>

                            <p class="mb-0">
                                Cras sagittis. Phasellus nec sem in justo pellentesque facilisis. Proin sapien ipsum, porta
                                a,
                                auctor quis, euismod ut, mi. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,
                                sem. Nam at tortor in tellus interdum sagittis.
                            </p>
                        </v-card-text>
                    </v-card>
                </v-window-item>
            </span>
        </v-window>
    </div>
</template>

<script>
import { useDisplay } from 'vuetify'
import cloneDeep from 'lodash/cloneDeep';
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiSquareEditOutline, mdiContentSaveOutline, mdiCloseOutline } from '@mdi/js';
import userSession from '../session/UserSession.js'
import UserInfo from '../components/UserInfo.vue';
import { DateTime } from 'luxon';
import { getUserBy } from '../services/UserService.js';

import { computed } from "vue";

export default {
    inheritAttrs: false,
    props: {
        username: String
    },
    components: {
        UserInfo,
        SvgIcon
    },
    data()
    {
        return {
            userSession: userSession,
            user: {
                firstName: "",
                lastName: "",
                username: "",
                email: "",
                birthdate: "",
                city: "",
                state: "",
                country: "",
                isActive: null,
                isAdmin: null,
            },
            userToEdit: {
                firstName: "",
                lastName: "",
                username: "",
                email: "",
                birthdate: "",
                city: "",
                state: "",
                country: "",
                isActive: null,
                isAdmin: null,
                newPassword: '',
                confirmNewPassword: ''
            },
            tab: 'informations',
            refreshUser: false,
            pathEdit: mdiSquareEditOutline,
            pathSave: mdiContentSaveOutline,
            pathclose: mdiCloseOutline,
            errorMessage: "",
            showMenu: true,
        };
    },
    methods: {
        loadUser()
        {
            getUserBy("username", this.username).then(user =>
            {
                this.user = user;
                this.userToEdit = cloneDeep(this.user);
                this.user.rating = 4.5;
                this.user.createdDate = DateTime.now().toLocaleString(DateTime.DATE_MED);
            }).catch(err =>
            {
                console.error(err);
            })
        },
    },
    watch: {
        tab()
        {
            if (this.display.smAndDown.value == true) this.showMenu = false;
        },
        'userSession.user': {
            handler(newUser)
            {
                if (newUser == null)
                {
                    this.tab = 'informations';
                }
            },
            deep: true
        }
    },
    setup()
    {
        const display = useDisplay()
        return { display }
    },
    created()
    {
        //const usernameFromRoute = this.$route.params.username;
        //this.localClientId = isNaN(clientIdFromRoute) ? null : clientIdFromRoute;
    },
    mounted()
    {
        console.log("mounted", this.display.smAndDown.value)
        if (this.display.smAndDown.value)
        {
            console.log("ici1")
            this.showMenu = false;
        }
        else
        {
            console.log("ici2")
            this.showMenu = true;
        }
        this.loadUser();
    }
}


</script>

<style scoped>
p {
    color: white;
}

h1 {
    color: white;
    text-align: center;
}

h2 {
    color: white;
    text-align: left;
    font-size: 25px;
    margin-bottom: 1rem;
    line-height: 1.2;
}

a {
    cursor: pointer;
    color: blue;
    text-decoration: underline;
}

.name-banner {
    background-color: rgb(138, 103, 9);
    color: white;
    font-size: 24px;
    font-weight: bolder;
    padding: 10px;
    text-align: center;
}

.v-tabs {
    background-color: black !important;
}

@media (max-width: 960px) {
    .v-tabs {
        width: 100vw !important;
    }
}

.v-tab {
    background-color: black;
    border: 1px solid rgb(138, 103, 9);
    color: white;
}

.v-tab:hover {
    background-color: white;
    color: rgb(138, 103, 9);
}

.active-tab {
    background-color: rgb(138, 103, 9);
    color: white !important;
}

.active-tab:hover {
    background-color: rgb(138, 103, 9);
    color: white !important;
}


.v-card {
    background-color: black;
    color: white;
    height: 75vh;
    width: 100vw !important;
}
</style>