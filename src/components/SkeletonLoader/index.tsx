import React from 'react';
import {View, StyleSheet, ViewStyle} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {useTheme} from '../../utils/themeProvider';

export interface SkeletonLoaderProps {
  /**
   * Only text skeleton is supported.
   * (Older skeleton variants were removed intentionally.)
   */
  type?: 'text';
  count?: number;
  style?: ViewStyle;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  type = 'text',
  count = 1,
  style,
}) => {
  const {colors} = useTheme();

  const renderTextSkeleton = () => (
    <SkeletonPlaceholder
      backgroundColor={colors.backgroundGray}
      highlightColor={colors.white}
      speed={1200}>
      <View style={styles.textContainer}>
        <SkeletonPlaceholder.Item
          width="100%"
          height={16}
          borderRadius={4}
          marginBottom={8}
        />
        <SkeletonPlaceholder.Item
          width="90%"
          height={16}
          borderRadius={4}
          marginBottom={8}
        />
        <SkeletonPlaceholder.Item width="75%" height={16} borderRadius={4} />
      </View>
    </SkeletonPlaceholder>
  );

  const renderSkeleton = () => {
    switch (type) {
      case 'text':
        return renderTextSkeleton();
      default:
        return renderTextSkeleton();
    }
  };

  return (
    <>
      {Array.from({length: count}).map((_, index) => (
        <View key={index} style={[styles.container, style]}>
          {renderSkeleton()}
        </View>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  textContainer: {
    paddingVertical: 16,
  },
});

export default SkeletonLoader;
