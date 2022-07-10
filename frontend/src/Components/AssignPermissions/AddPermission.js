import React from "react";
import Permission from "./Permission";

export default function AddPermission({
  permission,
  setExcludedPermissions,
  setPermissions,
  userId,
}) {
  const permissionsTitle = Object.keys(permission)[0];
  const addPermission = () => {
    setPermissions((prevValue) =>
      prevValue.concat([
        {
          code: permissionsTitle,
          description: permission[Object.keys(permission)[0]].description,
          userId,
        },
      ])
    );
    setExcludedPermissions((prevValue) =>
      prevValue.filter(
        (pevPermission) =>
          Object.keys(pevPermission)[0] != Object.keys(permission)[0]
      )
    );
  };
  return (
    <div onClick={() => addPermission()}>
      <Permission
        key={permission.id}
        classname="addPermission"
        description={permission[Object.keys(permission)[0]].description}
        title={Object.keys(permission)[0]}
        add
      />
    </div>
  );
}
