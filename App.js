import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Landing } from './Screens/Landing';
import Signup1 from './Screens/Signup1';
import Signup2 from './Screens/Signup2';
import Signin from './Screens/Signin';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Screens/Home';
import Jobs from './Screens/Jobs';
import Add from './Screens/Add';
import Wallet from './Screens/Wallet';
import More from './Screens/More';
import Icon from 'react-native-vector-icons/FontAwesome5';
import CreatePost from './Screens/CreatePost';
import Post from './Screens/Post';
import CreateJob from './Screens/CreateJob';
import Job from './Screens/Job';
import Map from './Screens/Map';
import Pay from './Screens/Pay'
import SplashScreen from 'react-native-splash-screen';
import About from './Screens/About';
import PrivacyPolicy from './Screens/PrivacyPolicy';
import TermsCon from './Screens/TermsCon';
import ChangePassword from './Screens/ChangePassword';
import ForgotPassword from './Screens/ForgotPassword';
import NewPassword from './Screens/NewPassword';
import MyJobs from './Screens/MyJobs';
import MyPosts from './Screens/MyPosts';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} options={{
        headerShown: false, tabBarIcon: () => <Icon name="home" size={24} color="orange" />, headerTitleAlign: "center", title: 'JONOKS',
        headerStyle: {
          backgroundColor: 'orange',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }} />
      <Tab.Screen name="Jobs" component={Jobs} options={{ headerShown: false, tabBarIcon: () => <Icon name="user-md" size={24} color="orange" /> }} />
      <Tab.Screen name="Add" component={Add} options={{ headerShown: false, tabBarIcon: () => <Icon name="plus-circle" size={28} color="orange" />, title: "" }} />
      <Tab.Screen name="Wallet" component={Wallet} options={{ headerShown: false, tabBarIcon: () => <Icon name="wallet" size={24} color="orange" /> }} />
      <Tab.Screen name="More" component={More} options={{ headerShown: false, tabBarIcon: () => <Icon name="info-circle" size={24} color="orange" />, title: "Info" }} />
    </Tab.Navigator>
  );
}
function App() {
  React.useEffect(() => {
    SplashScreen.hide()
  }, [])
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Land">
        <Stack.Screen name="Land" component={Landing} options={{ headerShown: false }} />
        <Stack.Screen name="Signup1" component={Signup1} options={{ headerTitle: "BACK", headerTintColor: 'orange' }} />
        <Stack.Screen name="Signup2" component={Signup2} options={{ headerTitle: "BACK", headerTintColor: 'orange' }} />
        <Stack.Screen name="Signin" component={Signin} options={{ headerTitle: "BACK", headerTintColor: 'orange' }} />
        <Stack.Screen name="Tabs" component={MyTabs} options={{ headerShown: false }} />
        <Stack.Screen name="Post" component={Post} options={{ headerTitle: "BACK", headerTintColor: 'orange' }} />
        <Stack.Screen name="CreatePost" component={CreatePost} options={{ headerTitle: "BACK", headerTintColor: 'orange' }} />
        <Stack.Screen name="CreateJob" component={CreateJob} options={{ headerTitle: "BACK", headerTintColor: 'orange' }} />
        <Stack.Screen name="Job" component={Job} options={{ headerTitle: "BACK", headerTintColor: 'orange' }} />
        <Stack.Screen name="Map" component={Map} options={{ headerTitle: "Nearest Jobs", headerTintColor: 'orange' }} />
        <Stack.Screen name="Pay" component={Pay} options={{ headerTitle: "BACK", headerTintColor: 'orange' }} />
        <Stack.Screen name="About" component={About} options={{ headerTitle: "BACK", headerTintColor: 'orange' }} />
        <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} options={{ headerTitle: "BACK", headerTintColor: 'orange' }} />
        <Stack.Screen name="TermsCon" component={TermsCon} options={{ headerTitle: "BACK", headerTintColor: 'orange' }} />
        <Stack.Screen name="Changepass" component={ChangePassword} options={{ headerTitle: "BACK", headerTintColor: 'orange' }} />
        <Stack.Screen name="Forgotpass" component={ForgotPassword} options={{ headerTitle: "BACK", headerTintColor: 'orange' }} />
        <Stack.Screen name="NewPassword" component={NewPassword} options={{ headerTitle: "BACK", headerTintColor: 'orange' }} />
        <Stack.Screen name="MyJobs" component={MyJobs} options={{ headerTitle: "BACK", headerTintColor: 'orange' }} />
        <Stack.Screen name="MyPosts" component={MyPosts} options={{ headerTitle: "BACK", headerTintColor: 'orange' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;