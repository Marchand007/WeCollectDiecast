import { createStore } from 'vuex';

export default createStore({
    state: {
        data: null,
        loginSectionOpened: false,
        registrerSectionOpened: false,
    },
    mutations: {
        setData(state, payload) {
            state.data = payload;
        },
        toggleLoginSection(state)
        {
            state.loginSectionOpened = !state.loginSectionOpened; 
            state.registrerSectionOpened = !state.registrerSectionOpened;
        },
        openLoginSection(state)
        {
            state.loginSectionOpened = true; 
            state.registrerSectionOpened = false;
        }
    },
    actions: {
        setData({ commit }, payload) {
            commit('setData', payload);
        },
        toggleLoginSection({ commit })
        {
            commit('toggleLoginSection'); // Appel de la mutation pour modifier la valeur de loginSectionOpen
        },
        setLoginSectionToTrue({ commit })
        {
            commit('openLoginSection'); // Appel de la mutation pour modifier la valeur de loginSectionOpen
        }
    },
    getters: {
        // Définissez un getter si nécessaire
        getData: state => state.data
    }
});