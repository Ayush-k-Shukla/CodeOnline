import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Home/Home.jsx';
import EditorPage from './Components/Editor/EditorPage.jsx';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/editor/:id' exact element={<EditorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
