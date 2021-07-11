import React, {useState, useEffect, useRef} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import styles from './Styles';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const [apiData, setApiData] = useState([]);

  const [scrollPageNumber, setScrollPageNumber] = useState(1);

  const [visibleItem, setVisibleItem] = useState([]);

  const scrollRef = useRef(null);

  const screenWidth = Dimensions.get('window').width;

  const itemClicked = item => {
    if (scrollPageNumber == 1) {
      scrollRef?.current?.scrollTo({x: screenWidth, y: 0, animated: true});
      setScrollPageNumber(2);
      setVisibleItem(item);
    } else if (scrollPageNumber == 2) {
      scrollRef?.current?.scrollTo({x: 0, y: 0, animated: true});
      setScrollPageNumber(1);
    }
  };

  useEffect(() => {
    console.log('api data', apiData);
  }, [apiData]);

  useEffect(() => {
    fetch('https://itunes.apple.com/search?term=Michael+jackson')
      .then(response => response.json())
      .then(data => setApiData(data?.results));
  }, []);

  const renderItem = ({item}) => (
    <TouchableOpacity style={styles.item} onPress={() => itemClicked(item)}>
      <Image
        source={{uri: item.artworkUrl60}}
        style={{width: 40, height: 40, marginRight: 10}}
      />
      <View>
        <Text style={styles.title}>{item.trackName}</Text>
        <Text style={{fontSize: 16}}>{item.artistName}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        horizontal={true}
        contentContainerStyle={styles.scrollContainerStyle}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={200}
        decelerationRate="fast"
        pagingEnabled
        keyboardShouldPersistTaps="handled"
        ref={scrollRef}
        scrollEnabled={false}>
        <View style={styles.scrollSectionStyle}>
          <View>
            <Text style={styles.topText}>Biggest Hits of Michael jackson</Text>
          </View>
          <FlatList
            data={apiData}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </View>
        <View style={styles.scrollSectionStyle}>
          <TouchableOpacity onPress={() => itemClicked()}>
            <Text style={styles.topText}>Back To List</Text>
          </TouchableOpacity>
          <Image
            source={{uri: visibleItem?.artworkUrl100}}
            style={styles.trackImage}
          />
          <Text style={styles.trackDetails}>
            {visibleItem?.collectionExplicitness === 'notExplicit'
              ? visibleItem?.trackName
              : `${visibleItem?.trackName} (Explicit)`}
          </Text>
          {!!visibleItem?.collectionPrice && (
            <Text style={styles.trackDetails}>
              {`Collection Price: $${visibleItem?.collectionPrice}`}
            </Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
