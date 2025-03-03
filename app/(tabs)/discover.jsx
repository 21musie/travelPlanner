import ArticleCard from '@/components/Articles/ArticleCard';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { db } from '@/configs/FirebaseConfig';
import {
  collection,
  getDocs,
  query,
} from 'firebase/firestore';

export default function Discover() {
  return (
    <View style={styles.container}>
      <TravelGuideScreen />
    </View>
  );
}

const TravelGuideScreen = () => {
  const [locations, setLocations] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchLocations = async () => {
    try {
      const postsQuery = query(collection(db, 'Articles'));
      const querySnapshot = await getDocs(postsQuery);
      const fetchedArticles = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        title: doc.data().title || '',
        location: doc.data().location || '',
        description: doc.data().description || '',
        category: doc.data().category || '',
        rating: doc.data().rating || 0,
        imageUrls: doc.data().imageUrls || [],
        createdAt: doc.data().createdAt || '',
        author: doc.data().author || '',
      }));

      setLocations(fetchedArticles);
    } catch (e) {
      console.error('Error fetching posts:', e);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  // Filter locations based on category and search query
  const filteredLocations = locations.filter((location) => {
    const matchesCategory = selectedCategory
      ? location.category === selectedCategory
      : true;
    const matchesSearchQuery =
      location.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearchQuery;
  });

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Image
          source={require('@/assets/images/icon.png')}
          style={{ width: 52, height: 52 }}
        />
        <Text style={styles.headerText}>Discover</Text>
        <TouchableOpacity onPress={() => router.push('/forum/create-channel')}>
          <Ionicons name="add-circle" size={50} color="black" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search locations..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={styles.section}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.sectionTitle}>Might Need These</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.cardsContainer}
        >
          <View style={styles.card}>
            <Image
              source={require('./../../assets/images/savings-money.jpg')}
              style={styles.cardImage}
            />
            <Text style={styles.cardText}>Budget Travel</Text>
          </View>
          <View style={styles.card}>
            <Image
              source={require('./../../assets/images/airplane-schedule.jpg')}
              style={styles.cardImage}
            />
            <Text style={styles.cardText}>First-time Abroad</Text>
          </View>
          <View style={styles.card}>
            <Image
              source={require('./../../assets/images/safe-travel.jpg')}
              style={styles.cardImage}
            />
            <Text style={styles.cardText}>Safe Travel</Text>
          </View>
          <View style={styles.card}>
            <Image
              source={require('./../../assets/images/airplane-schedule.jpg')}
              style={styles.cardImage}
            />
            <Text style={styles.cardText}>New Experiences</Text>
          </View>
        </ScrollView>
      </View>

      {/* Categories */}
      <View style={styles.categories}>
        {['Sightseeing', 'Resort', 'Restaurant'].map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.selectedCategoryButton,
            ]}
            onPress={() =>
              setSelectedCategory(
                selectedCategory === category ? null : category
              )
            }
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category && styles.selectedCategoryText,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Article Cards */}
      <View style={styles.articlesContainer}>
        {filteredLocations.map((location) => (
          <ArticleCard key={location.id} location={location} />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 8,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  section: {
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  seeAll: {
    color: '#7fbbf0',
    fontSize: 14,
    alignSelf: 'flex-end',
    marginBottom: 8,
  },
  cardsContainer: {
    flexDirection: 'row',
    alignContent: 'center',
  },
  card: {
    marginRight: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  cardText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '600',
  },
  headerText: {
    fontFamily: 'roboto-bold',
    fontSize: 33,
  },
  searchContainer: {
    marginVertical: 16,
    marginHorizontal: 8,
  },
  searchInput: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 20,
    fontSize: 16,
  },
  categories: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 16,
  },
  categoryButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  selectedCategoryButton: {
    backgroundColor: '#007bff',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
  },
  selectedCategoryText: {
    color: '#fff',
  },
  articlesContainer: {
    marginVertical: 16,
  },
});