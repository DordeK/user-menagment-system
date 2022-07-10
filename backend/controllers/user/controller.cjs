const { prisma } = require("../../database/querys.cjs");

const getAllUsers = async (req, res) => {
  const page = req.query.page;
  const take = 9;
  const skip = page * take;

  const querryObject = req.query;
  delete querryObject["page"];

  const orderByObject = Object.keys(querryObject)
    .filter((key) => !key.includes("filter"))
    .map((key) => {
      return { [key]: querryObject[key] };
    });

  const filterText = req.query?.filterText || "";
  const filterField = req.params.filterField || "";

  if (!page || (filterField && !filterText)) {
    return res.status(403).send("incorect querys");
  }

  const contains_filter_text = {
    contains: querryObject["filter_text"] || "",
  };

  let filterObj = {
    OR: [
      {
        username: {
          ...contains_filter_text,
        },
      },
      {
        email: {
          ...contains_filter_text,
        },
      },
      {
        first_name: {
          ...contains_filter_text,
        },
      },
      {
        last_name: {
          ...contains_filter_text,
        },
      },
    ],
  };
  const users = await prisma.user.findMany({
    skip,
    take,
    where: {
      OR: filterObj.OR,
    },
    orderBy: [...orderByObject],
    include: {
      permissions: true,
    },
  });

  res.send(users);
};

const getOneUser = async (req, res) => {
  const userUuid = req.query.id;

  const user = await prisma.user.findUnique({
    where: {
      id: userUuid,
    },
    include: {
      permissions: true,
    },
  });
  res.send(user);
};

const addUser = async (req, res) => {
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  const status_2fa = req.body.status_2fa;
  const status_2fa_valid_values = [
    "Configured",
    "Required",
    "Not configured",
    "Not allowed",
  ];

  if (!status_2fa_valid_values.includes(status_2fa)) {
    return res.send(
      "error: status_2fa must be one of the next values: " +
        status_2fa_valid_values
    );
  }

  try {
    const addedUser = await prisma.user.create({
      data: {
        first_name,
        last_name,
        username,
        password,
        email,
        status_2fa,
      },
    });
    res.send(addedUser);
  } catch (error) {
    res.send(error);
  }
};

const editUser = async (req, res) => {
  const userUuid = req.body.id;
  const updateData = req.body.updateData;
  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: userUuid,
      },
      data: {
        ...updateData,
      },
    });
    res.send(updatedUser);
  } catch (error) {
    res.send(error);
  }
};

const deleteUser = async (req, res) => {
  const userUuid = req.query.id;

  const deleteUser = await prisma.user.delete({
    where: {
      id: userUuid,
    },
  });
  res.send(deleteUser);
};

const addPermissions = async (req, res) => {
  const addPermission = await prisma.permission.create({
    data: {
      ...req.body,
    },
  });
  res.send(addPermission);
};

const removePermissions = async (req, res) => {
  const id = req.params.id;
  const deletePermission = await prisma.permission.delete({
    where: {
      id,
    },
  });
  res.send(deletePermission);
};

exports.getAllUsers = getAllUsers;
exports.getOneUser = getOneUser;
exports.addUser = addUser;
exports.editUser = editUser;
exports.deleteUser = deleteUser;
exports.addPermissions = addPermissions;
exports.removePermissions = removePermissions;
