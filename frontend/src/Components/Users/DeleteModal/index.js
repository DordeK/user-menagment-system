import React, { useState } from "react";
import { client } from "../../../Client";

export default function DeleteModal({ id, username, setShowDeleteModal }) {
  const deleteUser = (deleteUserBool) => {
    if (deleteUserBool) client.delete(`/user/delete?id=${id}`);

    window.location.reload(false);
    setShowDeleteModal(false);
    document.querySelector("body").style.overflow = "scroll";
  };
  return (
    <div className="deleteModalBox">
      <h2>Are you sure you want to delete user {username}?</h2>
      <div className="deleteModalButtons">
        <button
          onClick={() => deleteUser(true)}
          type="button"
          style={{ background: "green" }}
          className="deleteModalButton"
        >
          YES
        </button>
        <button
          onClick={() => deleteUser(false)}
          type="button"
          style={{ background: "red" }}
          className="deleteModalButton"
        >
          No
        </button>
      </div>
    </div>
  );
}
