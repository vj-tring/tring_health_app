

import React, { useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  State,
} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  fontMedium,
  fonts,
  fontSemiBold,
  horizontalScale,
  verticalScale,
} from '../../constants/fonts';
import { useTheme } from '../../utils/themeProvider';

const {width: screenWidth} = Dimensions.get('window');

interface SimpleSwipeToRefreshProps {
  onSwipeComplete: () => void;
  title?: string;
  subtitle?: string;
}

const SimpleSwipeToRefresh: React.FC<SimpleSwipeToRefreshProps> = ({
  onSwipeComplete,
  title,
  subtitle = 'Swipe to test the functionality',
}) => {
  const {colors} = useTheme();
  const translateX = useRef(new Animated.Value(0)).current;
  const [isSwipeComplete, setIsSwipeComplete] = useState(false);

  const handleGestureEvent = (event: PanGestureHandlerGestureEvent) => {
    translateX.setValue(event.nativeEvent.translationX);
  };

  const handleStateChange = (event: PanGestureHandlerGestureEvent) => {
    const {state, translationX} = event.nativeEvent;

    if (state === State.END) {
      if (translationX >= 100) {
        setIsSwipeComplete(true);
        onSwipeComplete();

        // Reset after a delay
        setTimeout(() => {
          Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: true,
            tension: 100,
            friction: 8,
          }).start();
          setIsSwipeComplete(false);
        }, 1000);
      } else {
        // Reset to initial position
        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: true,
          tension: 100,
          friction: 8,
        }).start();
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* <Text style={[styles.subtitle, {color: colors.textGray}]}>
        {subtitle}
      </Text> */}

      <PanGestureHandler
        onGestureEvent={handleGestureEvent}
        onHandlerStateChange={handleStateChange}>
        <View style={styles.swipeContainer}>
          <LinearGradient
            colors={['#FBA073', '#F37335']}
            start={{x: 0, y: 0}}
            end={{x: 0.3, y: 0}}
            style={styles.gradientContainer}>
            <Animated.View
              style={[
                styles.swipeButton,
                {
                  transform: [{translateX}],
                },
              ]}>
              <View style={styles.swipeContent}>
                <Ionicons name="sync" size={24} color="#fff" style={styles.swipeIcon} />
                <Text style={styles.swipeText}>{title}</Text>
              </View>
            </Animated.View>
          </LinearGradient>
        </View>
      </PanGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // paddingVertical: verticalScale(10),
  },
  swipeContainer: {
    height: verticalScale(55),
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
  },
  gradientContainer: {
    flex: 1,
    borderRadius: 8,
    position: 'relative',
  },
  swipeButton: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: '100%',
    minWidth: 100,
    zIndex: 2,
  },
  swipeContent: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: horizontalScale(16),
    minWidth: 200,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },

  swipeIcon: {
    width: 28,
    height: 28,
    marginRight: horizontalScale(12),
  },
  swipeText: {
    fontSize: fonts.font16,
    fontFamily: fontSemiBold,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: fonts.font14,
    fontFamily: fontMedium,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: verticalScale(12),
  },
  testButton: {
    backgroundColor: '#007AFF',
    paddingVertical: verticalScale(12),
    paddingHorizontal: horizontalScale(20),
    borderRadius: 8,
    alignItems: 'center',
  },
  testButtonText: {
    color: '#FFFFFF',
    fontSize: fonts.font16,
    fontFamily: fontSemiBold,
  },
});

export default SimpleSwipeToRefresh;
