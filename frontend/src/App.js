import { useState } from "react";
import { MyContext } from "./GlobalContext";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import AssignPermissions from "./Components/AssignPermissions";
import Users from "./Components/Users";
import User from "./Components/User";
import EditUser from "./Components/EditUser";
import AddUser from "./Components/AddUser";
import Layout from "./Components/Layout";

function App() {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <MyContext.Provider value={{ setSelectedUser, selectedUser }}>
      <Layout>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Users />} />
            <Route path="/:userId" element={<User />} />
            <Route path="/add" element={<AddUser />} />
            <Route path="/edit/:userId" element={<EditUser />} />
            <Route path="/assign/:userId" element={<AssignPermissions />} />
          </Routes>
        </BrowserRouter>
      </Layout>
    </MyContext.Provider>
  );
}

export default App;
