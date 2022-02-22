import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Default from './Templates';
import Home from './Pages/Home';
import Conteiner from './Pages/Conteiner';
import Movimentacoes from './Pages/Movimentacoes';
import Relatorios from './Pages/Relatorios';

function App() {
  return (
    <BrowserRouter>
      <Default>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/conteiners' element={<Conteiner/>}/>
          <Route path='/movimentacoes' element={<Movimentacoes/>}/>
          <Route path='/relatorios' element={<Relatorios/>}/>
        </Routes>
      </Default>
    </BrowserRouter>
  );
}

export default App;
