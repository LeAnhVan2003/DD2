import React, { useRef, useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, Dimensions, Animated, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ProductItem from './items/ProductItem';
import CategoryItem from './items/CategoryItem';

const { width } = Dimensions.get('window');

const Feed = ({ navigation }: { navigation: any }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef(null);
  const bannerIndex = useRef(0);
  const [searchQuery, setSearchQuery] = useState('');

  const banners = [
    require('../../../assets/images/slider1.webp'),
    require('../../../assets/images/slider2.webp'),
    require('../../../assets/images/slider3.webp'),
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      bannerIndex.current = (bannerIndex.current + 1) % banners.length;
      scrollViewRef.current.scrollTo({ x: bannerIndex.current * width, animated: true });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.play}>
        <MaterialCommunityIcons name="map-marker" size={20} color="brown" />
        <Text style={styles.address} onPress={() => navigation.navigate('Map')}> Việt Nam</Text>
        <MaterialCommunityIcons style={styles.dome} name="phone-in-talk-outline" size={20} color="brown" />
      </View>

      <View style={styles.searchContainer}>
        <MaterialCommunityIcons name="magnify" size={20} color="gray" />
        <TextInput 
          placeholder="Tìm kiếm sản phẩm..." 
          style={styles.searchInput} 
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        style={styles.bannerContainer}
      >
        {banners.map((banner, index) => (
          <Image key={index} source={banner} style={styles.banner} />
        ))}
      </ScrollView>

      {/* Thay thế chữ "Categories" bằng biểu tượng */}
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons name="view-grid" size={24} color="red" />
        <Text style={styles.iconText}>Danh mục</Text>
      </View>
      <CategoryItem onSelectCategory={(categoryId: number | null) => {
        throw new Error('Chưa triển khai.');
      }} />

      {/* Thay thế chữ "Products" bằng biểu tượng */}
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons name="shopping" size={24} color="red" />
        <Text style={styles.iconText}>Sản phẩm</Text>
      </View>
      
      {/* Truyền searchQuery vào ProductItem */}
      <ProductItem navigation={navigation} searchQuery={searchQuery} />
    </ScrollView>
  );
};

export default Feed;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF0F5',
    flex: 1,
    padding: 10,
  },
  bannerContainer: {
    width: '100%',
    height: 100,
    marginBottom: 0,
  },
  banner: {
    width: width - 20,
    height: 100,
    resizeMode: 'contain', 
    borderRadius: 10,
    marginHorizontal: 10,
  },
  play: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  address: {
    fontSize: 14,
    marginLeft: 10,
    color: 'brown',
  },
  dome: {
    marginLeft: 'auto',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 30,
    padding: 5,
    marginBottom: 5,
    borderColor: '#ccc',
  },
  searchInput: {
    marginLeft: 10,
    flex: 1,
    color: '#000',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  iconText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 5,
  },
});
