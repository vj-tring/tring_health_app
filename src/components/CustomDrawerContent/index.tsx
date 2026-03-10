

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import {useTheme} from '../../utils/themeProvider';
import {
  fontRegular,
  fontMedium,
  fonts,
  horizontalScale,
  verticalScale,
} from '../../constants/fonts';
import {useDispatch, useSelector} from 'react-redux';
import {clearUserData} from '../../services/AsyncStorage';
import {logout} from '../../store/features/auth/auth';
import {RootState} from '../../store';
import DrawerItem from '../DrawerItem';
import {strings} from '../../constants/strings';

interface CustomDrawerContentProps {
  navigation: any;
  state: any;
}

const CustomDrawerContent: React.FC<CustomDrawerContentProps> = ({
  navigation,
  state,
}) => {
  const {colors} = useTheme();
  const dispatch = useDispatch();
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);

  const handleLogout = async () => {
    try {
      await clearUserData();
      await new Promise((resolve: any) => setTimeout(resolve, 100));
      dispatch(logout());
      // Clear all Redux state
      dispatch({type: 'RESET_APP_STATE'});
    } catch (error) {
      console.error('Logout: Error occurred:', error);
    }
  };

  const drawerItems = [
    {
      label: strings.drawer.dashboard,
      routeName: 'HomeScreen',
      count: undefined,
    },
    {
      label: strings.drawer.work_orders,
      routeName: 'WorkOrderScreen',
      count: 5, // Example count
    },
    {
      label: strings.drawer.parts,
      routeName: 'PartsScreen',
      count: 12, // Example count
    },
    {
      label: strings.drawer.assets,
      routeName: 'AssetsScreen',
      count: 8, // Example count
    },
    {
      label: strings.drawer.copilot,
      routeName: 'CopilotScreen',
      count: undefined,
    },
  ];

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      {/* Header with user info */}
      <View style={[styles.header, {borderBottomColor: colors.gray}]}>
        <View style={styles.userInfo}>
          <View style={styles.userDetails}>
            <Text style={[styles.userName, {color: colors.text}]}>
              Saikumar
            </Text>
            <Text style={[styles.userRole, {color: colors.gray}]}>
              Maintenance Manager
            </Text>
          </View>
        </View>
      </View>

      {/* Navigation Items */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        <View style={styles.menuSection}>
          <Text style={[styles.sectionTitle, {color: colors.text}]}>
            {strings.drawer.main_menu}
          </Text>
          {drawerItems.map((item, index) => (
            <DrawerItem
              key={index}
              label={item.label}
              routeName={item.routeName}
              navigation={navigation}
              count={item.count}
            />
          ))}
        </View>

        <View style={[styles.divider, {backgroundColor: colors.gray}]} />

        {/* Settings Section */}
        <View style={styles.menuSection}>
          <Text style={[styles.sectionTitle, {color: colors.text}]}>
            {strings.drawer.settings}
          </Text>
          {userInfo?.userRole !== 'Engineer' &&
            userInfo?.userRole !== 'Service Staff' && (
              <DrawerItem
                label={strings.drawer.account_info}
                navigation={navigation}
                onPress={() => {
                  navigation.closeDrawer();
                  navigation.navigate('AccountInfoScreen');
                }}
              />
            )}
          <DrawerItem
            label={strings.drawer.help_support}
            navigation={navigation}
            onPress={() => {
              navigation.closeDrawer();
              navigation.navigate('HelpSupport');
            }}
          />
        </View>
      </ScrollView>

      {/* Logout Button */}
      <View style={[styles.footer, {borderTopColor: colors.gray}]}>
        <TouchableOpacity
          style={[styles.logoutButton, {backgroundColor: colors.error}]}
          onPress={handleLogout}>
          <Text style={[styles.logoutText, {color: colors.white}]}>{strings.drawer.logout}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: horizontalScale(20),
    paddingVertical: verticalScale(30),
    borderBottomWidth: 1,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: horizontalScale(15),
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: fonts.font18,
    fontFamily: fontMedium,
    marginBottom: verticalScale(4),
  },
  userRole: {
    fontSize: fonts.font14,
    fontFamily: fontRegular,
  },
  scrollView: {
    flex: 1,
  },
  menuSection: {
    paddingVertical: verticalScale(10),
  },
  sectionTitle: {
    fontSize: fonts.font14,
    fontFamily: fontMedium,
    paddingHorizontal: horizontalScale(20),
    paddingVertical: verticalScale(10),
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  divider: {
    height: 1,
    marginVertical: verticalScale(10),
    marginHorizontal: horizontalScale(20),
  },
  footer: {
    paddingHorizontal: horizontalScale(20),
    paddingVertical: verticalScale(20),
    borderTopWidth: 1,
  },
  logoutButton: {
    paddingVertical: verticalScale(12),
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutText: {
    fontSize: fonts.font16,
    fontFamily: fontMedium,
  },
});

export default CustomDrawerContent;
