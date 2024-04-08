import React from 'react';

export default function Alert({ message }: { message: string }) {
  return (
    <div className="p-2 border text-red-400 border-red-200 bg-red-50 rounded-lg flex items-center gap-2 select-none">
      <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-alert-circle" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
        <path d="M12 8v4" />
        <path d="M12 16h.01" />
      </svg>
      <p className="text-sm">{message}</p>
    </div>
  );
}
