const Router = require("express");
const router = new Router();
const AdviceController = require("../controller/advice.controller");

router.post("/createAdvice", AdviceController.createAdvice);
router.get("/Advice", AdviceController.getAdvices);
router.delete("/deleteAdvice/:id", AdviceController.deleteAdvice);
router.put("/updateAdvice/:id", AdviceController.updateAdvice);

module.exports = router;
