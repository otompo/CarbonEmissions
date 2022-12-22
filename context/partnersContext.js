import { useState, createContext } from "react";

const PartnersContext = createContext();

const PartnersProvider = ({ children }) => {
  const [partner, setPartner] = useState({
    partners: [],
  });
  // console.log("partners", partners);
  return (
    <PartnersContext.Provider value={[partner, setPartner]}>
      {children}
    </PartnersContext.Provider>
  );
};

export { PartnersContext, PartnersProvider };
