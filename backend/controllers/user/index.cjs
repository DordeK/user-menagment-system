let userHelpers = require("./controller.cjs");

let express = require("express");
let router = express.Router();

router.get("/getAll", userHelpers.getAllUsers);
router.get("/getOne", userHelpers.getOneUser);
router.post("/add", userHelpers.addUser);
router.put("/edit", userHelpers.editUser);
router.delete("/delete", userHelpers.deleteUser);
router.delete("/permissions/:id", userHelpers.removePermissions);
router.post("/permissions", userHelpers.addPermissions);

module.exports = router;
