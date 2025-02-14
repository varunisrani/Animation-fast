import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4B0082',
    position: 'relative',
  },
  homeScreenContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#F5F5F5',
    zIndex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  purpleCircle: {
    position: 'absolute',
    width: height * 0.8,
    height: height * 0.8,
    borderRadius: height * 0.4,
    backgroundColor: '#4B0082',
    top: 0,
    left: '50%',
    marginLeft: -(height * 0.8) / 2,
    zIndex: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 16,
  },
  logoWrapper: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 3,
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -60,
    marginTop: -60,
  },
  tabBarCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#4B0082',
    position: 'absolute',
    bottom: 25,
    left: '50%',
    marginLeft: -30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 12,
  },
});

export default styles; 