const express = require('express');
const router = express.Router();
const passport = require('passport');
const crypto = require('crypto');
const userQueries = require('../queries/userQueries');
const regex = require('../REGEX/REGEXbackend');
const HttpError = require("../HTTPError");
const { DateTime } = require("luxon");
const { sendEmailToUser } = require("../emailManagement");



router.get("/test",
    //passport.authenticate('basic', { session: false }),
    (req, res, next) =>
    {
        sendEmailLostPassword("m.marchand22@hotmail.com", "Mathieu", "123456789")
    }
);

router.get("/all/:option",
    //passport.authenticate('basic', { session: false }),
    (req, res, next) =>
    {
        // const user = req.user;

        // if (!user) return next(new HttpError(401, "Authentification nécessaire"))
        // if (!user.isAdmin) return next(new HttpError(403, "Vous n'avez pas les droits requis"))

        const option = req.params.option || "id"
        userQueries
            .getUserList(option)
            .then((userList) =>
            {
                if (userList)
                {
                    res.json(userList);
                } else
                {
                    return next(new HttpError(404, `Une erreur inconnue est survenue`));
                }
            })
            .catch((err) =>
            {
                return next(err);
            });
    }
);


router.get("/id/:id",
    //passport.authenticate('basic', { session: false }),
    (req, res, next) =>
    {
        //const user = req.user;
        const id = req.params.id;
        // if (!user) return next(new HttpError(401, "Authentification nécessaire"))
        // if (!user.isAdmin && (req.user.id != id)) return next(new HttpError(403, "Vous n'avez pas les droits requis"))

        userQueries
            .getUserBy("id", id)
            .then((client) =>
            {
                if (client)
                {
                    res.json(client);
                } else
                {
                    return next(new HttpError(404, `Aucun user trouvé avec le id ${id}`));
                }
            })
            .catch((err) =>
            {
                return next(err);
            });
    }
);


router.get("/username/:username",
    //passport.authenticate('basic', { session: false }),
    (req, res, next) =>
    {
        //const user = req.user;
        const username = req.params.username;
        //if (!user) return next(new HttpError(401, "Authentification nécessaire"))
        //if (!user.isAdmin && (req.user.username != username)) return next(new HttpError(403, "Vous n'avez pas les droits requis"))

        userQueries
            .getUserBy("username", username)
            .then((client) =>
            {
                if (client)
                {
                    res.json(client);
                } else
                {
                    return next(new HttpError(404, `Aucun user trouvé avec le username ${username}`));
                }
            })
            .catch((err) =>
            {
                return next(err);
            });
    }
);

router.get("/email/:email",
    //passport.authenticate('basic', { session: false }),
    (req, res, next) =>
    {
        //const user = req.user;
        const email = req.params.email;
        //if (!user) return next(new HttpError(401, "Authentification nécessaire"))
        //if (!user.isAdmin && (req.user.email != email)) return next(new HttpError(403, "Vous n'avez pas les droits requis"))

        userQueries
            .getUserBy("email", email)
            .then((user) =>
            {
                if (user)
                {
                    res.json(user);
                } else
                {
                    return next(new HttpError(404, `Aucun user trouvé avec le courriel ${email}`));
                }
            })
            .catch((err) =>
            {
                return next(err);
            });
    }
);

router.post("/",
    async (req, res, next) =>
    {
        try
        {
            const username = req.body.username;
            if (!username || username === "") return next(new HttpError(400, "Le champ username est requis"));
            if (username.length > 255) return next(new HttpError(400, `Le champ username ne peux pas dépasser 255 caractères. Il y a ${firstName.length - 255} caractères de trop.`));
            const userAlreadyExistUsername = await userQueries.getUserBy("username", username);
            if (userAlreadyExistUsername) throw new HttpError(409, `Le nom d'utilisateur ${username} n'est pas disponible`);

            const email = req.body.email;
            if (!email || email === "") return next(new HttpError(400, "Le champ email est requis"));
            if (email.length > 255) return next(new HttpError(400, `Le champ email ne peux pas dépasser 255 caractères. Il y a ${firstName.length - 255} caractères de trop.`));
            const userAlreadyExistEmail = await userQueries.getUserBy("email", email);
            if (userAlreadyExistEmail) throw new HttpError(409, `Un utilisateur avec le email ''${email}'' existe déjà`);
            if (!regex.validEmail.test(email)) return next(new HttpError(400, "Le champ email ne respect pas les critères d'acceptation"));

            const firstName = req.body.firstName;
            if (!firstName || firstName === "") return next(new HttpError(400, "Le champ prénom est requis"));
            if (firstName.length > 255) return next(new HttpError(400, `Le champ prénom ne peux pas dépasser 255 caractères. Il y a ${firstName.length - 255} caractères de trop.`));

            const lastName = req.body.lastName;
            if (!lastName || lastName === "") return next(new HttpError(400, "Le champ nom de famille est requis"));
            if (lastName.length > 255) return next(new HttpError(400, `Le champ nom de famille ne peux pas dépasser 255 caractères. Il y a ${lastName.length - 255} caractères de trop.`));


            if (!("wantNewsletter" in req.body)) return next(new HttpError(400, "Le champ wantNewsletter est requis"));

            let fullBirthdateString = null;
            if (req.body.birthdate && req.body.birthdate.day && req.body.birthdate.month)
            {
                const birthdateObj = {
                    year: 1900,
                    month: req.body.birthdate.month,
                    day: req.body.birthdate.day
                }
                const fullBirthdate = DateTime.fromObject(birthdateObj)
                fullBirthdateString = fullBirthdate.toString();
            }
            const isAdmin = req.body.isAdmin || false;
            const newUser = {
                username: username,
                firstName: firstName,
                lastName: lastName,
                email: email,
                birthdate: fullBirthdateString,
                addressCity: req.body.addressCity,
                addressState: req.body.addressState,
                addressCountry: req.body.addressCountry,
                wantNewsletter: req.body.wantNewsletter,
                isAdmin: isAdmin,
                isNewUser: true,
                createdDate: DateTime.now().toString(),
                hadLostPassword: false,
                passwordLostTimeout: null,
            };

            let password = req.body.password;
            if (!password || password == '') return next(new HttpError(400, 'Le champ password est requis'));
            if (!regex.validPassword.test(password)) return next(new HttpError(400, "Le champ password ne respect pas les critères d'acceptation"));

            const saltBuf = crypto.randomBytes(16);
            const passwordSalt = saltBuf.toString("base64");

            crypto.pbkdf2(password, passwordSalt, 100000, 64, "sha512", async (err, derivedKey) =>
            {
                if (err) return next(err);

                const passwordHashBase64 = derivedKey.toString("base64");

                const userAccountWithPasswordHash = await userQueries.insertUser(newUser, passwordHashBase64, passwordSalt);
                //sendEmailNewAccount(userAccountWithPasswordHash.email, userAccountWithPasswordHash.fullName, password)
                res.json(userAccountWithPasswordHash);
            });
        }
        catch (err)
        {
            return next(err);
        }
    }
);

router.put("/admin",
    passport.authenticate("basic", { session: false }),
    async (req, res, next) =>
    {
        try
        {
            const user = req.user;
            if (!user) return next(new HttpError(401, "Authentification nécessaire"))
            if (!user.isAdmin && !user.isSuperAdmin) return next(new HttpError(403, "Vous n'avez pas les droits requis"))

            const firstName = req.body.firstName;
            if (!firstName || firstName === "") return next(new HttpError(400, "Le champ prénom est requis"));
            if (firstName.length > 255) return next(new HttpError(400, `Le champ prénom ne peux pas dépasser 255 caractères. Il y a ${firstName.length - 255} caractères de trop.`));

            const lastName = req.body.lastName;
            if (!lastName || lastName === "") return next(new HttpError(400, "Le champ nom de famille est requis"));
            if (lastName.length > 255) return next(new HttpError(400, `Le champ nom de famille ne peux pas dépasser 255 caractères. Il y a ${lastName.length - 255} caractères de trop.`));

            const phoneNumber = req.body.phoneNumber;
            if (!phoneNumber || phoneNumber === "") return next(new HttpError(400, "Le champ numéro de téléphone est requis"));
            if (!regex.validPhoneNumber.test(phoneNumber)) return next(new HttpError(400, "Le champ numéro de téléphone ne respect pas les critères d'acceptation"));
            if (phoneNumber.length > 12 || phoneNumber.length < 10) return next(new HttpError(400, `Le champ numéro de téléphone ne peux pas dépasser 10 caractères. Il y a ${phoneNumber.length - 10} caractères de trop.`));

            const phoneType = req.body.phoneType;
            if (!phoneType || phoneType === "") return next(new HttpError(400, "Le champ type de numéro de téléphone est requis"));
            if (phoneType != "Mobile" && phoneType != "Domicile") return next(new HttpError(400, "Le type de numéro de tétéphone est invalide."));

            if (!req.body.birthdate || req.body.birthdate === "") return next(new HttpError(400, "Le champ birthdate est requis"));

            const addressNumber = req.body.addressNumber;
            if (!addressNumber || addressNumber === "") return next(new HttpError(400, "Le champ numéro de l'adresse est requis"));
            if (isNaN(addressNumber)) return next(new HttpError(400, `Le champ numéro de l'adresse doit être un chiffre et ne contenir aucune lettre ou caractères spéciaux`));

            if (!req.body.addressState || req.body.addressState === "") return next(new HttpError(400, "Le champ province de l'adresse est requis"));
            if (!req.body.addressCountry || req.body.addressCountry === "") return next(new HttpError(400, "Le champ pays de l'adresse est requis"));


            const email = req.body.email.toLowerCase();
            const clientWithEmail = await clientQueries.getClientByEmail(email);
            if (clientWithEmail)
            {
                if (clientWithEmail.id != req.body.id)
                {
                    throw new HttpError(409, `Un client avec le email ''${email}'' existe déjà`);
                }
            }
            if (req.body.contactPreference == "Sms" && phoneType != "Mobile")
            {
                throw new HttpError(400, `La préférence de contact ne peux pas être SMS si le téléphone fournis n'est pas un Mobile`);
            }

            const clientInfos = {
                id: req.body.id,
                firstName: firstName,
                lastName: lastName,
                email: email,
                phoneNumber: phoneNumber,
                phoneType: phoneType,
                birthdate: req.body.birthdate,
                addressNumber: addressNumber,
                addressUnit: req.body.addressUnit,
                addressStreet: req.body.addressStreet,
                addressCity: req.body.addressCity,
                addressState: req.body.addressState,
                addressCountry: req.body.addressCountry,
                addressPostalCode: req.body.addressPostalCode,
                wantNewsletter: req.body.wantNewsletter,
                contactPreference: req.body.contactPreference,
                isActive: req.body.isActive,
                passwordLost: false
            };

            const clientToReturn = await clientQueries.updateClientByAdmin(clientInfos);
            res.json(clientToReturn);
        } catch (err)
        {
            return next(err);
        }
    }
);

router.put("/",
    passport.authenticate("basic", { session: false }),
    async (req, res, next) =>
    {
        try
        {
            const user = req.user;
            if (!user) return next(new HttpError(401, "Authentification nécessaire"))
            if (!user.isAdmin && (!user.isAdmin && user.id != req.body.id)) return next(new HttpError(403, "Vous n'avez pas les droits requis"))

            const firstName = req.body.firstName;
            if (!firstName || firstName === "") return next(new HttpError(400, "Le champ prénom est requis"));
            if (firstName.length > 255) return next(new HttpError(400, `Le champ prénom ne peux pas dépasser 255 caractères. Il y a ${firstName.length - 255} caractères de trop.`));

            const lastName = req.body.lastName;
            if (!lastName || lastName === "") return next(new HttpError(400, "Le champ nom de famille est requis"));
            if (lastName.length > 255) return next(new HttpError(400, `Le champ nom de famille ne peux pas dépasser 255 caractères. Il y a ${lastName.length - 255} caractères de trop.`));

            const phoneNumber = req.body.phoneNumber;
            if (!phoneNumber || phoneNumber === "") return next(new HttpError(400, "Le champ numéro de téléphone est requis"));
            if (!regex.validPhoneNumber.test(phoneNumber)) return next(new HttpError(400, "Le champ numéro de téléphone ne respect pas les critères d'acceptation"));
            if (phoneNumber.length > 12 || phoneNumber.length < 10) return next(new HttpError(400, `Le champ numéro de téléphone ne peux pas dépasser 10 caractères. Il y a ${phoneNumber.length - 10} caractères de trop.`));

            const phoneType = req.body.phoneType;
            if (!phoneType || phoneType === "") return next(new HttpError(400, "Le champ type de numéro de téléphone est requis"));
            if (phoneType != "Mobile" && phoneType != "Domicile") return next(new HttpError(400, "Le type de numéro de tétéphone est invalide."));

            if (!req.body.birthdate || req.body.birthdate === "") return next(new HttpError(400, "Le champ birthdate est requis"));

            const addressNumber = req.body.addressNumber;
            if (!addressNumber || addressNumber === "") return next(new HttpError(400, "Le champ numéro de l'adresse est requis"));
            if (isNaN(addressNumber)) return next(new HttpError(400, `Le champ numéro de l'adresse doit être un chiffre et ne contenir aucune lettre ou caractères spéciaux`));

            if (!req.body.addressStreet || req.body.addressStreet === "") return next(new HttpError(400, "Le champ rue de l'adresse est requis"));
            if (!req.body.addressCity || req.body.addressCity === "") return next(new HttpError(400, "Le champ ville de l'adresse est requis"));
            if (!req.body.addressState || req.body.addressState === "") return next(new HttpError(400, "Le champ province de l'adresse est requis"));
            if (!req.body.addressCountry || req.body.addressCountry === "") return next(new HttpError(400, "Le champ pays de l'adresse est requis"));
            if (!req.body.addressPostalCode || req.body.addressPostalCode === "") return next(new HttpError(400, "Le champ code postal de l'adresse est requis"));
            if (!req.body.contactPreference || req.body.contactPreference === "") return next(new HttpError(400, "Le champ préférence de contact est requis"));
            // TODO :  FAIRE VERIFICATION SI LE CONTACT PREFERENCE EXISTE DANS LA BD


            const email = req.body.email.toLowerCase();
            const clientWithEmail = await clientQueries.getClientByEmail(email);
            if (clientWithEmail)
            {
                if (clientWithEmail.id != req.body.id)
                {
                    throw new HttpError(409, `Un client avec le email ''${email}'' existe déjà`);
                }
            }

            if (req.body.contactPreference == "Sms" && phoneType != "Mobile")
            {
                throw new HttpError(400, `La préférence de contact ne peux pas être SMS si le téléphone fournis n'est pas un Mobile`);
            }
            const clientInfos = {
                id: req.body.id,
                firstName: firstName,
                lastName: lastName,
                email: email,
                phoneNumber: phoneNumber,
                phoneType: phoneType,
                birthdate: req.body.birthdate,
                addressNumber: addressNumber,
                addressUnit: req.body.addressUnit,
                addressStreet: req.body.addressStreet,
                addressCity: req.body.addressCity,
                addressState: req.body.addressState,
                addressCountry: req.body.addressCountry,
                addressPostalCode: req.body.addressPostalCode,
                wantNewsletter: req.body.wantNewsletter,
                contactPreference: req.body.contactPreference,
                isActive: req.body.isActive,
                passwordLost: false
            };

            if (req.body.newPassword)
            {
                const password = req.body.newPassword;
                if (!password || password == '') return next(new HttpError(400, 'Le champ password est requis'));
                if (password != req.body.confirmNewPassword) return next(new HttpError(400, 'Les mots de passe de correspondent pas'));
                if (!regex.validPassword.test(password)) return next(new HttpError(400, "Le champ password ne respect pas les critères d'acceptation"));
                const saltBuf = crypto.randomBytes(16);
                const passwordSalt = saltBuf.toString("base64");

                crypto.pbkdf2(password, passwordSalt, 100000, 64, "sha512", async (err, derivedKey) =>
                {
                    if (err) return next(err);
                    const passwordHashBase64 = derivedKey.toString("base64");
                    try
                    {
                        const clientAccountWithPasswordHash = await clientQueries.updateClientAndPassword(clientInfos, passwordSalt, passwordHashBase64);
                        res.json(clientAccountWithPasswordHash);
                    } catch (err)
                    {
                        return next(err);
                    }
                });
            }
            else
            {
                const clientToReturn = await clientQueries.updateClientByAdmin(clientInfos);
                res.json(clientToReturn);
            }
        } catch (err)
        {
            return next(err);
        }
    }
);

router.put("/newpassword/:clientid",
    passport.authenticate("basic", { session: false }),
    async (req, res, next) =>
    {
        try 
        {
            const user = req.user;
            if (!user) return next(new HttpError(401, "Authentification nécessaire"))

            const clientId = req.params.clientid;
            if (user.id != clientId) return next(new HttpError(403, "Interdiction de changer le mot de passe d'un autre utilisateur"));
            const newPassword = req.body.newPassword;
            if (!newPassword || newPassword === "") return next(new HttpError(400, "Le champ newPassword est requis"));
            if (!regex.validPassword.test(newPassword)) return next(new HttpError(400, "Le champ password ne respect pas les critères d'acceptation"));

            const clientInfos = {
                id: clientId,
                passwordLost: false,
                passwordLostTimeout: null
            };

            const saltBuf = crypto.randomBytes(16);
            const passwordSalt = saltBuf.toString("base64");

            crypto.pbkdf2(newPassword, passwordSalt, 100000, 64, "sha512", async (err, derivedKey) =>
            {
                if (err) return next(err);

                const passwordHashBase64 = derivedKey.toString("base64");
                try
                {
                    const clientAccountWithPasswordHash = await clientQueries.updateClientPassword(clientInfos, passwordSalt, passwordHashBase64);
                    res.json(clientAccountWithPasswordHash);
                } catch (err)
                {
                    return next(err);
                }
            });

        } catch (err)
        {
            return next(err);
        }
    }
);

router.post("/lostpassword",
    async (req, res, next) =>
    {
        try
        {
            if (!req.body) return next(new HttpError(400, "Un body est requis"));
            if (!req.body.email) return next(new HttpError(400, "Un champ email est requis "));
            let user = await userQueries.getUserBy("email", req.body.email);
            if (!user)
            {
                return res.status(404).json({ message: "Email invalide - utilisateur non trouvé" });
            }
            if (!user.isActive)
            {
                return res.status(403).json({ message: "Compte desactivé - Veuillez nous contacter pour plus d'informations" });
            }
            else
            {
                const timeoutToIso = DateTime.now().toISO();
                const userInfos = {
                    email: user.email,
                    passwordLost: true,
                    passwordLostTimeout: timeoutToIso
                };

                let password = generatePassword();

                const saltBuf = crypto.randomBytes(16);
                const passwordSalt = saltBuf.toString("base64");

                crypto.pbkdf2(password, passwordSalt, 100000, 64, "sha512", async (err, derivedKey) =>
                {
                    if (err) return next(err);

                    const passwordHashBase64 = derivedKey.toString("base64");

                    try
                    {
                        let userUpdated = await userQueries.updateUserPassword(userInfos, passwordHashBase64, passwordSalt);
                        let emailDone = sendEmailLostPassword(userUpdated.email, userUpdated.firstName, password);
                        if (emailDone)
                        {
                            res.json(userUpdated);
                        }
                        else
                        {
                            return next(new HttpError(400, `Erreur dans l'envoie du courriel`));
                        }

                    } catch (err)
                    {
                        return next(err);
                    }
                });
            }
        }
        catch (error)
        {
            next(error);
        }
    });


function sendEmailLostPassword(email, userFirstName, password)
{
    let subject = "Réinitialisation du mot de passe";
    const text = "";
    const html = `
      <style>
      h1 { text-align: center; }
      p { text-align: left; }
      div { text-align: center; }
      </style>
        <div>
          <img
            src="https://www.wecollectdiecast.ca/assets/FullLogoNoBG-95f6531e.png" alt="We Collect Diecast Logo" width="600px" />
        </div>
          <h1>Réinitialisation du mot de passe</h1>
          <p>Bonjour ` + userFirstName + `,</p>
          <p>Voici votre mot de passe temporaire : `+ password + `</p>
          <a href="www.wecollectdiecast.ca">Veuillez vous connecter à l'application et changer votre mot de passe.</a>
          <p>Pour votre sécurité, ce mot de passe n'est valide que pour les 15 prochaines minutes.</p>`
    sendEmailToUser(email, subject, text, html);
    return true
};

function sendEmailNewAccount(email, userFullName, password)
{
    let subject = "Nouveau compte chez We Collect Diecast";
    const text = "";
    const html = `
      <style>
      h1 { text-align: center; }
      p { text-align: left; }
      div { text-align: center; }
      </style>
        <div>
          <img
            src="https://www.wecollectdiecast.ca/assets/FullLogoNoBG-95f6531e.png" alt="We Collect Diecast Logo" width="600px" />
        </div>
          <h1>Nouveau compte</h1>
          <p>Bonjour ` + userFullName + `,</p>
          <p>Il nous fait plaisir de vous avoir comme utilisateur sur notre plateforme</p>`
    sendEmailToUser(email, subject, text, html);
    return true
};

function generatePassword()
{
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$!%*?&';
    let password = '';

    while (!password.match(regex))
    {
        password = '';
        for (let i = 0; i < 8; i++)
        {
            const randomIndex = Math.floor(Math.random() * characters.length);
            password += characters[randomIndex];
        }
    }

    return password;
}

module.exports = router;

