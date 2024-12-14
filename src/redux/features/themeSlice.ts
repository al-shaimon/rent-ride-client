import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Theme = 'light' | 'dark';

// Retrieve the initial theme from localStorage or default to 'light'
const getSystemTheme = (): Theme => {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
};

const storedTheme = (localStorage.getItem('theme') as Theme) || getSystemTheme();

interface ThemeState {
  currentTheme: Theme;
}

const initialState: ThemeState = {
  currentTheme: storedTheme,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.currentTheme = state.currentTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', state.currentTheme);
      document.documentElement.setAttribute('data-theme', state.currentTheme);
    },
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.currentTheme = action.payload;
      localStorage.setItem('theme', state.currentTheme);
      document.documentElement.setAttribute('data-theme', state.currentTheme);
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
