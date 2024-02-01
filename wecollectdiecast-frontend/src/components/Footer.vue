<template>
    <footer class="footer">
        <v-row class="ma-0 justify-start">
            <select class="select-language" v-model="actualLanguage">
                <option value="French">{{ $t('french') }}</option>
                <option value="English">{{ $t('english') }}</option>
                <option value="Spanish">{{ $t('spanish') }}</option>
            </select>

        </v-row>
        <div class="container">
            <v-row class="ma-0 mt-5" no-gutters>
                <v-col cols="12" md="12">
                    <p>&copy; 2024 Eimemanagement. {{ $t('allRightsReserved') }}</p>
                </v-col>
                <v-col cols="12" md="12">
                    <p style="font-size: 0.7rem;"> {{ $t('appDevBy') }} <a
                            href="https://www.linkedin.com/in/maxime-marchand-58196a289/" target="_blank">Maxime
                            Marchand</a></p>
                </v-col>
            </v-row>
        </div>
    </footer>
</template>

<script>
export default {

    name: 'Footer',
    data()
    {
        return {
            actualLanguage: 'French',
        }
    },
    watch: {
        actualLanguage()
        {
            if (this.actualLanguage == 'French')
            {
                sessionStorage.language = 'French'
                this.$i18n.locale = 'fr'
            }
            else if (this.actualLanguage == 'English')
            {
                sessionStorage.language = 'English'
                this.$i18n.locale = 'en'
            } else if (this.actualLanguage == 'Spanish')
            {
                sessionStorage.language = 'Spanish'
                this.$i18n.locale = 'es'
            }
        }
    },
    methods: {

    },
    mounted()
    {
        if (sessionStorage.language)
        {
            if (sessionStorage.language == 'French')
            {
                this.$i18n.locale = 'fr'
            }
            else if (sessionStorage.language == 'English')
            {
                this.$i18n.locale = 'en'
            } else if (sessionStorage.language == 'Spanish')
            {
                this.$i18n.locale = 'es'
            }
            this.actualLanguage = sessionStorage.language
        }
        else {
            this.actualLanguage = 'English'
            this.$i18n.locale = 'en'
        }
    }
}
</script>

<style scoped>
.footer {
    border-top: 1px white solid;
    padding: 20px;
    text-align: center;
    font-size: 0.8rem;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
}

.select-language {
    color: white;
    background-color: black;
    font-size: 0.8rem;
    border: none;
    border-radius: 5px;
    margin-left: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
    padding: 3px 10px;
    border: 1px solid white;
}
</style>
