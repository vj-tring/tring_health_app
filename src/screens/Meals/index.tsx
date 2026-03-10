import React from 'react';
import {View, Text} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useTheme} from '../../utils/themeProvider';
import {fonts, fontSemiBold} from '../../constants/fonts';

const MealsScreen = () => {
  const {colors} = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View style={{flex: 1, backgroundColor: colors.veryLightGray, paddingTop: insets.top, alignItems: 'center', justifyContent: 'center'}}>
      <Ionicons name="restaurant-outline" size={64} color={colors.primary} style={{marginBottom: 16}} />
      <Text style={{fontSize: fonts.font20, fontFamily: fontSemiBold, color: colors.text}}>Meals</Text>
      <Text style={{fontSize: 14, color: colors.plainGrey, marginTop: 8}}>Log your meals</Text>
    </View>
  );
};

export default MealsScreen;
