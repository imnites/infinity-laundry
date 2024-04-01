import React, {useState, useEffect, useRef} from 'react';
import {View, StyleSheet, Animated, Easing, Text} from 'react-native';
import Svg, {Circle} from 'react-native-svg';

interface StatusTabProps {
  route?: any;
}

export const StatusTab: React.FC<StatusTabProps> = ({}) => {
  const [loading, setLoading] = useState(true);
  const [elapsedTime, setElapsedTime] = useState(10);
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

      // Start time counting
      const timerInterval = setInterval(() => {
        setElapsedTime(prevTime => prevTime - 1);
        setLoading(!!elapsedTime);
      }, 1000); // Increment elapsed time every second

      // Set timeout for completion message
      setTimeout(() => {
        setLoading(false);
        clearInterval(timerInterval); // Stop timer
      }, 10000); // Show completion message after 10 seconds

      return () => {
        clearInterval(stageInterval); // Cleanup stage interval
        clearInterval(timerInterval); // Cleanup timer interval
        rotation.stopAnimation(); // Stop rotation animation
      };
    }
  }, [elapsedTime, loading, rotation]);

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
      <Text style={styles.timerText}>{formatTime(elapsedTime)}</Text>
    </View>
  );
};

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
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
    color: '#3930d8'
  },
  timerText: {
    marginTop: 10,
    fontSize: 16,
    color: '#555'
  }
});

export default StatusTab;
