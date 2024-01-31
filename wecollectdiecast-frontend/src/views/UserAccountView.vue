<template>
    <div v-if="user.username">
        <v-row class="name-banner ma-0 align-center" no-gutters>
            <v-col cols="10">
                <v-row class="ma-0" no-gutters>
                    <p>{{ user.username }}&nbsp;</p>
                </v-row>
            </v-col>
            <v-col cols="2" class="text-right">
                <v-tooltip right :text="shareTooltipText">
                    <template v-slot:activator="{ props }">
                        <v-icon class="share-icon" @click="copyLinkToClipboard" v-bind="props">
                            mdi-share
                        </v-icon>
                    </template>
                </v-tooltip>
            </v-col>
        </v-row>
        <v-row v-if="userSession.user && userSession.user.username == user.username" class="ma-0">
            <v-icon v-if="display.smAndDown.value" @click="showMenuUser = !showMenuUser" color="white" size="40"
                :icon="showMenuUser ? 'mdi-close' : 'mdi-menu'"> </v-icon>
        </v-row>
        <v-row v-else class="ma-0">
            <v-icon v-if="display.smAndDown.value" @click="showMenu = !showMenu" color="white" size="40"
                :icon="showMenu ? 'mdi-close' : 'mdi-menu'"> </v-icon>

        </v-row>
        <div :class="display.smAndDown.value ? 'd-flex flex-row ma-0 pa-0' : 'd-flex flex-column ma-0 pa-0'">
            <v-tabs v-if="shownedMenu" v-model="tab" :direction="display.smAndDown.value ? 'vertical' : 'horizontal'"
                show-arrows center-active :grow="display.mdAndUp.value">
                <v-tab selected-class="active-tab" value="userinformations">
                    <v-icon start>
                        mdi-account
                    </v-icon>
                    Son profil
                </v-tab>
                <v-tab selected-class="active-tab" value="usercollection">
                    <v-icon start>
                        mdi-car
                    </v-icon>
                    Sa collection
                </v-tab>
                <v-tab selected-class="active-tab" value="userwishlist">
                    <v-icon start>
                        mdi-heart
                    </v-icon>
                    Sa wishlist
                </v-tab>
                <v-tab selected-class="active-tab" value="contactuser">
                    <v-icon start>
                        mdi-email
                    </v-icon>
                    Le contacter
                </v-tab>
            </v-tabs>
            <v-tabs v-if="shownedMenuUser" v-model="tab" :direction="display.smAndDown.value ? 'vertical' : 'horizontal'"
                show-arrows center-active :grow="display.mdAndUp.value">
                <v-tab selected-class="active-tab" value="userinformations">
                    <v-icon start>
                        mdi-account
                    </v-icon>
                    Mon profil
                </v-tab>
                <v-tab selected-class="active-tab" value="editinformations">
                    <v-icon start>
                        mdi-pencil
                    </v-icon>
                    <span>Informations</span>
                </v-tab>
                <v-tab selected-class="active-tab" value="additem">
                    <v-icon start>
                        mdi-plus
                    </v-icon>
                    <span s>Item</span>
                </v-tab>
                <v-tab selected-class="active-tab" value="managecollection">
                    <v-icon start>
                        mdi-chart-timeline
                    </v-icon>
                    <span>Gerer sa collection</span>
                </v-tab>

            </v-tabs>
            <v-window v-model="tab">
                <v-window-item value="userinformations">
                    <UserInfo :user="user"> </UserInfo>
                </v-window-item>
                <span v-if="!userSession.user || (userSession.user && userSession.user.username != user.username)">
                    <v-window-item value="usercollection">
                        <v-card elevation="0" flat>
                            <v-card-text>
                                <h2>Collection</h2>
                                <p class="mb-2"> Ici sera la collection de l'utilisateur. </p>
                                <p class="mb-2"> Il sera possible de voir les items que l'utilisateur possede et qu'il
                                    public.
                                </p>
                                <p class="mb-2"> Il ne sera pas possible de voir les items que l'utilisateur possede et
                                    qu'il
                                    met private.</p>
                                <p class="mb-2"> Un systeme de filtre sera mis en place pour faciliter la recherche.</p>
                            </v-card-text>
                        </v-card>
                    </v-window-item>
                    <v-window-item value="userwishlist">
                        <v-card elevation="0" flat>
                            <v-card-text>
                                <h2>Wishlist</h2>
                                <p class="mb-2"> Ici sera la wishlist de l'utilisateur. </p>
                                <p class="mb-2"> Il sera possible de voir les items que l'utilisateur aimerais bien trouver.
                                </p>
                            </v-card-text>
                        </v-card>
                    </v-window-item>
                    <v-window-item value="contactuser">
                        <v-card elevation="0" flat>
                            <v-card-text>
                                <h2>Envoyez-lui un message!</h2>

                                <p class="mb-2"> Ici sera un formulaire pour envoyer un message a l'utilisateur. Un systeme
                                    de
                                    messagerie interne sera mis en place.</p>
                                <p class="mb-2">Cela evitera de devoir donner son adresse courriel.</p>
                                <p class="mb-2"> Il sera possible de voir les messages recus et envoyes dans la section "Mes
                                    message".</p>
                                <p class="mb-2">Cela permettera de garder une trace des messages envoyes et recus.</p>
                            </v-card-text>
                        </v-card>
                    </v-window-item>
                </span>
                <span v-if="userSession.user && userSession.user.username == user.username">
                    <v-window-item value="editinformations">
                        <EditUserInfo :user="userToEdit" @saveEdit="saveEdit" />
                    </v-window-item>
                    <v-window-item value="additem">
                        <v-card elevation="0" flat>
                            <v-card-text>
                                <h2>Ajout d'un item a sa collection</h2>
                                <p class="mb-2"> Ici sera un formulaire pour ajouter un item a sa collection.</p>
                                <p class="mb-2">Plusieurs options seront disponibles pour faciliter l'ajout d'un item et
                                    pour sa classification.</p>
                                <p class="mb-2">Il sera possible d'ajouter une photo egalement afin de faciliter la
                                    reconnaisance de celui ci.</p>
                                <p class="mb-2">Il sera possible de mettre l'item en "private" ou "public" afin que seul
                                    l'utilisateur puisse le voir ou non.</p>
                                <p class="mb-2">Il sera possible de mettre l'item dans sa "wishlist".</p>
                                <p class="mb-2">Il sera possible de mettre l'item a "vendre", "échanger" car éventuellement
                                    des ventes seront possible sur la plateforme version 2.0</p>

                            </v-card-text>
                        </v-card>
                    </v-window-item>
                    <v-window-item value="managecollection">
                        <v-card elevation="0" flat>
                            <v-card-text>
                                <h2>Gerer sa collection</h2>
                                <p class="mb-2"> Ici sera la gestion pour gerer sa collection.</p>
                                <p class="mb-2"> Il sera possible de modifier les informations d'un item ou le supprimer de
                                    sa collection.</p>
                                <p class="mb-2"> Il sera possible de modifier les informations d'un item ou le supprimer de
                                    sa wishlist.</p>
                            </v-card-text>
                        </v-card>
                    </v-window-item>
                </span>
            </v-window>
        </div>
        <v-snackbar v-model="snackbarShare" :timeout="2000">
            Lien copié dans le presse-papier
        </v-snackbar>
    </div>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep';
import SvgIcon from '@jamescoyle/vue-icon';
import { useDisplay } from 'vuetify'
import { DateTime } from 'luxon';
import { mdiSquareEditOutline, mdiContentSaveOutline, mdiCloseOutline } from '@mdi/js';
import { computed } from "vue";

import userSession from '../session/UserSession.js'
import UserInfo from '../components/UserInfo.vue';
import EditUserInfo from '../components/EditUserInfo.vue';

import { getUserBy, updateUser } from '../services/UserService.js';
import { getRatingUserBy } from '../services/RatingService.js'

export default {
    inheritAttrs: false,
    props: {
        username: String
    },
    components: {
        UserInfo,
        EditUserInfo,
        SvgIcon
    },
    data()
    {
        return {
            userSession: userSession,
            user: {
                firstName: "",
                lastName: "",
                username: null,
                email: "",
                birthdate: "",
                city: "",
                state: "",
                country: "",
                isActive: null,
                isAdmin: null,
                rating: {
                    average: 0,
                    count: 0
                }
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
                newPasswordConfirmation: ''
            },
            tab: 'informations',
            refreshUser: false,
            pathEdit: mdiSquareEditOutline,
            pathSave: mdiContentSaveOutline,
            pathclose: mdiCloseOutline,
            errorMessage: "",
            showMenu: true,
            showMenuUser: false,
            shareTooltipText: 'Cliquez ici pour copier le lien de la page dans votre presse-papier',
            snackbarShare: false,
        };
    },
    methods: {
        loadUser()
        {
            getUserBy("username", this.username).then(user =>
            {

                this.user = user;
                this.userToEdit = cloneDeep(this.user);
                this.userToEdit.newPassword = '';
                this.userToEdit.confirmNewPassword = '';
                this.user.rating = {
                    average: 0,
                    count: 0
                }
                this.loadUserRating();
                const luxonDate = DateTime.fromISO(this.user.createdDate);
                this.user.createdDate = luxonDate.toLocaleString(DateTime.DATE_MED);
            }).catch(err =>
            {
                console.error(err);
                if (err.status == 404)
                {
                    this.$router.push({ name: 'home' });
                }
            })
        },
        saveEdit(editedUser)
        {
            console.log("saveEdit", editedUser);
            updateUser(editedUser).then(user =>
            {
                this.user = user;
                this.userToEdit = cloneDeep(this.user);
                this.userToEdit.newPassword = '';
                this.userToEdit.confirmNewPassword = '';
                this.loadUserRating();
                this.tab = 'userinformations';
            }).catch(err =>
            {
                console.error(err);
            })
        },
        copyLinkToClipboard()
        {
            this.shareTooltipText = 'Lien copié dans le presse-papier';
            if (this.display.mdAndDown.value) this.snackbarShare = true;
            const link = "wcd.app/user?u=" + this.user.username;
            navigator.clipboard.writeText(link);
        },
        loadUserRating()
        {
            getRatingUserBy("id", this.user.id).then(rating =>
            {
                this.user.rating = {
                    average: rating.average,
                    count: rating.count
                }
            }).catch(err =>
            {
                console.error(err);
            });
        }
    },
    watch: {
        username()
        {
            this.loadUser();
        },
        tab()
        {
            if (this.display.smAndDown.value == true) this.showMenu = false;
            if (this.display.smAndDown.value == true) this.showMenuUser = false;
        },
        'userSession.user': {
            handler(newUser)
            {
                if (newUser == null)
                {
                    this.tab = 'userinformations';
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
    computed: {
        shownedMenu()
        {
            if (!this.userSession.user) return this.showMenu;
            if (this.userSession.user.username == this.user.username) return false;
            if (this.display.smAndDown.value == true) return this.showMenu;
            return true;
        },
        shownedMenuUser()
        {
            if (!this.userSession.user) return false;
            if (this.userSession.user.username != this.user.username) return false;
            if (this.display.smAndDown.value == true) return this.showMenuUser;
            return true;
        },
    },
    created()
    {
        //const usernameFromRoute = this.$route.params.username;
        //this.localClientId = isNaN(clientIdFromRoute) ? null : clientIdFromRoute;
    },
    mounted()
    {

        if (this.display.smAndDown.value)
        {
            this.showMenu = false;
        }
        else
        {

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


a {
    cursor: pointer;
    color: blue;
    text-decoration: underline;
}

div {
    white-space: pre-wrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.share-icon {
    cursor: pointer;
    margin-right: 5px;
    border: none;
    transition: all ease-in-out 0.2s;
    cursor: pointer;
}

.share-icon:hover {
    transform: scale(1.5);
    color: black;
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
    color: rgb(138, 103, 9) !important;
    font-size: 150%;
}

@media (max-width: 960px) {
    .v-tabs {
        width: 100vw !important;
    }
}

.v-tab {
    background-color: #121212;
    border-bottom: 1px solid rgb(138, 103, 9);
    color: white;
}

@media (min-width: 960px) {
    .v-tab {
        border-top: 1px solid rgb(138, 103, 9);
        border-right: 1px solid rgb(138, 103, 9);
        border-left: 1px solid rgb(138, 103, 9);
    }
}

.v-tab:first-of-type {
    border-top: 1px solid rgb(138, 103, 9);
    color: white;
}

.v-tab:hover {
    background-color: white;
    color: rgb(138, 103, 9);
}

.active-tab {
    background-color: rgb(138, 103, 9) !important;
    color: white !important;
}

.active-tab:hover {
    background-color: rgb(138, 103, 9) !important;
    color: white !important;
}


.v-card {
    background-color: #121212;
    color: white;
    min-height: 75vh;
    height: 100%;
    width: 100vw !important;
}

.v-tooltip :deep(.v-overlay__content) {
    background-color: black !important;
}</style>
