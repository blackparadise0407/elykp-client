import { Outlet } from 'react-router-dom';

import AppHeader from './AppHeader';

export default function AppLayout() {
  return (
    <div>
      <AppHeader />
      <main className="bg-gray-50 min-h-[calc(100vh-60px)]">
        <div className="container mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
