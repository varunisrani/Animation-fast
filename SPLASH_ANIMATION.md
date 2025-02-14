# Splash Screen Animation Implementation

## Overview
This document explains the implementation of a custom splash screen animation where a purple circle expands, moves to the tab bar's center button position, and smoothly transitions into it.

## Key Components

### 1. Ref System
```typescript
// In index.tsx
export const centerButtonRef = { current: null as any };

// Used in TabBarIcon component
ref={isCenter ? (ref) => { 
  if (ref) {
    centerButtonRef.current = ref;
  }
} : null}
```
- We use a ref to get the exact position of the center button in the tab bar
- This ref is exported and accessible from the splash screen

### 2. Position Measurement
```typescript
centerButtonRef.current.measure((x, y, width, height, pageX, pageY) => {
  const centerY = pageY + (height / 2);
  setFinalPosition(centerY - (purpleCircleSize / 2));
  
  const buttonSize = 60; // Size of the center button
  setFinalScale(buttonSize / purpleCircleSize);
});
```
- Uses the `measure` function to get exact coordinates
- Calculates center position and required scale
- Ensures perfect alignment with the tab bar button

### 3. Animation Sequence

#### Initial Setup
```typescript
const purpleTranslateY = useRef(new Animated.Value(0)).current;
const purpleScale = useRef(new Animated.Value(1)).current;
const purpleCircleOpacity = useRef(new Animated.Value(1)).current;
```

#### Animation Flow
1. **Expand Phase**
```typescript
Animated.spring(purpleScale, {
  toValue: EXPAND_SCALE,
  useNativeDriver: true,
  damping: 12,
  stiffness: 40,
  mass: 1
})
```
- Circle expands to create visual impact

2. **Logo Fade**
```typescript
Animated.timing(logoOpacity, {
  toValue: 0,
  duration: 400,
  useNativeDriver: true
})
```
- Logo smoothly fades out

3. **Movement & Transition**
```typescript
Animated.parallel([
  // Move to position
  Animated.spring(purpleTranslateY, {
    toValue: finalPosition,
    useNativeDriver: true,
    damping: 12,
    stiffness: 40
  }),
  // Shrink to button size
  Animated.spring(purpleScale, {
    toValue: finalScale,
    useNativeDriver: true,
    damping: 12,
    stiffness: 40
  })
])
```
- Circle moves to final position
- Simultaneously scales to match button size

4. **Final Fade**
```typescript
Animated.sequence([
  Animated.delay(1200),
  Animated.timing(purpleCircleOpacity, {
    toValue: 0,
    duration: 10,
    useNativeDriver: true
  })
])
```
- Circle fades out after reaching position

## Platform-Specific Adjustments
```typescript
const EXPAND_SCALE = Platform.OS === 'android' ? 1.3 : 1.5;
```
- Different scaling for Android and iOS
- Adjusted timings for each platform
- Custom spring configurations for smoother movement

## Key Features
1. **Responsive Sizing**
   - All measurements are based on screen dimensions
   - Adapts to different device sizes

2. **Smooth Transitions**
   - Uses spring animations for natural movement
   - Carefully timed sequences for fluid motion

3. **Performance**
   - Uses `useNativeDriver: true` for optimal performance
   - Minimizes JavaScript bridge usage

4. **Accurate Positioning**
   - Uses direct measurements instead of calculations
   - Ensures perfect alignment with tab bar button

## Usage
The animation automatically starts when the splash screen mounts. It:
1. Measures the target position
2. Executes the animation sequence
3. Transitions to the main app interface

## Implementation Notes
- The animation uses refs to prevent unnecessary re-renders
- All measurements are done after initial render
- Animation sequence waits for measurements to complete
- Uses cleanup functions to prevent memory leaks 