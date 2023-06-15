import React from 'react';
import './FoldableMenu.scss';

const FoldableMenu = ({ isOpen, children }) => {
  const menuClass = isOpen ? 'foldable-menu open' : 'foldable-menu';
  
  return (
    <div className={menuClass} id="foldableMenu">
      {children}
    </div>
  );
};

export default FoldableMenu;
