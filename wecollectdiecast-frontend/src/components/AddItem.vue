<template>
    <div>
        <v-row class="ma-0">
            <v-col cols="12" md="2">
                <v-select label="Marque Diecast" density="compact">
                </v-select>
            </v-col>
            <v-col cols="12" md="2">
                <v-select label="Année fabrication" density="compact">
                </v-select>
            </v-col>
            <v-col cols="12" md="2">
                <v-radio-group v-model="newItem.isCarded" inline>
                    <v-radio label="Carté" :value="true"></v-radio>
                    <v-radio label="Lousse" :value="false"></v-radio>
                </v-radio-group>
            </v-col>
            <v-col cols="12" md="2">
                <v-select label="État/Condition" density="compact">
                </v-select>
            </v-col>
            <v-col cols="12" md="2">
                <v-select label="Échelle" density="compact">
                </v-select>
            </v-col>

        </v-row>
        <p>Champs obligatoires</p>
        <div class="add-item-section mt-0">
            <v-row class="ma-0">
                <v-col cols="12" md="2">
                    <v-select label="Fabricant" density="compact">
                    </v-select>
                </v-col>
                <v-col cols="12" md="2">
                    <v-select label="Modele" density="compact">
                    </v-select>
                </v-col>
                <v-col cols="12" md="2">
                    <v-text-field label="Année de la voiture" type="number" density="compact" hide-spin-buttons>
                    </v-text-field>
                </v-col>
                <v-col cols="12" md="2">
                    <v-select label="Couleur" density="compact">
                    </v-select>
                    <v-text-field label="Couleur" density="compact">
                    </v-text-field>
                </v-col>
                <v-col cols="12" md="2">
                    <v-select label="Marque" density="compact">
                    </v-select>
                </v-col>
                <v-col cols="12" md="2">
                    <v-select label="Marque" density="compact">
                    </v-select>
                </v-col>
            </v-row>
        </div>
        <p>Champs optionnels</p>
        <div class="add-item-section mt-0">
            <v-row class="ma-0">
                <v-col cols="12" md="2">
                    <v-checkbox label="Mainline" density="compact">
                    </v-checkbox>
                </v-col>
                <v-col cols="12" md="2">
                    <v-checkbox label="Premium" density="compact">
                    </v-checkbox>
                </v-col>
                <v-col cols="12" md="2">
                    <v-checkbox label="Monster Truck" density="compact">
                    </v-checkbox>
                </v-col>

                <v-col cols="12" md="2">
                    <v-checkbox label="Mystery" density="compact">
                    </v-checkbox>
                </v-col>
                <v-col cols="12" md="2">
                    <v-checkbox label="Team Transport" density="compact">
                    </v-checkbox>
                </v-col>
                <v-col cols="12" md="2">
                    <v-checkbox label="Fantaisie" density="compact">
                    </v-checkbox>
                </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-row class="ma-0">
                <v-col cols="12" md="2">
                    <v-checkbox label="Treasure Hunt" density="compact">
                    </v-checkbox>
                </v-col>

                <v-col cols="12" md="2">
                    <v-checkbox label="Super Treasure Hunt" density="compact">
                    </v-checkbox>
                </v-col>
                <v-col cols="12" md="2">
                    <v-checkbox label="Chase / Superchase" density="compact">
                    </v-checkbox>
                </v-col>
                <v-col cols="12" md="2">
                    <v-checkbox label="Zamac" density="compact">
                    </v-checkbox>
                </v-col>
                <v-col cols="12" md="2">
                    <v-checkbox label="Red Edition" density="compact">
                    </v-checkbox>
                </v-col>
                <v-col cols="12" md="2">
                    <v-checkbox label="Custom" density="compact">
                    </v-checkbox>
                </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-row class="ma-0">
                <v-col cols="12" md="2">
                    <v-checkbox label="Moto / Skidoo" density="compact">
                    </v-checkbox>
                </v-col>
                <v-col cols="12" md="2">
                    <v-checkbox label="Premium" density="compact">
                    </v-checkbox>
                </v-col>
                <v-col cols="12" md="2">
                    <v-checkbox label="Monster Truck" density="compact">
                    </v-checkbox>
                </v-col>

                <v-col cols="12" md="2">
                    <v-checkbox label="Mystery" density="compact">
                    </v-checkbox>
                </v-col>
                <v-col cols="12" md="2">
                    <v-checkbox label="Team Transport" density="compact">
                    </v-checkbox>
                </v-col>
                <v-col cols="12" md="2">
                    <v-checkbox label="Erreur" density="compact">
                    </v-checkbox>
                </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-row class="ma-0">
                <v-col cols="12" md="2" :class="newItem.isPack ? 'bordered-vcol' : ''">
                    <v-checkbox v-model="newItem.isPack" label="Pack" density="compact">
                    </v-checkbox>
                    <v-select v-if="newItem.isPack" label="Grosseur" density="compact">
                    </v-select>
                    <v-text-field v-if="newItem.isPack" label="Nom du pack" density="compact">
                    </v-text-field>
                </v-col>
                <v-col cols="12" md="2" :class="newItem.inSerie ? 'bordered-vcol' : ''">
                    <v-checkbox v-model="newItem.inSerie" label="Fait partie d'une série" density="compact">
                    </v-checkbox>
                    <v-row v-if="newItem.inSerie" class="ma-0" no-gutters>
                        <v-col cols="9">
                            <v-select v-if="newItem.inSerie" v-model="newItem.serieName" :items="serieList"
                                label="Nom de la série" density="compact">
                            </v-select>
                        </v-col>
                        <v-col cols="1">
                            <v-btn class="ma-0 btn-plus" color="grey" elevation="5">+
                            </v-btn>
                        </v-col>
                    </v-row>
                    <v-text-field v-if="newItem.inSerie && newItem.serieName && newItem.serieName[0] == '+'"
                        v-model="newItem.newSerieName" label="Nom de la série" density="compact">
                    </v-text-field>
                    <v-row v-if="newItem.inSerie" class="ma-0" no-gutters>
                        <v-col cols="5">
                            <v-text-field v-model="newItem.serieNumber" label="#" type="number" density="compact"
                                hide-spin-buttons>
                            </v-text-field>
                        </v-col>
                        <v-col cols="2" class="text-center">
                            <p>sur</p>
                        </v-col>
                        <v-col cols="5">
                            <v-text-field v-model="newItem.serieTotal" label="Nb total" type="number" density="compact"
                                hide-spin-buttons>
                            </v-text-field>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col cols="12" md="2" :class="newItem.isInPack ? 'bordered-vcol' : ''">
                    <v-checkbox v-model="newItem.isInPack" label="Vient d'un pack/box" density="compact">
                    </v-checkbox>
                    <v-select v-if="newItem.isInPack" label="Grosseur" density="compact">
                    </v-select>
                    <v-text-field v-if="newItem.isInPack" label="Nom du pack" density="compact">
                    </v-text-field>
                </v-col>
                <v-col cols="12" md="2">
                    <v-select label="Couleur" density="compact">
                    </v-select>
                    <v-text-field label="Couleur" density="compact">
                    </v-text-field>
                </v-col>
                <v-col cols="12" md="2">
                    <v-select label="Marque" density="compact">
                    </v-select>
                </v-col>
            </v-row>
        </div>

        <p>Informations supplémentaires</p>
        <div class="add-item-section mt-0 pa-5">

            <v-row class="ma-0">
                <v-textarea label="Inscrivez ici toutes informations supplémentaires que vous désirez inclure"></v-textarea>
            </v-row>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AddItem',
    data()
    {
        return {
            newItem: {
                brand: '',
                model: '',
                year: '',
                color: '',
                scale: '',
                isPack: false,
                packSize: '',
                isInPack: false,
                packName: '',
                isCarded: null,
                inSerie: false,
                serieName: '',
                newSerieName: '',
                serieNumber: null,
                serieTotal: null,
                material: '',
                country: '',
                price: '',
                currency: '',
                quantity: '',
                condition: '',
                box: '',
                description: '',
                picture: '',
            },
            serieList: ['+ ADD NEW', 'Neon speeders', 'Boulevard'],
        };
    },
    methods: {
        // Méthodes du composant
    },
    mounted()
    {
        // Code exécuté lorsque le composant est monté
    },
};
</script>

<style scoped>
.v-select:deep(label) {
    font-size: 0.8rem;
}

.v-checkbox:deep(label) {
    font-size: 0.8rem;
}

.add-item-section {
    border: 1px solid #ccc;
    width: 100%;
    margin-top: 20px;
    margin-bottom: 20px;
}

.btn-plus {
    min-width: 0 !important;
    height: 30px !important;
    width: 30px !important;
    font-size: 1.5rem;
    margin: 5px !important;
    color: white;
}

.bordered-vcol {
    border: 2px solid rgba(138, 103, 9, 0.9);
}
</style>
