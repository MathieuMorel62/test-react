import React from 'react';

function BodySection({ title, children }) {
  return (
    <div className="bodySection p-5">
      <h2 className="mb-2 text-2xl font-medium">{title}</h2>
      {children}
    </div>
  );
}

export default BodySection;
