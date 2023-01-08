import React from 'react';

import { useAuthQuery } from '@/queries/queries';
import { OIDC_SKEY } from '@/shared/constants/constants';
import { User } from '@/shared/interfaces';

interface IAuthContext {
  user: User | null;
  isAuth: boolean;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = React.createContext<IAuthContext>({
  user: null,
  isAuth: !!getRefreshToken(),
});

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = React.useState<IAuthContext['user']>(null);
  const authUserQuery = useAuthQuery();

  React.useEffect(() => {
    if (authUserQuery.data) setUser(authUserQuery.data);
  }, [authUserQuery.data]);

  return (
    <AuthContext.Provider value={{ user, isAuth: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function getAccessToken(): string | undefined {
  const storageItem = window.sessionStorage.getItem(OIDC_SKEY);
  const storedConfig = storageItem ? JSON.parse(storageItem) : undefined;
  return storedConfig?.id_token;
}

export function getRefreshToken(): string | undefined {
  const storageItem = window.sessionStorage.getItem(OIDC_SKEY);
  const storedConfig = storageItem ? JSON.parse(storageItem) : undefined;
  return storedConfig?.refresh_token;
}

export const useAuth = () => React.useContext(AuthContext);
