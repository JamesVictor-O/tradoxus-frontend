import React from 'react';

const Button = ({ children, onClick, href }) => {
    return (
        <a
            href={href}
            onClick={onClick}
            style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#ff4757',
                color: '#fff',
                borderRadius: '4px',
                textDecoration: 'none',
                display: 'inline-block',
            }}
        >
            {children}
        </a>
    );
};

export default Button; 