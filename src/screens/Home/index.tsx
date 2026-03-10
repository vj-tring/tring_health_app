import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  CustomCard,
  CustomProgressBar,
  DashboardHeader,
} from '../../components';
import { useTheme } from '../../utils/themeProvider';
import createStyles from './styles';
import SCREEN from '../../navigation/screenNames';

const greeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning!';
  if (hour < 17) return 'Good afternoon!';
  return 'Good evening!';
};

type SummaryItem = {
  label: string;
  value: string;
  subtext: string;
  icon: string;
  iconBg: string;
  progress?: number;
};

type SummaryCardsProps = {
  items: SummaryItem[];
  styles: ReturnType<typeof createStyles>;
  primaryColor: string;
  onPress: (label: string) => void;
};

const SummaryCards: React.FC<SummaryCardsProps> = ({
  items,
  styles,
  primaryColor,
  onPress,
}) => {
  return (
    <View style={styles.cardsGrid}>
      {items.map(item => (
        <TouchableOpacity
          key={item.label}
          style={styles.summaryCard}
          activeOpacity={0.9}
          onPress={() => onPress(item.label)}
        >
          <View style={[styles.iconCircle, { backgroundColor: item.iconBg }]}>
            <Ionicons name={item.icon as any} size={24} color={primaryColor} />
          </View>
          <Text style={styles.summaryLabel}>{item.label}</Text>
          <Text style={styles.summaryValue}>{item.value}</Text>
          <Text style={styles.summarySubtext}>{item.subtext}</Text>
          {'progress' in item && item.progress !== undefined && (
            <View style={styles.summaryProgressBar}>
              <View
                style={[
                  styles.summaryProgressFill,
                  { width: `${item.progress}%` },
                ]}
              />
            </View>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const HomeScreen = () => {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const navigation = useNavigation<any>();

  // Temporary demo data for UI – simple weekly average
  const avgK = '8.2';

  const summaryCards = [
    {
      label: 'Steps',
      value: '0.0k',
      subtext: 'of 10k goal',
      icon: 'walk-outline' as const,
      iconBg: colors.lightBlue,
      progress: 0,
    },
    {
      label: 'Water',
      value: '0/8',
      subtext: 'glasses today',
      icon: 'water-outline' as const,
      iconBg: colors.lightBlue,
    },
    {
      label: 'Meals',
      value: '0/3',
      subtext: 'meals logged',
      icon: 'restaurant-outline' as const,
      iconBg: colors.lightGreen,
    },
    {
      label: 'Ranks',
      value: '#0',
      subtext: 'Leaderboard',
      icon: 'trophy-outline' as const,
      iconBg: colors.lightOrange || '#F373351A',
    },
  ];

  return (
    <View style={styles.container}>
      <DashboardHeader />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>{greeting()}</Text>
          <Text style={styles.welcomeSubtitle}>Here's your health summary</Text>
        </View>

        <CustomCard>
          <View style={styles.progressCardHeader}>
            <View>
              <Text style={styles.progressCardLabel}>Overall Progress</Text>
              <Text style={styles.progressPercent}>50%</Text>
            </View>
            <CustomProgressBar
              percentage={50}
              size={72}
              strokeWidth={8}
              showPercentage={false}
              progressColor={colors.white}
              backgroundColor="rgba(255,255,255,0.25)"
              centerContent={
                <Ionicons name="pulse-outline" size={26} color={colors.white} />
              }
            />
          </View>
          <Text style={styles.progressFooter}>
            Let's get started! Every step counts!
          </Text>
        </CustomCard>

        <View style={styles.weeklyCard}>
          <View style={styles.weeklyHeaderRow}>
            <View>
              <Text style={styles.weeklyTitle}>Weekly average steps</Text>
              <Text style={styles.weeklySubtext}>Last 7 days</Text>
            </View>
            <Text style={styles.weeklySubtext}>{avgK}k / day</Text>
          </View>
          <View style={styles.weeklyBarTrack}>
            <View style={[styles.weeklyBarFill, { width: '82%' }]} />
          </View>
          <Text style={styles.weeklyFooterText}>
            Keep moving to reach your 10k daily goal.
          </Text>
        </View>

        <SummaryCards
          items={summaryCards}
          styles={styles}
          primaryColor={colors.primary}
          onPress={label => {
            if (label === 'Steps') {
              navigation.navigate(SCREEN.STEPS_SCREEN as never);
            } else if (label === 'Water') {
              navigation.navigate(SCREEN.WATER_SCREEN as never);
            } else if (label === 'Meals') {
              navigation.navigate(SCREEN.MEALS_SCREEN as never);
            } else if (label === 'Ranks') {
              navigation.navigate(SCREEN.RANKS_SCREEN as never);
            }
          }}
        />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
