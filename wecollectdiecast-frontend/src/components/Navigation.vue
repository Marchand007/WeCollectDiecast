<template>
    <v-app-bar class="pointer-logo ma-0" app prominent dense dark color="black"
        style="border-bottom: 2px solid #D4AF37; width:100vw">
        <!-- <v-app-bar-nav-icon :icon="drawer ? 'mdi-close' : 'mdi-menu'" color="red" @click.stop="drawer = !drawer">
        </v-app-bar-nav-icon> -->
        <img @click="$router.push('/')" class="mr-5" height="50" aspect-ratio="0" src="@/assets/FullLogoNoBG.png" />

        <!-- <p v-if="!isMobile" class="menu-text" @click.stop="drawer = !drawer">MENU</p> -->


        <router-link to="/" v-show="display.smAndUp.value">
            <p style="color:#D4AF37;">
                <v-app-bar-title>WE COLLECT DIECAST</v-app-bar-title>
            </p>
        </router-link>
        <v-spacer>
        </v-spacer>
        <span v-if="!userSession.user">
            <v-row class="ma-0" no-gutters>
                <v-col>
                    <v-btn v-show="display.mdAndUp.value" @click="openLoginSection" color="white">
                        Se connecter
                    </v-btn>
                </v-col>
                <v-col>
                    <v-btn v-show="display.smAndDown.value" class="mr-5" @click="openLoginSection" width="100%" height="100%" :icon="'mdi-login-variant'"></v-btn>
                </v-col>
            </v-row>
        </span>
        <span v-if="!userSession.user">
            <v-row class="ma-0" no-gutters>
                <v-col>
                    <v-btn v-show="display.mdAndUp.value" @click="openCreateAccountSection" color="white">
                        Creer un compte
                    </v-btn>
                </v-col>
                <v-col>
                    <v-btn v-show="display.smAndDown.value" class="mr-5" @click="openCreateAccountSection" width="100%" height="100%" :icon="'mdi-new-box'"></v-btn>
                </v-col>
            </v-row>
        </span>
        <div v-else>

            <span v-show="display.mdAndUp.value" class="mx-2" style="color:white">
                Bienvenue, {{ userSession.user.username }}
            </span>

            <span v-show="display.smAndDown.value" style="color:white; text-align: center;">
                {{ userSession.user.username }}
            </span>
            <v-menu :menu-props="{ dark: true, color: $vuetify.theme.themes.dark.primary }">
                <template v-slot:activator="{ props }">
                    <v-btn v-bind="props" color="white">
                        <p v-show="display.mdAndUp.value">Mon compte </p>
                        <span><v-icon>mdi-account-circle</v-icon></span>
                    </v-btn>
                </template>
                <v-list>
                    <RouterLink class="my-account" :to="accountUrl"><v-list-item>
                            <v-list-item-title>Mes informations</v-list-item-title>
                        </v-list-item></RouterLink>
                    <RouterLink class="my-account" to="/"><v-list-item>
                            <v-list-item-title>Ma Collection (a venir)</v-list-item-title>
                        </v-list-item></RouterLink>
                    <br />
                    <v-divider thickness="2"></v-divider>
                    <br />

                    <v-list-item>
                        <v-list-item-title @click="disconnect">Se deconnecter</v-list-item-title>
                    </v-list-item>

                </v-list>
            </v-menu>
        </div>
    </v-app-bar>
    <v-dialog v-model="showLoginSection" class="animate__animated animate__bounceIn" scrollable persistent>
        <LoginForm></LoginForm>
    </v-dialog>
    <v-dialog v-model="showNewUserSection" class="animate__animated animate__bounceIn" scrollable persistent>
        <NewUserForm></NewUserForm>
    </v-dialog>
</template>

<script>
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
            showNewUserSection: false,
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
    },
    methods: {
        disconnect()
        {
            this.userSession.disconnect();
            this.$router.push('/')
        },
        openLoginSection()
        {
            this.dialogIsOpen(true);
            this.showLoginSection = true
        },
        closeLoginSection()
        {
            this.dialogIsOpen(false);
            this.showLoginSection = false
        },
        openCreateAccountSection()
        {
            this.dialogIsOpen(true);
            this.showNewUserSection = true
        },
        closeCreateAccountSection()
        {
            this.dialogIsOpen(false);
            this.showNewUserSection = false
        },
        resetUserSession()
        {
            this.userSession.user = null
            this.$router.push('/')
        }
    },
    provide()
    {
        return {
            closeLoginSection: this.closeLoginSection,
            closeCreateAccountSection: this.closeCreateAccountSection
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

.v-list-item-title:hover {
    color: white;
}

.v-list-item:hover {
    color: white;
    background-color: rgba(0, 0, 0, 0.1);
}

.v-list {
    background-color: rgba(138, 103, 9, 1) !important;

}</style>