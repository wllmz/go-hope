import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const EMAIL_USER = process.env.MAIL_USER;
const EMAIL_PASSWORD = process.env.MAIL_PASSWORD;
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASSWORD,
  },
});

// Fonction pour notifier les administrateurs d'un nouveau sujet
export const sendNewSubjectNotificationEmail = async (
  subjectTitle,
  authorUsername
) => {
  // On suppose que les adresses e-mail des admins sont définies dans une variable d'environnement
  // par exemple, sous forme de chaîne séparée par des virgules.
  const adminEmails = process.env.ADMIN_EMAILS; // ex: "admin1@example.com,admin2@example.com"
  const mailOptions = {
    from: EMAIL_USER,
    to: EMAIL_USER,
    subject: "Nouveau sujet créé sur le forum",
    html: `
       <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Nouveau sujet créé sur le forum</title>
    </head>
    <body style="margin:0; padding:0; background-color: #f9f9f9; font-family: Arial, sans-serif;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse; background-color: #ffffff;">
        <tr>
          <td align="center" style="padding: 40px 0;">
            <img src="https://flow-parents.com/wp-content/uploads/2024/12/Logo-FLOW-transparent-rogne.png" alt="Logo Flow Parents" width="200" style="display: block;" />
          </td>
        </tr>
        <tr>
          <td style="padding: 0 30px 40px 30px;">
            <h1 style="color: #0a3d64; font-size: 24px; margin-bottom: 20px;">Nouveau sujet créé</h1>
            <p style="color: #0a3d64; font-size: 16px; line-height: 24px; margin-bottom: 30px;">
              Un nouveau sujet vient d'être créé sur le forum. Veuillez le consulter pour vérifier et valider son contenu.
            </p>
            <p style="color: #0a3d64; font-size: 16px; line-height: 24px;">
              <strong>Titre :</strong> ${subjectTitle}<br/>
              <strong>Auteur :</strong> ${authorUsername}
            </p>
            <p style="color: #0a3d64; font-size: 16px; line-height: 24px; margin-top: 30px;">
              Merci de prendre les mesures nécessaires.
            </p>
          </td>
        </tr>
        <tr>
          <td bgcolor="#0a3d64" style="padding: 30px; text-align: center;">
            <p style="color: #ffffff; font-size: 14px; margin: 0;">
              &copy; 2025 Flow Parents. Tous droits réservés.
            </p>
          </td>
        </tr>
      </table>
    </body>
    </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(
      "E-mail de notification envoyé aux administrateurs :",
      adminEmails
    );
  } catch (error) {
    console.error(
      "Erreur lors de l'envoi de l'e-mail de notification :",
      error
    );
    throw error;
  }
};
