// eslint-disable-next-line
import React, { Component } from 'react';

const Footer = (props) => {
  const yr = new Date().getFullYear();
  return (
    <footer>
      <div className="copyright">&copy; {yr} Ithaca College Library</div>
    </footer>
  );
};

export default Footer;
