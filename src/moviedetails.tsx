import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Button, Alert, TouchableOpacity, TextInput } from 'react-native';
import { useDispatch } from 'react-redux';
import { addMovieToWatchlist } from './slices/watchlistslice';
import Modal from 'react-native-modal';
import { useUpdateMovieRatingMutation } from './services/productsApi';

interface MovieDetailsProps {
  route: any;
  navigation: any;
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ route, navigation }) => {
  const [loading, setIsLoading] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [newRating, setNewRating] = useState('');
  const placeholderImage = 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg';
  const [movie, setMovie] = useState(route.params.item);
  const dispatch = useDispatch();
  const [updateMovieRating] = useUpdateMovieRatingMutation();

  const handleWatchList = (item: any) => {
    setIsLoading(true);
    console.log(item);
    dispatch(addMovieToWatchlist(item));
    Alert.alert('Movie added to the Watchlist');
    navigation.navigate('Dashboard');
  };

  const handleAddRating = async () => {
    try {
      const updatedRating = `${newRating} / 5`;
      await updateMovieRating({ id: movie.id, rating: updatedRating }).unwrap();
      setMovie((prevMovie: any) => ({ ...prevMovie, Rating: updatedRating }));
      setModalVisible(false);
      Alert.alert('Rating added');
    } catch (error) {
      Alert.alert('Error adding rating');
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ width: '100%', height: 50, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ marginStart: '5%', fontSize: 20, fontWeight: 'bold', color: '#000', }}>Movie Details</Text>
      </View>
      <Image style={styles.poster} source={{ uri: movie.Poster ? movie.Poster : placeholderImage }} />
      <View style={styles.table}>
        <View style={styles.row}>
          <Text style={styles.cellLabel}>Title:</Text>
          <Text style={styles.cellValue}>{movie.Title}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.cellLabel}>Year:</Text>
          <Text style={styles.cellValue}>{movie.Year}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.cellLabel}>Runtime:</Text>
          <Text style={styles.cellValue}>{movie.Runtime}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.cellLabel}>Movie Reviews:</Text>
          <Text style={styles.cellValue}>{movie.Review}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.cellLabel}>Rating:</Text>
          <Text style={styles.cellValue}>{String(movie.Rating)}</Text>
        </View>
      </View>
      <View style={styles.iconRow}>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={() => handleWatchList(movie)}>
            <Image source={require('../assets/plus.png')} style={styles.icon} />
          </TouchableOpacity>
          <Text style={styles.iconText}>Watchlist</Text>
        </View>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Image source={require('../assets/review.png')} style={styles.icon} />
          </TouchableOpacity>
          <Text style={styles.iconText}>Rating</Text>
        </View>
      </View>
      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Add Rating</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter rating (e.g., 4.5)"
            value={newRating}
            onChangeText={setNewRating}
            keyboardType="numeric"
          />
          <View style={{ marginBottom: '5%' }}>
            <Button title="Submit" onPress={handleAddRating} />
          </View>
          <Button title="Cancel" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  poster: {
    width: '100%',
    height: 400,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  table: {
    width: '100%',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  cellLabel: {
    flex: 1,
    fontWeight: 'bold',
  },
  cellValue: {
    flex: 2,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  iconContainer: {
    alignItems: 'center',
  },
  icon: {
    width: 40,
    height: 40,
    marginBottom: 5,
  },
  iconText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '100%',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default MovieDetails;
