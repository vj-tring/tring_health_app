import {StyleSheet} from 'react-native';
import type {AppColors} from '../../constants/colors';

const createStyles = (colors: AppColors) => {
  return StyleSheet.create({
    background: {
      flex: 1,
      backgroundColor: colors.white,
      justifyContent: 'center',
      alignItems: 'center',
    },
    imgHolder: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    logo: {
      resizeMode: 'contain',
      aspectRatio: 1,
      width: 100,
      height: 100,
    },
    text_logo: {
      width: 215,
      height: 54,
      resizeMode: 'contain',
      alignSelf: 'center',
      marginTop: 15,
    },
    textHolder: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 10,
      flexDirection: 'row',
    },
  });
};

export default createStyles;
