import React from 'react';
import { Text, View, FlatList, StyleSheet, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { IRootState } from './store/store';

const Watchlist = () => {
    const placeholderImage = 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg';
  const watchlist = useSelector((state: IRootState) =>  state.watchlist);

  return (
    <View style={styles.container}>
        <View style={{backgroundColor:'#fff',width:'100%',height:50,justifyContent:'center'}}>
      <Text style={{marginStart:'5%',fontSize:20,fontWeight:'bold',color:'#000',}}>Your Watchlist</Text>
      </View>
      {watchlist.length === 0 ? (
        <Text style={{textAlign:'center',fontSize:20,fontWeight:'900',color:'#000',marginTop:'5%'}}>No movies in the watchlist</Text>
      ) : (
        <FlatList
          data={watchlist}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image style={styles.image} source={{ uri: item.Poster ?item.Poster:placeholderImage}} />
              <View style={styles.infoContainer}>
                <Text style={styles.title}>{item.Title}</Text>
                <Text style={styles.year}>Year: {item.Year}</Text>
                <Text style={styles.runtime}>Runtime: {item.Runtime}</Text>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    
  },
  card: {
    backgroundColor: '#1c1c1c',
    borderRadius: 20,
    margin: 10,
    overflow: 'hidden',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  infoContainer: {
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  year: {
    fontSize: 16,
    color: '#ccc',
  },
  runtime: {
    fontSize: 14,
    color: '#ccc',
  },
});

export default Watchlist;
