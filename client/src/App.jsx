import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import router from './routes';

const renderRoute = route => (
  <Route key={route.path} path={route.path} element={route.element}>
    {route.children && route.children.map(renderRoute)}
  </Route>
);

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>{router.map(renderRoute)}</Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
