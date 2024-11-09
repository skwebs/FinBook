import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native'
import AddCustomerScreen from '../screens/customer/AddCustomerScreen';
import CustomerListScreen from '../screens/customer/CustomerListScreen';
import EditCustomerScreen from '../screens/customer/EditCustomerScreen';
import AddTransactionScreen from '../screens/transaction/AddTransactionScreen';
import EditTransactionScreen from '../screens/transaction/EditTransactionScreen';
import TransactionListScreen from '../screens/transaction/TransactionListScreen';
// import { RootStackParamList } from '../App';


// Define the navigation types
export type MainRootStackParamList = {
  AddCustomer: undefined;
  EditCustomer: undefined;
  CustomerList: undefined;
  AddTransaction: undefined;
  EditTransaction: undefined;
  TransactionList: undefined;
};

const MainStack = createNativeStackNavigator<MainRootStackParamList>();

const MainNavigator = () => {
  return (
    <MainStack.Navigator initialRouteName='CustomerList'>

      <MainStack.Screen name="CustomerList" component={CustomerListScreen} options={{ title: 'Customer Lists' }} />
      <MainStack.Screen name="AddCustomer" component={AddCustomerScreen} options={{ title: 'Add Customer' }} />
      <MainStack.Screen name="EditCustomer" component={EditCustomerScreen} options={{ title: 'Edit Customer' }} />

      <MainStack.Screen name="TransactionList" component={TransactionListScreen} options={{ title: 'Transaction List' }} />
      <MainStack.Screen name="AddTransaction" component={AddTransactionScreen} options={{ title: 'Add Transaction' }} />
      <MainStack.Screen name="EditTransaction" component={EditTransactionScreen} options={{ title: 'Edit Transaction' }} />

    </MainStack.Navigator>
  )
}
export default MainNavigator
const styles = StyleSheet.create({})