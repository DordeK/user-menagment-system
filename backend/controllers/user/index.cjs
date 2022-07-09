let userHelpers = require('./controller.cjs')

let express = require('express')
let router = express.Router();

router.get('/getAll/:filterField?', userHelpers.getAllUsers)
router.get('/getOne', userHelpers.getOneUser)
router.post('/add', userHelpers.addUser)
router.put('/edit', userHelpers.editUser)
router.delete('/delete', userHelpers.deleteUser)
router.put('/permissions', userHelpers.assignPermissions)


module.exports = router;
