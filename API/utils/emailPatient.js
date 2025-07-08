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

// Fonction pour notifier les administrateurs d'une nouvelle demande de patient-aidant
export const sendNewPatientAidantRequestEmail = async (title, username) => {
  const mailOptions = {
    from: EMAIL_USER,
    to: EMAIL_USER,
    subject: "Nouvelle demande de patient-aidant",
    html: `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Nouvelle demande de patient-aidant</title>
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
            <h1 style="color: #0a3d64; font-size: 28px; margin-bottom: 20px; font-weight: 600;">Nouvelle demande de patient-aidant</h1>
            <p style="color: #444444; font-size: 16px; line-height: 24px; margin-bottom: 30px;">
              Une nouvelle demande de patient-aidant vient d'être soumise. Veuillez la consulter pour l'examiner.
            </p>
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 6px; margin: 30px 0;">
              <p style="color: #444444; font-size: 16px; line-height: 24px; margin: 0;">
                <strong style="color: #0a3d64;">Titre :</strong> ${title}<br/>
                <strong style="color: #0a3d64;">Demandeur :</strong> ${username}
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

// Fonction pour notifier l'utilisateur de la décision (accepté ou refusé)
export const sendPatientAidantDecisionEmail = async (
  username,
  userEmail,
  isApproved
) => {
  const mailOptions = {
    from: EMAIL_USER,
    to: userEmail,
    subject: isApproved
      ? "Votre demande de patient-aidant a été acceptée"
      : "Votre demande de patient-aidant a été refusée",
    html: `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Décision sur votre demande de patient-aidant</title>
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
            <h1 style="color: #0a3d64; font-size: 28px; margin-bottom: 20px; font-weight: 600;">
              ${
                isApproved
                  ? "Félicitations !"
                  : "Décision concernant votre demande"
              }
            </h1>
            <p style="color: #444444; font-size: 16px; line-height: 24px; margin-bottom: 30px;">
              Cher(e) ${username},
            </p>
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 6px; margin: 30px 0;">
              ${
                isApproved
                  ? `<p style="color: #444444; font-size: 16px; line-height: 24px; margin: 0;">
                    Nous sommes ravis de vous informer que votre demande pour devenir patient-aidant a été acceptée. 
                    Vous pouvez dès maintenant accéder aux fonctionnalités réservées aux patients-aidants sur notre plateforme.
                  </p>
                  <p style="color: #444444; font-size: 16px; line-height: 24px; margin: 20px 0 0 0;">
                    Nous sommes impatients de voir votre contribution à notre communauté !
                  </p>`
                  : `<p style="color: #444444; font-size: 16px; line-height: 24px; margin: 0;">
                    Nous vous remercions de l'intérêt que vous portez à notre communauté. 
                    Malheureusement, après examen attentif de votre candidature, nous ne pouvons pas donner suite à votre demande pour le moment.
                  </p>
                  <p style="color: #444444; font-size: 16px; line-height: 24px; margin: 20px 0 0 0;">
                    N'hésitez pas à soumettre une nouvelle demande ultérieurement.
                  </p>`
              }
            </div>
            <div style="text-align: center; margin: 40px 0;">
              <a href="${process.env.FRONTEND_URL}/profile" 
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
                ${isApproved ? "Accéder à mon profil" : "Consulter mon profil"}
              </a>
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
