import React, { createContext, useState, useEffect } from 'react';

export const RoleContext = createContext({ role: 'buyer', setRole: () => {} });

export function RoleProvider({ children }) {
  const [role, setRole] = useState(() => {
    try {
      return localStorage.getItem('role') || 'buyer';
    } catch (e) {
      return 'buyer';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('role', role);
    } catch (e) {}
  }, [role]);

  return <RoleContext.Provider value={{ role, setRole }}>{children}</RoleContext.Provider>;
}
