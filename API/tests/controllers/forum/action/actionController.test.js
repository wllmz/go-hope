import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import Subject from "../../../../models/forum/Subjects/subjectModel.js";
import * as actionController from "../../../../controllers/forum/action/actionController.js";
import { jest } from "@jest/globals";

// Utilitaires pour simuler les objets req et res d'Express
const mockRequest = (data = {}) => ({
  params: data.params || {},
  body: data.body || {},
  user: data.user || {},
});

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("Contrôleurs d'action du forum", () => {
  let mongoServer;

  // Supprime l'affichage des erreurs dans la console pour éviter de polluer la sortie des tests
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(async () => {
    await Subject.deleteMany({});
    jest.restoreAllMocks();
  });

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  describe("addToFavoris", () => {
    it("devrait ajouter un sujet aux favoris de l'utilisateur", async () => {
      const userId = new mongoose.Types.ObjectId();
      const subject = await Subject.create({
        title: "Sujet test",
        content: "Contenu du sujet",
        image: "image.jpg",
        categories: [new mongoose.Types.ObjectId()],
        author: new mongoose.Types.ObjectId(),
        favoris: [],
      });

      const req = mockRequest({
        params: { subjectId: subject._id.toString() },
        user: { id: userId.toString() },
      });
      const res = mockResponse();

      await actionController.addToFavoris(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "Sujet ajouté à vos favoris.",
          subject: expect.any(Object),
        })
      );

      // Vérifier que le sujet a été mis à jour en base de données
      const updatedSubject = await Subject.findById(subject._id);
      expect(updatedSubject.favoris).toContainEqual(userId);
    });

    it("devrait retourner une erreur 404 si le sujet n'existe pas", async () => {
      const req = mockRequest({
        params: { subjectId: new mongoose.Types.ObjectId().toString() },
        user: { id: new mongoose.Types.ObjectId().toString() },
      });
      const res = mockResponse();

      await actionController.addToFavoris(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Sujet non trouvé." });
    });

    it("devrait retourner une erreur 400 si le sujet est déjà dans les favoris", async () => {
      const userId = new mongoose.Types.ObjectId();
      const subject = await Subject.create({
        title: "Sujet déjà favori",
        content: "Contenu du sujet",
        image: "image.jpg",
        categories: [new mongoose.Types.ObjectId()],
        author: new mongoose.Types.ObjectId(),
        favoris: [userId], // Déjà dans les favoris
      });

      const req = mockRequest({
        params: { subjectId: subject._id.toString() },
        user: { id: userId.toString() },
      });
      const res = mockResponse();

      await actionController.addToFavoris(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Vous avez déjà ajouté ce sujet à vos favoris.",
      });
    });

    it("devrait gérer les erreurs lors de l'ajout aux favoris", async () => {
      const subject = await Subject.create({
        title: "Sujet test",
        content: "Contenu du sujet",
        image: "image.jpg",
        categories: [new mongoose.Types.ObjectId()],
        author: new mongoose.Types.ObjectId(),
        favoris: [],
      });

      const req = mockRequest({
        params: { subjectId: subject._id.toString() },
        user: { id: new mongoose.Types.ObjectId().toString() },
      });
      const res = mockResponse();

      // Simuler une erreur lors de la sauvegarde
      jest.spyOn(Subject.prototype, "save").mockImplementationOnce(() => {
        throw new Error("Erreur simulée");
      });

      await actionController.addToFavoris(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "Erreur lors de l'ajout aux favoris.",
          error: "Erreur simulée",
        })
      );
    });
  });

  describe("removeFromFavoris", () => {
    it("devrait retirer un sujet des favoris de l'utilisateur", async () => {
      const userId = new mongoose.Types.ObjectId();
      const subject = await Subject.create({
        title: "Sujet à retirer des favoris",
        content: "Contenu du sujet",
        image: "image.jpg",
        categories: [new mongoose.Types.ObjectId()],
        author: new mongoose.Types.ObjectId(),
        favoris: [userId], // Déjà dans les favoris
      });

      const req = mockRequest({
        params: { subjectId: subject._id.toString() },
        user: { id: userId.toString() },
      });
      const res = mockResponse();

      await actionController.removeFromFavoris(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "Sujet retiré de vos favoris.",
          subject: expect.any(Object),
        })
      );

      // Vérifier que le sujet a été mis à jour en base de données
      const updatedSubject = await Subject.findById(subject._id);
      expect(updatedSubject.favoris).not.toContainEqual(userId);
    });

    it("devrait retourner une erreur 404 si le sujet n'existe pas", async () => {
      const req = mockRequest({
        params: { subjectId: new mongoose.Types.ObjectId().toString() },
        user: { id: new mongoose.Types.ObjectId().toString() },
      });
      const res = mockResponse();

      await actionController.removeFromFavoris(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Sujet non trouvé." });
    });

    it("devrait retourner une erreur 400 si le sujet n'est pas dans les favoris", async () => {
      const userId = new mongoose.Types.ObjectId();
      const subject = await Subject.create({
        title: "Sujet non favori",
        content: "Contenu du sujet",
        image: "image.jpg",
        categories: [new mongoose.Types.ObjectId()],
        author: new mongoose.Types.ObjectId(),
        favoris: [], // Pas dans les favoris
      });

      const req = mockRequest({
        params: { subjectId: subject._id.toString() },
        user: { id: userId.toString() },
      });
      const res = mockResponse();

      await actionController.removeFromFavoris(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Ce sujet n'est pas dans vos favoris.",
      });
    });

    it("devrait gérer les erreurs lors du retrait des favoris", async () => {
      const userId = new mongoose.Types.ObjectId();
      const subject = await Subject.create({
        title: "Sujet test",
        content: "Contenu du sujet",
        image: "image.jpg",
        categories: [new mongoose.Types.ObjectId()],
        author: new mongoose.Types.ObjectId(),
        favoris: [userId],
      });

      const req = mockRequest({
        params: { subjectId: subject._id.toString() },
        user: { id: userId.toString() },
      });
      const res = mockResponse();

      // Simuler une erreur lors de la sauvegarde
      jest.spyOn(Subject.prototype, "save").mockImplementationOnce(() => {
        throw new Error("Erreur simulée");
      });

      await actionController.removeFromFavoris(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "Erreur lors du retrait des favoris.",
          error: "Erreur simulée",
        })
      );
    });
  });

  // Tests d'intégration
  describe("Intégration des fonctionnalités de favoris", () => {
    it("devrait permettre d'ajouter puis de retirer un sujet des favoris", async () => {
      const userId = new mongoose.Types.ObjectId();
      const subject = await Subject.create({
        title: "Sujet pour test d'intégration",
        content: "Contenu du sujet",
        image: "image.jpg",
        categories: [new mongoose.Types.ObjectId()],
        author: new mongoose.Types.ObjectId(),
        favoris: [],
      });

      // 1. Ajouter aux favoris
      const reqAdd = mockRequest({
        params: { subjectId: subject._id.toString() },
        user: { id: userId.toString() },
      });
      const resAdd = mockResponse();

      await actionController.addToFavoris(reqAdd, resAdd);

      expect(resAdd.status).toHaveBeenCalledWith(200);

      // Vérifier que le sujet a été ajouté aux favoris
      let updatedSubject = await Subject.findById(subject._id);
      expect(updatedSubject.favoris).toContainEqual(userId);

      // 2. Retirer des favoris
      const reqRemove = mockRequest({
        params: { subjectId: subject._id.toString() },
        user: { id: userId.toString() },
      });
      const resRemove = mockResponse();

      await actionController.removeFromFavoris(reqRemove, resRemove);

      expect(resRemove.status).toHaveBeenCalledWith(200);

      // Vérifier que le sujet a été retiré des favoris
      updatedSubject = await Subject.findById(subject._id);
      expect(updatedSubject.favoris).not.toContainEqual(userId);
    });

    it("devrait maintenir la liste des utilisateurs qui ont mis le sujet en favori", async () => {
      // Créer un sujet
      const subject = await Subject.create({
        title: "Sujet populaire",
        content: "Contenu du sujet",
        image: "image.jpg",
        categories: [new mongoose.Types.ObjectId()],
        author: new mongoose.Types.ObjectId(),
        favoris: [],
      });

      // Créer plusieurs utilisateurs qui ajoutent le sujet en favori
      const userIds = [
        new mongoose.Types.ObjectId(),
        new mongoose.Types.ObjectId(),
        new mongoose.Types.ObjectId(),
      ];

      // Ajouter chaque utilisateur aux favoris
      for (const userId of userIds) {
        const req = mockRequest({
          params: { subjectId: subject._id.toString() },
          user: { id: userId.toString() },
        });
        const res = mockResponse();

        await actionController.addToFavoris(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
      }

      // Vérifier que tous les utilisateurs sont dans les favoris
      let updatedSubject = await Subject.findById(subject._id);
      expect(updatedSubject.favoris.length).toBe(3);

      for (const userId of userIds) {
        expect(
          updatedSubject.favoris.some(
            (id) => id.toString() === userId.toString()
          )
        ).toBeTruthy();
      }

      // Retirer le premier utilisateur des favoris
      const reqRemove = mockRequest({
        params: { subjectId: subject._id.toString() },
        user: { id: userIds[0].toString() },
      });
      const resRemove = mockResponse();

      await actionController.removeFromFavoris(reqRemove, resRemove);
      expect(resRemove.status).toHaveBeenCalledWith(200);

      // Vérifier que seul cet utilisateur a été retiré
      updatedSubject = await Subject.findById(subject._id);
      expect(updatedSubject.favoris.length).toBe(2);
      expect(
        updatedSubject.favoris.some(
          (id) => id.toString() === userIds[0].toString()
        )
      ).toBeFalsy();
      expect(
        updatedSubject.favoris.some(
          (id) => id.toString() === userIds[1].toString()
        )
      ).toBeTruthy();
      expect(
        updatedSubject.favoris.some(
          (id) => id.toString() === userIds[2].toString()
        )
      ).toBeTruthy();
    });
  });
});
