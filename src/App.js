import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Authentication/Login";
import Home from "./pages/User/Home";
import IncidentEntry from "./pages/User/IncidentEntry/IncidentEntry";
import EditIncident from "./pages/User/EditIncident/Editincident";
import ApproveIncident from "./pages/User/ApproveIncident/ApproveIncident";
import UpdateIncident from "./pages/User/UpdateIncident/UpdateIncident";
import ViewIncident from "./pages/User/ViewIncident/ViewIncident";
import AddBranch from "./pages/User/AddBranch/AddBranch";
import AddIncident from "./pages/User/AddIncident/AddIncident";
import {IncidentsContextProvider} from "./store/IncidentsContext";
import { IncidentTypesContextProvider } from "./store/IncidentTypesContext";
import { BranchesContextProvider } from "./store/BranchesContext";
import ManageUsers from "./pages/User/Admin/ManageUsers";
import AddUser from "./pages/User/Admin/AddUser";
import EditUser from "./pages/User/Admin/EditUser";
import HomePage from "./pages/User/HomePage";

function App() {
  
  return (
    <IncidentsContextProvider>
    <IncidentTypesContextProvider>
    <BranchesContextProvider>
      <BrowserRouter>
        <Routes>
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/" element={<Login />} />
          <Route exact path="/incidents" element={<Home />} />
          <Route exact path="/approve-incident" element={<ApproveIncident />} />
          <Route exact path="/edit-incident/:incidentid" element={<EditIncident/>} />
          <Route exact path="/incident-entry" element={<IncidentEntry />} />
          <Route path="/update-incident/:incidentid" element={<UpdateIncident />} />
          <Route exact path="/manage-branch" element={<AddBranch />} />
          <Route exact path="/manage-incident" element={<AddIncident />} />
          <Route exact path="/view-incident/:incidentid" element={<ViewIncident />} />
          <Route exact path="/admin/users" element={<ManageUsers />} />
          <Route exact path="/admin/users/add/" element={<AddUser />} />
          <Route exact path="/admin/users/edit/:userid" element={<EditUser />} />
        </Routes>
      </BrowserRouter>
    </BranchesContextProvider>
    </IncidentTypesContextProvider>
    </IncidentsContextProvider>
  );
}

export default App;
