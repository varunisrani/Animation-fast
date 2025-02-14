import React, { useRef } from 'react';
import { StyleSheet, View, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import type { View as ViewType } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Logo from '@/components/Logo';

const { width } = Dimensions.get('window');

// Create a ref that can be accessed from splash screen
export const centerButtonRef = { current: null as any }; // Using any for the ref to allow measure function

const DateButton = ({ label, isActive }: { label: string; isActive?: boolean }) => (
  <TouchableOpacity 
    style={[
      styles.dateButton,
      isActive && styles.activeDateButton
    ]}
  >
    <ThemedText style={[styles.dateButtonText, isActive && styles.activeDateButtonText]}>
      {label}
    </ThemedText>
  </TouchableOpacity>
);

const RaceMeetingCard = () => (
  <View style={styles.raceCard}>
    <View style={styles.raceCardContent}>
      {/* Race meeting content will go here */}
    </View>
  </View>
);

const TabBarIcon = ({ name, label, isActive, isCenter }: { name: any; label: string; isActive?: boolean; isCenter?: boolean }) => (
  <TouchableOpacity 
    style={[styles.tabBarItem, isCenter && styles.centerTabItem]}
    ref={isCenter ? (ref) => { 
      if (ref) {
        centerButtonRef.current = ref;
      }
    } : null}
  >
    {isCenter ? (
      <View style={styles.centerButton}>
        <Logo width={40} height={40} />
      </View>
    ) : (
      <>
        <Ionicons name={name} size={24} color={isActive ? '#4B0082' : '#666'} />
        <ThemedText style={[styles.tabLabel, isActive && styles.activeTabLabel]}>{label}</ThemedText>
      </>
    )}
  </TouchableOpacity>
);

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#4B0082', '#800080']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <ThemedText style={styles.title}>RACE MEETINGS</ThemedText>
          <Ionicons name="settings-outline" size={24} color="white" style={styles.settingsIcon} />
        </View>
        
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.dateButtonsContainer}
        >
          <DateButton label="TODAY" isActive />
          <DateButton label="TOMORROW" />
          <DateButton label="THU 02" />
          <DateButton label="FRI 03" />
          <DateButton label="SAT 04" />
        </ScrollView>
      </LinearGradient>

      <ScrollView style={styles.content}>
        <RaceMeetingCard />
        <RaceMeetingCard />
        <RaceMeetingCard />
        <RaceMeetingCard />
        <RaceMeetingCard />
      </ScrollView>

      <View style={styles.tabBar}>
        <TabBarIcon name="cube-outline" label="Meetings" isActive />
        <TabBarIcon name="analytics-outline" label="Predictions" />
        <TabBarIcon name="person-outline" label="Hey Buddy" isCenter />
        <TabBarIcon name="stats-chart-outline" label="Results" />
        <TabBarIcon name="ticket-outline" label="Betslip" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 15,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  settingsIcon: {
    marginLeft: 'auto',
  },
  dateButtonsContainer: {
    paddingHorizontal: 15,
    gap: 10,
  },
  dateButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  activeDateButton: {
    backgroundColor: '#9932CC',
  },
  dateButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  activeDateButtonText: {
    color: 'white',
  },
  content: {
    flex: 1,
    padding: 15,
  },
  raceCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 15,
    height: 120,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  raceCardContent: {
    padding: 15,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  tabBarItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerTabItem: {
    marginTop: -45,
    position: 'absolute',
    left: '50%',
    transform: [{
      translateX: -30
    }]
  },
  centerButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4B0082',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  tabLabel: {
    fontSize: 12,
    marginTop: 4,
    color: '#666',
  },
  activeTabLabel: {
    color: '#4B0082',
  },
});
