import React, { useState, useContext } from "react";
import "./styles.css";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteModal from "./DeleteModal";
import EditIcon from "@mui/icons-material/Edit";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { useNavigate } from "react-router-dom"; // version 5.2.0
import { MyContext } from "../../GlobalContext";

export default function UserCard({ data }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate();
  const { setSelectedUser } = useContext(MyContext);

  const openModal = () => {
    document.querySelector("body").style.overflow = "hidden";
    setShowDeleteModal(true);
  };

  return (
    <div className="cardBox">
      <div className="cardField">
        <div>{new Date(data.created_at).toLocaleString().split(",")[0]}</div>
        <div>{new Date(data.created_at).toLocaleString().split(",")[1]}</div>
      </div>
      <div className="cardField">{data.email}</div>
      <div className="cardField">{data.first_name}</div>
      <div className="cardField">{data.last_name}</div>
      <div className="cardField">{data.username}</div>
      <div className="cardField">{data.status_2fa}</div>
      <div>
        <AssignmentIcon
          className="icon"
          onClick={() => {
            setSelectedUser(data);
            navigate(`/assign/${data.id}`);
          }}
        />
        <DeleteIcon className="deleteIcon icon" onClick={() => openModal()} />
        <EditIcon
          className="editIcon icon"
          onClick={() => {
            setSelectedUser(data);
            navigate(`/edit/${data.id}`);
          }}
        />
      </div>
      {showDeleteModal && (
        <div className="modalBackdrop">
          <DeleteModal
            setShowDeleteModal={setShowDeleteModal}
            id={data.id}
            username={data.username}
          />
        </div>
      )}
    </div>
  );
}
