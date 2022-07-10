import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "../../GlobalContext";
import { useParams } from "react-router-dom";
import { client } from "../../Client";
import { useNavigate } from "react-router-dom";

export default function Edituser({ params }) {
  let { userId } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const editUserHandler = async (e) => {
    e.preventDefault();

    const username = e.target.username.value;
    const email = e.target.email.value;
    const first_name = e.target.first_name.value;
    const last_name = e.target.last_name.value;
    const status_2fa = e.target.Status_2FA.value;

    let { data } = await client.put("/user/edit", {
      id: userId,
      updateData: {
        username,
        email,
        first_name,
        last_name,
        username,
        status_2fa,
      },
    });

    if (data?.code === "P2002") {
      setError(
        `User with that ${data.meta.target[0]} already exists. Please input different ${data.meta.target[0]}`
      );
      return;
    }

    if (data.username && data.first_name && data.last_name) {
      navigate("/?page=0");
    }
  };

  const { selectedUser, setSelectedUser } = useContext(MyContext);
  useEffect(() => {
    const getUser = async () => {
      let { data } = await client.get(`/user/getOne?id=${userId}`);
      setSelectedUser(data);
    };

    if (!selectedUser) getUser();
  }, [selectedUser]);
  return (
    <form className="addUserForm" onSubmit={editUserHandler}>
      <div className="formInput">
        <div className="inputLabel">
          <label htmlFor="username">Username:</label>
        </div>
        <input
          defaultValue={selectedUser?.username}
          required
          type="text"
          id="username"
          name="user_name"
        />
      </div>
      <div className="formInput">
        <div className="inputLabel">
          <label htmlFor="email">Email:</label>
        </div>
        <input
          defaultValue={selectedUser?.email}
          required
          type="email"
          id="email"
          name="email"
        />
      </div>
      <div className="formInput">
        <div className="inputLabel">
          <label htmlFor="first_name">First name:</label>
        </div>
        <input
          defaultValue={selectedUser?.first_name}
          required
          type="text"
          id="first_name"
          name="first_name"
        />
      </div>
      <div className="formInput">
        <div className="inputLabel">
          <label htmlFor="last_name">Last name:</label>
        </div>
        <input
          defaultValue={selectedUser?.last_name}
          required
          type="text"
          id="last_name"
          name="last_name"
        />
      </div>
      <div className="formInput">
        <div className="inputLabel">
          <label htmlFor="Status_2FA">Status 2FA:</label>
        </div>
        <select
          defaultValue={selectedUser?.status_2fa}
          required
          className="dropdown"
          id="Status_2FA"
          name="Status_2FA"
        >
          <option disabled value>
            -- select an option --
          </option>
          <option value="Configured">Configured</option>
          <option value="Required">Required</option>
          <option value="Not configured">Not configured</option>
          <option value="Not allowed">Not allowed</option>
        </select>
      </div>
      {error && <div className="addUserErrorMessage">{error}</div>}
      <input className="formSubmit" type="submit" value="Submit" />
    </form>
  );
}
