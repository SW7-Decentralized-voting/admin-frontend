import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import ProtectedRoute from './utils/ProtectedRoute';
import LoginScreen from './screens/Login/LoginScreen';
import HomeScreen from './screens/Home/HomeScreen';
import ElectionScreen from './screens/Election/ElectionScreen';
import CandidatesScreen from './screens/Candidates/CandidatesScreen';
import PartyScreen from './screens/Party/PartyScreen';
import { AuthProvider } from './utils/authContext';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/home" element={<ProtectedRoute> <HomeScreen /> </ProtectedRoute>}/>
        <Route path="/election" element={<ProtectedRoute> <ElectionScreen /> </ProtectedRoute>}/>
        <Route path="/candidates" element={<ProtectedRoute> <CandidatesScreen /> </ProtectedRoute>}/>
        <Route path="/party" element={<ProtectedRoute> <PartyScreen /> </ProtectedRoute>}/>
      </Routes>
    </AuthProvider>
  );
}

export default App;
