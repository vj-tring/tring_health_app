import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { CustomButton, DashboardHeader } from '../../components';
import { useTheme } from '../../utils/themeProvider';
import createStyles from './styles';
import { verticalScale } from '../../constants';

const WaterScreen = () => {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const goalGlasses = 8;
  const [glassesCount, setGlassesCount] = useState(0);

  const percentage = Math.round((glassesCount / goalGlasses) * 100) || 0;

  const handleAddGlass = () => {
    setGlassesCount(prev => (prev < goalGlasses ? prev + 1 : prev));
  };

  const handleRemoveGlass = () => {
    setGlassesCount(prev => (prev > 0 ? prev - 1 : 0));
  };

  return (
    <View style={styles.container}>
      <DashboardHeader />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.titleSection}>
          <Text style={styles.screenTitle}>Water Intake</Text>
          <Text style={styles.screenSubtitle}>
            Stay hydrated throughout the day
          </Text>
        </View>

        <View style={styles.todayCard}>
          <View style={styles.todayHeaderRow}>
            <View>
              <Text style={styles.todayTitle}>Today's Hydration</Text>
              <Text style={styles.todaySteps}>
                {glassesCount} / {goalGlasses}
              </Text>
            </View>
            <View style={styles.todayCircle}>
              <Ionicons name="water-outline" size={24} color="#ffffff" />
            </View>
          </View>

          <View style={styles.todayGoalRow}>
            <Text style={styles.todayGoalText}>Daily Goal</Text>
            <Text style={styles.todayPercentText}>{percentage}%</Text>
          </View>
          <View style={styles.todayProgressTrack}>
            <View
              style={[styles.todayProgressFill, { width: `${percentage}%` }]}
            />
          </View>
        </View>

        <View style={styles.logCard}>
          <Text style={styles.logTitle}>Track Your Glasses</Text>
          <View style={styles.glassesGrid}>
            {Array.from({length: goalGlasses}).map((_, idx) => {
              const isFilled = idx < glassesCount;
              return (
                <TouchableOpacity
                  key={idx}
                  activeOpacity={0.8}
                  onPress={() => setGlassesCount(idx + 1)}
                  style={[
                    styles.glassTile,
                    isFilled && styles.glassTileFilled,
                  ]}>
                  <Ionicons
                    name="water-outline"
                    size={26}
                    color={isFilled ? '#ffffff' : colors.normalGray}
                  />
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={styles.logRow}>
            <CustomButton
              title="− Remove"
              onPress={handleRemoveGlass}
              buttonStyle={styles.removeButton}
              textStyle={styles.removeButtonText}
            />
            <CustomButton title="+ Add Glass" onPress={handleAddGlass} />
          </View>
        </View>

        <View style={styles.tipsCard}>
          <Text style={styles.tipsTitle}>Hydration Tips</Text>
          <View style={styles.tipRow}>
            <Text style={styles.tipIcon}>💧</Text>
            <Text style={styles.tipText}>
              Drink water first thing in the morning
            </Text>
          </View>
          <View style={styles.tipRow}>
            <Text style={styles.tipIcon}>🥤</Text>
            <Text style={styles.tipText}>
              Keep a water bottle with you throughout the day
            </Text>
          </View>
          <View style={styles.tipRow}>
            <Text style={styles.tipIcon}>⏰</Text>
            <Text style={styles.tipText}>
              Set reminders to drink water regularly
            </Text>
          </View>
          <View style={styles.tipRow}>
            <Text style={styles.tipIcon}>🍋</Text>
            <Text style={styles.tipText}>
              Add lemon or cucumber for flavor
            </Text>
          </View>
          <View style={styles.tipRow}>
            <Text style={styles.tipIcon}>🏃‍♀️</Text>
            <Text style={styles.tipText}>
              Drink extra water when exercising
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default WaterScreen;
