const express = require("express");
const ClientesController = require("../controllers/ClientsController");

const router = express.Router();

router.post("/", ClientesController.create); 
router.get("/", ClientesController.index);
router.put("/:id", ClientesController.update);
router.delete("/:id", ClientesController.delete);

module.exports = router;
