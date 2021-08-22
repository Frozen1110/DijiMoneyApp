import React from 'react';
import { Box, Text, TouchableHighlight } from '../..';


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

export const UserItem = ({ item, onPress }: Props) => {
  //Generate two character name to be showing within a circle
  const shortName = (item.name.split(' ')[0][0] + (item.name.split(' ').length >= 2 ? item.name.split(' ')[1][0] : item.name.split(' ')[0][1])).toUpperCase();
  return (
    <Box
      flexDirection="column"
      alignItems="center"
      marginRight={4}
    >
      <Box
        borderRadius={50}
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        style={{backgroundColor: item.color}}
        width={35}
        height={35}
      >
        <Text variant="textXSmall" color="white">
          {shortName}
        </Text>
      </Box>

      <Box
        marginTop={2}
        alignItems='center'
      >
        <Text variant="textXSmall" color="black">{item.name.split(' ')[0]}</Text>
        <Text variant="textXSmall" color="black">{item.name.split(' ')[1]}</Text>
      </Box>

      <Box
        style={{position: 'absolute', right: -1, top: -1, elevation: 2, borderRadius: 10, width: 15, height: 15, borderWidth: 2, borderColor: 'white'}}
        alignItems="center"
        justifyContent="center"
        flexDirection="row"
        backgroundColor="highlightTextColor"
      >
        <TouchableHighlight underlayColor="transparent" onPress={()=>onPress(item)}>
          <Text variant="textXSmall" color="white" style={{marginTop: -3}}>×</Text>
        </TouchableHighlight>
      </Box>
    </Box>
  );
};
