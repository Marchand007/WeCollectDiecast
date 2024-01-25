const pool = require("./DBPool");

const constructRating = function (row)
{

    return {
        id: row.id,
        ratedUserId: row.rated_user_id,
        ratedByUserUsername: row.rated_by_user_username,
        rating: row.rating,
        ratingNote: row.rating_note,    
        ratingDate: row.rating_date
    }
}


const getUserRatingBy = async (option, value) =>
{

    let result = null;
    if (option === "id")
    {
        result = await pool.query(
            `SELECT * FROM "user"
             WHERE id = $1`,
            [value]);
    } else
    {
        result = await pool.query(
            `SELECT * FROM "user"
             WHERE LOWER(${option}) = LOWER($1)`,
            [value]);
    }
    const row = result.rows[0];

    if (row)
    {
        const user = constructUser(row);
        return user;
    }

    return undefined;
};
exports.getUserRatingBy = getUserRatingBy;


const insertUserRating = async (userInfos, passwordHash, passwordSalt, clientParam) =>
{
    const result = await pool.query(
        `INSERT INTO
        "user"(
            username,
            first_name,
            last_name,
            email,
            birthdate,
            city,
            state,
            country,
            want_newsletter,
            is_active,
            is_admin,
            password_hash,
            password_salt,
            is_new_user,
            had_lost_password,
            password_lost_timeout
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
        RETURNING *;`,
        [userInfos.username, userInfos.firstName, userInfos.lastName, userInfos.email, userInfos.birthdate, userInfos.city, userInfos.state, userInfos.country,
        userInfos.wantNewsletter, true, userInfos.isAdmin, passwordHash, passwordSalt, userInfos.isNewUser, false, userInfos.passwordLostTimeout]);

    const row = result.rows[0];

    if (row)
    {
        const user = constructUser(row);
        return user;
    }

    throw new Error("L'insertion a échoué pour une raison inconnue");
};
exports.insertUserRating = insertUserRating;
