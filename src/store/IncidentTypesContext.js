import {createContext, useState} from 'react';
// import {useCookies} from 'react-cookie';


const IncidentTypesContext = createContext({
    incident_types: [],
    setIncidentTypes:(incidentTypes) => {},
});

export function IncidentTypesContextProvider (props) {

    const [incidentTypes, setIncidentTypes] = useState([]);

    function setIncidentTypesHandler (incidentTypes) {
        setIncidentTypes(incidentTypes);
    }

    const context = {
        incident_types: incidentTypes,
        setIncidentTypes: setIncidentTypesHandler,
    }

    return (
        <IncidentTypesContext.Provider value={context}>
            {props.children}
        </IncidentTypesContext.Provider>
    );
}

export default IncidentTypesContext;