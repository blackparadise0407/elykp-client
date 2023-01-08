import { Route, Routes } from 'react-router-dom';

import AppLayout from './layouts/app/AppLayout';

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="" element={<div>App</div>} />
      </Route>
    </Routes>
  );
}
