import { useEffect } from 'react';
import MainLayout from './layout/MainLayout';
import { useAppDispatch } from './redux/hooks';
import { setTheme } from './redux/features/themeSlice';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') as 'light' | 'dark';
    if (storedTheme) {
      dispatch(setTheme(storedTheme));
    }
  }, [dispatch]);
  return (
    <>
      {/* <ProtectedRoute> */}
      <MainLayout />
      {/* </ProtectedRoute> */}
    </>
  );
}

export default App;
