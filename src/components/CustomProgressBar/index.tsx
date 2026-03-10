

import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Svg, {Circle} from 'react-native-svg';
import {useTheme} from '../../utils/themeProvider';
import {createTypographyStyles} from '../../constants/commonStyles';

interface CustomProgressBarProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  showPercentage?: boolean;
  textStyle?: any;
  progressColor?: string;
  backgroundColor?: string;
}

const CustomProgressBar: React.FC<CustomProgressBarProps> = ({
  percentage,
  size = 80,
  strokeWidth = 8,
  showPercentage = true,
  textStyle,
  progressColor,
  backgroundColor,
}) => {
  const {colors} = useTheme();
  const typography = createTypographyStyles(colors);

  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const center = size / 2;
  const progressColorFinal = progressColor || colors.primary;
  const backgroundColorFinal = backgroundColor || colors.backgroundGray;

  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        {/* Background Circle */}
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke={backgroundColorFinal}
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Progress Circle */}
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke={progressColorFinal}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${center} ${center})`}
        />
      </Svg>

      {showPercentage && (
        <View style={[styles.percentageContainer, {width: size, height: size}]}>
          <Text
            style={[typography.valueLarge, styles.percentageText, textStyle]}>
            {Math.round(percentage)}%
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  percentageContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  percentageText: {
    lineHeight: 26,
    textAlign: 'center',
  },
});

export default CustomProgressBar;
