import {StyleSheet} from 'react-native';
import {
  fontBold,
  fontMedium,
  fonts,
  fontSemiBold,
  horizontalScale,
  verticalScale,
} from '../../constants/fonts';
import {lightColors} from '../../constants';

const styles = StyleSheet.create({
  container: {
    marginTop: verticalScale(8),
    paddingBottom: verticalScale(10),
  },
  backContainer: {
    marginVertical: verticalScale(10),
  },
  title: {
    fontFamily: fontSemiBold,
    fontSize: fonts.font18,
    textAlign: 'center',
  },
  headerView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flex: {
    flex: 0.2,
  },
  editButton: {
    left: horizontalScale(20),
  },
  editText: {
    fontSize: fonts.font14,
    fontFamily: fontMedium,
  },
  icon: {
    width: horizontalScale(16),
    height: verticalScale(16),
  },
  sideContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
