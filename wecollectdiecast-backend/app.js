
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const HttpError = require('./HTTPError');
const { DateTime } = require("luxon");
const { sendEmailToUser } = require("./emailManagement");

const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const crypto = require('crypto');

const userRouter = require('./routes/userRouter');

const userQueries = require("./queries/userQueries");

const app = express();
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';


app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/user', userRouter);


class BasicStrategyModified extends BasicStrategy
{
  constructor(options, verify)
  {
    return super(options, verify);
  }

  _challenge()
  {
    return 'xBasic realm="' + this._realm + '"';
  }
};

passport.use(new BasicStrategyModified(async (username, password, cb) =>
{
  let login;

  const user = await userQueries.login(username);

  if (!user)
  {
    return cb(null, false);
  }

  login = user;
  const iterations = 100000;
  const keylen = 64;
  const digest = "sha512";
  crypto.pbkdf2(password, login.passwordSalt, iterations, keylen, digest, (err, hashedPassword) =>
  {
    if (err)
    {
      return cb(err);
    }
    const passwordHashBuffer = Buffer.from(login.passwordHash, "base64");
    if (!crypto.timingSafeEqual(passwordHashBuffer, hashedPassword))
    {
      return cb(null, false);
    }
    return cb(null, login);
  });

})
);

app.get('/login',
  passport.authenticate('basic', { session: false }),
  (req, res, next) =>
  {
    if (req.user)
    {
      if (!req.user.isActive)
      {

        res.status(403).json({ message: "Compte desactivé" });
      }
      else
      {
        let userDetails;
        let passwordLostTimeoutISO = null;
        if (req.user.passwordLostTimeout)
        {
          const passwordLostTimeoutSTRING = req.user.passwordLostTimeout.toISOString();
          const passwordLostTimeout = DateTime.fromISO(passwordLostTimeoutSTRING)
          passwordLostTimeoutISO = passwordLostTimeout.toISO();
        }
        userDetails = {
          id: req.user.id,
          username: req.user.username,
          firstName: req.user.firstName,
          lastName: req.user.lastName,
          email: req.user.email,
          isAdmin: req.user.isAdmin,
          isActive: req.user.isActive,
          isNewUser: req.user.isNewUser,
          hadLostPassword: req.user.hadLostPassword,
          passwordLostTimeout: passwordLostTimeoutISO
        }
        res.json(userDetails);
      }
    } else
    {
      return next({ status: 500, message: "Propriété user absente" });
    }
  }
);


app.post('/login/lostpassword',
  async (req, res, next) =>
  {
    try
    {
      console.log("body", req.body)
      if (!req.body) return next(new HttpError(400, "Un body est requis"));
      if (!req.body.email) return next(new HttpError(400, "Un champ email est requis "));
      let user = await userQueries.getUserBy("email",req.body.email);
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
          id: user.id,
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
            const userUpdated = await userQueries.updateUserPassword(userInfos, passwordSalt, passwordHashBase64);
            let emailList = [];
            emailList.push(userUpdated.email);
            let emailDone = sendEmailLostPassword(emailList, userUpdated.firstName, password);
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
  }
);


app.use((err, req, res, next) =>
{
  console.error("error handler: ", err);
  if (res.headersSent)
  {
    return next(err);
  }
  res.status(err.status || 500)
  if (err instanceof HttpError)
  {
    res.json(err.getJsonMessage());
  } else
  {
    res.json(err);
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
            src="https://img1.wsimg.com/isteam/ip/6c474611-a729-46b3-8e6b-a971b551f3b1/logo2_20_22532.png/:/rs=w:200,h:200,cg:true,m/cr=w:200,h:200/qt=q:95" />
        </div>
          <h1>Réinitialisation du mot de passe</h1>
          <p>Bonjour ` + userFirstName + `,</p>
          <p>Voici votre mot de passe temporaire : `+ password + `</p>
          <p>Veuillez vous connecter à l'application et changer votre mot de passe.</p>
          <p>Pour votre sécurité, ce mot de passe n'est valide que pour les 15 prochaines minutes.</p>`
  sendEmailToUser(email, subject, text, html);
  return true
};

function generatePassword()
{
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@$!%*?&';
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


module.exports = app;
