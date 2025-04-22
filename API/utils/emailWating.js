import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Utiliser les noms de variables corrects
const EMAIL_USER = process.env.MAIL_USER;
const EMAIL_PASSWORD = process.env.MAIL_PASSWORD;

// Configuration du transporteur d'email
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASSWORD,
  },
});

// Email de confirmation d'inscription à la liste d'attente
export const sendWaitlistConfirmation = async (user) => {
  const mailOptions = {
    from: EMAIL_USER,
    to: user.email,
    subject: "Confirmation d'inscription à la liste d'attente - Go-Hope",
    html: `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Confirmation d'inscription à la liste d'attente</title>
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
            <h1 style="color: #0a3d64; font-size: 28px; margin-bottom: 20px; font-weight: 600;">Merci pour votre inscription !</h1>
            <p style="color: #444444; font-size: 16px; line-height: 24px; margin-bottom: 30px;">
              Cher(e) ${user.username},
            </p>
            <p style="color: #444444; font-size: 16px; line-height: 24px;">
              Nous confirmons votre inscription à la liste d'attente pour notre service de chat.
            </p>
            <p style="color: #444444; font-size: 16px; line-height: 24px;">
              Vous serez informé(e) dès que cette fonctionnalité sera disponible.
            </p>
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 6px; margin: 30px 0;">
              <p style="color: #444444; font-size: 16px; line-height: 24px; margin: 0;">
                <strong style="color: #0a3d64;">En attendant, vous pouvez :</strong>
              </p>
              <ul style="color: #444444; font-size: 16px; line-height: 24px; margin-top: 10px;">
                <li>Explorer nos articles et fiches informatives</li>
                <li>Participer aux discussions dans notre forum</li>
                <li>Découvrir les autres fonctionnalités de Go-Hope</li>
              </ul>
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
    console.log("Email de confirmation envoyé à:", user.email);
    return true;
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email de confirmation:", error);
    return false;
  }
};

// Email de notification quand le service est disponible
export const sendChatActivationNotification = async (user) => {
  // Vérification des données requises
  if (!user || !user.email) {
    console.error(
      "Erreur: données utilisateur incomplètes pour l'envoi d'email",
      user
    );
    return false;
  }

  try {
    console.log("Tentative d'envoi d'email à:", user.email);
    console.log("Configuration mail:", {
      service: "gmail",
      user: EMAIL_USER ? "OK" : "MANQUANT",
      pass: EMAIL_PASSWORD ? "OK" : "MANQUANT",
    });

    const mailOptions = {
      from: EMAIL_USER,
      to: user.email,
      subject: "Le service de chat Go-Hope est maintenant disponible !",
      html: `
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Service de chat disponible</title>
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
              <h1 style="color: #0a3d64; font-size: 28px; margin-bottom: 20px; font-weight: 600;">Bonne nouvelle !</h1>
              <p style="color: #444444; font-size: 16px; line-height: 24px; margin-bottom: 30px;">
                Cher(e) ${user.username},
              </p>
              <p style="color: #444444; font-size: 16px; line-height: 24px;">
                Nous sommes ravis de vous annoncer que notre service de chat est désormais disponible !
              </p>
              <p style="color: #444444; font-size: 16px; line-height: 24px;">
                Vous pouvez dès maintenant commencer à échanger avec d'autres membres de la communauté Go-Hope.
              </p>
              <div style="background-color: #f8f9fa; padding: 20px; border-radius: 6px; margin: 30px 0;">
                <p style="color: #444444; font-size: 16px; line-height: 24px; margin: 0;">
                  <strong style="color: #0a3d64;">Ce que vous pouvez faire :</strong>
                </p>
                <ul style="color: #444444; font-size: 16px; line-height: 24px; margin-top: 10px;">
                  <li>Échanger avec d'autres utilisateurs</li>
                  <li>Partager votre expérience et vos connaissances</li>
                  <li>Bénéficier d'un soutien personnalisé</li>
                </ul>
              </div>
              <p style="color: #444444; font-size: 16px; line-height: 24px;">
                Nous espérons que ce service vous sera utile.
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

    const info = await transporter.sendMail(mailOptions);
    console.log("Email envoyé avec succès:", info.messageId);
    return true;
  } catch (error) {
    console.error("Erreur détaillée lors de l'envoi de l'email:", error);
    return false;
  }
};
