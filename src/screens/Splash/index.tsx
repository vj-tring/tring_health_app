import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native';
import createStyles from './styles';
import {useTheme} from '../../utils/themeProvider';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  Easing,
  interpolate,
} from 'react-native-reanimated';
import Logo from '../../assets/images/logo.svg';

const Splash = () => {
  const {colors} = useTheme();
  const styles = createStyles(colors);
  // Initialize animation values using Reanimated shared values
  const opacity = useSharedValue(0); // Controls fade-in effect
  const translateY = useSharedValue(30); // Controls vertical movement
  const scale = useSharedValue(0.8); // Controls size scaling
  const rotate = useSharedValue(0); // Controls rotation
  const textOpacity = useSharedValue(0); // Controls text fade-in

  // Set up animation sequence when component mounts
  useEffect(() => {
    // Fade in the main element
    opacity.value = withTiming(1, {duration: 600});
    // Spring animation for vertical movement
    translateY.value = withSpring(0, {damping: 8});
    // Spring animation for scaling effect
    scale.value = withSpring(1.1, {damping: 6, stiffness: 100});
    // Smooth rotation animation
    rotate.value = withTiming(360, {
      duration: 1000,
      easing: Easing.out(Easing.exp),
    });
    // Delayed text fade-in
    setTimeout(() => {
      textOpacity.value = withTiming(1, {duration: 600});
    }, 900);
  }, []);

  // Create animated style combining all animations
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [
        {translateY: translateY.value}, // Vertical movement
        {scale: scale.value}, // Scaling effect
        {
          rotate: `${interpolate(rotate.value, [0, 360], [0, 360])}deg`, // Rotation
        },
      ],
    };
  });

  return (
    <SafeAreaView style={styles.background}>
      <Animated.View style={[styles.imgHolder, animatedStyle]}>
        <Logo width={88} height={88} />
      </Animated.View>
    </SafeAreaView>
  );
};

export default Splash;
