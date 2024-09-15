import { Routes, Route, Navigate } from 'react-router-dom';
import { LoanPage, LoanEditPage } from '@/pages';

export const AppRoutes = () => {
  // TODO: implement NotFound page
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/loans" replace />} />
      <Route path="/loans" element={<LoanPage />} />
      <Route path="/loan/edit/:id" element={<LoanEditPage />} />
    </Routes>
  );
};
