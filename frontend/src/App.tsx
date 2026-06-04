import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './index.css';
import FspApp from './fsp-app/App';
import KanbanApp from './kanban-app/App';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <nav style={{ background: '#333', color: 'white', padding: '10px' }}>
          <div style={{ display: 'flex', gap: '20px' }}>
            <Link to="/" style={{ color: 'white' }}>Home</Link>
            <Link to="/fsp" style={{ color: 'white' }}>FSP App</Link>
            <Link to="/kanban" style={{ color: 'white' }}>Kanban App</Link>
          </div>
        </nav>
        
        <div style={{ padding: '20px' }}>
          <Routes>
            <Route path="/" element={<h1>Welcome to Merged Project</h1>} />
            <Route path="/fsp/*" element={<FspApp />} />
            <Route path="/kanban/*" element={<KanbanApp />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;