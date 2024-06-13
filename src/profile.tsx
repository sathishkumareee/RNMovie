import React from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// import { FontAwesome } from '@expo/vector-icons'; // Make sure to install expo/vector-icons if not already installed
interface LogoutProps {
    navigation: any;
  }
const Profile: React.FC<LogoutProps> = ({ navigation }) => {

  const handleLogout = () => {
    // Perform any necessary logout operations
    navigation.replace('Login'); // Use replace to prevent back navigation to Profile
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: 'https://www.shutterstock.com/shutterstock/photos/1153673752/display_1500/stock-vector-profile-placeholder-image-gray-silhouette-no-photo-1153673752.jpg' }} // Replace with your profile image URL
          style={styles.profileImage}
        />
        <TouchableOpacity style={styles.editIcon}>
          {/* <FontAwesome name="edit" size={24} color="black" /> */}
        </TouchableOpacity>
      </View>
      <Text style={styles.profileName}>John Doe</Text>
      <View style={styles.optionsContainer}>
        <TouchableOpacity style={styles.option}>
          {/* <FontAwesome name="cog" size={24} color="black" /> */}
          <Text style={styles.optionText}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          {/* <FontAwesome name="bell" size={24} color="black" /> */}
          <Text style={styles.optionText}>Notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          {/* <FontAwesome name="sign-out" size={24} color="black" /> */}
          <Text style={styles.optionText} onPress={handleLogout}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  profileContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  profileImage: {
    width: 170,
    height: 155,
    borderRadius: 75,
  },
  editIcon: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 5,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  optionsContainer: {
    width: '100%',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  optionText: {
    marginLeft: 10,
    fontSize: 18,
  },
});

export default Profile;
