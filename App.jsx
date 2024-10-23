import React from 'react'
import { ThemeProvider } from './src/theme/useTheme';
import Todo from './src/screens/Todo';
const App = () => {


    return (
        <ThemeProvider>
            <Todo />
        </ThemeProvider>
    )
}

export default App;

