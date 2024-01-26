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

export async function getUserList(option) {
    const response = await fetch(`https://wcd-api-7fcyt.ondigitalocean.app/api/user/${option}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });

    if (response.ok) {
        return await response.json();
    } else {
        console.info(JSON.stringify(response));
        throw await createServiceError(response);
    }

}

export async function getUserBy(option, value) {
    const response = await fetch(`https://wcd-api-7fcyt.ondigitalocean.app/api/user/${option}/${value}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });
    if (response.ok) {
        return await response.json();
    } else {
        console.info(JSON.stringify(response));
        throw await createServiceError(response);
    }
}

export async function createUser(user) {
    const response = await fetch(`https://wcd-api-7fcyt.ondigitalocean.app/api/user`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user)
    });

    if (response.ok) {
        return await response.json();
    } else {
        console.info(JSON.stringify(response));
        throw await createServiceError(response);
    }
}

export async function updateUser(user) {
    const response = await fetch(`https://wcd-api-7fcyt.ondigitalocean.app/api/user`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            ...session.getAuthHeaders()
        },
        body: JSON.stringify(user)
    });

    if (response.ok) {
        return await response.json();
    } else {
        console.info(JSON.stringify(response));
        throw await createServiceError(response);
    }
}

export async function updateUserByAdmin(user) {
    const response = await fetch(`https://wcd-api-7fcyt.ondigitalocean.app/api/user/admin`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            ...session.getAuthHeaders()
        },
        body: JSON.stringify(user)
    });

    if (response.ok) {
        return await response.json();
    } else {
        console.info(JSON.stringify(response));
        throw await createServiceError(response);
    }
}

export async function changeUserPassword(userId, newPassword)
{
    const response = await fetch(`https://wcd-api-7fcyt.ondigitalocean.app/api/user/newPassword/${userId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            ...session.getAuthHeaders()
        },
        body: JSON.stringify({ newPassword: newPassword })
    });

    if (response.ok)
    {
        const respJson = await response.json();
        return respJson;
    } else
    {
        throw await createServiceError(response);
    }
}
