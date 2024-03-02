import React from 'react';

export const Loader: React.FC = () => {
    return (
        <div className="pb-6">
            <span
                className="spinner-border border-lg align-middle ms-2 text-primary"
                role="status"
            >
                <span className="visually-hidden">Loading...</span>
            </span>
        </div>
    );
};
