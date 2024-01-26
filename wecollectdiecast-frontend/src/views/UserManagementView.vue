<template>
    <h1 class="boxed-center">Gestion des clients</h1>
    <div>
        <v-row class="justify-center ma-0">
            <v-col cols="12" sm="6">
                <v-row class="justify-center ma-0">
                    <v-dialog class="dialog" v-model="dialogNewClient" persistent>
                        <template v-slot:activator="{ props }">
                            <v-btn color="black" v-bind="props" height="80">Ajouter un client</v-btn>
                        </template>
                        <v-card class="custom-card-dialog">
                            <v-card-title>
                                Création d'un nouveau compte
                            </v-card-title>
                            <NewClientForm />
                        </v-card>
                    </v-dialog>

                </v-row>
            </v-col>
        </v-row>
        <v-row class="justify-center ma-0">
            <v-col cols="10" sm="6">
                <v-autocomplete bg-color="black" label="Selectionnez un client" v-model="selectedclient" :items="clientList"
                    item-title="fullName" item-value="id" no-data-text="Aucun client trouvé" variant="solo"
                    auto-select-first hide-selected clearable></v-autocomplete>
            </v-col>
        </v-row>

    </div>
    <v-row class="justify-center ma-2">
        <v-sheet v-if="!newclientInCreation && selectedclient > 0" class="pa-5" :width="isMobile ? '100%' : '90%'"
            style="background-color: black; border-radius: 25px;">
            <v-row class="justify-center ma-2">
                <v-col v-if="errorMessage" cols="12">
                    <p class="error-message">{{ errorMessage }}</p>
                </v-col>
                <v-col cols="12" :sm="editMode ? 2 : 1"></v-col>
                <v-col cols="12" :sm="editMode ? 8 : 10">
                    <h2 style="color:white;text-align: center;text-decoration: underline;">Informations du client</h2>
                </v-col>
                <v-col cols="12" :sm="editMode ? 2 : 1">
                    <v-row class="justify-center">
                        <span v-if="!editMode"><v-btn @click="editMode = !editMode" color="white" width="50px" height="50px"
                                variant="plain" elevation="5">
                                <svg-icon type="mdi" :path="pathEdit" size="50"></svg-icon>
                            </v-btn>
                        </span>
                        <span v-else>
                            <v-btn @click="editMode = !editMode" color="red" width="50px" height="50px" variant="plain"
                                elevation="5">
                                <svg-icon type="mdi" :path="pathclose" size="50"></svg-icon>
                            </v-btn>
                            <v-btn @click="saveEditedClient" color="white" width="50px" height="50px" variant="plain"
                                elevation="5">
                                <svg-icon type="mdi" :path="pathSave" size="50"></svg-icon>
                            </v-btn>
                        </span>
                    </v-row>
                </v-col>
            </v-row>
            <clientInfo ref="clientInfoRefManagement" :clientId="selectedclient" :editMode="editMode" />
        </v-sheet>
        <v-sheet v-if="newclientInCreation" class="pa-5" :width="isMobile ? '100%' : '50%'" style="background-color: black; border-radius: 25px;">
            <v-row class="justify-center">
                <p style="color:white;text-align: center;">Creation nouveau client</p>
            </v-row>
            <v-row class="justify-center">
            </v-row>
        </v-sheet>
    </v-row>
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiSquareEditOutline, mdiContentSaveOutline, mdiCloseOutline } from '@mdi/js';
import userSession from '../session/UserSession.js'
import clientInfo from '../components/clientInfo.vue'
import NewClientForm from '../components/NewClientForm.vue';
import { getClientList, updateClientByAdmin } from '../services/ClientService'

import { computed } from "vue";

export default {
    components: {
        clientInfo,
        NewClientForm,
        SvgIcon
    },
    data()
    {
        return {
            editMode: false,
            userSession: userSession,
            newclientInCreation: false,
            selectedclient: null,
            clientList: [
            ],
            pathEdit: mdiSquareEditOutline,
            pathSave: mdiContentSaveOutline,
            pathclose: mdiCloseOutline,
            errorMessage: "",
            dialogNewClient: false,
            refreshClient: false,
        };
    },
    watch: {
        selectedclient()
        {
            this.newclientInCreation = false;
        }
    },
    methods: {
        loadclients()
        {
            this.clientList = [];
            getClientList().then(clientList =>
            {
                this.clientList = clientList;

                this.clientList.forEach(client =>
                {
                    if (!client.isActive)
                    {
                        client.fullName = client.fullName + " (Inactif)"
                        client.props = {
                            "base-color": "red"
                        };
                    }
                });
            }).catch(err =>
            {
                console.error(err)
            })
        },
        async saveEditedClient()
        {
            this.errorMessage = "";
            const formValid = await this.$refs.clientInfoRefManagement.$refs.EditClientFormAdmin.validate();
            if (!formValid.valid) return;
            await updateClientByAdmin(this.$refs.clientInfoRefManagement.clientToEdit).then(client =>
            {
                this.clientList = this.clientList.filter(client => client.id !== this.selectedclient)
                if (!client.isActive)
                {
                    client.fullName = client.fullName + " (Inactif)"
                    client.props = {
                        "base-color": "red"
                    };
                }
                this.clientList.push(client);
                this.clientList.sort((a, b) => a.fullName.localeCompare(b.fullName));
                this.selectedclient = client.id;
                this.editMode = false;
                this.refreshClient = true;
            }).catch(err =>
            {
                this.errorMessage = err.message;
                console.error(err);
            });
        },
        openCreationSection()
        {
            this.selectedclient = null;
            setTimeout(() =>
            {
                this.newclientInCreation = true;
            }, 0);
        },
        updateSelectedclient(newclient)
        {
            this.selectedclient = newclient;
        },
        closeNewClientDialog(isCreated)
        {
            this.dialogNewClient = false;
            if (isCreated) this.loadclients();
        },
        updateRefreshClientValue(value)
        {
            this.refreshClient = value;
        }
    },
    computed: {
        isMobile()
        {
            return screen.width < 960;
        },
    },
    provide()
    {
        return {
            loadclients: this.loadclients,
            updateSelectedclient: this.updateSelectedclient,
            updateRefreshClientValue: this.updateRefreshClientValue,
            closeNewClientDialog: this.closeNewClientDialog,
            refreshClient: computed(() => this.refreshClient)
        };
    },
    created()
    {
        this.loadclients();
    }
}


</script>

<style scoped>
.error-message {
    color: red;
    text-align: center;
    font-size: small;
}

p {
    color: white;
}

a {
    cursor: pointer;
    color: blue;
    text-decoration: underline;
}

@media (min-width: 1024px) {
    .boxed-center {
        margin-top: 50px;
        border-style: none;
        border-color: rgba(255, 0, 0, 0.238);
        border-radius: 50px;
        padding: 1rem;
        text-align: center;
        width: 100%;
    }
    .dialog {
        border-style: none;
        margin: 1rem auto;
        border-radius: 10px;
        padding: 1rem;
        text-align: center;
        width: 50%;
    }
}

@media (min-width: 600px) and (max-width: 1024px) {
    .boxed-center {

        margin-top: 50px;
        border-style: none;
        border-color: rgba(255, 0, 0, 0.238);
        border-radius: 50px;
        padding: 1rem;
        text-align: center;
        width: 100%;
    }
    .dialog {
        border-style: none;
        margin: 1rem auto;
        border-radius: 10px;
        padding: 1rem;
        text-align: center;
        width: 80%;
    }
}

@media (max-width: 600px) {
    .boxed-center {
        margin-top: 50px;
        border-style: none;
        border-color: rgba(255, 0, 0, 0.238);
        border-radius: 50px;
        padding: 1rem;
        text-align: center;
        width: 100%;
    }
    .dialog {
        border-style: none;
        border-color: rgba(255, 0, 0, 0.238);
        margin: 1rem auto;
        border-radius: 10px;
        padding: 1rem;
        text-align: center;
        width: 95%;
        max-width: 80rem;
    }
}
</style>