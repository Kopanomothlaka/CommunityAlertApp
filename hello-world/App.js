import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Animated, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MaterialCommunityIcons, Ionicons, FontAwesome5, MaterialIcons } from '@expo/vector-icons';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const fadeAnim = useState(new Animated.Value(1))[0];

  useEffect(() => {
    // Simulating some loading time
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

 // Splash Screen
if (isLoading) {
  return (
    <Animated.View style={[styles.splashContainer, { opacity: fadeAnim }]}>
      <View style={styles.logoContainer}>
        {/* Existing icon */}
        
        {/* Add your image (make sure to import Image from 'react-native') */}
        <Image 
          source={require('./assets/icon.png')} // or {uri: 'https://...'} for remote images
          style={styles.splashImage}
          resizeMode="contain"
        />
        
        {/* Add text */}
        <Text style={styles.splashText}>Community Alert</Text>
      </View>
      <StatusBar style="auto" />
    </Animated.View>
  );
}

  // Main App Screen
  return (
    <SafeAreaView style={styles.container}>
      
      
      <View style={styles.bannerContainer}>
        <Image 
          source={require('./assets/town.png')} 
          style={styles.bannerImage}
        />
        <View style={styles.bannerTextContainer}>
          <Text style={styles.bannerText}>Community Alert</Text>
        </View>
      </View>
      
      <View style={styles.menuGrid}>
        <View style={styles.menuRow}>
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="alert-circle-outline" size={40} color="#2246E6" />
            <Text style={styles.menuText}>Alert</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <MaterialCommunityIcons name="presentation" size={40} color="#2246E6" />
            <Text style={styles.menuText}>Meetings</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.menuRow}>
          <TouchableOpacity style={styles.menuItem}>
            <FontAwesome5 name="hammer" size={35} color="#2246E6" />
            <Text style={styles.menuText}>Jobs</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <MaterialCommunityIcons name="briefcase-outline" size={40} color="#2246E6" />
            <Text style={styles.menuText}>Report</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.menuRow}>
          <TouchableOpacity style={styles.menuItem}>
            <FontAwesome5 name="alert" size={35} color="#2246E6" />
            <Text style={styles.menuText}>Help</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <MaterialCommunityIcons name="phone" size={40} color="#2246E6" />
            <Text style={styles.menuText}>Contact</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>Managed by</Text>
        <Text style={styles.footerCompany}>KayTech</Text>
      </View>
      
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  splashContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  splashImage: {
    width: 90,  // adjust as needed
    height: 90, // adjust as needed
    marginVertical: 20,
  },
  splashText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2246E6',
    marginTop: 10,
  },
  logoContainer: {
    alignItems: 'center',
  },
  header: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  bannerContainer: {
    height: 160,
    width: '100%',
    borderRadius: 20,
    overflow: 'hidden',
    marginVertical: 20,
    position: 'relative',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    paddingLeft: '15',
    borderRadius :20,
    paddingRight: '15',
   

    resizeMode: 'cover',
  },
  
  bannerTextContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  bannerText: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  },
  menuGrid: {
    flex: 1,
    paddingHorizontal: 10,
  },
  menuRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  menuItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: '48%',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  menuText: {
    marginTop: 15,
    color: '#2246E6',
    fontSize: 20,
    fontWeight: 'bold',
  },
  footer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30,
  },
  footerText: {
    fontSize: 16,
    color: '#333',
  },
  footerCompany: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2246E6',
  }
});