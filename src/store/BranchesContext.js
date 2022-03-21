import { createContext, useState } from "react";

const BranchesContext = createContext({
  branches: [],
  setBranches: branches => {},
});

export const BranchesContextProvider = props => {
  const [branches, setBranches] = useState([]);

  const setBranchesHandler = branches => {
    setBranches(branches);
  };

  const context = {
    branches: branches,
    setBranches: setBranchesHandler,
  };

  return (
    <BranchesContext.Provider value={context}>
      {props.children}
    </BranchesContext.Provider>
  );
};

export default BranchesContext;
