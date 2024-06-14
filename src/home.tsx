import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, FlatList, Image, ActivityIndicator, TextInput } from 'react-native';
import { useGetMoviesQuery } from './services/productsApi';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface HomeProps {
  navigation: any;
}

const Home: React.FC<HomeProps> = ({ navigation }) => {
  const { data: productsData, error, isLoading } = useGetMoviesQuery();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredData, setFilteredData] = useState(productsData || []);
  const placeholderImage = 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg';

  useEffect(() => {
    if (productsData) {
      setFilteredData(productsData);
    }
  }, [productsData]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (productsData) {
      const filtered = productsData.filter((item) =>
        item.Title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  console.log(productsData);

  if (isLoading) {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={{ color: 'red' ,textAlign:'center',fontSize:18,fontWeight:'bold'}}>Error fetching data</Text>
      </View>
    );
  }

  if (!productsData) {
    return (
      <View style={styles.container}>
        <Text style={{ color: 'red' }}>No data available</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{backgroundColor:'#fff',width:'100%',height:50,justifyContent:'center'}}>
        <Text style={{marginStart:'5%',fontSize:20,fontWeight:'bold',color:'#000',}}>Trending Movies</Text>
      </View>
      <TextInput
        style={styles.searchInput}
        placeholder="Search movies..."
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredData}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('Moviedetails', { item })}>
            <View style={styles.card}>
              <Image style={styles.image} source={{ uri: item.Poster ? String(item.Poster) : placeholderImage }} />
              <View style={styles.infoContainer}>
                <Text style={styles.title}>{item.Title}</Text>
                <Text style={styles.year}>Year: {String(item.Year)}</Text>
                <Text style={styles.runtime}>Runtime: {item.Runtime}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  searchInput: {
    height: 40,
    borderColor: '#ddd',
    backgroundColor:'#fff',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    margin: 10,
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

export default Home;
