import { Image, Dimensions } from 'react-native';
import React, { useRef, useState } from 'react';
import { Modalize } from 'react-native-modalize';
import { useNavigation } from 'react-native-navigation-hooks';
import { Host } from 'react-native-portalize';
import {
  ButtonFilled,
  KeyboardAvoidingView,
  SafeAreaView,
  Box,
  Text,
  ScrollView,
  TouchableHighlight,

  UserItem,
  ContactItem
} from '../components';
import { backButton } from '../navigation/navigationButtons';
import { NavigationFunctionComponent } from 'react-native-navigation';
import { useEffect } from 'react';

const { width, height } = Dimensions.get('window');

interface InviteScreenProps {

}

interface Item {
    id: number,
    name: string,
    phone: string,
    checked: boolean,
    color: string
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

const static_contact_list: Array<Item> = [
    {
        id: 1,
        name: "Arian Peters",
        phone: "+61 423 445 556",
        checked: false,
        color: getRandomColor()
    },
    {
        id: 2,
        name: "Brian Peters",
        phone: "+61 423 445 556",
        checked: false,
        color: getRandomColor()
    },
    {
        id: 3,
        name: "Crian Peters",
        phone: "+61 423 445 556",
        checked: false,
        color: getRandomColor()
    },
    {
        id: 4,
        name: "Drian Peters",
        phone: "+61 423 445 556",
        checked: false,
        color: getRandomColor()
    },
    {
        id: 5,
        name: "Erian Peters",
        phone: "+61 423 445 556",
        checked: false,
        color: getRandomColor()
    },
    {
        id: 6,
        name: "Frian Peters",
        phone: "+61 423 445 556",
        checked: false,
        color: getRandomColor()
    },
    {
        id: 7,
        name: "Grian Peters",
        phone: "+61 423 445 556",
        checked: false,
        color: getRandomColor()
    },
    {
        id: 8,
        name: "Hrian Peters",
        phone: "+61 423 445 556",
        checked: false,
        color: getRandomColor()
    },
    {
        id: 9,
        name: "Irian Peters",
        phone: "+61 423 445 556",
        checked: false,
        color: getRandomColor()
    },
    {
        id: 10,
        name: "Jrian Peters",
        phone: "+61 423 445 556",
        checked: false,
        color: getRandomColor()
    },
    {
        id: 11,
        name: "Krian Peters",
        phone: "+61 423 445 556",
        checked: false,
        color: getRandomColor()
    },
]


export const InviteScreen: NavigationFunctionComponent<InviteScreenProps> = props => {
  const { push } = useNavigation();
  const [loading, setLoading] = useState(false);

  
  const [contactList, setContactList] = useState(static_contact_list);
  const [selectedList, setSelectedList] = useState([] as Item[]);

  useEffect(() => {
    console.log(contactList);
    let newList = contactList.map(l => Object.assign({}, l));
    if(newList[0].id !== 0) {
        let all: Item = { "id": 0, "name": "All contacts", "phone": contactList.length.toString() + " contacts", "checked": false, "color": "#6308F7"};
        newList.unshift(all);
        setContactList(newList);
    }
  }, [])
  const clickItem = (item: Item) => {
    
    let newList = contactList.map(l => Object.assign({}, l));
    newList[item.id].checked = !newList[item.id].checked;
    if(item.id === 0) { //If click all contacts checkbox
        newList.map((e)=>e.checked= newList[item.id].checked);
    }
    setContactList(newList);
    
    let filterList = newList.filter((e)=> e.checked === true && e.id !== 0)
    setSelectedList(filterList);
  }

  const InviteLink = () => {
      setLoading(true);
  }
  return (
    <Host>
      <SafeAreaView>
        <KeyboardAvoidingView>
          <ScrollView>
            <Box padding={6}>
              <Box>
                <Text marginBottom={1} variant="displayLargeBold">
                  Invite Friends
                </Text>
                <Text marginBottom={3} variant="textXSmall" color="textGrayColor">
                  Invite your friends and share the Diji experience
                </Text>
                <Box
                    flex={1}
                >
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {
                        selectedList && selectedList.map((item, index) => {
                            return (
                                <UserItem
                                    key={index}
                                    item={item}
                                    onPress={clickItem}
                                />
                            )
                        })
                    }
                    </ScrollView>
                </Box>
                <TouchableHighlight onPress={InviteLink} underlayColor="transparent" marginTop={2}>
                    <Box 
                        padding={2} 
                        backgroundColor="highlightColor" 
                        borderRadius={10}
                        alignItems="center"
                        justifyContent="center"
                        maxWidth={150}
                        flexDirection= "row"
                    >
                        <Image source={require('../assets/icons/Link.png')}/>
                        <Text variant="textXSmall" color="highlightTextColor" marginLeft={2}>
                            Share Invite Link
                        </Text>
                    </Box>
                </TouchableHighlight>
                <Box
                    marginTop={5}
                    flexDirection="row"
                    justifyContent="space-between"
                >
                    <Text variant="textXSmall" color="textGrayColor">Contacts</Text>
                    <Text variant="textXSmall" color="textGrayColor">Invites: {selectedList.length}</Text>
                </Box>

                <Box
                    marginTop={5}
                    borderRadius={10}
                >
                    <Box 
                        backgroundColor="greyBackground"
                        borderRadius={10}
                        paddingVertical={6}
                    >
                        <Box marginBottom={2}>
                        {
                            contactList && contactList.map((item, index) => {
                                return (
                                    <ContactItem
                                        key={index}
                                        item={item}
                                        onPress={clickItem}
                                    />
                                )
                            })
                        }
                        
                        </Box>
                    </Box>
                </Box>
              </Box>
            </Box>
          </ScrollView>
          
          <Box flexDirection="row" paddingVertical={1}
            style={{position: 'absolute', bottom: 32, left: 24, right: 24, elevation: 2}}
            >
                <ButtonFilled
                    label="Send Invite"
                    onPress={InviteLink}
                    loading={loading}
                    flexGrow={1}
                    color="buttonColor"
                />
            </Box>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Host>
  );
};

InviteScreen.options = {
  topBar: {
    leftButtons: [backButton],
  },
};
