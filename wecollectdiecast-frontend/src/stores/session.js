import { defineStore } from 'pinia'

export const userSessionStore = defineStore({
    id: 'userSession',
    state: () => ({
      sessionConnected: false,
      user : ''
    }),
    actions: {
      login()
      {
        console.info("ok rentrer userSession store")
        this.sessionConnected = true;
        this.user = 'Maxime'
      },
    },
    getters: {
      getUserSession : (state) =>
      {
        if (state.sessionConnected)
        {
          return state.user;
        }
        return 'Aucun utilisateur connecté'
      }
    }
})
