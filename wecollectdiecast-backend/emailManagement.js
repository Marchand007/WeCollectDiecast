const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: true,
    auth: {
        user: process.env.EMAIL_EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    },
});

function sendNewsletterEmail(recipients, subjet, text, html)
{
    const mailOptions = {
        from: process.env.EMAIL_EMAIL,
        to: process.env.EMAIL_EMAIL,
        bcc: recipients.join(", "),
        subject: subjet,
        text: text, // Corps du courriel en texte brut
        html: html, // Corps du courriel au format HTML (optionnel)
    };
    transporter.sendMail(mailOptions, function (error, info)
    {
        if (error)
        {
            console.error("Erreur lors de l'envoi du courriel : " + error);
            return false;
        } else
        {
            console.info("Courriel envoyé avec succès : " + info.response);
            return true;
        }
    });
}


function sendEmail(contactEmail, subject, text, html)
{
    return new Promise((resolve, reject) =>
    {
        const mailOptions = {
            from: process.env.EMAIL_EMAIL,
            to: process.env.EMAIL_EMAIL,
            replyTo: contactEmail,
            subject: subject,
            text: text, // Corps du courriel en texte brut
            html: html, // Corps du courriel au format HTML (optionnel)
        };
        transporter.sendMail(mailOptions, function (error, info)
        {
            if (error)
            {
                console.error("Erreur lors de l'envoi du courriel : " + error);
                reject(false); // Rejeter la Promesse en cas d'erreur
            } else
            {
                console.info("Courriel envoyé avec succès : " + info.response);
                resolve(true); // Résoudre la Promesse en cas de succès
            }
        });
    });
}

function sendEmailToUser(recipient, subject, text, html)
{
    return new Promise((resolve, reject) =>
    {
        const mailOptions = {
            from: process.env.EMAIL_EMAIL,
            to: recipient,
            subject: subject,
            text: text, // Corps du courriel en texte brut
            html: html, // Corps du courriel au format HTML (optionnel)
        };
        transporter.sendMail(mailOptions, function (error, info)
        {
            if (error)
            {
                console.error("Erreur lors de l'envoi du courriel : " + error);
                reject(false); // Rejeter la Promesse en cas d'erreur
            } else
            {
                console.info("Courriel envoyé avec succès : " + info.response);
                resolve(true); // Résoudre la Promesse en cas de succès
            }
        });
    });
}



function sendAppointementEmail(recipient, subjet, text, html)
{
    const mailOptions = {
        from: process.env.EMAIL_EMAIL,
        to: recipient,
        subject: subjet,
        text: text, // Corps du courriel en texte brut
        html: html, // Corps du courriel au format HTML (optionnel)
    };
    transporter.sendMail(mailOptions, function (error, info)
    {
        if (error)
        {
            console.error("Erreur lors de l'envoi du courriel : " + error);
            return false;
        } else
        {
            console.info("Courriel envoyé avec succès : " + info.response);
            return true;
        }
    });
}

module.exports = { sendNewsletterEmail, sendAppointementEmail, sendEmail, sendEmailToUser };