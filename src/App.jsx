import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DefaultLayout from './layouts/DefaultLayout';
import Homepage from './pages/Homepage';
import CoffeeDetailPage from './pages/CoffeeDetailPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path='/' element={<Homepage />} />
          <Route path='/coffees/:id' element={<CoffeeDetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
