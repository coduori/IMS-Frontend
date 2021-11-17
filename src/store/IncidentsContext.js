import {createContext, useState} from 'react';
// import {useCookies} from 'react-cookie';


const IncidentsContext = createContext({
    incidents: [],
    setIncidents:(incidents) => {},
});

export function IncidentsContextProvider (props) {

    const [incidents, setIncidents] = useState([]);

    function setIncidentsHandler (incidents) {
        setIncidents(incidents);
    }

    const context = {
        incidents: incidents,
        setIncidents: setIncidentsHandler,
    }

    return (
        <IncidentsContext.Provider value={context}>
            {props.children}
        </IncidentsContext.Provider>
    );
}

export default IncidentsContext;