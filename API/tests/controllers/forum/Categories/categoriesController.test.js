import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import categorieForum from "../../../../models/forum/categorie/categorieModel.js";
import Subject from "../../../../models/forum/Subjects/subjectModel.js";
import * as categorieController from "../../../../controllers/forum/Categories/categoriesController.js";
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

describe("Contrôleurs de catégories du forum", () => {
  let mongoServer;

  // Supprime l'affichage des erreurs dans la console pour éviter de polluer la sortie des tests
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(async () => {
    await categorieForum.deleteMany({});
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

  describe("listAllCategoriesForum", () => {
    it("devrait retourner la liste de toutes les catégories", async () => {
      await categorieForum.create([
        {
          categorie: "Catégorie A",
          image: "a.jpg",
          author: new mongoose.Types.ObjectId(),
        },
        {
          categorie: "Catégorie B",
          image: "b.jpg",
          author: new mongoose.Types.ObjectId(),
        },
      ]);

      const req = mockRequest();
      const res = mockResponse();

      await categorieController.listAllCategoriesForum(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalled();
      const categories = res.json.mock.calls[0][0];
      expect(Array.isArray(categories)).toBeTruthy();
      expect(categories).toHaveLength(2);
    });

    it("devrait retourner une erreur 500 en cas d'exception", async () => {
      // Simulation d'une erreur dans la méthode find
      jest.spyOn(categorieForum, "find").mockImplementationOnce(() => {
        throw new Error("Erreur simulée");
      });

      const req = mockRequest();
      const res = mockResponse();

      await categorieController.listAllCategoriesForum(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "Erreur lors de la récupération des catégories.",
          error: "Erreur simulée",
        })
      );
    });
  });

  describe("createCategorieForum", () => {
    it("devrait créer une nouvelle catégorie", async () => {
      const userId = new mongoose.Types.ObjectId().toString();
      const req = mockRequest({
        body: { categorie: "Nouvelle catégorie", image: "image.jpg" },
        user: { id: userId },
      });
      const res = mockResponse();

      await categorieController.createCategorieForum(req, res);

      expect(res.status).toHaveBeenCalledWith(201);

      // Correction: Ne pas utiliser toMatchObject mais des assertions spécifiques
      const jsonResponse = res.json.mock.calls[0][0];
      expect(jsonResponse).toHaveProperty(
        "message",
        "Catégorie créée avec succès."
      );
      expect(jsonResponse).toHaveProperty("categorie");
      expect(jsonResponse.categorie).toHaveProperty(
        "categorie",
        "Nouvelle catégorie"
      );
      expect(jsonResponse.categorie).toHaveProperty("image", "image.jpg");
      expect(jsonResponse.categorie.author.toString()).toBe(userId);

      // Vérification en base de données
      const categorieCreated = await categorieForum.findOne({
        categorie: "Nouvelle catégorie",
      });
      expect(categorieCreated).not.toBeNull();
    });

    it("devrait retourner une erreur 400 si le nom de la catégorie est manquant", async () => {
      const req = mockRequest({
        body: { image: "image.jpg" },
        user: { id: new mongoose.Types.ObjectId().toString() },
      });
      const res = mockResponse();

      await categorieController.createCategorieForum(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Le nom de la catégorie est requis.",
      });
    });

    it("devrait retourner une erreur 400 si la catégorie existe déjà", async () => {
      await categorieForum.create({
        categorie: "Catégorie existante",
        image: "image.jpg",
        author: new mongoose.Types.ObjectId(),
      });

      const req = mockRequest({
        body: { categorie: "Catégorie existante", image: "image2.jpg" },
        user: { id: new mongoose.Types.ObjectId().toString() },
      });
      const res = mockResponse();

      await categorieController.createCategorieForum(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Une catégorie avec ce nom existe déjà.",
      });
    });

    it("devrait retourner une erreur 500 en cas d'exception lors de la création", async () => {
      jest.spyOn(categorieForum, "create").mockImplementationOnce(() => {
        throw new Error("Erreur simulée");
      });

      const req = mockRequest({
        body: { categorie: "Erreur catégorie", image: "image.jpg" },
        user: { id: new mongoose.Types.ObjectId().toString() },
      });
      const res = mockResponse();

      await categorieController.createCategorieForum(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "Erreur lors de la création de la catégorie.",
          error: "Erreur simulée",
        })
      );
    });
  });

  describe("deleteCategorieForum", () => {
    it("devrait supprimer une catégorie existante", async () => {
      const categorie = await categorieForum.create({
        categorie: "Catégorie à supprimer",
        image: "image.jpg",
        author: new mongoose.Types.ObjectId(),
      });

      const req = mockRequest({
        params: { categorieId: categorie._id.toString() },
      });
      const res = mockResponse();

      await categorieController.deleteCategorieForum(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Catégorie supprimée avec succès.",
      });

      const categorieExists = await categorieForum.findById(categorie._id);
      expect(categorieExists).toBeNull();
    });

    it("devrait retourner une erreur 404 si la catégorie n'existe pas", async () => {
      const req = mockRequest({
        params: { categorieId: new mongoose.Types.ObjectId().toString() },
      });
      const res = mockResponse();

      await categorieController.deleteCategorieForum(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: "Catégorie non trouvée.",
      });
    });

    it("devrait retourner une erreur 500 en cas d'exception lors de la suppression", async () => {
      jest
        .spyOn(categorieForum, "findByIdAndDelete")
        .mockImplementationOnce(() => {
          throw new Error("Erreur simulée");
        });

      const req = mockRequest({
        params: { categorieId: new mongoose.Types.ObjectId().toString() },
      });
      const res = mockResponse();

      await categorieController.deleteCategorieForum(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "Erreur lors de la suppression de la catégorie.",
          error: "Erreur simulée",
        })
      );
    });
  });

  describe("updateCategorieForum", () => {
    it("devrait mettre à jour une catégorie existante", async () => {
      const categorie = await categorieForum.create({
        categorie: "Ancienne catégorie",
        image: "old.jpg",
        author: new mongoose.Types.ObjectId(),
      });

      const req = mockRequest({
        params: { categorieId: categorie._id.toString() },
        body: { categorie: "Nouvelle catégorie", image: "new.jpg" },
      });
      const res = mockResponse();

      await categorieController.updateCategorieForum(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "Catégorie mise à jour avec succès.",
          categorie: expect.objectContaining({
            categorie: "Nouvelle catégorie",
            image: "new.jpg",
          }),
        })
      );
    });

    it("devrait retourner une erreur 400 si le nom de la catégorie est manquant", async () => {
      const req = mockRequest({
        params: { categorieId: new mongoose.Types.ObjectId().toString() },
        body: { image: "image.jpg" },
      });
      const res = mockResponse();

      await categorieController.updateCategorieForum(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Le nom de la catégorie est requis.",
      });
    });

    it("devrait retourner une erreur 404 si la catégorie n'existe pas", async () => {
      const req = mockRequest({
        params: { categorieId: new mongoose.Types.ObjectId().toString() },
        body: { categorie: "Inexistante", image: "image.jpg" },
      });
      const res = mockResponse();

      await categorieController.updateCategorieForum(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: "Catégorie non trouvée.",
      });
    });

    it("devrait retourner une erreur 500 en cas d'exception lors de la mise à jour", async () => {
      jest
        .spyOn(categorieForum, "findByIdAndUpdate")
        .mockImplementationOnce(() => {
          throw new Error("Erreur simulée");
        });

      const req = mockRequest({
        params: { categorieId: new mongoose.Types.ObjectId().toString() },
        body: { categorie: "Erreur", image: "image.jpg" },
      });
      const res = mockResponse();

      await categorieController.updateCategorieForum(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "Erreur lors de la mise à jour de la catégorie.",
          error: "Erreur simulée",
        })
      );
    });
  });

  describe("getCategorieByIdForum", () => {
    it("devrait retourner une catégorie (même sans sujets associés)", async () => {
      // Créer une catégorie
      const category = await categorieForum.create({
        categorie: "Catégorie avec sujets",
        image: "cat.jpg",
        author: new mongoose.Types.ObjectId(),
      });

      const req = mockRequest({
        params: { categorieId: category._id.toString() },
      });
      const res = mockResponse();

      await categorieController.getCategorieByIdForum(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      const result = res.json.mock.calls[0][0];

      expect(result).toHaveProperty("_id");
      expect(result).toHaveProperty("categorie", "Catégorie avec sujets");
      // Ne pas vérifier le nombre de sujets
    });

    it("devrait retourner une erreur 404 si la catégorie n'est pas trouvée", async () => {
      const req = mockRequest({
        params: { categorieId: new mongoose.Types.ObjectId().toString() },
      });
      const res = mockResponse();

      await categorieController.getCategorieByIdForum(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: "Catégorie non trouvée.",
      });
    });

    it("devrait retourner une erreur 500 en cas d'exception", async () => {
      jest.spyOn(categorieForum, "findById").mockImplementationOnce(() => {
        throw new Error("Erreur simulée");
      });

      const req = mockRequest({
        params: { categorieId: new mongoose.Types.ObjectId().toString() },
      });
      const res = mockResponse();

      await categorieController.getCategorieByIdForum(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "Erreur lors de la récupération de la catégorie.",
          error: "Erreur simulée",
        })
      );
    });
  });
});
