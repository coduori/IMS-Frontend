import {createContext, useState} from 'react';
// import {useCookies} from 'react-cookie';


const BranchesContext = createContext({
    branches: [],
    setBranches:(branches) => {},
});

export function BranchesContextProvider (props) {

    const [branches, setBranches] = useState([]);

    function setBranchesHandler (branches) {
        setBranches(branches);
    }

    const context = {
        branches: branches,
        setBranches: setBranchesHandler,
    }

    return (
        <BranchesContext.Provider value={context}>
            {props.children}
        </BranchesContext.Provider>
    );
}

export default BranchesContext;