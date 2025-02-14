# Customizing the Splash Screen Animation

## How to Modify Animation Parameters

### 1. Timing Adjustments
```typescript
// Adjust initial delay
Animated.delay(Platform.OS === 'android' ? 100 : 50)

// Modify logo fade duration
Animated.timing(logoOpacity, {
  duration: Platform.OS === 'android' ? 300 : 400  // Increase/decrease for slower/faster fade
})

// Change final fade delay
Animated.delay(Platform.OS === 'android' ? 1200 : 350) // Adjust how long circle stays before fading
```

### 2. Spring Animation Tuning
```typescript
// Modify spring behavior
Animated.spring(purpleScale, {
  damping: 12,     // Higher = less bounce (8-20)
  stiffness: 40,   // Higher = faster movement (30-100)
  mass: 1,         // Higher = more inertia (0.5-2)
  velocity: 0.05   // Initial velocity
})
```

### 3. Size Modifications
```typescript
// In styles/splash.styles.ts
const PURPLE_CIRCLE_SIZE = Math.min(SCREEN_SIZE * 0.75, height * 0.6);
const LOGO_SIZE = SCREEN_SIZE * 0.22;

// In splash.tsx
const EXPAND_SCALE = Platform.OS === 'android' ? 1.3 : 1.5;
const buttonSize = 60; // Final circle size
```

## Common Customizations

### 1. Change Animation Path
```typescript
// Add horizontal movement
const purpleTranslateX = useRef(new Animated.Value(0)).current;

// In animation sequence
Animated.spring(purpleTranslateX, {
  toValue: someXPosition,
  useNativeDriver: true,
  damping: 12,
  stiffness: 40
})

// Add to transform array
transform: [
  { translateY: purpleTranslateY },
  { translateX: purpleTranslateX },
  { scale: purpleScale }
]
```

### 2. Modify Colors
```typescript
// In styles
backgroundColor: '#4B0082' // Change purple color

// For gradient background
<LinearGradient
  colors={['#4B0082', '#800080']}
  style={styles.container}
/>
```

### 3. Add New Animations
```typescript
// Add rotation
const rotate = useRef(new Animated.Value(0)).current;

// In animation sequence
Animated.timing(rotate, {
  toValue: 1,
  duration: 500,
  useNativeDriver: true
})

// In transform
transform: [
  // ... existing transforms
  {
    rotate: rotate.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    })
  }
]
```

## Platform-Specific Customizations

### Android Adjustments
```typescript
if (Platform.OS === 'android') {
  // Adjust timings
  const ANIMATION_DURATION = 300;
  const SPRING_CONFIG = {
    damping: 15,
    stiffness: 50,
    mass: 1.2
  };
}
```

### iOS Adjustments
```typescript
if (Platform.OS === 'ios') {
  // Smoother animations
  const ANIMATION_DURATION = 400;
  const SPRING_CONFIG = {
    damping: 12,
    stiffness: 40,
    mass: 1
  };
}
```

## Performance Optimization Tips

### 1. Layout Measurement
```typescript
// Increase measurement delay if needed
const measureTimer = setTimeout(() => {
  // measurement code
}, 150); // Adjust if measurements are inaccurate
```

### 2. Animation Cleanup
```typescript
// Proper cleanup
useEffect(() => {
  const animation = Animated.sequence([/*...*/]);
  const animationStart = animation.start();
  
  return () => {
    animationStart.stop();
    clearTimeout(measureTimer);
  };
}, []);
```

### 3. Memory Management
```typescript
// Reset values when component unmounts
useEffect(() => {
  return () => {
    purpleScale.setValue(1);
    purpleTranslateY.setValue(0);
    // Reset other animated values
  };
}, []);
```

## Troubleshooting Common Issues

### 1. Position Mismatch
- Ensure measurements are taken after layout is complete
- Check if status bar height is affecting measurements
- Verify screen orientation handling

### 2. Animation Glitches
- Confirm `useNativeDriver: true` is set
- Reduce complexity of parallel animations
- Check for JS thread blocking

### 3. Performance Issues
- Use `useCallback` for animation functions
- Minimize state updates during animation
- Avoid unnecessary re-renders

## Best Practices

1. **Testing**
   - Test on different screen sizes
   - Verify behavior on both platforms
   - Check orientation changes

2. **Maintenance**
   - Keep animation logic separate
   - Document timing changes
   - Use constants for magic numbers

3. **Accessibility**
   - Add appropriate delays for screen readers
   - Provide skip animation option
   - Consider reduced motion settings 