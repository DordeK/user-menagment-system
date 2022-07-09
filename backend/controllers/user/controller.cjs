const {prisma} = require('../../database/querys.cjs')

const getAllUsers = async (req, res) => {
    const page = req.query.page
    const take = 5
    const skip = page*take;

    const order = req.query?.order || null
    const order_by = order ? {created_at: order} : null

    const filterText = req.query?.filterText || ''
    const filterField = req.params.filterField || ''

    if (!page || (filterField && !filterText)) {
        return res.status(403).send('incorect querys')
    }

    let filterObj = {}
    if(filterField){
        filterObj[filterField] = {
            contains:filterText
        }
    }

    const users = await prisma.user.findMany({
        skip,
        take,
        where: {
            ...filterObj
        },
        orderBy: {
            ...order_by
        },
    })
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
    const first_name = req.body.first_name
    const last_name = req.body.last_name
    const username = req.body.username
    const password = req.body.password
    const email = req.body.email
    console.log(req.body);
    console.log({            
        first_name,
        last_name,
        username,
        password,
        email
    });

    const addedUser = await prisma.user.create({
        data:{
            first_name,
            last_name,
            username,
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


