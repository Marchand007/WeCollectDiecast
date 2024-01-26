const pool = require("./DBPool");

const constructUser = function (row)
{
    let birthdate = row.birthdate;
    if (birthdate)
    {
        birthdate = birthdate.toISOString();
        birthdate = birthdate.split('T')[0];
    }
    return {
        id: row.id,
        username: row.username,
        firstName: row.first_name,
        lastName: row.last_name,
        fullName: row.first_name + " " + row.last_name,
        email: row.email,
        birthdate: birthdate,
        city: row.city,
        state: row.state,
        country: row.country,
        wantNewsletter: row.want_newsletter,
        isActive: row.is_active,
        isAdmin: row.is_admin,
        createdDate: row.created_date,
        isNewUser: row.is_new_user,
        hadLostPassword: row.had_lost_password,
        passwordLostTimeout: row.password_lost_timeout,
    }
}


const login = async (username) =>
{
    const result = await pool.query(
        `SELECT * FROM "user"
          WHERE username = $1`,
        [username]);

    const row = result.rows[0];

    if (row)
    {
        let birthdate = row.birthdate;
        if (birthdate)
        {
            birthdate = birthdate.toISOString();
            birthdate = birthdate.split('T')[0];
        }
        const user = {
            id: row.id,
            username: row.username,
            firstName: row.first_name,
            lastName: row.last_name,
            email: row.email,
            birthdate: birthdate,
            passwordHash: row.password_hash,
            passwordSalt: row.password_salt,
            isActive: row.is_active,
            hadLostPassword: row.had_lost_password,
            passwordLostTimeout: row.password_lost_timeout,
            isNewUser: row.is_new_user,
            isAdmin: row.is_admin
        };
        return user;
    }
    return undefined;
};
exports.login = login;


const getUserList = async (order) =>
{
    if (!order) order = "username";
    const result = await pool.query(
        `SELECT * FROM "user"
            ORDER BY ${order}`);

    return result.rows.map(row =>
    {
        const user = {
            id: row.id,
            username: row.username,
            firstName: row.first_name,
            lastName: row.last_name,
            fullName: row.first_name + " " + row.last_name,
            city: row.city,
            state: row.state,
            country: row.country,
            isActive: row.is_active,
        };
        return user;
    });
};
exports.getUserList = getUserList;


const getUserBy = async (option, value) =>
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
exports.getUserBy = getUserBy;


const insertUser = async (userInfos, passwordHash, passwordSalt, clientParam) =>
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
            created_date,
            password_hash,
            password_salt,
            is_new_user,
            had_lost_password,
            password_lost_timeout
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
        RETURNING *;`,
        [userInfos.username, userInfos.firstName, userInfos.lastName, userInfos.email, userInfos.birthdate, userInfos.city, userInfos.state, userInfos.country,
        userInfos.wantNewsletter, true, userInfos.isAdmin, userInfos.createdDate, passwordHash, passwordSalt, userInfos.isNewUser, false, userInfos.passwordLostTimeout]);

    const row = result.rows[0];

    if (row)
    {
        const user = constructUser(row);
        return user;
    }

    throw new Error("L'insertion a échoué pour une raison inconnue");
};
exports.insertUser = insertUser;




const updateUserPassword = async (userInfos, passwordHash, passwordSalt, clientParam) =>
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
exports.updateUserPassword = updateUserPassword;