import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { DashboardHeader } from '../../components';
import { useTheme } from '../../utils/themeProvider';
import createStyles from './styles';

type TabKey = 'Overall' | 'Steps' | 'Water';

type RankingRow = {
  id: number;
  position: number;
  initials: string;
  name: string;
  points: number;
  leader?: boolean;
  isYou?: boolean;
};

const mockRankings: Record<TabKey, RankingRow[]> = {
  Overall: [
    {
      id: 1,
      position: 1,
      initials: 'SJ',
      name: 'Sarah Johnson',
      points: 295,
      leader: true,
    },
    { id: 2, position: 2, initials: 'ED', name: 'Emily Davis', points: 268 },
    { id: 3, position: 3, initials: 'MC', name: 'Mike Chen', points: 252 },
    {
      id: 4,
      position: 4,
      initials: 'JW',
      name: 'Jessica Williams',
      points: 212,
    },
    { id: 5, position: 5, initials: 'AR', name: 'Alex Rodriguez', points: 195 },
    {
      id: 6,
      position: 6,
      initials: 'SP',
      name: 'Sandiya P (You)',
      points: 0,
      isYou: true,
    },
  ],
  Steps: [
    {
      id: 1,
      position: 1,
      initials: 'SJ',
      name: 'Sarah Johnson',
      points: 12000,
      leader: true,
    },
    { id: 2, position: 2, initials: 'ED', name: 'Emily Davis', points: 9800 },
    { id: 3, position: 3, initials: 'MC', name: 'Mike Chen', points: 8500 },
    {
      id: 4,
      position: 4,
      initials: 'JW',
      name: 'Jessica Williams',
      points: 7200,
    },
    {
      id: 5,
      position: 5,
      initials: 'AR',
      name: 'Alex Rodriguez',
      points: 6100,
    },
    {
      id: 6,
      position: 6,
      initials: 'SP',
      name: 'Sandiya P (You)',
      points: 0,
      isYou: true,
    },
  ],
  Water: [
    {
      id: 1,
      position: 1,
      initials: 'SJ',
      name: 'Sarah Johnson',
      points: 56,
      leader: true,
    },
    { id: 2, position: 2, initials: 'ED', name: 'Emily Davis', points: 42 },
    { id: 3, position: 3, initials: 'MC', name: 'Mike Chen', points: 38 },
    {
      id: 4,
      position: 4,
      initials: 'JW',
      name: 'Jessica Williams',
      points: 35,
    },
    { id: 5, position: 5, initials: 'AR', name: 'Alex Rodriguez', points: 30 },
    {
      id: 6,
      position: 6,
      initials: 'SP',
      name: 'Sandiya P (You)',
      points: 0,
      isYou: true,
    },
  ],
};

const TABS: TabKey[] = ['Overall', 'Steps', 'Water'];

const RanksScreen = () => {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const [activeTab, setActiveTab] = useState<TabKey>('Overall');

  const rankings = mockRankings[activeTab];

  return (
    <View style={styles.container}>
      <DashboardHeader />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.titleSection}>
          <Text style={styles.screenTitle}>Leaderboard</Text>
          <Text style={styles.screenSubtitle}>See how you rank</Text>
        </View>

        <View style={styles.rankCard}>
          <View style={styles.rankHeaderRow}>
            <View>
              <Text style={styles.rankTitle}>Your Rank</Text>
              <Text style={styles.rankValue}>#6</Text>
            </View>
            <View style={styles.rankCircle}>
              <Ionicons name="trophy-outline" size={24} color="#ffffff" />
            </View>
          </View>
          <View style={styles.rankFooterRow}>
            <View style={styles.rankPointsBlock}>
              <Text style={styles.rankPointsLabel}>Total Points</Text>
              <Text style={styles.rankPointsValue}>0</Text>
            </View>
          </View>
        </View>

        <View style={styles.tabsContainer}>
          {TABS.map(tab => {
            const isActive = tab === activeTab;
            return (
              <TouchableOpacity
                key={tab}
                style={[styles.tabItem, isActive && styles.tabItemActive]}
                activeOpacity={0.8}
                onPress={() => setActiveTab(tab)}
              >
                <Text
                  style={[styles.tabText, isActive && styles.tabTextActive]}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={styles.sectionTitle}>{activeTab} Rankings</Text>

        {rankings.map(row => {
          const isYou = row.isYou === true;
          const pos = row.position;
          const positionCircleStyle = [
            styles.rankPositionCircle,
            pos === 1 && styles.rankBadgeGold,
            pos === 2 && styles.rankBadgeSilver,
            pos === 3 && styles.rankBadgeBronze,
            pos >= 4 && styles.rankPositionCircleDefault,
          ];
          return (
            <View
              key={row.id}
              style={[styles.rankingCard, isYou && styles.rankingCardYou]}
            >
              <View style={styles.rankingLeft}>
                <View style={positionCircleStyle}>
                  {pos === 1 && (
                    <Ionicons name="trophy" size={18} color="#B45309" />
                  )}
                  {pos === 2 && (
                    <Ionicons name="medal-outline" size={18} color="#6B7280" />
                  )}
                  {pos === 3 && (
                    <Ionicons name="ribbon-outline" size={18} color="#EA580C" />
                  )}
                  {pos >= 4 && (
                    <Text
                      style={[
                        styles.rankPositionText,
                        isYou && styles.rankPositionTextYou,
                      ]}
                    >
                      #{pos}
                    </Text>
                  )}
                </View>
                <View
                  style={[
                    styles.rankBadge,
                    styles.rankBadgeDefault,
                    isYou && styles.rankBadgeYou,
                  ]}
                >
                  <Text
                    style={[
                      styles.rankInitials,
                      isYou && styles.rankInitialsYou,
                    ]}
                  >
                    {row.initials}
                  </Text>
                </View>
                <View>
                  <Text style={styles.rankingName}>{row.name}</Text>
                  <Text style={styles.rankingPoints}>{row.points} pts</Text>
                </View>
              </View>
              {row.leader && (
                <View style={styles.rankingRightBadge}>
                  <Text style={styles.rankingRightBadgeText}>⚡ Leader</Text>
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default RanksScreen;
