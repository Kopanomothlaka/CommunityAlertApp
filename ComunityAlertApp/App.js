import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Animated, Image, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialCommunityIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: true }}>
        <Stack.Screen
         name="Home" 
         component={HomeScreen}
          options={{ headerShown: false } }/>

        <Stack.Screen name="Alert" component={AlertScreen} />
        <Stack.Screen name="Meetings" component={MeetingsScreen} />
        <Stack.Screen name="Jobs" component={JobsScreen} />
        <Stack.Screen name="Report" component={ReportScreen} />
        <Stack.Screen name="Help" component={HelpScreen} />
        <Stack.Screen name="Contact" component={ContactScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Home Screen
function HomeScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const fadeAnim = useState(new Animated.Value(1))[0];

  useEffect(() => {
    setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => {
        setIsLoading(false);
      });
    }, 2000);
  }, []);

  if (isLoading) {
    return (
      <Animated.View style={[styles.splashContainer, { opacity: fadeAnim }]}>
        <Image source={require('./assets/icon.png')} style={styles.splashImage} resizeMode="contain" />
        <Text style={styles.splashText}>Community Alert</Text>
        <StatusBar style="light" />
      </Animated.View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.bannerContainer}>
          <Image source={require('./assets/town.png')} style={styles.bannerImage} />
          <View style={styles.bannerOverlay}>
            <Text style={styles.bannerText}>Community Alert</Text>
          </View>
        </View>

        <View style={styles.menuGrid}>
          <View style={styles.menuRow}>
            <MenuItem icon={<Ionicons name="alert-circle-outline" size={40} color="#2246E6" />} label="Alert" onPress={() => navigation.navigate('Alert')} />
            <MenuItem icon={<MaterialCommunityIcons name="presentation" size={40} color="#2246E6" />} label="Meetings" onPress={() => navigation.navigate('Meetings')} />
          </View>
          <View style={styles.menuRow}>
            <MenuItem icon={<FontAwesome5 name="hammer" size={35} color="#2246E6" />} label="Jobs" onPress={() => navigation.navigate('Jobs')} />
            <MenuItem icon={<MaterialCommunityIcons name="briefcase-outline" size={40} color="#2246E6" />} label="Report" onPress={() => navigation.navigate('Report')} />
          </View>
          <View style={styles.menuRow}>
            <MenuItem icon={<FontAwesome5 name="question-circle" size={35} color="#2246E6" />} label="Help" onPress={() => navigation.navigate('Help')} />
            <MenuItem icon={<MaterialCommunityIcons name="phone" size={40} color="#2246E6" />} label="Contact" onPress={() => navigation.navigate('Contact')} />
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Managed by</Text>
          <Text style={styles.footerCompany}>KayTech</Text>
        </View>
        <StatusBar style="dark" />
      </ScrollView>
    </SafeAreaView>
  );
}

// Reusable MenuItem component
const MenuItem = ({ icon, label, onPress }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    {icon}
    <Text style={styles.menuText}>{label}</Text>
  </TouchableOpacity>
);

// Placeholder Screens
const AlertScreen = ({ navigation }) => (
  <SafeAreaView style={styles.alertContainer}>
    {/* Sticky Search Bar */}
    <View style={styles.stickySearchContainer}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
        <Text style={styles.searchPlaceholder}>search here</Text>
      </View>
    </View>

    {/* Scrollable Content */}
    <ScrollView 
      contentContainerStyle={styles.scrollContent}
      stickyHeaderIndices={[0]} // Optional for iOS
    >
      {/* Alert List */}
      <Text style={styles.alertListTitle}></Text>
      
      {[1, 2, 3,4,5,6].map((item, index) => (
        <View key={index} style={styles.alertItem}>
          <Text style={styles.alertType}>Water</Text>
          <Text style={styles.alertStatus}>active</Text>
          <Text style={styles.alertLocation}>Baster, Nkgoru</Text>
          <Text style={styles.alertDates}>12/03/2025 - 13/03/2025</Text>
        </View>
      ))}

      {/* Footer */}
      <View style={styles.alertFooter}>
        <Text style={styles.footerText}>Managed by</Text>
        <Text style={styles.footerCompany}>KayTech</Text>
      </View>
    </ScrollView>
  </SafeAreaView>
);


const MeetingsScreen = () => <GenericScreen title="Meetings Screen" />;
const JobsScreen = () => <GenericScreen title="Jobs Screen" />;
const ReportScreen = () => <GenericScreen title="Report Screen" />;
const HelpScreen = () => <GenericScreen title="Help Screen" />;
const ContactScreen = () => <GenericScreen title="Contact Screen" />;

const GenericScreen = ({ title }) => (
  <View style={styles.placeholderScreen}>
    <Text style={styles.placeholderText}>{title}</Text>
  </View>
);

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f9fc',
  },
  scrollContent: {
    paddingBottom: 30,
  },
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffff',
  },
  splashImage: {
    width: 90,
    height: 90,
  },
  splashText: {
    marginTop: 15,
    fontSize: 19,
    fontWeight: 'bold',
    color: '#1F41BB',
  },
  bannerContainer: {
    position: 'relative',
    width: '100%',
    height: 200,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopLeftRadius:20,
    borderTopRightRadius:20,
    padding:10

  },
  bannerOverlay: {
    position: 'absolute',
    bottom: 15,
    left: 20,
  },
  bannerText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0,0,0,0.4)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  menuGrid: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  menuRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  menuItem: {
    width: '48%',
    height: 110,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  menuText: {
    marginTop: 10,
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  footer: {
    marginTop: 130,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#888',
  },
  footerCompany: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2246E6',
  },
  placeholderScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  placeholderText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2246E6',
    textAlign: 'center',
  },
  alertContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    padding:15,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding:50,
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 15,
    margin : 15,
    marginVertical: 20,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchPlaceholder: {
    color: '#888',
    fontSize: 16,
    
  },
  alertListTitle: {
    fontSize: 1,
    fontWeight: 'bold',
    color: '#333',
    

  },
  alertItem: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingVertical: 24,  // Top-bottom padding
    paddingHorizontal: 18, // Left-right padding
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
    margin : 15,

  },
  alertType: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2246E6',
    marginBottom: 5,
  },
  alertStatus: {
    fontSize: 14,
    color: '#4CAF50',
    marginBottom: 8,
    fontWeight: '500',
  },
  alertLocation: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  alertDates: {
    fontSize: 14,
    color: '#666',
  },
  alertFooter: {
    marginTop: 120,
    alignItems: 'center',
    paddingBottom: 20,
  },
  
  
});
