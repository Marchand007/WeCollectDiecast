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
    userUsername: null,
    password: null,
    isReady: false,

    initialize()
    {

        if (sessionStorage.userUsername)
        {
            this.userUsername = sessionStorage.userUsername;
        }
        if (sessionStorage.password)
        {
            this.password = sessionStorage.password;
        }
        if (this.user == null && this.userUsername != null)
        {
            this.fetchuser().catch(err =>
            {
                this.clearCredentials();
                console.error(this.$t('initalLoginFailed'), err)
            });
        }
        if (!sessionStorage.userUsername && !sessionStorage.password)
        {
            this.isReady = true;
        }
    },
    login(userUsername, password)
    {
        this.setCredentials(userUsername, password);
        return this.fetchuser();
    },
    setCredentials(userUsername, password)
    {
        this.userUsername = userUsername;
        sessionStorage.userUsername = userUsername;
        this.password = password;
        sessionStorage.password = password;
    },
    clearCredentials()
    {
        this.userUsername = null;
        sessionStorage.removeItem('userUsername');
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
        //const response = await fetch("https://wcd-api-7fcyt.ondigitalocean.app/api/login", {
        const response = await fetch("api/login", {
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
            this.user = null;
            this.isReady = true;
            if (response.status === 401)
            {
                throw new AuthError(response.status, this.$t("errorUsernameOrPassword"));
            } else if (response.status === 403)
            {
                throw new AuthError(response.status, this.$t("YourAccountIsDeactivated"));
            }
            else
            {
                throw new AuthError(response.status, this.$t("errorLogin") + response.status);
            }
        }
    },
    getAuthHeaders()
    {
        if (this.userUsername)
        {
            return {
                "Authorization": "Basic " + btoa(this.userUsername + ":" + this.password),
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