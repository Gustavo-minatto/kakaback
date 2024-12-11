const express = require("express");
const CasesController = require("../controllers/CasosController");

const router = express.Router();

router.post("/", CasesController.create);

router.get("/", CasesController.index);

router.get("/:cpf", CasesController.showByCpf);

router.put("/:id", CasesController.update);

router.delete("/:id", CasesController.delete);

module.exports = router;
