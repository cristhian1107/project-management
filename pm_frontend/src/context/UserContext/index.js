import react, { useState } from 'react';

const UserContext = react.createContext();

export function UserContextProvider ({ children }) {
  const [jwt, setJWT] = useState(() => window.localStorage.getItem('token'));
  const [userInfo, setUserInfo] = useState(
    () => JSON.parse(window.localStorage.getItem('session'))
  );
  return (
    <UserContext.Provider value={{ jwt, setJWT, userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
