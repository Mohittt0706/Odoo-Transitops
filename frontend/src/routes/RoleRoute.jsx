import React from 'react';
import { Navigate } from 'react-router-dom';

export default function RoleRoute({ children }) {
    // Mock check - bypass authentications for demonstration
    return <>{children}</>;
}
