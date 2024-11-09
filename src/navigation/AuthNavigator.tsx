import LoginScreen from '../screens/Auth/LoginScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { RootStackParamList } from '../App';

// Define the navigation types
export type AuthRootStackParamList = {
  Login: undefined;
  Register: undefined;
};

const AuthStack = createNativeStackNavigator<AuthRootStackParamList>();

const AuthNavigator = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen name="Login" component={LoginScreen} />
    <AuthStack.Screen name="Register" component={RegisterScreen} />
  </AuthStack.Navigator>
);

export default AuthNavigator
