import React, { Component } from 'react';
import ReactNative, { requireNativeComponent, Animated, NativeModules, UIManager, Platform } from 'react-native';


// const NativeTouchBlocker = requireNativeComponent('TouchBlocker', null);

// this is required in order to support native events
const NativeTouchBlocker = (Platform.OS === 'android') ? Animated.createAnimatedComponent(requireNativeComponent('InterceptionBlocker', null)) : null;

// this is required in order to perform imperative commands
const NativeViewManager = NativeModules.InterceptionBlockerManager;

export default class TouchBlocker extends Component {
  constructor(props) {
    super(props);
    
  }

  componentWillMount() {
    // this.chokeTheBridge();
  }

  // this helps us verify that useNativeDriver actually works and we don't rely on the bridge
  chokeTheBridge() {
    let j = 0;
    setInterval(() => {
      for (var index = 0; index < 1e9; index++) {
        j++;
      }
    }, 500);
  }

  render() {
    if (Platform.OS === 'android') {
      return (
        <NativeTouchBlocker
          {...this.props}
        />
      );
    } else {
      return null;
    }
  }

}
