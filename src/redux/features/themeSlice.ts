import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Theme = 'light' | 'dark';

// Retrieve the initial theme from localStorage or default to system preference
const getSystemTheme = (): Theme => {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
};

// store the current theme
const storedTheme = localStorage.getItem('theme') as Theme;
const initialTheme = storedTheme || getSystemTheme();

// Apply initial theme to document
document.documentElement.setAttribute('data-theme', initialTheme);
document.documentElement.classList.remove('light', 'dark');
document.documentElement.classList.add(initialTheme);

interface ThemeState {
  currentTheme: Theme;
}

const initialState: ThemeState = {
  currentTheme: initialTheme,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.currentTheme = state.currentTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', state.currentTheme);
      document.documentElement.setAttribute('data-theme', state.currentTheme);
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(state.currentTheme);
    },
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.currentTheme = action.payload;
      localStorage.setItem('theme', state.currentTheme);
      document.documentElement.setAttribute('data-theme', state.currentTheme);
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(state.currentTheme);
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
