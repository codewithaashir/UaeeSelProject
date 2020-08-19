

import React, {useRef, useState, useEffect} from 'react';
import Carousel, {ParallaxImage,Pagination} from 'react-native-snap-carousel';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { colors } from 'react-native-elements';

const ENTRIES1 = [
  {
    title: 'Beautiful and dramatic Antelope Canyon',
    subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
    illustration: 'https://i.imgur.com/UYiroysl.jpg',
  },
  {
    title: 'Earlier this morning, NYC',
    subtitle: 'Lorem ipsum dolor sit amet',
    illustration: 'https://i.imgur.com/UPrs1EWl.jpg',
  },
  {
    title: 'White Pocket Sunset',
    subtitle: 'Lorem ipsum dolor sit amet et nuncat ',
    illustration: 'https://i.imgur.com/MABUbpDl.jpg',
  },
  {
    title: 'Acrocorinth, Greece',
    subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
    illustration: 'https://i.imgur.com/KZsmUi2l.jpg',
  },
  {
    title: 'The lone tree, majestic landscape of New Zealand',
    subtitle: 'Lorem ipsum dolor sit amet',
    illustration: 'https://i.imgur.com/2nCt3Sbl.jpg',
  },
];
const {width: screenWidth} = Dimensions.get('window');

const MyCarousel = props => {
  const [entries, setEntries] = useState([]);
  const [activeSlide,setActiveSlide]=useState(1);
  const carouselRef = useRef(null);

  const goForward = () => {
    carouselRef.current.snapToNext();
  };

  useEffect(() => {
    setEntries(ENTRIES1);
  }, []);
  
  const renderItem = ({item, index}, parallaxProps) => {
    return (
      <View style={styles.item}>
        <ParallaxImage
          source={{uri: item.illustration}}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0.4}
          {...parallaxProps}
        />
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>
      </View>
    );
  };
 
  return (
    <View style={styles.container}>
      <Carousel
        ref={carouselRef}
        sliderWidth={screenWidth}
        sliderHeight={screenWidth-20}
        itemWidth={screenWidth - 60}
        data={entries}
        renderItem={renderItem}
        onSnapToItem={(index) => setActiveSlide(index)}
        hasParallaxImages={true}
      />
      <Pagination
          dotsLength={entries.length}
          activeDotIndex={activeSlide}
           containerStyle={{position:'absolute',bottom:-10,alignItems:'center',alignSelf:'center'}}
          dotStyle={{
              width: 10,
              height: 10,
              borderRadius: 5,
              marginHorizontal: 8,
              backgroundColor: colors.success
          }}
          inactiveDotStyle={{
              // Define styles for inactive dots here
              width: 10,
              height: 10,
              borderRadius: 5,
              marginHorizontal: 8,
              backgroundColor: colors.success
          }}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
    </View>
  );
};

export default MyCarousel;

const styles = StyleSheet.create({
  container: {
    ///flex: 1,
  },
  item: {
    width: screenWidth - 60,
    height: screenWidth *0.5,
  },
  title:{
   transform:[{ translateY:-50 }],
   color:'#ffff',
   marginLeft:10,
   fontFamily:'Lato-Black',
   fontSize:16 
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ios: 0, android: 1}), // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
});