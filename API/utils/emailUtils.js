import nodemailer from "nodemailer";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const EMAIL_USER = process.env.MAIL_USER;
const EMAIL_PASSWORD = process.env.MAIL_PASSWORD;
const JWT_RESET_PASSWORD_SECRET = process.env.JWT_RESET_PASSWORD_SECRET; // Définissez cette variable dans votre .env
const API_URL = process.env.API_URL
const FRONTEND_URL = process.env.FRONTEND_URL 

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
    subject: "Vérification de votre email",
    html: `
      <p>Merci de vérifier votre email en cliquant sur le lien suivant :</p>
      <a href="${verificationLink}" style="display: inline-block; padding: 10px 20px; color: white; background-color: blue; text-decoration: none;">Vérifier mon email</a>
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
