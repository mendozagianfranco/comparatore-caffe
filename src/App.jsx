import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DefaultLayout from './layouts/DefaultLayout';
import Homepage from './pages/Homepage';
import CoffeeDetailPage from './pages/CoffeeDetailPage';
import { FavouriteProvider } from './contexts/FavoriteContext';

function App() {
  return (
    <BrowserRouter>
      <FavouriteProvider>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path='/' element={<Homepage />} />
            <Route path='/coffees/:id' element={<CoffeeDetailPage />} />
          </Route>
        </Routes>
      </FavouriteProvider>
    </BrowserRouter>
  );
}

export default App;
