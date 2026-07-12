import React from 'react';
import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
    return (
        <div className="layout-container auth-layout" style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, var(--bg-app) 0%, var(--primary-light) 100%)',
            padding: '2rem'
        }}>
            <div style={{
                width: '100%',
                maxWidth: '440px',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-lg)',
                padding: '2.5rem',
                boxShadow: 'var(--shadow-lg)'
            }}>
                <Outlet />
            </div>
        </div>
    );
}
