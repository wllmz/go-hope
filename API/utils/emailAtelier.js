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
      <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        <tr>
          <td align="center" style="padding: 40px 0; background: linear-gradient(135deg, #0a3d64 0%, #1D5F84 100%);">
            <img src="https://go-hope.fr/wp-content/uploads/2025/04/Calque_1-2.png" alt="Logo GoHope" width="200" style="display: block;" />
          </td>
        </tr>
        <tr>
          <td style="padding: 40px 30px;">
            <h1 style="color: #0a3d64; font-size: 28px; margin-bottom: 20px; font-weight: 600;">Nouveau sujet sur le forum</h1>
            <p style="color: #444444; font-size: 16px; line-height: 24px; margin-bottom: 30px;">
              Un nouveau sujet vient d'être créé sur le forum. Veuillez le consulter pour vérifier et valider son contenu.
            </p>
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 6px; margin: 30px 0;">
              <p style="color: #444444; font-size: 16px; line-height: 24px; margin: 0;">
                <strong style="color: #0a3d64;">Titre :</strong> ${
                  subjectTitle || "Sans titre"
                }<br/>
                <strong style="color: #0a3d64;">Auteur :</strong> ${
                  authorUsername || "Utilisateur"
                }
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
    
    throw error;
  }
};
