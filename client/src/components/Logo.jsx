import React from 'react';

/*
  Ushirika Marketplace logo.
  Two rounded leaf-like curves interlocking to form a loop —
  representing two parties coming together in cooperation (ushirika).
  Drawn as plain SVG so it stays crisp at any size (header, favicon, etc).
*/
export default function Logo({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M24 6C14 6 7 14 7 24C7 30 11 35 16 37C14 32 15 26 19 22C22 19 26 18 30 19C27 12 25 8 24 6Z"
        fill="#C96E4E"
      />
      <path
        d="M24 42C34 42 41 34 41 24C41 18 37 13 32 11C34 16 33 22 29 26C26 29 22 30 18 29C21 36 23 40 24 42Z"
        fill="#2F4B3C"
      />
    </svg>
  );
}
