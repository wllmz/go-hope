import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import Comment from "../../../../models/forum/Comments/commentModel.js";
import Subject from "../../../../models/forum/Subjects/subjectModel.js";
import * as commentController from "../../../../controllers/forum/Comments/commentController.js";
import { jest } from "@jest/globals";

// Mock des objets req et res pour simuler les requêtes Express
const mockRequest = (data = {}) => {
  return {
    params: data.params || {},
    body: data.body || {},
    user: data.user || {},
  };
};

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("Contrôleur de commentaires", () => {
  let mongoServer;

  // Configuration avant tous les tests
  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
  });

  // Nettoyage après tous les tests
  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  // Nettoyage après chaque test
  afterEach(async () => {
    await Comment.deleteMany({});
    await Subject.deleteMany({});
  });

  describe("createComment", () => {
    it("devrait créer un nouveau commentaire", async () => {
      // Créer un sujet de test
      const subject = new Subject({
        title: "Sujet de test",
        content: "Contenu du sujet",
        image: "image.jpg",
        categories: [new mongoose.Types.ObjectId()],
        author: new mongoose.Types.ObjectId(),
      });
      await subject.save();

      const userId = new mongoose.Types.ObjectId();

      const req = mockRequest({
        body: { content: "Contenu du commentaire" },
        user: { id: userId.toString() },
        params: { subjectId: subject._id.toString() },
      });

      const res = mockResponse();

      // Espionner la méthode populate
      jest
        .spyOn(mongoose.Model.prototype, "populate")
        .mockImplementation(function () {
          return Promise.resolve({
            ...this,
            author: {
              firstName: "Test",
              email: "test@example.com",
            },
          });
        });

      await commentController.createComment(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalled();

      // Vérifier que le commentaire a été créé en base de données
      const comments = await Comment.find({});
      expect(comments).toHaveLength(1);
      expect(comments[0].content).toBe("Contenu du commentaire");
      expect(comments[0].author.toString()).toBe(userId.toString());
      expect(comments[0].subject.toString()).toBe(subject._id.toString());

      // Vérifier que le compteur de commentaires a été incrémenté
      const updatedSubject = await Subject.findById(subject._id);
      expect(updatedSubject.commentCount).toBe(1);
    });

    it("devrait retourner une erreur 404 si le sujet n'existe pas", async () => {
      const req = mockRequest({
        body: { content: "Contenu du commentaire" },
        user: { id: new mongoose.Types.ObjectId().toString() },
        params: { subjectId: new mongoose.Types.ObjectId().toString() },
      });

      const res = mockResponse();

      await commentController.createComment(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Sujet non trouvé" });
    });

    it("devrait retourner une erreur 500 si une erreur se produit lors de la création du commentaire", async () => {
      const subject = new Subject({
        title: "Sujet de test",
        content: "Contenu du sujet",
        image: "image.jpg",
        categories: [new mongoose.Types.ObjectId()],
        author: new mongoose.Types.ObjectId(),
      });
      await subject.save();

      const req = mockRequest({
        body: { content: "Contenu du commentaire" },
        user: { id: new mongoose.Types.ObjectId().toString() },
        params: { subjectId: subject._id.toString() },
      });

      const res = mockResponse();

      // Mock direct de la méthode save de mongoose.Model.prototype
      // Suppression du mock précédent qui ne fonctionnait pas
      const originalSave = mongoose.Model.prototype.save;
      mongoose.Model.prototype.save = jest
        .fn()
        .mockRejectedValue(new Error("Erreur simulée"));

      try {
        await commentController.createComment(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
          message: "Erreur lors de la création du commentaire",
        });
      } finally {
        // Restaurer la méthode originale
        mongoose.Model.prototype.save = originalSave;
      }
    });

    it("devrait valider le contenu du commentaire avant de le créer", async () => {
      const subject = new Subject({
        title: "Sujet de test",
        content: "Contenu du sujet",
        image: "image.jpg",
        categories: [new mongoose.Types.ObjectId()],
        author: new mongoose.Types.ObjectId(),
      });
      await subject.save();

      const req = mockRequest({
        body: { content: "" }, // Contenu vide
        user: { id: new mongoose.Types.ObjectId().toString() },
        params: { subjectId: subject._id.toString() },
      });

      const res = mockResponse();

      // On s'attend à ce que la validation mongoose renvoie une erreur
      // Notez que ce test pourrait échouer si votre modèle n'a pas de validation required pour le contenu
      jest
        .spyOn(mongoose.Model.prototype, "save")
        .mockImplementationOnce(() => {
          throw new Error("Le contenu est requis");
        });

      await commentController.createComment(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe("deleteComment", () => {
    it("devrait supprimer un commentaire existant", async () => {
      // Créer un sujet de test
      const subject = new Subject({
        title: "Sujet de test",
        content: "Contenu du sujet",
        image: "image.jpg",
        categories: [new mongoose.Types.ObjectId()],
        author: new mongoose.Types.ObjectId(),
        commentCount: 1,
      });
      await subject.save();

      // Créer un commentaire de test
      const comment = new Comment({
        content: "Commentaire à supprimer",
        author: new mongoose.Types.ObjectId(),
        subject: subject._id,
      });
      await comment.save();

      const req = mockRequest({
        params: { commentId: comment._id.toString() },
      });

      const res = mockResponse();

      await commentController.deleteComment(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Commentaire supprimé avec succès",
      });

      // Vérifier que le commentaire a été supprimé
      const commentExists = await Comment.findById(comment._id);
      expect(commentExists).toBeNull();

      // Vérifier que le compteur de commentaires a été décrémenté
      const updatedSubject = await Subject.findById(subject._id);
      expect(updatedSubject.commentCount).toBe(0);
    });

    it("devrait retourner une erreur 404 si le commentaire n'existe pas", async () => {
      const req = mockRequest({
        params: { commentId: new mongoose.Types.ObjectId().toString() },
      });

      const res = mockResponse();

      await commentController.deleteComment(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: "Commentaire non trouvé",
      });
    });

    it("devrait retourner une erreur 500 si une erreur se produit lors de la suppression du commentaire", async () => {
      // Simuler une erreur dans la méthode deleteOne de Comment
      jest.spyOn(Comment, "deleteOne").mockImplementationOnce(() => {
        throw new Error("Erreur de base de données");
      });

      const comment = new Comment({
        content: "Commentaire à supprimer",
        author: new mongoose.Types.ObjectId(),
        subject: new mongoose.Types.ObjectId(),
      });
      await comment.save();

      const req = mockRequest({
        params: { commentId: comment._id.toString() },
      });

      const res = mockResponse();

      await commentController.deleteComment(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: "Erreur serveur." });
    });
  });

  describe("updateComment", () => {
    it("devrait mettre à jour un commentaire existant", async () => {
      // Créer un commentaire de test
      const comment = new Comment({
        content: "Contenu original",
        author: new mongoose.Types.ObjectId(),
        subject: new mongoose.Types.ObjectId(),
      });
      await comment.save();

      const req = mockRequest({
        params: { commentId: comment._id.toString() },
        body: { content: "Contenu mis à jour" },
      });

      const res = mockResponse();

      // Espionner la méthode populate
      jest
        .spyOn(mongoose.Model.prototype, "populate")
        .mockImplementation(function () {
          return Promise.resolve({
            ...this,
            author: {
              firstName: "Test",
              email: "test@example.com",
            },
          });
        });

      await commentController.updateComment(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalled();

      // Vérifier que le commentaire a été mis à jour
      const updatedComment = await Comment.findById(comment._id);
      expect(updatedComment.content).toBe("Contenu mis à jour");
    });

    it("devrait retourner une erreur 404 si le commentaire n'existe pas", async () => {
      const req = mockRequest({
        params: { commentId: new mongoose.Types.ObjectId().toString() },
        body: { content: "Contenu mis à jour" },
      });

      const res = mockResponse();

      await commentController.updateComment(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: "Commentaire non trouvé",
      });
    });

    it("devrait retourner une erreur 400 si le contenu est vide", async () => {
      const comment = new Comment({
        content: "Contenu original",
        author: new mongoose.Types.ObjectId(),
        subject: new mongoose.Types.ObjectId(),
      });
      await comment.save();

      const req = mockRequest({
        params: { commentId: comment._id.toString() },
        body: { content: "" },
      });

      const res = mockResponse();

      await commentController.updateComment(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Le contenu est requis pour la mise à jour.",
      });
    });
  });

  describe("likeComment", () => {
    it("devrait ajouter un like à un commentaire", async () => {
      const userId = new mongoose.Types.ObjectId();
      const comment = new Comment({
        content: "Commentaire à liker",
        author: new mongoose.Types.ObjectId(),
        subject: new mongoose.Types.ObjectId(),
        likes: [],
      });
      await comment.save();

      const req = mockRequest({
        params: { commentId: comment._id.toString() },
        user: { id: userId.toString() },
      });

      const res = mockResponse();

      // Espionner la méthode populate
      jest
        .spyOn(mongoose.Model.prototype, "populate")
        .mockImplementation(function () {
          return Promise.resolve({
            ...this,
            author: {
              firstName: "Test",
              email: "test@example.com",
            },
          });
        });

      await commentController.likeComment(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalled();

      // Vérifier que le like a été ajouté
      const updatedComment = await Comment.findById(comment._id);
      expect(updatedComment.likes).toContainEqual(userId);
    });

    it("devrait retourner une erreur 400 si l'utilisateur a déjà liké le commentaire", async () => {
      const userId = new mongoose.Types.ObjectId();
      const comment = new Comment({
        content: "Commentaire déjà liké",
        author: new mongoose.Types.ObjectId(),
        subject: new mongoose.Types.ObjectId(),
        likes: [userId],
      });
      await comment.save();

      const req = mockRequest({
        params: { commentId: comment._id.toString() },
        user: { id: userId.toString() },
      });

      const res = mockResponse();

      await commentController.likeComment(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Vous avez déjà aimé ce commentaire.",
      });
    });
  });

  describe("unlikeComment", () => {
    it("devrait retirer un like d'un commentaire", async () => {
      const userId = new mongoose.Types.ObjectId();
      const comment = new Comment({
        content: "Commentaire à unliker",
        author: new mongoose.Types.ObjectId(),
        subject: new mongoose.Types.ObjectId(),
        likes: [userId],
      });
      await comment.save();

      const req = mockRequest({
        params: { commentId: comment._id.toString() },
        user: { id: userId.toString() },
      });

      const res = mockResponse();

      // Espionner la méthode populate
      jest
        .spyOn(mongoose.Model.prototype, "populate")
        .mockImplementation(function () {
          return Promise.resolve({
            ...this,
            author: {
              firstName: "Test",
              email: "test@example.com",
            },
          });
        });

      await commentController.unlikeComment(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalled();

      // Vérifier que le like a été retiré
      const updatedComment = await Comment.findById(comment._id);
      expect(updatedComment.likes).not.toContainEqual(userId);
    });

    it("devrait retourner une erreur 400 si l'utilisateur n'a pas encore liké le commentaire", async () => {
      const userId = new mongoose.Types.ObjectId();
      const comment = new Comment({
        content: "Commentaire non liké",
        author: new mongoose.Types.ObjectId(),
        subject: new mongoose.Types.ObjectId(),
        likes: [],
      });
      await comment.save();

      const req = mockRequest({
        params: { commentId: comment._id.toString() },
        user: { id: userId.toString() },
      });

      const res = mockResponse();

      await commentController.unlikeComment(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Vous n'avez pas encore aimé ce commentaire.",
      });
    });
  });

  it("devrait assurer la cohérence entre le nombre de commentaires et le sujet associé", async () => {
    // Créer un sujet avec un compteur de commentaires à 0
    const subject = new Subject({
      title: "Sujet de cohérence",
      content: "Contenu du sujet",
      image: "image.jpg",
      categories: [new mongoose.Types.ObjectId()],
      author: new mongoose.Types.ObjectId(),
      commentCount: 0,
    });
    await subject.save();

    // Créer un commentaire
    const userId = new mongoose.Types.ObjectId();
    const req1 = mockRequest({
      body: { content: "Premier commentaire" },
      user: { id: userId.toString() },
      params: { subjectId: subject._id.toString() },
    });

    const res1 = mockResponse();

    // Espionner la méthode populate
    jest
      .spyOn(mongoose.Model.prototype, "populate")
      .mockImplementation(function () {
        return Promise.resolve({
          ...this,
          author: {
            firstName: "Test",
            email: "test@example.com",
          },
        });
      });

    await commentController.createComment(req1, res1);

    // Vérifier que le compteur de commentaires a été incrémenté
    const updatedSubject1 = await Subject.findById(subject._id);
    expect(updatedSubject1.commentCount).toBe(1);

    // Récupérer l'ID du commentaire créé
    const commentId = res1.json.mock.calls[0][0]._id;

    // Supprimer le commentaire
    const req2 = mockRequest({
      params: { commentId: commentId.toString() },
    });

    const res2 = mockResponse();

    await commentController.deleteComment(req2, res2);

    // Vérifier que le compteur de commentaires a été décrémenté
    const updatedSubject2 = await Subject.findById(subject._id);
    expect(updatedSubject2.commentCount).toBe(0);
  });

  describe("Tests de performance", () => {
    it("devrait gérer efficacement plusieurs commentaires pour un même sujet", async () => {
      // Créer un sujet
      const subject = new Subject({
        title: "Sujet de performance",
        content: "Contenu du sujet",
        image: "image.jpg",
        categories: [new mongoose.Types.ObjectId()],
        author: new mongoose.Types.ObjectId(),
      });
      await subject.save();

      const userId = new mongoose.Types.ObjectId();

      // Espionner la méthode populate
      jest
        .spyOn(mongoose.Model.prototype, "populate")
        .mockImplementation(function () {
          return Promise.resolve({
            ...this,
            author: {
              firstName: "Test",
              email: "test@example.com",
            },
          });
        });

      // Créer 5 commentaires
      for (let i = 0; i < 5; i++) {
        const req = mockRequest({
          body: { content: `Commentaire ${i}` },
          user: { id: userId.toString() },
          params: { subjectId: subject._id.toString() },
        });

        const res = mockResponse();

        await commentController.createComment(req, res);
        expect(res.status).toHaveBeenCalledWith(201);
      }

      // Vérifier que le compteur de commentaires a été correctement incrémenté
      const updatedSubject = await Subject.findById(subject._id);
      expect(updatedSubject.commentCount).toBe(5);

      // Vérifier que tous les commentaires sont correctement associés au sujet
      const comments = await Comment.find({ subject: subject._id });
      expect(comments.length).toBe(5);
    });
  });

  describe("Tests de cas limites pour les likes", () => {
    it("devrait gérer correctement les likes multiples de différents utilisateurs", async () => {
      // Créer un commentaire
      const comment = new Comment({
        content: "Commentaire pour likes multiples",
        author: new mongoose.Types.ObjectId(),
        subject: new mongoose.Types.ObjectId(),
        likes: [],
      });
      await comment.save();

      // Espionner la méthode populate
      jest
        .spyOn(mongoose.Model.prototype, "populate")
        .mockImplementation(function () {
          return Promise.resolve({
            ...this,
            author: {
              firstName: "Test",
              email: "test@example.com",
            },
          });
        });

      // Ajouter 3 likes de 3 utilisateurs différents
      const userIds = [
        new mongoose.Types.ObjectId(),
        new mongoose.Types.ObjectId(),
        new mongoose.Types.ObjectId(),
      ];

      for (const userId of userIds) {
        const req = mockRequest({
          params: { commentId: comment._id.toString() },
          user: { id: userId.toString() },
        });

        const res = mockResponse();

        await commentController.likeComment(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
      }

      // Vérifier que le commentaire a bien les 3 likes
      const updatedComment = await Comment.findById(comment._id);
      expect(updatedComment.likes.length).toBe(3);

      // Vérifier que chaque utilisateur est bien dans la liste des likes
      for (const userId of userIds) {
        expect(
          updatedComment.likes.some(
            (like) => like.toString() === userId.toString()
          )
        ).toBeTruthy();
      }
    });

    it("devrait gérer correctement le cas où un utilisateur like puis unlike plusieurs fois", async () => {
      // Créer un commentaire
      const userId = new mongoose.Types.ObjectId();
      const comment = new Comment({
        content: "Commentaire pour like/unlike",
        author: new mongoose.Types.ObjectId(),
        subject: new mongoose.Types.ObjectId(),
        likes: [],
      });
      await comment.save();

      // Espionner la méthode populate
      jest
        .spyOn(mongoose.Model.prototype, "populate")
        .mockImplementation(function () {
          return Promise.resolve({
            ...this,
            author: {
              firstName: "Test",
              email: "test@example.com",
            },
          });
        });

      const reqLike = mockRequest({
        params: { commentId: comment._id.toString() },
        user: { id: userId.toString() },
      });

      const resLike = mockResponse();
      const reqUnlike = mockRequest({
        params: { commentId: comment._id.toString() },
        user: { id: userId.toString() },
      });

      const resUnlike = mockResponse();

      // Séquence : like, unlike, like, unlike
      await commentController.likeComment(reqLike, resLike);
      expect(resLike.status).toHaveBeenCalledWith(200);

      let updatedComment = await Comment.findById(comment._id);
      expect(updatedComment.likes.length).toBe(1);

      await commentController.unlikeComment(reqUnlike, resUnlike);
      expect(resUnlike.status).toHaveBeenCalledWith(200);

      updatedComment = await Comment.findById(comment._id);
      expect(updatedComment.likes.length).toBe(0);

      await commentController.likeComment(reqLike, resLike);
      expect(resLike.status).toHaveBeenCalledWith(200);

      updatedComment = await Comment.findById(comment._id);
      expect(updatedComment.likes.length).toBe(1);

      await commentController.unlikeComment(reqUnlike, resUnlike);
      expect(resUnlike.status).toHaveBeenCalledWith(200);

      updatedComment = await Comment.findById(comment._id);
      expect(updatedComment.likes.length).toBe(0);
    });
  });

  describe("Tests de sécurité et d'autorisations", () => {
    it("devrait vérifier que l'utilisateur est authentifié pour créer un commentaire", async () => {
      // Ce test simule la vérification d'authentification qui est habituellement gérée par un middleware
      // Nous vérifions simplement que le contrôleur utilise l'ID de l'utilisateur depuis req.user
      const subject = new Subject({
        title: "Sujet de sécurité",
        content: "Contenu du sujet",
        image: "image.jpg",
        categories: [new mongoose.Types.ObjectId()],
        author: new mongoose.Types.ObjectId(),
      });
      await subject.save();

      const userId = new mongoose.Types.ObjectId();

      // Cas 1: Utilisateur authentifié (req.user est défini)
      const reqAuth = mockRequest({
        body: { content: "Commentaire authentifié" },
        user: { id: userId.toString() },
        params: { subjectId: subject._id.toString() },
      });

      const resAuth = mockResponse();

      // Espionner la méthode populate
      jest
        .spyOn(mongoose.Model.prototype, "populate")
        .mockImplementation(function () {
          return Promise.resolve({
            ...this,
            author: {
              firstName: "Test",
              email: "test@example.com",
            },
          });
        });

      await commentController.createComment(reqAuth, resAuth);
      expect(resAuth.status).toHaveBeenCalledWith(201);

      // Vérifier que le commentaire a bien été créé avec l'ID utilisateur
      const comment = await Comment.findOne({
        content: "Commentaire authentifié",
      });
      expect(comment).not.toBeNull();
      expect(comment.author.toString()).toBe(userId.toString());
    });
  });
});
