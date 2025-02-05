import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import UsersView from '../views/UsersView/UsersView';
import UserView from '../views/UserView/UserView';
import UserGuard from './guards/UserGuard/UserGuard';

const UsersRouter: React.FC = () => (
  <Routes>
    <Route path="/" element={<UsersView />} />
    <Route path="new" element={<UserView />} />
    <Route
      path=":id"
      element={
        // Example that needs a resolver
        <UserGuard>{(user) => <UserView user={user} />}</UserGuard>
      }
    />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default UsersRouter;
