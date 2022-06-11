import react, { useState } from 'react';

const HandleDrawer = react.createContext();

export function HandleDrawerProvider({children}) {
  const [open, setOpen] = useState(false);

  return (
    <HandleDrawer.Provider value={{open, setOpen}}>
      {children}
    </HandleDrawer.Provider>
  )
}

export default HandleDrawer;
