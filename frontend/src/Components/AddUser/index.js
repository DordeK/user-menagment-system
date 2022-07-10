import React, { useState } from "react";
import "./style.css";
import { client } from "../../Client";
import { useNavigate } from "react-router-dom";

export default function AddUser() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const addUser = async (e) => {
    e.preventDefault();

    const username = e.target.username.value;
    const email = e.target.email.value;
    const first_name = e.target.first_name.value;
    const last_name = e.target.last_name.value;
    const password = e.target.password.value;
    const status_2fa = e.target.Status_2FA.value;

    let response = await client.post("/user/add", {
      username,
      email,
      first_name,
      last_name,
      username,
      password,
      status_2fa,
    });
    if (response.data?.code === "P2002") {
      setError(
        `User with that ${response.data.meta.target[0]} already exists. Please input different ${response.data.meta.target[0]}`
      );
      return;
    }

    const responseData = response.data;

    if (
      responseData.username &&
      responseData.first_name &&
      responseData.last_name &&
      responseData.password
    ) {
      navigate("/?page=0");
    }
  };

  return (
    <form className="addUserForm" onSubmit={addUser}>
      <div className="formInput">
        <div className="inputLabel">
          <label htmlFor="username">Username:</label>
        </div>
        <input required type="text" id="username" name="user_name" />
      </div>
      <div className="formInput">
        <div className="inputLabel">
          <label htmlFor="email">Email:</label>
        </div>
        <input required type="email" id="email" name="email" />
      </div>
      <div className="formInput">
        <div className="inputLabel">
          <label htmlFor="first_name">First name:</label>
        </div>
        <input required type="text" id="first_name" name="first_name" />
      </div>
      <div className="formInput">
        <div className="inputLabel">
          <label htmlFor="last_name">Last name:</label>
        </div>
        <input required type="text" id="last_name" name="last_name" />
      </div>
      <div className="formInput">
        <div className="inputLabel">
          <label htmlFor="password">Password:</label>
        </div>
        <input required type="password" id="password" name="password" />
      </div>
      <div className="formInput">
        <div className="inputLabel">
          <label htmlFor="Status_2FA">Status 2FA:</label>
        </div>
        <select className="dropdown" required id="Status_2FA" name="Status_2FA">
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
      <div>
        <input className="formSubmit" type="submit" value="Submit" />
      </div>
    </form>
  );
}
