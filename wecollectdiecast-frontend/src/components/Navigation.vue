<template>
    <v-app-bar class="pointer-logo ma-0" app prominent dense dark color="#121212"
        style="border-bottom: 2px solid #D4AF37; width:100vw">
        <!-- <v-app-bar-nav-icon :icon="drawer ? 'mdi-close' : 'mdi-menu'" color="red" @click.stop="drawer = !drawer">
        </v-app-bar-nav-icon> -->
        <img @click="$router.push('/')" class="mr-5 ml-2" height="50" aspect-ratio="0" src="@/assets/FullLogoNoBG.png" />

        <!-- <p v-if="!isMobile" class="menu-text" @click.stop="drawer = !drawer">MENU</p> -->


        <router-link to="/" v-show="display.smAndUp.value">
            <p style="color:#D4AF37;">
                <v-app-bar-title>WE COLLECT DIECAST</v-app-bar-title>
            </p>
        </router-link>
        <v-spacer>
        </v-spacer>
        <span v-if="!userSession.user">
            <v-row v-if="display.mdAndUp.value" class="ma-0" no-gutters>
                <v-col cols="12" class="text-right">
                    <v-btn @click="openLoginSection" class="text-subtitle-1"
                        color="white">
                        {{ $t('connection').toLocaleUpperCase() }} / {{ $t('registration').toLocaleUpperCase() }}
                    </v-btn>
                </v-col>
            </v-row>
            <v-row v-else class="ma-0" no-gutters>
                <v-col cols="12" md="6" class="text-right">
                    <v-btn @click="openLoginSection" :class="display.smAndDown.value ? 'text-subtitle-2' : ''"
                        color="white">
                        {{ $t('connection').toLocaleUpperCase() }}
                        <br />
                        {{ $t('registration').toLocaleUpperCase() }}
                    </v-btn>
                </v-col>
            </v-row>
        </span>
        <div v-else>
            <v-menu :menu-props="{ dark: true, color: $vuetify.theme.themes.dark.primary }">
                <template  v-slot:activator="{ props }">
                    <span v-bind="props" v-show="display.mdAndUp.value" class="mx-2 username-text" style="color:white">
                        {{ $t('welcome') }}, {{ userSession.user.username }}
                    </span>

                    <span v-bind="props" v-show="display.smAndDown.value" class="username-text"
                        style="color:white; text-align: center;">
                        {{ userSession.user.username }}
                    </span>
                    <v-btn v-bind="props" color="white">
                        <p v-show="display.mdAndUp.value">{{ $t('myAccount') }}</p>
                        <span><v-icon>mdi-account-circle</v-icon></span>
                    </v-btn>
                </template>
                <v-list>
                    <RouterLink class="my-account" :to="accountUrl"><v-list-item>
                            <v-list-item-title> {{ $t('myInformations') }}</v-list-item-title>
                        </v-list-item></RouterLink>
                    <RouterLink class="my-account" to="/"><v-list-item>
                            <v-list-item-title> {{ $t('myCollection') }} ({{ $t('toCome') }})</v-list-item-title>
                        </v-list-item></RouterLink>
                    <br />
                    <v-divider thickness="2"></v-divider>
                    <br />

                    <v-list-item>
                        <v-list-item-title @click="disconnect"> {{ $t('logout') }}</v-list-item-title>
                    </v-list-item>

                </v-list>
            </v-menu>
        </div>
    </v-app-bar>
    <v-dialog v-model="showLoginSection" class="animate__animated animate__bounceIn" scrollable persistent>
        <LoginForm></LoginForm>
    </v-dialog>
    <v-dialog v-model="showRegistrerSection" class="animate__animated animate__bounceIn" scrollable persistent>
        <NewUserForm></NewUserForm>
    </v-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { useDisplay } from 'vuetify'
import { RouterLink } from 'vue-router';
import userSession from '../session/UserSession.js'
import LoginForm from '../components/LoginForm.vue'
import NewUserForm from '../components/NewUserForm.vue'
export default {
    components: {
        RouterLink, LoginForm, NewUserForm
    },
    inject: ['dialogIsOpen'],
    data()
    {
        return {
            userSession: userSession,
            drawer: false,
            showAdminSection: false,
            showSpecialistSection: false,
            showLoginSection: false,
            showRegistrerSection: false,
        };
    },
    computed: {
        accountUrl()
        {
            if (this.userSession.user && this.userSession.user.username) return "/user?u=" + this.userSession.user.username;
            return "/"
        },
        isMobile()
        {
            return screen.width < 500;
        },
        switch()
        {
            return this.userSession.user && this.userSession.user.username;
        },
        ...mapState({
            loginSectionOpened: state => state.loginSectionOpened,
            registrerSectionOpened: state => state.registrerSectionOpened
        })
    },
    methods: {
        disconnect()
        {
            this.userSession.disconnect();
            this.$router.push('/')
        },
        ...mapActions(['setLoginSectionToTrue']), // Assurez-vous d'avoir une action appropriée définie dans votre store
        openLoginSection()
        {
            this.dialogIsOpen(true);
            this.showLoginSection = true
            this.setLoginSectionToTrue(); // Appel de l'action pour basculer la valeur de loginSectionOpen
        },
        closeLoginSection()
        {
            this.dialogIsOpen(false);
            this.showLoginSection = false
        },
        openRegistrerSection()
        {
            this.dialogIsOpen(true);
            this.showRegistrerSection = true
        },
        closeRegistrerSection()
        {
            this.dialogIsOpen(false);
            this.showRegistrerSection = false
        },
        resetUserSession()
        {
            this.userSession.user = null
            this.$router.push('/')
        }
    },
    watch: {
        loginSectionOpened(newValue, oldValue)
        {
            // Faites quelque chose en réponse au changement de loginSectionOpen
            if (newValue == true)
            {

                this.dialogIsOpen(true);
                this.showRegistrerSection = false;
                this.openLoginSection();
            }
        },
        registrerSectionOpened(newValue, oldValue)
        {
            // Faites quelque chose en réponse au changement de registrerSectionOpen
            if (newValue == true)
            {
                this.dialogIsOpen(true);
                this.openRegistrerSection();
                this.showLoginSection = false;
            }
        }
    },
    provide()
    {
        return {
            closeLoginSection: this.closeLoginSection,
            closeRegistrerSection: this.closeRegistrerSection
        }
    },
    setup()
    {
        const display = useDisplay()
        return { display }
    },
    mounted()
    {

    }
}
</script>

<style scoped>
.pointer {
    cursor: pointer;
    flex-shrink: 0;
}

/* span>.v-btn {
    color: white !important;
    background-color: red !important;

}

.v-btn {
    color: white !important;
    background-color: green !important;

} */

.v-app-bar {
    box-shadow: rgba(138, 103, 9, 0.9) 0 0 70px 5px;
}

.routerlink {
    display: block;
    color: rgb(138, 103, 9);
}

p {
    color: white;
}

.menu-text:hover {
    cursor: pointer;
}

a:not(.my-account) {
    text-decoration: none;
    color: white;
}

a {
    text-decoration: none;
    color: black
}

a:hover:not(.my-account) {
    color: rgb(138, 103, 9);
}

a:hover {
    color: rgb(138, 103, 9);
}

.username-text:hover {
    cursor: default
}

.v-list-item-title:hover {
    color: white;
}

.v-list-item:hover {
    color: white;
    background-color: rgba(0, 0, 0, 0.1);
}

.v-list {
    background-color: rgba(138, 103, 9, 1) !important;

}
</style>