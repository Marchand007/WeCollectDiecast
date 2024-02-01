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
                    {{ $t('hisProfile') }}
                </v-tab>
                <v-tab selected-class="active-tab" value="usercollection">
                    <v-icon start>
                        mdi-car
                    </v-icon>
                    {{ $t('hisCollection') }}
                </v-tab>
                <v-tab selected-class="active-tab" value="userwishlist">
                    <v-icon start>
                        mdi-heart
                    </v-icon>
                    {{ $t('hisWishlist') }}
                </v-tab>
                <v-tab selected-class="active-tab" value="contactuser">
                    <v-icon start>
                        mdi-email
                    </v-icon>
                    {{ $t('contactHim') }}
                </v-tab>
            </v-tabs>
            <v-tabs v-if="shownedMenuUser" v-model="tab" :direction="display.smAndDown.value ? 'vertical' : 'horizontal'"
                show-arrows center-active :grow="display.mdAndUp.value">
                <v-tab selected-class="active-tab" value="userinformations">
                    <v-icon start>
                        mdi-account
                    </v-icon>
                    {{ $t('myProfile') }}
                </v-tab>
                <v-tab selected-class="active-tab" value="editinformations">
                    <v-icon start>
                        mdi-pencil
                    </v-icon>
                    <span>{{ $t('informations') }}</span>
                </v-tab>
                <v-tab selected-class="active-tab" value="additem">
                    <v-icon start>
                        mdi-plus
                    </v-icon>
                    <span s>{{ $t('item') }}</span>
                </v-tab>
                <v-tab selected-class="active-tab" value="managecollection">
                    <v-icon start>
                        mdi-chart-timeline
                    </v-icon>
                    <span>{{ $t('manageMyCollection') }}</span>
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
                                <p class="mb-2">{{ $t('collection1') }}</p>
                                <p class="mb-2">{{ $t('collection2') }}</p>
                                <p class="mb-2">{{ $t('collection3') }}.</p>
                                <p class="mb-2">{{ $t('collection4') }}</p>
                            </v-card-text>
                        </v-card>
                    </v-window-item>
                    <v-window-item value="userwishlist">
                        <v-card elevation="0" flat>
                            <v-card-text>
                                <h2>Wishlist</h2>
                                <p class="mb-2">{{ $t('wishlist1') }}</p>
                                <p class="mb-2">{{ $t('wishlist2') }}</p>
                            </v-card-text>
                        </v-card>
                    </v-window-item>
                    <v-window-item value="contactuser">
                        <v-card elevation="0" flat>
                            <v-card-text>
                                <h2>{{ $t('message1') }}</h2>

                                <p class="mb-2">{{ $t('message1') }}</p>
                                <p class="mb-2">{{ $t('message2') }}</p>
                                <p class="mb-2">{{ $t('message3') }}</p>
                                <p class="mb-2">{{ $t('message4') }}</p>
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
                                <h2>{{ $t('addNewItem1') }}</h2>
                                <p class="mb-2">{{ $t('addNewItem2') }}</p>
                                <p class="mb-2">{{ $t('addNewItem3') }}</p>
                                <p class="mb-2">{{ $t('addNewItem4') }}</p>
                                <p class="mb-2">{{ $t('addNewItem5') }}</p>
                                <p class="mb-2">{{ $t('addNewItem6') }}</p>
                                <p class="mb-2">{{ $t('addNewItem7') }}</p>

                            </v-card-text>
                        </v-card>
                    </v-window-item>
                    <v-window-item value="managecollection">
                        <v-card elevation="0" flat>
                            <v-card-text>
                                <h2>{{ $t('manageCollection1') }}</h2>
                                <p class="mb-2">{{ $t('manageCollection2') }}</p>
                                <p class="mb-2">{{ $t('manageCollection3') }}</p>
                                <p class="mb-2">{{ $t('manageCollection4') }}</p>
                            </v-card-text>
                        </v-card>
                    </v-window-item>
                </span>
            </v-window>
        </div>
        <v-snackbar v-model="snackbarShare" :timeout="2000">
            {{ $t('linkCopiedToClipboard') }}
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
            shareTooltipText: this.$t('clickHereToShareAccount'),
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
                this.user.createdDate = luxonDate;
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
                const luxonDate = DateTime.fromISO(this.user.createdDate);
                this.user.createdDate = luxonDate;
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
