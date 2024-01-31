const pool = require("./DBPool");

const constructRating = function (row)
{

    return {
        id: row.id,
        ratedUserId: row.rated_user_id,
        ratedByUserUsername: row.rated_by_user_username,
        rating: row.rating,
        ratingNote: row.rating_note,    
        ratingDate: row.rating_date,
        average: row.avg || 0,
        count : row.count
    }
}

const getUserRatingBy = async (option, value) =>
{

    let result = null;
    if (option === "id")
    {
        result = await pool.query(
            `SELECT AVG(rating), COUNT("id")
            FROM public.user_rating
            WHERE rated_user_id = $1`,
            [value]);
    } else
    {
        result = await pool.query(
            `SELECT AVG(rating), COUNT("id")
            FROM public.user_rating
            WHERE rated_user_id = (SELECT "id" FROM "user" WHERE LOWER(${option}) = LOWER($1))`,
            [value]);
    }
    const row = result.rows[0];

    if (row)
    {
        const rating = constructRating(row);
        return rating;
    }

    return undefined;
};
exports.getUserRatingBy = getUserRatingBy;


const insertUserRating = async (ratingInfos, clientParam) =>
{
    const result = await pool.query(
        `INSERT INTO
        rating (
            rated_user_id,
            rated_by_user_username,
            rating,
            rating_note,
            rating_date)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;`,
        [ratingInfos.ratedUserId, ratingInfos.ratedByUserUsername, ratingInfos.rating, ratingInfos.ratingNote, ratingInfos.ratingDate]);

    const row = result.rows[0];

    if (row)
    {
        const user = constructRating(row);
        return user;
    }

    throw new Error("L'insertion a échoué pour une raison inconnue");
};
exports.insertUserRating = insertUserRating;
