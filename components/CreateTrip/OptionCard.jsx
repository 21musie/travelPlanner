import { View, Text } from 'react-native';
import React from 'react';
import { Colors } from '@/constants/Colors';

const OptionCard = ({ option, selectedOptions }) => {
  return (
    <View
      style={[
        {
          padding: 15,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: Colors.LIGHT_GRAY,
          borderRadius: 15,
        },
        selectedOptions?.id === option?.id && {
          borderWidth: 3,
        },
      ]}
    >
      <View>
        <Text
          style={{
            fontSize: 20,
            fontFamily: 'roboto-bold',
          }}
        >
          {option?.title}
        </Text>

        <Text
          style={{
            fontSize: 17,
            fontFamily: 'roboto-regular',
            color: Colors.GRAY,
          }}
        >
          {option?.desc}
        </Text>
      </View>

      <Text
        style={{
          fontSize: 35,
        }}
      >
        {option?.icon}
      </Text>
    </View>
  );
};

export default OptionCard;