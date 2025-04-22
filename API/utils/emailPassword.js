import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const EMAIL_USER = process.env.MAIL_USER;
const EMAIL_PASSWORD = process.env.MAIL_PASSWORD;

// Créer le transporteur
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASSWORD,
  },
});

// Fonction pour envoyer l'email de réinitialisation
export const sendResetPasswordEmail = async (email, resetURL) => {
  const mailOptions = {
    from: EMAIL_USER,
    to: email,
    subject: "Réinitialisation de votre mot de passe GoHope",
    html: `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Réinitialisation de votre mot de passe</title>
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
            <h1 style="color: #0a3d64; font-size: 28px; margin-bottom: 20px; font-weight: 600;">Réinitialisation de votre mot de passe</h1>
            <p style="color: #444444; font-size: 16px; line-height: 24px; margin-bottom: 30px;">
              Vous avez demandé la réinitialisation de votre mot de passe. Pour continuer, veuillez cliquer sur le bouton ci-dessous.
            </p>
            <div style="text-align: center; margin: 40px 0;">
              <a href="${resetURL}" 
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
                Réinitialiser mon mot de passe
              </a>
            </div>
            <p style="color: #666666; font-size: 14px; line-height: 20px; margin-top: 30px; padding: 20px; background-color: #f8f9fa; border-radius: 6px;">
              Si le bouton ne fonctionne pas, vous pouvez copier-coller le lien suivant dans votre navigateur :<br/>
              <a href="${resetURL}" style="color: #F5943A; text-decoration: none; word-break: break-all;">${resetURL}</a>
            </p>
            <p style="color: #666666; font-size: 14px; line-height: 20px;">
              Ce lien est valable pendant 1 heure. Si vous n'avez pas demandé cette réinitialisation, veuillez ignorer cet email.
            </p>
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
    console.log("Email de réinitialisation envoyé à : " + email);
  } catch (error) {
    console.error(
      "Erreur lors de l'envoi de l'email de réinitialisation :",
      error
    );
  }
};
