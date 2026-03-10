import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  CustomButton,
  CustomCard,
  TextInput as CustomInput,
  DashboardHeader,
} from '../../components';
import { useTheme } from '../../utils/themeProvider';
import createStyles from './styles';

const StepsScreen = () => {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const [stepInput, setStepInput] = useState('');

  const handleChangeSteps = (value: string) => {
    const onlyDigits = value.replace(/[^0-9]/g, '');
    setStepInput(onlyDigits);
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
          <Text style={styles.screenTitle}>Steps Tracker</Text>
          <Text style={styles.screenSubtitle}>Track your daily steps</Text>
        </View>
        <CustomCard>
          <View style={styles.todayHeaderRow}>
            <View>
              <Text style={styles.todayTitle}>Today's Steps</Text>
              <Text style={styles.todaySteps}>0</Text>
            </View>
            <View style={styles.todayCircle}>
              <Ionicons name="walk-outline" size={24} color="#ffffff" />
            </View>
          </View>

          <View style={styles.todayGoalRow}>
            <Text style={styles.todayGoalText}>Goal: 10,000</Text>
            <Text style={styles.todayPercentText}>0%</Text>
          </View>
          <View style={styles.todayProgressTrack}>
            <View style={[styles.todayProgressFill, { width: '0%' }]} />
          </View>
        </CustomCard>

        <View style={styles.logCard}>
          <Text style={styles.logTitle}>Log Steps</Text>
          <View style={styles.logRow}>
            <CustomInput
              label=""
              value={stepInput}
              onChangeText={handleChangeSteps}
              placeholder="Enter steps"
              keyboardType="numeric"
              inputContainerStyle={styles.logInput}
              containerStyle={styles.logInputContainer}
            />
            <CustomButton title="+ Add" onPress={() => {}} />
          </View>
        </View>

        <View style={styles.miniCardsRow}>
          <View style={styles.miniCard}>
            <Text style={styles.miniLabel}>Weekly Average</Text>
            <Text style={styles.miniValue}>0</Text>
            <Text style={styles.miniSubtext}>steps/day</Text>
          </View>

          <View style={styles.miniCard}>
            <Text style={styles.miniLabel}>This Week</Text>
            <Text style={styles.miniValue}>0</Text>
            <Text style={styles.miniSubtext}>total steps</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default StepsScreen;
