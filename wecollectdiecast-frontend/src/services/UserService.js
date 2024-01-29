import session from '../session/UserSession'

class ServiceError extends Error
{
    constructor(status, message)
    {
        super(message);
        this.status = status;
    }
}

async function getResponseMessage(response)
{
    try
    {
        const obj = await response.json();
        return obj.message ? obj.message : "Erreur inconnue";
    } catch (err)
    {
        return "" + err;
    }
}

async function createServiceError(response)
{
    return new ServiceError(response.status, await getResponseMessage(response));
}

export async function getUserList(option)
{
    const response = await fetch(`https://wcd-api-7fcyt.ondigitalocean.app/api/user/${option}`, {
    //const response = await fetch(`api/user/${option}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });

    if (response.ok)
    {
        return await response.json();
    } else
    {
        console.info(JSON.stringify(response));
        throw await createServiceError(response);
    }

}

export async function getUserBy(option, value)
{
    const response = await fetch(`https://wcd-api-7fcyt.ondigitalocean.app/api/user/${option}/${value}`, {
    //const response = await fetch(`api/user/${option}/${value}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });
    if (response.ok)
    {
        return await response.json();
    } else
    {
        console.info(JSON.stringify(response));
        throw await createServiceError(response);
    }
}

export async function createUser(user)
{
    const response = await fetch(`https://wcd-api-7fcyt.ondigitalocean.app/api/user`, {
    //const response = await fetch(`api/user`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user)
    });

    if (response.ok)
    {
        return await response.json();
    } else
    {
        console.info(JSON.stringify(response));
        throw await createServiceError(response);
    }
}

export async function updateUser(user)
{
    const response = await fetch(`https://wcd-api-7fcyt.ondigitalocean.app/api/user`, {
    //const response = await fetch(`api/user`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            ...session.getAuthHeaders()
        },
        body: JSON.stringify(user)
    });

    if (response.ok)
    {
        return await response.json();
    } else
    {
        console.info(JSON.stringify(response));
        throw await createServiceError(response);
    }
}


export async function resetUserPassword(userEmail, newPassword)
{
    const response = await fetch(`https://wcd-api-7fcyt.ondigitalocean.app/api/user/lostpassword`, {
    //const response = await fetch(`api/user/lostpassword`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...session.getAuthHeaders()
        },
        body: JSON.stringify({ email: userEmail })
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
