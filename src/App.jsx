import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DefaultLayout from './layouts/DefaultLayout';
import Homepage from './pages/Homepage';
import CoffeeDetailPage from './pages/CoffeeDetailPage';
import { FavouriteProvider } from './contexts/FavouriteContext';
import { GlobalContextProvider } from './contexts/GlobalContext';

function App() {
  return (
    <BrowserRouter>
      <GlobalContextProvider>
        <FavouriteProvider>
          <Routes>
            <Route element={<DefaultLayout />}>
              <Route path='/' element={<Homepage />} />
              <Route path='/coffees/:id' element={<CoffeeDetailPage />} />
            </Route>
          </Routes>
        </FavouriteProvider>
      </GlobalContextProvider>
    </BrowserRouter>
  );
}

export default App;
