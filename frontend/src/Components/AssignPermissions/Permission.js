import React, { useState } from "react";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import "./style.css";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";

export default function Permission({
  description,
  title,
  classname,
  remove = false,
  setPermissions = null,
  add = false,
}) {
  const [showDescription, setShowDescription] = useState(false);

  const removePermission = () => {
    setPermissions((prevPermission) => {
      return prevPermission.filter((premission) => premission.code !== title);
    });
  };

  return (
    <div className={classname ? classname : "permission"}>
      <div>{title}</div>
      <div className="infoIconModal">
        <HelpOutlineIcon
          onMouseEnter={() => setShowDescription(true)}
          onMouseLeave={() => setShowDescription(false)}
        />
        {showDescription && (
          <div className="permissionInfoModal">{description}</div>
        )}
        {remove && <RemoveCircleIcon onClick={() => removePermission()} />}
        {add && <AddCircleIcon />}
      </div>
    </div>
  );
}
