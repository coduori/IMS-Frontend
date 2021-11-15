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
