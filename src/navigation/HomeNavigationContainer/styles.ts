

import {StyleSheet} from 'react-native';
import {fontRegular} from '../../constants/fonts';

export const tabBarStyles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
  },
  activeTab: {
    transform: [{scale: 1.1}],
  },
  activeIconBackground: {
    borderRadius: 24,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIcon: {
    resizeMode: 'contain',
  },
  tabLabel: {
    fontSize: 14,
    fontFamily: fontRegular,
    marginTop: 4,
  },
  tabBar: {
    height: 80,
    paddingBottom: 0,
    paddingTop: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 0.5,
    backgroundColor: '#fff',
    zIndex: 10,
    // iOS Shadow
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -4},
    shadowOpacity: 0.15,
    shadowRadius: 8,
    // Android Shadow
    elevation: 10,
  },
  tabBarItem: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
