//Added by Frozen
import React from 'react';
import { Box, Text } from '../..';
import { Image } from 'react-native';
import CheckBox from '@react-native-community/checkbox';

interface Item {
  id: number,
  name: string,
  phone: string,
  checked: boolean,
  color: string
}

type Props = React.ComponentProps<typeof Box> & {
  item: Item;
  onPress: (item: Item) => void;
};

export const ContactItem = ({item, onPress,  ...wrapperProps }: Props) => {
  //Generate two character name to show within a circle
  const shortName = (item.name.split(' ')[0][0] + (item.name.split(' ').length >= 2 ? item.name.split(' ')[1][0] : item.name.split(' ')[0][1])).toUpperCase();

  return (
    <Box 
      flexDirection="row"
      paddingHorizontal={6}
      paddingVertical={2}
      justifyContent="center"
      backgroundColor={item.checked ? "white": undefined}
      {...wrapperProps}>
      
      
      <CheckBox
          value={item.checked}
          onValueChange={(value)=> onPress(item)}
      />

      <Box
        marginLeft={5}
        borderRadius={50}
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        style={{backgroundColor: item.color}}
        width={35}
        height={35}
      >
        {
          item.id === 0 ? //Check if the item is the checkbox for all items
          <Image source={require('../../../assets/icons/people.png')}/>
          :
          <Text variant="textXSmall" color="white">
            {shortName}
          </Text>
        }
      </Box>

      <Box
        marginLeft={4}
        flex={1}
      >
        <Text variant="textXSmall" color="black">{item.name}</Text>
        <Text variant="textXSmall" color="textGrayColor">{item.phone}</Text>
      </Box>

    </Box>
  );
};
