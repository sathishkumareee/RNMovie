import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Button, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { addMovieToWatchlist } from './slices/watchlistslice';

interface MovieDetailsProps {
  route: any;
  navigation: any;
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ route, navigation }) => {
    const [loading,setIsLoading]=useState(false)
    const placeholderImage = 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg';
  const { item } = route.params;
  const dispatch = useDispatch();

  const handleWatchList = (item: any) => {
    setIsLoading(true)
    console.log(item);
    dispatch(addMovieToWatchlist(item));
    Alert.alert('Movie added to the Watchlsit')
    navigation.navigate('Dashboard');
  };

  return (
    <View style={styles.container}>
         <View style={{width:'100%',height:50,justifyContent:'center',alignItems:'center'}}>
      <Text style={{marginStart:'5%',fontSize:20,fontWeight:'bold',color:'#000',}}>Movie Details</Text>
      </View>
      <Image style={styles.poster} source={{ uri: item.Poster? item.Poster:placeholderImage }} />
      <View style={styles.table}>
        <View style={styles.row}>
          <Text style={styles.cellLabel}>Title:</Text>
          <Text style={styles.cellValue}>{item.Title}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.cellLabel}>Year:</Text>
          <Text style={styles.cellValue}>{item.Year}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.cellLabel}>Runtime:</Text>
          <Text style={styles.cellValue}>{item.Runtime}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.cellLabel}>Movie Reviews:</Text>
          <Text style={styles.cellValue}>Coming Soon...</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.cellLabel}>Rating:</Text>
          <Text style={styles.cellValue}>{String(item.Rating)}</Text>
        </View>
      </View>
      <Button title="Add to Watchlist" onPress={() => handleWatchList(item)} />
      {/* <Button title="Post Rating" onPress={() => alert('Rating Posted')} />
      <Button title="Delete Rating" onPress={() => alert('Rating Deleted')} /> */}
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  details: {
    fontSize: 18,
    marginVertical: 5,
  },
});

export default MovieDetails;

// import React, { useState } from 'react';
// import { View, Text, Image, StyleSheet, Button, TextInput, FlatList } from 'react-native';
// import { useDispatch, useSelector } from 'react-redux';
// import { addMovieToWatchlist } from './slices/watchlistslice';
// // import { Movie } from './types';

// interface MovieDetailsProps {
//   route: any;
//   navigation: any;
// }

// const MovieDetails: React.FC<MovieDetailsProps> = ({ route, navigation }) => {
//   const { item } = route.params;
//   const dispatch = useDispatch();

//   // State for reviews and rating
//   const [reviews, setReviews] = useState<string[]>([]);
//   const [rating, setRating] = useState<string>('');
//   const [newReview, setNewReview] = useState<string>('');
//   const [newRating, setNewRating] = useState<string>('');

//   const handleWatchList = (item: any) => {
//     dispatch(addMovieToWatchlist(item));
//     navigation.navigate('Watchlist');
//   };

//   const handlePostReview = () => {
//     setReviews([...reviews, newReview]);
//     setNewReview('');
//   };

//   const handleDeleteReview = (index: number) => {
//     setReviews(reviews.filter((_, i) => i !== index));
//   };

//   const handlePostRating = () => {
//     setRating(newRating);
//     setNewRating('');
//   };

//   const handleDeleteRating = () => {
//     setRating('');
//   };

//   return (
//     <View style={styles.container}>
//       <Image style={styles.poster} source={{ uri: item.Poster }} />
//       <View style={styles.table}>
//         <View style={styles.row}>
//           <Text style={styles.cellLabel}>Title:</Text>
//           <Text style={styles.cellValue}>{item.Title}</Text>
//         </View>
//         <View style={styles.row}>
//           <Text style={styles.cellLabel}>Year:</Text>
//           <Text style={styles.cellValue}>{item.Year}</Text>
//         </View>
//         <View style={styles.row}>
//           <Text style={styles.cellLabel}>Runtime:</Text>
//           <Text style={styles.cellValue}>{item.Runtime}</Text>
//         </View>
//         <View style={styles.row}>
//           <Text style={styles.cellLabel}>Rating:</Text>
//           <Text style={styles.cellValue}>{rating || 'No rating yet'}</Text>
//         </View>
//       </View>

//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Post a Rating:</Text>
//         <TextInput
//           style={styles.input}
//           value={newRating}
//           onChangeText={setNewRating}
//           placeholder="Enter your rating"
//         />
//         <Button title="Post Rating" onPress={handlePostRating} />
//         {rating ? <Button title="Delete Rating" onPress={handleDeleteRating} /> : null}
//       </View>

//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Movie Reviews:</Text>
//         <FlatList
//           data={reviews}
//           keyExtractor={(_, index) => index.toString()}
//           renderItem={({ item, index }) => (
//             <View style={styles.reviewRow}>
//               <Text style={styles.reviewText}>{item}</Text>
//               <Button title="Delete" onPress={() => handleDeleteReview(index)} />
//             </View>
//           )}
//         />
//         <TextInput
//           style={styles.input}
//           value={newReview}
//           onChangeText={setNewReview}
//           placeholder="Write a review"
//         />
//         <Button title="Post Review" onPress={handlePostReview} />
//       </View>

//       <Button title="Add to Watchlist" onPress={() => handleWatchList(item)} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 10,
//     alignItems: 'center',
//   },
//   poster: {
//     width: '100%',
//     height: 400,
//     resizeMode: 'contain',
//     marginBottom: 20,
//   },
//   table: {
//     width: '100%',
//     marginBottom: 20,
//   },
//   row: {
//     flexDirection: 'row',
//     paddingVertical: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ddd',
//   },
//   cellLabel: {
//     flex: 1,
//     fontWeight: 'bold',
//   },
//   cellValue: {
//     flex: 2,
//   },
//   section: {
//     width: '100%',
//     marginBottom: 20,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   input: {
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginBottom: 10,
//     padding: 10,
//   },
//   reviewRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingVertical: 5,
//   },
//   reviewText: {
//     flex: 1,
//   },
// });

// export default MovieDetails;

