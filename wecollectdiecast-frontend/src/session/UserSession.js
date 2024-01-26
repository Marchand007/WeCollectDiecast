import { reactive } from "vue";

class AuthError extends Error
{
    constructor(status, message)
    {
        super(message);
        this.status = status;
    }
}

const userSession = reactive({
    user: null,
    userEmail: null,
    password: null,
    isReady: false,

    initialize()
    {

        if (sessionStorage.userEmail)
        {
            this.userEmail = sessionStorage.userEmail;
        }
        if (sessionStorage.password)
        {
            this.password = sessionStorage.password;
        }
        if (this.user == null && this.userEmail != null)
        {
            this.fetchuser().catch(err =>
            {
                this.clearCredentials();
                console.error("L'authentification initiale a échouée: ", err)
            });
        }
        if (!sessionStorage.userEmail && !sessionStorage.password)
        {
            this.isReady = true;
        }
    },
    login(userEmail, password)
    {
        this.setCredentials(userEmail, password);
        return this.fetchuser();
    },
    setCredentials(userEmail, password)
    {
        this.userEmail = userEmail;
        sessionStorage.userEmail = userEmail;
        this.password = password;
        sessionStorage.password = password;
    },
    clearCredentials()
    {
        this.userEmail = null;
        sessionStorage.removeItem('userEmail');
        this.password = null;
        sessionStorage.removeItem('password');
        sessionStorage.removeItem('user');
        sessionStorage.status = "disconnected";
    },
    disconnect()
    {
        this.user = null;
        this.clearCredentials();
    },
    async fetchuser()
    {
        const response = await fetch("https://wcd-api-7fcyt.ondigitalocean.app/api/login", {
            method: "GET",
            headers: {
                ... this.getAuthHeaders()
            }
        });
        if (response.ok)
        {
            const user = await response.json();
            this.user = user;
            sessionStorage.setItem('user', JSON.stringify(user));
            sessionStorage.status = "connected";
            this.isReady = true;
            return user;
        } else
        {
            console.log("ici23")
            this.user = null;
            this.isReady = true;
            if (response.status === 401)
            {
                throw new AuthError(response.status, "Courriel ou mot de passe incorrect");
            } else if (response.status === 403)
            {
                throw new AuthError(response.status, "Votre compte est désactivé, veuillez nous contacter pour plus d'informations");
            }
            else
            {
                throw new AuthError(response.status, "Erreur lors de l'authentification: " + response.status);
            }
        }
    },
    getAuthHeaders()
    {
        if (this.userEmail)
        {
            return {
                "Authorization": "Basic " + btoa(this.userEmail + ":" + this.password),
                "X-Requested-With": "XMLHttpRequest"
            };
        } else
        {
            return {};
        }
    }
});

export default userSession;

userSession.initialize();