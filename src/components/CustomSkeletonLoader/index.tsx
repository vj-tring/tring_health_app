

import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View, ViewStyle } from 'react-native';
import { AppColors } from '../../constants/colors';
import { createCommonStyles } from '../../constants/commonStyles';
import { useTheme } from '../../utils/themeProvider';

interface SkeletonLoaderProps {
  type?: 'text' | 'circle' | 'rect' | 'card' | 'badge' | 'custom';
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  style?: ViewStyle;
  count?: number;
  animated?: boolean;
  children?: React.ReactNode;
}

const CustomSkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  type = 'rect',
  width = '100%',
  height = 20,
  borderRadius = 4,
  style,
  count = 1,
  animated = true,
  children,
}) => {
  const {colors} = useTheme();
  const styles = createSkeletonStyles(colors);
  const shimmerAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (animated) {
      const shimmer = Animated.loop(
        Animated.sequence([
          Animated.timing(shimmerAnimation, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(shimmerAnimation, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]),
      );
      shimmer.start();
      return () => shimmer.stop();
    }
  }, [animated, shimmerAnimation]);

  const getSkeletonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      width: width as any,
      height: height as any,
      backgroundColor: colors.lightGray,
      borderRadius: type === 'circle' ? 999 : borderRadius,
    };

    if (animated) {
      const opacity = shimmerAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [0.3, 0.7],
      });
      return {
        ...baseStyle,
        opacity,
      };
    }

    return baseStyle;
  };

  const renderSkeleton = () => {
    if (children) {
      return <View style={[styles.container, style]}>{children}</View>;
    }

    if (count > 1) {
      return (
        <View style={[styles.container, style]}>
          {Array.from({length: count}, (_, index) => (
            <Animated.View
              key={index}
              style={[getSkeletonStyle(), index < count - 1 && styles.spacing]}
            />
          ))}
        </View>
      );
    }

    return <Animated.View style={[getSkeletonStyle(), style]} />;
  };

  return renderSkeleton();
};

// Predefined skeleton components for common use cases
export const SkeletonText: React.FC<{
  lines?: number;
  width?: number | string;
  height?: number;
  style?: ViewStyle;
}> = ({lines = 1, width = '100%', height = 16, style}) => (
  <CustomSkeletonLoader
    type="rect"
    width={width}
    height={height}
    count={lines}
    style={style}
  />
);

export const SkeletonCircle: React.FC<{
  size?: number;
  style?: ViewStyle;
}> = ({size = 40, style}) => (
  <CustomSkeletonLoader
    type="circle"
    width={size}
    height={size}
    style={style}
  />
);

export const SkeletonCard: React.FC<{
  width?: number | string;
  height?: number;
  style?: ViewStyle;
}> = ({width = '100%', height = 100, style}) => (
  <CustomSkeletonLoader
    type="rect"
    width={width}
    height={height}
    borderRadius={8}
    style={style}
  />
);

export const SkeletonBadge: React.FC<{
  width?: number;
  height?: number;
  style?: ViewStyle;
}> = ({width = 40, height = 20, style}) => (
  <CustomSkeletonLoader
    type="rect"
    width={width}
    height={height}
    borderRadius={10}
    style={style}
  />
);

// Home Dashboard specific skeleton components
export const HomeSummaryCardSkeleton: React.FC<{
  style?: ViewStyle;
}> = ({style}) => {
  const {colors} = useTheme();
  const commonStyles = createCommonStyles(colors);
  const styles = createSkeletonStyles(colors);

  return (
    <View
      style={[
        commonStyles.components.card,
        {
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: 'row',
          marginBottom: 12,
          padding: 16,
          borderWidth: 0,
          backgroundColor: colors.veryLightGray,
        },
        style,
      ]}>
      <View style={styles.summaryCardContent}>
        <CustomSkeletonLoader
          type="rect"
          width={24}
          height={24}
          borderRadius={4}
          style={{marginRight: 8}}
        />
        <CustomSkeletonLoader
          type="rect"
          width={60}
          height={16}
          borderRadius={4}
        />
      </View>
      <CustomSkeletonLoader
        type="rect"
        width={40}
        height={24}
        borderRadius={4}
      />
    </View>
  );
};

export const HomeStatusCardSkeleton: React.FC<{
  style?: ViewStyle;
}> = ({style}) => {
  const {colors} = useTheme();
  const commonStyles = createCommonStyles(colors);
  const styles = createSkeletonStyles(colors);

  return (
    <View
      style={[
        commonStyles.components.card,
        {
          borderWidth: 0,
          backgroundColor: colors.veryLightGray,
          marginBottom: 12,
          padding: 16,
          paddingVertical: 24,
        },
        style,
      ]}>
      <View style={styles.statusCardContent}>
        <View style={styles.statusCardText}>
          <CustomSkeletonLoader
            type="rect"
            width={120}
            height={18}
            borderRadius={4}
            style={{marginBottom: 8}}
          />
          <CustomSkeletonLoader
            type="rect"
            width={200}
            height={14}
            borderRadius={4}
          />
        </View>
        <CustomSkeletonLoader type="circle" width={40} height={40} />
      </View>
    </View>
  );
};

const createSkeletonStyles = (colors: AppColors) => {
  return StyleSheet.create({
    container: {
      flexDirection: 'column',
    },
    spacing: {
      marginBottom: 8,
    },
    summaryCardContent: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    statusCardContent: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    statusCardText: {
      flex: 1,
    },
  });
};

export default CustomSkeletonLoader;
