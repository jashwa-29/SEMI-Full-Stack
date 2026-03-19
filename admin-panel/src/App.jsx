import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CreateAdmin from './pages/CreateAdmin';
import Memberships from './pages/Memberships';
import LiveChat from './pages/LiveChat';
import ChatHistory from './pages/ChatHistory';
import ChatSettings from './pages/ChatSettings';
import EmailTemplates from './pages/EmailTemplates';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<AdminLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard"    element={<Dashboard />} />
          <Route path="create-admin" element={<CreateAdmin />} />
          <Route path="memberships"  element={<Memberships />} />
          <Route path="email-templates" element={<EmailTemplates />} />
          <Route path="live-chat"    element={<LiveChat />} />
          <Route path="chat-history" element={<ChatHistory />} />
          <Route path="chat-settings" element={<ChatSettings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
