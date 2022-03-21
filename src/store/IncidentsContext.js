import { createContext, useState } from "react";

const IncidentsContext = createContext({
  incidents: [],
  setIncidents: incidents => {},
});

export const IncidentsContextProvider = props => {
  const [incidents, setIncidents] = useState([]);

  const setIncidentsHandler = incidents => {
    setIncidents(incidents);
  };

  const context = {
    incidents: incidents,
    setIncidents: setIncidentsHandler,
  };

  return (
    <IncidentsContext.Provider value={context}>
      {props.children}
    </IncidentsContext.Provider>
  );
};

export default IncidentsContext;
