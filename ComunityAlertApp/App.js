import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Animated, Image, TouchableOpacity, SafeAreaView, ScrollView ,Linking} from 'react-native';
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

// Alert Screen with API integration
const AlertScreen = ({ navigation }) => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await fetch('http://192.168.1.4:8000/api/alerts');
        if (!response.ok) throw new Error('Failed to fetch alerts');
        const data = await response.json();
        setAlerts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading alerts...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.alertContainer}>
      

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {alerts.length === 0 ? (
          <Text style={styles.noAlertsText}>No current alerts</Text>
        ) : (
          alerts.map(alert => (
            <View key={alert.id} style={styles.alertItem}>
  {/* Header Row */}
  <View style={styles.headerContainer}>
    <MaterialCommunityIcons name="alert-circle" size={20} color="#FF6B6B" />
    <Text style={styles.alertTitle}>{alert.alert_name}</Text>
  </View>

  {/* Status Row */}
  <View style={[styles.row, styles.statusContainer]}>
    <MaterialCommunityIcons 
      name={alert.status === 'active' ? 'check-circle' : 'close-circle'}
      size={18}
      color={alert.status === 'active' ? '#4CAF50' : '#FF5722'}
    />
    <Text style={[
      styles.statusText,
      { color: alert.status === 'active' ? '#4CAF50' : '#FF5722' }
    ]}>
      {alert.status.toUpperCase()}
    </Text>
  </View>

  {/* Location Row */}
  <View style={styles.row}>
    <MaterialCommunityIcons name="map-marker" size={16} color="#666" style={styles.icon} />
    <Text style={styles.detailText}>{alert.location}</Text>
  </View>

  {/* Dates Row */}
  <View style={styles.row}>
    <Ionicons name="calendar" size={16} color="#666" style={styles.icon} />
    <Text style={styles.detailText}>
      {new Date(alert.start_datetime).toLocaleDateString()} -{' '}
      {new Date(alert.end_datetime).toLocaleDateString()}
    </Text>
  </View>

 
</View>
          ))
        )}

        <View style={styles.alertFooter}>
          <Text style={styles.footerText}>Managed by</Text>
          <Text style={styles.footerCompany}>KayTech</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};



const MeetingsScreen = ({ navigation }) => {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const response = await fetch('http://192.168.1.4:8000/api/meetings');
        if (!response.ok) throw new Error('Failed to fetch meetings');
        const data = await response.json();
        setMeetings(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMeetings();
  }, []);

  const getStatusDetails = (status) => {
    switch (status.toLowerCase()) {
      case 'scheduled':
        return { icon: 'calendar-clock', color: '#2D6A9F' };
      case 'cancelled':
        return { icon: 'close-circle', color: '#FF5722' };
      case 'in-progress':
        return { icon: 'progress-check', color: '#FFC107' };
      case 'completed':
        return { icon: 'check-circle', color: '#4CAF50' };
      default:
        return { icon: 'calendar', color: '#666' };
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading meetings...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {meetings.length === 0 ? (
          <Text style={styles.noMeetingsText}>No upcoming meetings</Text>
        ) : (
          meetings.map(meeting => {
            const statusDetails = getStatusDetails(meeting.status);
            
            return (
              <View key={meeting.id} style={styles.meetingItem}>
                {/* Header Row */}
                <View style={styles.headerContainer}>
                  <MaterialCommunityIcons 
                    name="calendar-text" 
                    size={22} 
                    color={statusDetails.color} 
                  />
                  <Text style={styles.meetingTitle}>{meeting.title}</Text>
                </View>

                {/* Status Row */}
                <View style={styles.row}>
                  <MaterialCommunityIcons 
                    name={statusDetails.icon}
                    size={18}
                    color={statusDetails.color}
                    style={styles.icon}
                  />
                  <Text style={[styles.statusText, { color: statusDetails.color }]}>
                    {meeting.status.toUpperCase()}
                  </Text>
                </View>

                {/* Time Row */}
                <View style={styles.row}>
                  <MaterialCommunityIcons name="clock" size={16} color="#666" style={styles.icon} />
                  <Text style={styles.detailText}>
                    {new Date(meeting.start_time).toLocaleString()} - {' '}
                    {new Date(meeting.end_time).toLocaleString()}
                  </Text>
                </View>

                {/* Location Row */}
                <View style={styles.row}>
                  <Ionicons name="location" size={16} color="#666" style={styles.icon} />
                  <Text 
                    style={[styles.detailText, meeting.location.startsWith('http') && styles.linkText]}
                    onPress={() => meeting.location.startsWith('http') && Linking.openURL(meeting.location)}
                  >
                    {meeting.location}
                  </Text>
                </View>

                {/* Attendees Row */}
                {meeting.attendees?.length > 0 && (
                  <View style={styles.row}>
                    <Ionicons name="people" size={16} color="#666" style={styles.icon} />
                    <View style={styles.attendeesContainer}>
                      <Text style={styles.detailText}>
                        {meeting.attendees.join(', ')}
                      </Text>
                      <Text style={styles.attendeesCount}>
                        ({meeting.attendees.length} participants)
                      </Text>
                    </View>
                  </View>
                )}

                {/* Agenda Row */}
                {meeting.agenda && (
                  <View style={styles.row}>
                    <MaterialCommunityIcons 
                      name="text-subject" 
                      size={16} 
                      color="#666" 
                      style={styles.icon} 
                    />
                    <Text style={styles.detailText}>{meeting.agenda}</Text>
                  </View>
                )}

                {/* Description Row */}
                {meeting.description && (
                  <View style={styles.row}>
                    <MaterialCommunityIcons 
                      name="text" 
                      size={16} 
                      color="#666" 
                      style={styles.icon} 
                    />
                    <Text style={styles.descriptionText}>{meeting.description}</Text>
                  </View>
                )}
              </View>
            )}
          )
        )}

        <View style={styles.footer}>
          <Text style={styles.footerText}>Calendar powered by</Text>
          <Text style={styles.footerCompany}>KayTech</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const JobsScreen = ({ navigation }) => {

  // Add helper functions HERE, right after the useEffect
  const parseDescription = (text) => {
    const parts = text.split(/(https?:\/\/[^\s]+)/g);
    return parts.map((part, index) => {
      if (isUrl(part)) {
        return (
          <Text
            key={index}
            style={styles.linkText}
            onPress={() => Linking.openURL(part)}
          >
            {part}
          </Text>
        );
      }
      return <Text key={index}>{part}</Text>;
    });
  };

  const isUrl = (text) => {
    return /^(https?:\/\/)/.test(text);
  };



  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const formatSalary = (min, max) => {
    return `R${Number(min).toLocaleString()} - R${Number(max).toLocaleString()}`;
  };

  const getStatusDetails = (status) => {
    switch (status.toLowerCase()) {
      case 'open':
        return { icon: 'lock-open-variant', color: '#4CAF50' };
      case 'closed':
        return { icon: 'lock', color: '#F44336' };
      case 'draft':
        return { icon: 'pencil', color: '#FFC107' };
      default:
        return { icon: 'briefcase', color: '#666' };
    }
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('http://192.168.1.4:8000/api/jobs');
        if (!response.ok) throw new Error('Failed to fetch jobs');
        const data = await response.json();
        setJobs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading jobs...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {jobs.length === 0 ? (
          <Text style={styles.noJobsText}>No available positions</Text>
        ) : (
          jobs.map(job => {
            const statusDetails = getStatusDetails(job.status);
            const deadlineDate = new Date(job.deadline);
            
            return (
              <View key={job.id} style={styles.jobCard}>
                {/* Status Ribbon */}
                <View style={[styles.statusRibbon, { backgroundColor: statusDetails.color }]}>
                  <Text style={styles.statusRibbonText}>{job.status.toUpperCase()}</Text>
                </View>

                {/* Main Content */}
                <View style={styles.cardContent}>
                  {/* Title and Company */}
                  <View style={styles.headerContainer}>
                    <MaterialCommunityIcons 
                      name="briefcase" 
                      size={24} 
                      color="#2D6A9F" 
                    />
                    <View style={styles.titleContainer}>
                      <Text style={styles.jobTitle}>{job.title}</Text>
                      <Text style={styles.companyName}>{job.company}</Text>
                    </View>
                  </View>

                  {/* Location and Type */}
                  <View style={styles.detailsRow}>
                    <View style={styles.detailItem}>
                      <Ionicons name="location" size={16} color="#666" />
                      <Text style={styles.detailText}>{job.location}</Text>
                    </View>
                    <View style={styles.detailItem}>
                      <MaterialCommunityIcons name="clock" size={16} color="#666" />
                      <Text style={styles.detailText}>{job.job_type}</Text>
                    </View>
                  </View>

                  {/* Salary and Category */}
                  <View style={styles.detailsRow}>
                    <View style={styles.detailItem}>
                      <MaterialCommunityIcons name="cash" size={16} color="#666" />
                      <Text style={styles.detailText}>
                        {formatSalary(job.min_salary, job.max_salary)}
                      </Text>
                    </View>
                    <View style={styles.detailItem}>
                      <MaterialCommunityIcons name="tag" size={16} color="#666" />
                      <Text style={styles.detailText}>{job.category}</Text>
                    </View>
                  </View>

                  {/* Deadline */}
                  <View style={styles.deadlineContainer}>
                    <MaterialCommunityIcons name="calendar-alert" size={16} color="#666" />
                    <Text style={styles.deadlineText}>
                      Apply by: {deadlineDate.toLocaleDateString()} •{' '}
                      {deadlineDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </Text>
                  </View>

                  {/* Description */}
                  {job.description && (
  <View style={styles.descriptionContainer}>
    <Text style={styles.descriptionText}>
      {parseDescription(job.description)}
    </Text>
  </View>
)}

                </View>
              </View>
            )}
          )
        )}

        <View style={styles.footer}>
          <Text style={styles.footerText}>Opportunities powered by</Text>
          <Text style={styles.footerCompany}>KayTech</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};


const ReportScreen = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleReport = async () => {
    setIsLoading(true);
    
    try {
      // Get current position
      const position = await new Promise((resolve, reject) => {
        Geolocation.getCurrentPosition(
          resolve,
          reject,
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
      });

      // Submit report to backend
      const response = await fetch('http://192.168.1.4:8000/api/reports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          timestamp: new Date().toISOString()
        }),
      });

      if (response.ok) {
        Alert.alert('Success', 'Report submitted successfully! Admin will review it.');
      } else {
        throw new Error('Failed to submit report');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', error.message || 'Error submitting report. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.reportContainer}>
          <MaterialCommunityIcons 
            name="alert-outline" 
            size={80} 
            color="#2246E6" 
            style={styles.reportIcon}
          />
          
          <Text style={styles.reportTitle}>Submit Anonymous Report</Text>
          <Text style={styles.reportText}>
            Your current location will be automatically included with this report.
            No personal information will be collected.
          </Text>

          <TouchableOpacity 
            style={[styles.reportButton, isLoading && styles.disabledButton]}
            onPress={handleReport}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <>
                <MaterialCommunityIcons name="send" size={20} color="#fff" />
                <Text style={styles.buttonText}>Submit Report</Text>
              </>
            )}
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Reporting powered by</Text>
            <Text style={styles.footerCompany}>KayTech</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};


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
  reportContainer: {
  flex: 1,
  alignItems: 'center',
  padding: 20,
},
reportIcon: {
  marginTop: 30,
  marginBottom: 20,
},
reportTitle: {
  fontSize: 24,
  fontWeight: 'bold',
  color: '#2246E6',
  textAlign: 'center',
  marginBottom: 15,
},
reportText: {
  fontSize: 16,
  color: '#666',
  textAlign: 'center',
  marginBottom: 30,
  lineHeight: 24,
},
reportButton: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#2246E6',
  paddingVertical: 15,
  paddingHorizontal: 30,
  borderRadius: 25,
  width: '100%',
  gap: 10,
},
disabledButton: {
  backgroundColor: '#6c757d',
},
buttonText: {
  color: '#fff',
  fontSize: 18,
  fontWeight: '600',
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
    fontSize: 2,
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  noAlertsText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
  alertDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
  },
  alertItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
    margin : 15,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 8,
  },
  alertTitle: {
    fontSize: 17,
    fontWeight: '600',
    marginLeft: 10,
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 6,
  },
  statusContainer: {
    marginBottom: 8,
    alignItems: 'center',
  },
  statusText: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 8,
  },
  icon: {
    width: 24,  // Fixed width for icon alignment
    marginTop: 2,  // Optical alignment adjustment
  },
  detailText: {
    fontSize: 14,
    color: '#666',
    flex: 1,
    lineHeight: 20,
  },
  descriptionText: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
    flex: 1,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 4,
  },
  linkText: {
    color: '#2D6A9F',
    textDecorationLine: 'underline',
  },
  attendeesContainer: {
    flexDirection: 'column',
  },
  attendeesCount: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  descriptionText: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
    fontStyle: 'italic',
  },
  meetingItem: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 4,
    // Shadow for Android
    elevation: 6,
    // Border for better visual separation
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  jobCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 6,
    borderWidth: 1,
    borderColor: '#EEE',
  },
  statusRibbon: {
    position: 'absolute',
    top: 0,
    right: 0,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  statusRibbonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '700',
  },
  cardContent: {
    position: 'relative',
    zIndex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  titleContainer: {
    marginLeft: 12,
    flex: 1,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2A2A2A',
  },
  companyName: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  detailText: {
    fontSize: 14,
    color: '#444',
    marginLeft: 6,
  },
  deadlineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
  },
  deadlineText: {
    fontSize: 14,
    color: '#F44336',
    marginLeft: 8,
    fontWeight: '500',
  },
  descriptionContainer: {
    marginTop: 12,
  },
  descriptionText: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
  },
  noJobsText: {
    textAlign: 'center',
    color: '#888',
    fontSize: 16,
    marginTop: 20,
  },
  footer: {
    marginTop: 24,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    paddingTop: 16,
  },
  footerText: {
    color: '#888',
    fontSize: 12,
  },
  footerCompany: {
    color: '#2D6A9F',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFEBEE',
  },
  linkText: {
    color: '#2D6A9F',
    textDecorationLine: 'underline',
  },
  descriptionText: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
    flexWrap: 'wrap',
  },
  
  
});
