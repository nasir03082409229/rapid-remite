import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Animated, StyleProp, View, ViewStyle,Text, TouchableOpacity } from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  PanGestureHandlerStateChangeEvent,
  State
} from 'react-native-gesture-handler';
import  FontAwesome  from 'react-native-vector-icons/FontAwesome';
import  AntDesign  from 'react-native-vector-icons/AntDesign';

import { Avatar } from 'react-native-elements';
// import { BlurView } from 'expo-blur';

type Item = {
  name: string;
  color: string;
};

type Props = {
  size?: number;
  iconSize?: number;
  dragSpeed?: number;
  contentContainerStyle?: StyleProp<ViewStyle>;
  circleStyle?: StyleProp<ViewStyle>,
  blurredView?: {
    tint: 'light' | 'default' | 'dark',
    intensity: number;
  },
  items: Item[];
  onAction: (index: number) => void;
  selectFlag: (index: number) => void;
};

export const Circle: React.FC<Props> = ({
  size = 360,
  iconSize = 28,
  dragSpeed = 0.5,
  contentContainerStyle,
  circleStyle,
  blurredView,
  items,
  onAction,
  selectFlag
}) => {
  const [rotation, setRotation] = useState(0);
  const [angleValue, setAngleValue] = useState(0);
  const [changeState, setChangeState] = useState(State.UNDETERMINED);

  const [selectedIndex, selectValue] = useState(0);

  const animatedAngle = useMemo(() => new Animated.Value(0), []);

  const radius = useMemo(() => size / 2, [size]);
  const iconPosition = useMemo(() => radius - iconSize, [radius, iconSize]);
  const iconOffset = useMemo(() => radius - iconSize / 2, [radius, iconSize]);
  const iconsDegree = useMemo(() => 360 / items.length, [items]);

  useEffect(() => {
    animatedAngle.addListener(({ value }) => {
      setAngleValue(value);
    });

    return () => animatedAngle.removeAllListeners();
  }, [animatedAngle, changeState]);

  const handleGestureEvent = useCallback((event: PanGestureHandlerGestureEvent) => {
    const angle = rotation + event.nativeEvent.translationX * dragSpeed;

    const combined = angle > 360
      ? angle - 360
      : angle < 0
        ? 360 + angle
        : angle;

    animatedAngle.setValue(combined);
  }, [animatedAngle, rotation]);

  const handleHandlerStateChange = useCallback((event: PanGestureHandlerStateChangeEvent) => {
    setChangeState(event.nativeEvent.state);

    switch (event.nativeEvent.state) {
      case State.END: {
        const angle = rotation + event.nativeEvent.translationX * dragSpeed;

        const combined = angle >= 360
          ? angle - 360
          : angle <= 0
            ? 360 + angle
            : angle;

        animatedAngle.setValue(combined);

        const animateAngle = combined % iconsDegree - iconsDegree / 2 > 0
          ? combined - (combined % iconsDegree - iconsDegree)
          : combined - (combined % iconsDegree);

        Animated.spring(animatedAngle, {
          delay: 8,
          bounciness: 10,
          toValue: animateAngle
        }).start(() => setRotation(animateAngle));

        const index = Math.floor(animateAngle / 360 * items.length);
        selectValue(items.length - index)
        const itemIndex = items.length - index;
        
        onAction(itemIndex >= items.length ? 0 : itemIndex);
        break;
      }
    }
  }, [animatedAngle, rotation, iconsDegree]);

  const iconsList = useMemo(() => items.map((item, idx) => {
    const angle = idx * iconsDegree - 90 + angleValue;
    const x = iconPosition * Math.cos(Math.PI * 2 * angle / 360) + iconOffset;
    const y = iconPosition * Math.sin(Math.PI * 2 * angle / 360) + iconOffset;

    return (
      <View
        key={`icon_${idx}`}
        style={{
          position: 'absolute',
          left: x - 2,
          top: y - 2,
          width: iconSize + 4,
          height: iconSize + 4,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        {/* <FontAwesome
          name={item.name}
          size={iconSize}
          color="#333333"
        /> */}
        <Avatar rounded size={50} source={{uri:item.country_flag}} />
      </View>
    );
  }), [items, iconPosition, angleValue]);

  // const background = animatedAngle.interpolate({
  //   inputRange: [...[...new Array(items.length)]
  //     .map((val, idx) => 360 / items.length * idx), 360],
  //   outputRange: [...items
  //     .map((val, idx) => items[idx].color), items[0].color]
  // });

  return (
    <>
      <PanGestureHandler
        onGestureEvent={handleGestureEvent}
        onHandlerStateChange={handleHandlerStateChange}
      >
        <View style={[contentContainerStyle, { alignItems: 'center', justifyContent: 'center' }]}>
          <Animated.View
            style={[
              {
                width: size,
                height: size,
                borderRadius: size / 2,
                overflow: 'hidden',
              },
              circleStyle
            ]}
          >
            {blurredView ? (
              <View
              style={Styles.itemsContainer}
              {...blurredView}
              >
                {iconsList}
              </View>
            ) : (
              <View style={Styles.itemsContainer}>
                {iconsList}
              </View>
            )}
          </Animated.View>
            <TouchableOpacity onPress={()=>selectFlag(items[selectedIndex])} style={{width:200,height:150,position:"absolute",top:70,alignItems:"center"}}>
             {items[selectedIndex] && items[selectedIndex].country_flag && <Avatar size={50} source={{uri:items[selectedIndex].country_flag}} />}
              <Text style={{marginTop:10,fontSize:20,textAlign:"center"}}>{items[selectedIndex] && items[selectedIndex].currency_name && items[selectedIndex].currency_name}</Text>
              <AntDesign name="caretdown" size={18} />
            </TouchableOpacity>
        </View>
      </PanGestureHandler>
    </>
  );
};

const Styles: {
  [key: string]: StyleProp<ViewStyle>
} = {
  itemsContainer: {
    position: "absolute",
    width: '100%',
    height: '100%',
  }
};
