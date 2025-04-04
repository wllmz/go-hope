import nodemailer from "nodemailer";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const EMAIL_USER = process.env.MAIL_USER;
const EMAIL_PASSWORD = process.env.MAIL_PASSWORD;
const JWT_RESET_PASSWORD_SECRET = process.env.JWT_RESET_PASSWORD_SECRET; // Définissez cette variable dans votre .env
const API_URL = process.env.API_URL;
const FRONTEND_URL = process.env.FRONTEND_URL;

// Créer le transporteur
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASSWORD,
  },
});

// Fonction pour envoyer l'email de vérification
export const sendVerificationEmail = async (email) => {
  const verificationLink = `${API_URL}/api/auth/verify-email?email=${encodeURIComponent(
    email
  )}`;

  const mailOptions = {
    from: EMAIL_USER,
    to: EMAIL_USER,
    subject: "Création de votre compte Flow Parents",
    html: `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Création de compte Flow Parents</title>
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
            <h1 style="color: #0a3d64; font-size: 24px; margin-bottom: 20px;">Bonjour,</h1>
            <p style="color: #0a3d64; font-size: 16px; line-height: 24px; margin-bottom: 30px;">
              Nous sommes très heureux de vous accueillir chez Flow Parents. Veuillez cliquer sur le bouton ci-dessous pour confirmer votre email.
            </p>
            <div style="text-align: center; margin-bottom: 30px;">
              <a href="${verificationLink}" style="background-color: #f9a825; color: #ffffff; padding: 12px 25px; text-decoration: none; font-size: 18px; border-radius: 4px;">
                Vérifier mon email
              </a>
            </div>
            <p style="color: #0a3d64; font-size: 14px; line-height: 20px; margin-bottom: 30px;">
              Vous pouvez aussi copier-coller l'URL suivante dans votre navigateur Web :<br/>
              <br>
              <a href="${verificationLink}" style="color: #f9a825; text-decoration: none;">${verificationLink}</a>
            </p>
            <p style="color: #0a3d64; font-size: 16px; line-height: 24px;">
              Nous restons à votre disposition.<br/><br/>
              L'équipe Flow Parents
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
    console.log("Email de vérification envoyé à : " + email);
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email de vérification :", error);
  }
};

// Fonction pour envoyer l'email d'invitation avec un lien de réinitialisation et vérification
export const sendInvitationEmail = async (email) => {
  const tokenPayload = { email, verifyEmail: true }; // Ajoute verifyEmail au payload
  const resetToken = jwt.sign(tokenPayload, JWT_RESET_PASSWORD_SECRET, {
    expiresIn: "1h",
  });
  const resetLink = `${FRONTEND_URL}/reset-password?token=${resetToken}`; // Lien d'invitation

  const mailOptions = {
    from: EMAIL_USER,
    to: email,
    subject: "Invitation à créer votre compte",
    html: `
      <p>Vous avez été invité à créer un compte.</p>
      <p>Cliquez sur le lien suivant pour vérifier votre email et définir votre mot de passe :</p>
      <a href="${resetLink}" style="display: inline-block; padding: 10px 20px; color: white; background-color: blue; text-decoration: none;">Définir mon mot de passe</a>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email d'invitation envoyé à : " + email);
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email d'invitation :", error);
  }
};

// Fonction pour envoyer l'email de notification
export const sendNotificationEmail = async (email, companyName) => {
  const mailOptions = {
    from: EMAIL_USER,
    to: email,
    subject: "Notification de rôle admin",
    html: `
      <p>Vous avez été ajouté en tant qu'administrateur de l'entreprise ${companyName}.</p>
      <p>Vous avez maintenant accès aux fonctionnalités d'administration.</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email de notification envoyé à : " + email);
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email de notification :", error);
  }
};
