import { createContext, useState } from "react";

const IncidentTypesContext = createContext({
  incident_types: [],
  setIncidentTypes: incidentTypes => {},
});

export const IncidentTypesContextProvider = props => {
  const [incidentTypes, setIncidentTypes] = useState([]);

  const setIncidentTypesHandler = incidentTypes => {
    setIncidentTypes(incidentTypes);
  };

  const context = {
    incident_types: incidentTypes,
    setIncidentTypes: setIncidentTypesHandler,
  };

  return (
    <IncidentTypesContext.Provider value={context}>
      {props.children}
    </IncidentTypesContext.Provider>
  );
};

export default IncidentTypesContext;
