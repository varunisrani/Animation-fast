import React, { useEffect, useRef, useState } from 'react';
import { View, Animated, Dimensions, Easing, StyleSheet, Platform } from 'react-native';
import { router } from 'expo-router';
import Logo from '../components/Logo';
import HomeScreen from './(tabs)';
import { styles } from './styles/splash.styles';
import { centerButtonRef } from './(tabs)';

const { height, width } = Dimensions.get('window');
const EXPAND_SCALE = 1.5;

export default function SplashScreen() {
  const [showHomeScreen, setShowHomeScreen] = useState(false);
  const [finalPosition, setFinalPosition] = useState(0);
  const [finalScale, setFinalScale] = useState(0);
  const logoScale = useRef(new Animated.Value(1)).current;
  const logoOpacity = useRef(new Animated.Value(1)).current;
  const purpleTranslateY = useRef(new Animated.Value(0)).current;
  const purpleTranslateX = useRef(new Animated.Value(0)).current;
  const purpleScale = useRef(new Animated.Value(1)).current;
  const homeScreenOpacity = useRef(new Animated.Value(0)).current;
  const purpleCircleOpacity = useRef(new Animated.Value(1)).current;
  const backgroundOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Wait a bit for the home screen to render
    const measureTimer = setTimeout(() => {
      if (centerButtonRef.current) {
        // Get the dimensions of the purple circle from styles
        const purpleCircleSize = height * 0.8; // This matches the styles
        
        centerButtonRef.current.measure((x: number, y: number, width: number, height: number, pageX: number, pageY: number) => {
          // Calculate exact center position
          const centerY = pageY + (height / 2);
          // Calculate the exact center position accounting for the purple circle size
          setFinalPosition(centerY - (purpleCircleSize / 2));
          
          // Calculate the scale needed to match the center button size (60px)
          const buttonSize = 60; // Size of the center button
          setFinalScale(buttonSize / purpleCircleSize);
        });
      }
    }, 100);

    return () => clearTimeout(measureTimer);
  }, []);

  useEffect(() => {
    if (!finalPosition || !finalScale) return;

    const timer = setTimeout(() => {
      Animated.sequence([
        Animated.delay(50),
        // First expand the circle
        Animated.spring(purpleScale, {
          toValue: EXPAND_SCALE,
          useNativeDriver: true,
          damping: 12,
          stiffness: 40,
          mass: 1
        }),
        // Fade out logo first
        Animated.timing(logoOpacity, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true
        }),
        // Then start the circle movement and screen transition
        Animated.parallel([
          // Move circle to bottom
          Animated.spring(purpleTranslateY, {
            toValue: finalPosition,
            useNativeDriver: true,
            damping: 12,
            stiffness: 40,
            mass: 1,
            velocity: 0.05
          }),
          // Shrink circle to final size
          Animated.spring(purpleScale, {
            toValue: finalScale,
            useNativeDriver: true,
            damping: 12,
            stiffness: 40,
            mass: 1
          }),
          // Fade in home screen
          Animated.timing(homeScreenOpacity, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
            easing: Easing.out(Easing.ease)
          }),
          // Fade out background
          Animated.timing(backgroundOpacity, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
            easing: Easing.out(Easing.ease)
          }),
          // Fade out circle immediately after reaching position
          Animated.sequence([
            Animated.delay(1200),
            Animated.timing(purpleCircleOpacity, {
              toValue: 0,
              duration: 10,
              useNativeDriver: true,
              easing: Easing.linear
            })
          ])
        ]),
      ]).start(() => {
        setShowHomeScreen(true);
      });
    }, 400);

    return () => clearTimeout(timer);
  }, [finalPosition, finalScale]);

  return (
    <View style={styles.container}>
      <Animated.View 
        style={[
          styles.homeScreenContainer,
          { opacity: homeScreenOpacity }
        ]} 
      >
        <HomeScreen />
      </Animated.View>

      {!showHomeScreen && (
        <>
          <Animated.View 
            style={[
              { ...StyleSheet.absoluteFillObject },
              { backgroundColor: '#4B0082', opacity: backgroundOpacity, zIndex: 4 }
            ]} 
          />

          <Animated.View
            style={[
              styles.purpleCircle,
              {
                opacity: purpleCircleOpacity,
                transform: [
                  { translateY: purpleTranslateY },
                  { translateX: purpleTranslateX },
                  { scale: purpleScale }
                ],
                zIndex: 2
              }
            ]}
          />

          <Animated.View
            style={[
              styles.logoWrapper,
              {
                opacity: logoOpacity,
                transform: [{ scale: logoScale }],
                zIndex: 5
              }
            ]}
          >
            <Logo width={120} height={120} />
          </Animated.View>
        </>
      )}
    </View>
  );
}