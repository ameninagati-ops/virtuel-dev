import React from 'react';

const ContentHeader = ({ title, pageTitle }) => {
  const initials = title ? title.charAt(0).toUpperCase() : 'AD';
  return (
    <div className="content-header">
      <h2>{pageTitle}</h2>
      <div className="user-info">
        <span>{title}</span>
        <div className="user-avatar">{initials}</div>
      </div>
    </div>
  );
};

export default ContentHeader;