

import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  fontMedium,
  fontRegular,
  fonts,
  horizontalScale,
  verticalScale,
} from '../../constants/fonts';
import {useTheme} from '../../utils/themeProvider';
import FastImage from 'react-native-fast-image';

const DrawerItem = ({
  label,
  routeName,
  navigation,
  count,
  icon,
  onPress,
}: {
  label: string;
  routeName?: string;
  navigation?: any;
  count?: number;
  icon?: any;
  onPress?: () => void;
}) => {
  const {colors} = useTheme();

  // Handle press event for the drawer item
  const handlePress = () => {
    if (navigation?.closeDrawer) {
      navigation.closeDrawer();
    }
    if (onPress) {
      onPress();
    } else if (routeName && navigation?.navigate) {
      // Navigate directly to the routeName (works for both tab and drawer screens)
      navigation.navigate(routeName);
    }
  };

  // Render the content of the drawer item
  const Content = () => (
    <>
      <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
        {icon && (
          <FastImage
            source={icon}
            style={{width: 20, height: 20, marginRight: 16}}
            resizeMode={FastImage.resizeMode.contain}
          />
        )}
        <Text style={[styles.label, {color: colors.text}]}>{label}</Text>
      </View>
      {typeof count === 'number' ? (
        // Show count badge if count is provided
        <View style={[styles.countContainer, {backgroundColor: colors.gray}]}>
          <Text style={[styles.countText, {color: colors.black}]}>{count}</Text>
        </View>
      ) : (
        // Show right arrow icon for navigation items
        <Ionicons name="chevron-forward" size={16} color={colors.text} />
      )}
    </>
  );

  // Render either a View or TouchableOpacity based on whether count is present
  return typeof count === 'number' ? (
    <View style={styles.itemContainer}>
      <Content />
    </View>
  ) : (
    <TouchableOpacity style={styles.itemContainer} onPress={handlePress}>
      <Content />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: verticalScale(14),
    paddingHorizontal: horizontalScale(20),
  },
  label: {
    fontSize: fonts.font15,
    fontFamily: fontRegular,
  },
  countContainer: {
    borderRadius: 8,
    paddingHorizontal: horizontalScale(8),
    paddingVertical: verticalScale(5),
    minWidth: horizontalScale(24),
    alignItems: 'center',
    justifyContent: 'center',
  },
  countText: {
    fontSize: fonts.font14,
    fontFamily: fontMedium,
  },
  arrowIcon: {
    width: 16,
    height: 16,
  },
});

export default DrawerItem;
