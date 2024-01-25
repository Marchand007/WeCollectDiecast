<template>
    <v-app-bar class="pointer-logo ma-0" app prominent dense dark color="black" style="border-bottom: 2px solid #D4AF37; width:100vw">
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
            <v-btn @click="openLoginSection" color="white" flat>
                <span>Se connecter</span>
                <span><v-icon>mdi-login</v-icon></span>
            </v-btn>
        </span>
        <div v-else>

            <span v-show="display.mdAndUp.value" class="mx-2" style="color:white">
                Bienvenue, {{ userSession.user.username }}
            </span>

            <span v-show="display.smAndDown.value" style="color:white; text-align: center;">
                {{ userSession.user.username }}
            </span>
            <v-menu :menu-props="{ dark: true, color: $vuetify.theme.themes.dark.primary}" >
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
                            <v-list-item-title @click="resetUserSession">Se deconnecter</v-list-item-title>
                        </v-list-item> 
                        
                </v-list>
            </v-menu>
        </div>
    </v-app-bar>
    <v-dialog v-model="showLoginSection" class="animate__animated animate__bounceIn" scrollable persistent>
        <LoginForm></LoginForm>
    </v-dialog>
</template>

<script>
import { useDisplay } from 'vuetify'
import { RouterLink } from 'vue-router';
import userSession from '../session/UserSession.js'
import LoginForm from '../components/LoginForm.vue'
export default {
    components: {
        RouterLink, LoginForm
    },
    inject: ['dialogIsOpen'],
    data()
    {
        return {
            userSession: userSession,
            drawer: false,
            showAdminSection: false,
            showSpecialistSection: false,
            showLoginSection: false
        };
    },
    computed: {
        accountUrl()
        {
            return "/" + this.userSession.user.username;
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
            console.log("disconnect")
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
        resetUserSession()
        {
            this.userSession.user = null
            this.$router.push('/')
        }
    },
    provide()
    {
        return {
            closeLoginSection: this.closeLoginSection
        }
    },
    setup()
    {
        const display = useDisplay()
        return { display }
    },
    mounted()
    {   
        //console.log("mounted",this.display.smAndDown.value)
    }
}
</script>

<style scoped>
.pointer {
    cursor: pointer;
    flex-shrink: 0;
}

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
    color : white;
    background-color: rgba(0,0,0,0.1);
}
.v-list {
    background-color: rgba(138, 103, 9, 1) !important;

}
</style>