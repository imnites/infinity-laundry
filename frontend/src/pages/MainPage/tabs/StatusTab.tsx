import React, {useState, useEffect, useRef} from 'react';
import {View, StyleSheet, Animated, Easing, Text} from 'react-native';
import Svg, {Circle} from 'react-native-svg';

const StatusTab: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const rotation = useRef(new Animated.Value(0)).current; // Animated value for rotation
  const [stage, setStage] = useState(0);

  useEffect(() => {
    if (loading) {
      // Start rotation animation
      Animated.loop(
        Animated.timing(rotation, {
          toValue: 1,
          duration: 1500,
          easing: Easing.linear,
          useNativeDriver: true
        })
      ).start();

      // Start stage animation
      const stageInterval = setInterval(() => {
        setStage(prevStage => (prevStage + 1) % 4); // Cycle through stages
      }, 2000); // Change stage every 2 seconds

      return () => clearInterval(stageInterval); // Cleanup interval
    } else {
      // Stop rotation animation
      rotation.stopAnimation();
    }
  }, [loading, rotation]);

  const stageLabels = ['Washing', 'Drying', 'Folding', 'Completed'];

  // Display completion message when loading is complete
  if (!loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.completionText}>Laundry completed!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Svg width="100" height="100">
        <Circle
          cx="50"
          cy="50"
          r="40"
          stroke="#E5E5E5"
          strokeWidth="4"
          fill="none"
        />
        <AnimatedCircle
          cx="50"
          cy="50"
          r="40"
          stroke="#00BFFF"
          strokeWidth="4"
          fill="none"
          strokeDasharray="251"
          strokeDashoffset={rotation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 251]
          })}
        />
      </Svg>
      <Text style={styles.stageLabel}>{stageLabels[stage]}</Text>
    </View>
  );
};

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  stageLabel: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333'
  },
  completionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3930d8s'
  }
});

export default StatusTab;
