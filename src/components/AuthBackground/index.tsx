import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import Svg, {Circle, Defs, LinearGradient, Stop, Rect} from 'react-native-svg';

const {width: W, height: H} = Dimensions.get('window');

export default function AuthBackground() {
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">

      <Svg width={W} height={H} style={StyleSheet.absoluteFill}>

        <Defs>
          {/* App matching gradient */}
          <LinearGradient id="bg" x1="0" y1="0" x2="0" y2={H}>
            <Stop offset="0%" stopColor="#F8FAFF"/>
            <Stop offset="100%" stopColor="#E6ECFF"/>
          </LinearGradient>
        </Defs>

        {/* Base background */}
        <Rect width={W} height={H} fill="url(#bg)" />

        {/* Large corner bubbles */}
        <Circle cx={-60} cy={H * 0.25} r={120} fill="rgba(99,102,241,0.12)" />
        <Circle cx={W + 40} cy={H * 0.35} r={110} fill="rgba(99,102,241,0.10)" />

        {/* Bottom bubbles */}
        <Circle cx={W * 0.15} cy={H + 40} r={140} fill="rgba(99,102,241,0.10)" />
        <Circle cx={W * 0.9} cy={H * 0.8} r={70} fill="rgba(99,102,241,0.08)" />

        {/* Small subtle bubbles */}
        <Circle cx={W * 0.75} cy={H * 0.2} r={25} fill="rgba(99,102,241,0.15)" />
        <Circle cx={W * 0.35} cy={H * 0.75} r={20} fill="rgba(99,102,241,0.15)" />

      </Svg>

    </View>
  );
}