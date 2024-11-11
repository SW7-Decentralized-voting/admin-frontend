import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import ProtectedRoute from './utils/ProtectedRoute';
import LoginScreen from './screens/Login/LoginScreen';
import HomeScreen from './screens/Home/HomeScreen';
import ElectionScreen from './screens/Election/ElectionScreen';
import CandidateScreen from './screens/Candidate/CandidateScreen';
import PartyScreen from './screens/Party/PartyScreen';
import NominationDistrictScreen from './screens/NominationDistrict/NominationDistrictScreen';
import ConstituencyScreen from './screens/Constituency/ConstituencyScreen';
import PollingStationScreen from './screens/PollingStation/PollingStationScreen';
import { AuthProvider } from './utils/authContext';

/**
 * App component that renders the application
 * @returns {JSX.Element} App component
 */
function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/home" element={<ProtectedRoute> <HomeScreen /> </ProtectedRoute>}/>
        <Route path="/election" element={<ProtectedRoute> <ElectionScreen /> </ProtectedRoute>}/>
        <Route path="/candidate" element={<ProtectedRoute> <CandidateScreen /> </ProtectedRoute>}/>
        <Route path="/party" element={<ProtectedRoute> <PartyScreen /> </ProtectedRoute>}/>
        <Route path="/nomination-district" element={<ProtectedRoute> <NominationDistrictScreen /> </ProtectedRoute>}/>
        <Route path="/constituency" element={<ProtectedRoute> <ConstituencyScreen /> </ProtectedRoute>}/>
        <Route path="/polling-station" element={<ProtectedRoute> <PollingStationScreen /> </ProtectedRoute>}/>
      </Routes>
    </AuthProvider>
  );
}

export default App;
