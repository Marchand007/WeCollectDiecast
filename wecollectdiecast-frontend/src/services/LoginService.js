import session from '../session/UserSession'

class ServiceError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
    }
}

async function getResponseMessage(response) {
    try {
        const obj = await response.json();
        return obj.message ? obj.message : "Erreur inconnue";
    } catch (err) {
        return "" + err;
    }
}

async function createServiceError(response) {
    return new ServiceError(response.status, await getResponseMessage(response));
}

export async function resetPassword(email) {
    const response = await fetch(`https://wcd-api-7fcyt.ondigitalocean.app/api/login/lostpassword`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify( {email : email} )
    });

    if (response.ok) {
        return await response.json();
    } else {
        console.info(JSON.stringify(response));
        throw await createServiceError(response);
    }
}