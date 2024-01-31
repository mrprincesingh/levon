
import './App.css';
import MainRoute from './MainRoute/MainRoue';
import Footer from './component/Footer/Footer';
import Navbar from './component/Navbar/Navbar';
import Teacher from './component/teacher/Teacher';

function App() {
  return (
    <div className="App">
      <Navbar />
      <MainRoute />
   
      <Footer />
    </div>
  );
}

export default App;
