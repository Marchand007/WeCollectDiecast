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
        return "" + err;s
    }
}

async function createServiceError(response)
{
    return new ServiceError(response.status, await getResponseMessage(response));
}

export async function getAllUserRatingList(option)
{
    const response = await fetch(`https://wcd-api-7fcyt.ondigitalocean.app/api/rating`, {
    //const response = await fetch(`api/rating`, {
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

export async function getRatingUserBy(option, value)
{
    const response = await fetch(`https://wcd-api-7fcyt.ondigitalocean.app/api/user/${option}/${value}`, {
    //const response = await fetch(`api/rating/${option}/${value}`, {
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

export async function createRating(ratingInfos)
{
    const response = await fetch(`https://wcd-api-7fcyt.ondigitalocean.app/api/rating`, {
    //const response = await fetch(`api/rating`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(ratingInfos)
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
