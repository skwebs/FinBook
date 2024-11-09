import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './navigation/MainNavigator';
import AuthNavigator from './navigation/AuthNavigator';


function App(): React.JSX.Element {
  const [isAuthenticated, setIsAuthenticated] = useState<Boolean>(true)
  return (
    <NavigationContainer>
      {isAuthenticated ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}

export default App;
