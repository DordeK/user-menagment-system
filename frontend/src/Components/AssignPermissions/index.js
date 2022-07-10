import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "../../GlobalContext";
import { useParams } from "react-router-dom";
import { client } from "../../Client";
import { useNavigate } from "react-router-dom";
import Permission from "./Permission";
import AddPermission from "./AddPermission";
import "./style.css";
import { permissionsList } from "./PermissionsList";

export default function AssignPermissions() {
  let { userId } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const { selectedUser, setSelectedUser } = useContext(MyContext);
  const [permissions, setPermissions] = useState(
    selectedUser?.permissions || []
  );

  const existiongPermissions = permissions.map((permission) => permission.code);

  const [excludedPermissions, setExcludedPermissions] = useState([]);

  useEffect(() => {
    const notAppliedPermissions = permissionsList.filter((permission) => {
      return !existiongPermissions.includes(Object.keys(permission)[0]);
    });
    setExcludedPermissions(notAppliedPermissions);
  }, [permissions]);

  useEffect(() => {
    const getUser = async () => {
      let { data } = await client.get(`/user/getOne?id=${userId}`);
      setSelectedUser(data);
      setPermissions(data.permissions);
    };

    if (!selectedUser) getUser();
  }, [selectedUser]);

  const saveNewPermissions = async () => {
    const permissionsTitle = permissions.map((permission) => permission.code);
    const oldPermissionsTitle = selectedUser.permissions.map(
      (permission) => permission.code
    );
    const removedPermissions = selectedUser.permissions.filter(
      (permission) => !permissionsTitle.includes(permission.code)
    );
    const newPermissions = permissions.filter(
      (permission) => !oldPermissionsTitle.includes(permission.code)
    );

    console.log({ oldPermissionsTitle, removedPermissions });

    try {
      await Promise.all(
        removedPermissions.map((permission) =>
          client.delete(`user/permissions/${permission.id}`)
        )
      );

      await Promise.all(
        newPermissions.map((permission) =>
          client.post(`user/permissions`, {
            code: permission.code,
            description: permission.description,
            userId: permission.userId,
          })
        )
      );
      navigate("/?page=0");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Assigned Permissions</h1>
      <div className="permissions">
        {permissions.map((permission) => (
          <Permission
            key={permission.id}
            description={permission.description}
            title={permission.code}
            setPermissions={setPermissions}
            remove
          />
        ))}
      </div>
      <hr />
      <h1>Unassigned Permissions</h1>
      <div className="addPermissionBox">
        {excludedPermissions.map((permission) => (
          <AddPermission
            key={permission.id}
            userId={userId}
            permission={permission}
            setPermissions={setPermissions}
            setExcludedPermissions={setExcludedPermissions}
          />
        ))}
      </div>

      <div className="saveNewPermissions" onClick={() => saveNewPermissions()}>
        Save new permissions
      </div>
    </div>
  );
}
