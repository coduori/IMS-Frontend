import Login from "./components/Authentication/Login";
import Home from "./components/User/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import IncidentEntry from "./components/User/IncidentEntry/IncidentEntry";
import EditIncident from "./components/User/EditIncident/Editincident";
import ApproveIncident from "./components/User/ApproveIncident/ApproveIncident";
import UpdateIncident from "./components/User/UpdateIncident/UpdateIncident";
import ViewIncident from "./components/User/ViewIncident/ViewIncident";
import AddBranch from "./components/User/AddBranch/AddBranch";
import AddIncident from "./components/User/AddIncident/AddIncident";
function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/" element={<Login />} />
        <Route exact path="/approve-incident" element={<ApproveIncident />} />
        <Route exact path="/edit-incident" element={<EditIncident/>} />
        <Route exact path="/incident-entry" element={<IncidentEntry />} />
        <Route exact path="/update-incident" element={<UpdateIncident />} />
        <Route exact path="/add-branch" element={<AddBranch />} />
        <Route exact path="/add-incident" element={<AddIncident />} />
        <Route exact path="/view-incident" element={<ViewIncident />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
