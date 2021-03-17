import React, {Ref, useEffect, useImperativeHandle, forwardRef} from 'react';
import {Dimensions, StyleSheetProperties} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
//Size
const MODALSİZE = {
  width: Dimensions.get('window').width * 0.9,
  height: Dimensions.get('window').height * 0.5,
};
interface Props {
  children?: JSX.Element | JSX.Element[] | string | string[];
  styles?: any;
}

const CardModal = ({children, styles}: Props, ref: Ref<any>) => {
  const isVisible = useSharedValue(false);
  useEffect(() => {
    isVisible.value = true;
  }, []);
  useImperativeHandle(ref, () => ({
    visibleChanger() {
      isVisible.value = !isVisible.value;
    },
  }));

  const uas = useAnimatedStyle(() => {
    return {
      bottom: withTiming(isVisible.value ? 10 : -MODALSİZE.height, {
        duration: isVisible.value ? 300 : 300,
        easing: Easing.bezier(0.64, 0, 0.78, 0),
      }),
      transform: [
        {
          rotateX: withTiming(isVisible.value ? '0deg' : '-80deg', {
            duration: isVisible.value ? 300 : 300,
            easing: Easing.bezier(0.64, 0, 0.78, 0),
          }),
        },
      ],
    };
  });
  return (
    <Animated.View
      style={[
        {
          ...MODALSİZE,
          backgroundColor: 'black',
          borderRadius: 20,
          position: 'absolute',
          overflow:'hidden',
          ...styles,
        },
        uas,
      ]}>
      {children}
    </Animated.View>
  );
};

export default forwardRef(CardModal);
