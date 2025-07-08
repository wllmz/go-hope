import nodemailer from "nodemailer";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const EMAIL_USER = process.env.MAIL_USER;
const EMAIL_PASSWORD = process.env.MAIL_PASSWORD;
const JWT_RESET_PASSWORD_SECRET = process.env.JWT_RESET_PASSWORD_SECRET; // Définissez cette variable dans votre .env
const API_URL =
  process.env.NODE_ENV === "production"
    ? process.env.API_PROD_URL
    : process.env.API_DEV_URL;
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
    to: email,
    subject: "Création de votre compte GoHope",
    html: `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Création de compte GoHope</title>
    </head>
    <body style="margin:0; padding:0; background-color: #f9f9f9; font-family: Arial, sans-serif;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        <tr>
          <td align="center" style="padding: 40px 0; background: linear-gradient(135deg, #0a3d64 0%, #1D5F84 100%);">
            <img src="https://go-hope.fr/wp-content/uploads/2025/04/Calque_1-2.png" alt="Logo GoHope" width="200" style="display: block;" />
          </td>
        </tr>
        <tr>
          <td style="padding: 40px 30px;">
            <h1 style="color: #0a3d64; font-size: 28px; margin-bottom: 20px; font-weight: 600;">Bienvenue chez GoHope !</h1>
            <p style="color: #444444; font-size: 16px; line-height: 24px; margin-bottom: 30px;">
              Nous sommes ravis de vous accueillir dans notre communauté. Pour commencer votre expérience, veuillez confirmer votre adresse email en cliquant sur le bouton ci-dessous.
            </p>
            <div style="text-align: center; margin: 40px 0;">
              <a href="${verificationLink}" 
                 style="display: inline-block; 
                        background-color: #F5943A; 
                        color: #ffffff; 
                        padding: 14px 30px; 
                        text-decoration: none; 
                        font-size: 18px; 
                        border-radius: 6px;
                        font-weight: 500;
                        transition: background-color 0.3s ease;
                        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
                Vérifier mon email
              </a>
            </div>
            <p style="color: #666666; font-size: 14px; line-height: 20px; margin-top: 30px; padding: 20px; background-color: #f8f9fa; border-radius: 6px;">
              Si le bouton ne fonctionne pas, vous pouvez copier-coller le lien suivant dans votre navigateur :<br/>
              <a href="${verificationLink}" style="color: #F5943A; text-decoration: none; word-break: break-all;">${verificationLink}</a>
            </p>
            <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee;">
              <p style="color: #444444; font-size: 16px; line-height: 24px; margin: 0;">
                À très bientôt,<br/>
                <strong style="color: #0a3d64;">L'équipe GoHope</strong>
              </p>
            </div>
          </td>
        </tr>
        <tr>
          <td style="background: linear-gradient(135deg, #0a3d64 0%, #1D5F84 100%); padding: 30px; text-align: center;">
            <p style="color: #ffffff; font-size: 14px; margin: 0;">
              2025 GoHope. Tous droits réservés.
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
    
  } catch (error) {
    
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
    subject: "Invitation à rejoindre GoHope",
    html: `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Invitation GoHope</title>
    </head>
    <body style="margin:0; padding:0; background-color: #f9f9f9; font-family: Arial, sans-serif;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        <tr>
          <td align="center" style="padding: 40px 0; background: linear-gradient(135deg, #0a3d64 0%, #1D5F84 100%);">
            <img src="https://flow-parents.com/wp-content/uploads/2024/12/Logo-FLOW-transparent-rogne.png" alt="Logo GoHope" width="200" style="display: block;" />
          </td>
        </tr>
        <tr>
          <td style="padding: 40px 30px;">
            <h1 style="color: #0a3d64; font-size: 28px; margin-bottom: 20px; font-weight: 600;">Vous êtes invité(e) !</h1>
            <p style="color: #444444; font-size: 16px; line-height: 24px; margin-bottom: 30px;">
              Vous avez été invité(e) à rejoindre la communauté GoHope. Pour finaliser votre inscription, veuillez définir votre mot de passe en cliquant sur le bouton ci-dessous.
            </p>
            <div style="text-align: center; margin: 40px 0;">
              <a href="${resetLink}" 
                 style="display: inline-block; 
                        background-color: #F5943A; 
                        color: #ffffff; 
                        padding: 14px 30px; 
                        text-decoration: none; 
                        font-size: 18px; 
                        border-radius: 6px;
                        font-weight: 500;
                        transition: background-color 0.3s ease;
                        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
                Créer mon compte
              </a>
            </div>
            <p style="color: #666666; font-size: 14px; line-height: 20px; margin-top: 30px; padding: 20px; background-color: #f8f9fa; border-radius: 6px;">
              Ce lien est valable pendant 1 heure. Si vous n'avez pas demandé cette invitation, vous pouvez ignorer cet email.
            </p>
            <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee;">
              <p style="color: #444444; font-size: 16px; line-height: 24px; margin: 0;">
                À très bientôt,<br/>
                <strong style="color: #0a3d64;">L'équipe GoHope</strong>
              </p>
            </div>
          </td>
        </tr>
        <tr>
          <td style="background: linear-gradient(135deg, #0a3d64 0%, #1D5F84 100%); padding: 30px; text-align: center;">
            <p style="color: #ffffff; font-size: 14px; margin: 0;">
              2025 GoHope. Tous droits réservés.
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
    
  } catch (error) {
    
  }
};

// Fonction pour envoyer l'email de notification
export const sendNotificationEmail = async (email, companyName) => {
  const mailOptions = {
    from: EMAIL_USER,
    to: email,
    subject: "Bienvenue en tant qu'administrateur GoHope",
    html: `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Notification administrateur GoHope</title>
    </head>
    <body style="margin:0; padding:0; background-color: #f9f9f9; font-family: Arial, sans-serif;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        <tr>
          <td align="center" style="padding: 40px 0; background: linear-gradient(135deg, #0a3d64 0%, #1D5F84 100%);">
            <img src="https://flow-parents.com/wp-content/uploads/2024/12/Logo-FLOW-transparent-rogne.png" alt="Logo GoHope" width="200" style="display: block;" />
          </td>
        </tr>
        <tr>
          <td style="padding: 40px 30px;">
            <h1 style="color: #0a3d64; font-size: 28px; margin-bottom: 20px; font-weight: 600;">Nouveau rôle administrateur</h1>
            <p style="color: #444444; font-size: 16px; line-height: 24px; margin-bottom: 20px;">
              Félicitations ! Vous avez été nommé(e) administrateur de l'entreprise <strong style="color: #0a3d64;">${companyName}</strong>.
            </p>
            <p style="color: #444444; font-size: 16px; line-height: 24px; margin-bottom: 30px;">
              Vous avez maintenant accès à toutes les fonctionnalités d'administration de la plateforme.
            </p>
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 6px; margin-top: 30px;">
              <p style="color: #666666; font-size: 14px; line-height: 20px; margin: 0;">
                Pour des raisons de sécurité, nous vous recommandons de changer votre mot de passe si vous ne l'avez pas fait récemment.
              </p>
            </div>
            <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee;">
              <p style="color: #444444; font-size: 16px; line-height: 24px; margin: 0;">
                Cordialement,<br/>
                <strong style="color: #0a3d64;">L'équipe GoHope</strong>
              </p>
            </div>
          </td>
        </tr>
        <tr>
          <td style="background: linear-gradient(135deg, #0a3d64 0%, #1D5F84 100%); padding: 30px; text-align: center;">
            <p style="color: #ffffff; font-size: 14px; margin: 0;">
              2025 GoHope. Tous droits réservés.
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
    
  } catch (error) {
    
  }
};
