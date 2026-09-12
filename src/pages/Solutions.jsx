import React from 'react';
import SolutionsPage from '../components/SolutionsPage';

export default function Solutions({ onNavigate }) {
  return (
    <div>
        <SolutionsPage onNavigate={onNavigate} />
    </div>
  );
}