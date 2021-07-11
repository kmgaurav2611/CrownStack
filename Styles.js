import {StyleSheet} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  item: {
    backgroundColor: 'grey',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  title: {
    fontSize: 20,
  },
  mainContainer: {flex: 1, backgroundColor: Colors.darker},
  scrollContainerStyle: {width: `200%`},
  topText: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 20,
    marginVertical: 30,
  },
  trackDetails: {
    color: 'white',
    marginLeft: 20,
    fontSize: 20,
    marginTop: 30,
  },
  trackImage: {width: '100%', height: '50%', padding: 20},
  scrollSectionStyle: {flex: 1},
});

export default styles;
