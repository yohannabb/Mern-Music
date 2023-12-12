// import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MusicList from './components/MusicList';
import Create from './components/Create';
import Update from './components/Update';
import Statistics from './components/Statistics';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MusicList />}></Route>
          <Route path='/Create' element={<Create />}></Route>
          <Route path='/Update/:id' element={<Update />}></Route>
          <Route path='/Satatstics' element={<Statistics />}></Route>

        </Routes>

      </BrowserRouter>

    </div>
  );
}

export default App;
