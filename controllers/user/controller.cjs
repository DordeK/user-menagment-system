const {prisma} = require('../../database/querys.cjs')

const getAllUsers = async (req, res) => {
    const users = await prisma.user.findMany()
    res.send(users)
}

const getOneUser = async (req, res) => {
    const userUuid = req.query.id
    const user = await prisma.user.findUnique({
        where: {
            id:userUuid
        }
    })
    res.send(user)
}

const addUser = async (req, res) => {
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const surname = req.body.surname
    const password = req.body.password
    const email = req.body.email
v
    const addedUser = await prisma.user.create({
        data:{
            firstName,
            lastName,
            surname,
            password,
            email
        }
    })
    res.send(addedUser)
}

const editUser = async (req, res) => {
    const userUuid = req.body.id
    const updateData = req.body.updateData

    
    const updatedUser = await prisma.user.update({
        where: {
            id: userUuid,
          },
          data: {
            ...updateData
          },
    })
    res.send(updatedUser)
}

const deleteUser = async (req, res) => {
    const userUuid = req.query.id

    const deleteUser = await prisma.user.delete({
        where: {
            id: userUuid
          },
    })
    res.send(deleteUser)
}

const assignPermissions = async (req, res) => {
    res.send('assignPermissions')
}

exports.getAllUsers = getAllUsers
exports.getOneUser = getOneUser
exports.addUser = addUser
exports.editUser = editUser
exports.deleteUser = deleteUser
exports.assignPermissions = assignPermissions


