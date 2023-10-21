
import './App.css';
import Navbar from './Component/Navbar';
import { routes } from './routes';
import { useRoutes } from 'react-router-dom';
function App() {
  const element=useRoutes(routes)
  return (
    <div className="App">
      <Navbar/>
      {element}
      
    </div>
  );
}

export default App;
