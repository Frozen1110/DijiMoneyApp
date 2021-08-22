import React, { forwardRef, RefObject, useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ScaledSize,
  StyleSheet,
  TouchableNativeFeedback,
} from 'react-native';
import { Modalize } from 'react-native-modalize';
import { RecyclerListView, DataProvider, LayoutProvider } from 'recyclerlistview';
import { countries } from 'countries-list';
import { Box } from '../../atoms/Box';
import { SimpleTextField } from '../../atoms/SimpleTextField';
import { Text } from '../../atoms/Text';
import { Flag } from '../../atoms/Flag';
import { ButtonSubtle } from '../../atoms/Button';

const initialScreen = Dimensions.get('screen');
const ITEM_HEIGHT = 51;

const allCountries: Country[] = Object.entries(countries)
  .map(([code, country], index) => ({
    index,
    code,
    name: country.name,
    phone: country.phone.split(',')[0],
    emoji: country.emoji,
  }))
  .filter(({ code }) => code!!);

interface Country {
  index: number;
  code: string;
  name: string;
  phone: string;
  emoji: string;
}

interface CountryItemProps {
  item: Country;
  onSelect?: (country: Country) => void;
}

const CountryItem = ({ item, onSelect }: CountryItemProps) => {
  return (
    <TouchableNativeFeedback onPress={() => onSelect?.(item)}>
      <Box
        flex={1}
        flexDirection="row"
        alignItems="flex-start"
        marginHorizontal={4}
        borderBottomColor="inputDisabled"
        borderBottomWidth={1}>
        <Flag code={item.code} size={24} marginRight={2} lineHeight={44} />
        <Text variant="textMedium" lineHeight={50}>
          {item.name} (+{item.phone})
        </Text>
      </Box>
    </TouchableNativeFeedback>
  );
};

interface CountrySelectModalProps {
  modalRef?: RefObject<Modalize>;
  onSelect?: (country: Country) => void;
}

export const CountrySelectModal = ({ modalRef, onSelect }: CountrySelectModalProps) => {
  const contentRef = useRef<FlatList<any>>(null);
  const [dimensions, setDimensions] = useState({ screen: initialScreen });
  const [keyword, setKeyword] = useState('');

  const onScreenChange = ({ screen }: { screen: ScaledSize }) => {
    setDimensions({ screen });
  };

  useEffect(() => {
    Dimensions.addEventListener('change', onScreenChange);
    return () => {
      Dimensions.removeEventListener('change', onScreenChange);
    };
  });

  const renderHeaderComponent = () => (
    <Box flexDirection="row" padding={4}>
      <ButtonSubtle
        label={<Image source={require('../../../assets/icons/Close.png')} />}
        marginRight={6}
        paddingHorizontal={0}
        paddingVertical={2}
        onPress={() => modalRef?.current?.close()}
      />
      <SimpleTextField
        grow
        placeholder="Search country"
        value={keyword}
        onChangeText={setKeyword}
      />
    </Box>
  );

  const handleSelect = (country: Country) => {
    modalRef?.current?.close();
    onSelect?.(country);
    setKeyword('');
  };

  const renderItem = (_: unknown, item: Country) => (
    <CountryItem item={item} onSelect={handleSelect} />
  );

  const layoutRenderer = new LayoutProvider(
    () => 1,
    (_, dim) => {
      dim.width = dimensions.screen.width;
      dim.height = ITEM_HEIGHT;
    },
  );

  const dataProvider = new DataProvider((r1, r2) => r1.index !== r2.index);
  const data = dataProvider.cloneWithRows(
    allCountries.filter(({ name }) => name.toLowerCase().includes(keyword.toLowerCase())),
  );

  const Wrapper = forwardRef((_: any, ref: any) => {
    return (
      <RecyclerListView
        ref={ref}
        rowRenderer={renderItem}
        dataProvider={data}
        layoutProvider={layoutRenderer}
      />
    );
  });

  return (
    <Modalize
      ref={modalRef}
      contentRef={contentRef}
      HeaderComponent={renderHeaderComponent}
      customRenderer={<Wrapper />}
      modalStyle={s.modal}
      panGestureEnabled={false}
      withHandle={false}
      modalTopOffset={dimensions.screen.height * 0.3}
    />
  );
};

const s = StyleSheet.create({
  modal: {
    flex: 1,
  },
});
