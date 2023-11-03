import React, { useState } from 'react';
import { Image, View, TouchableOpacity } from 'react-native';
import { Text, Box, VStack, Heading } from '@gluestack-ui/themed';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

function CouponCard({ brand, name, background, discount, product, expiration }) {
  const [isFavourite, setFavourite] = useState(false);

  const handleFavouritePress = () => {
    setFavourite(!isFavourite);
  };

  return (
    <View style={{ shadowColor: 'rgba(0, 0, 0, 0.4)', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 5, elevation: 2 }}>
      <Box
        width={165}
        height={200}
        bg="white"
        borderColor="$borderLight200"
        borderRadius="$xl"
        borderWidth="$2"
        my="$4"
        overflow="hidden"
        sx={{
          '@base': {
            mx: '$5',
          },
          '@lg': {
            my: '0',
          },
          '_dark': {
            bg: '$backgroundDark900',
            borderColor: '$borderDark800',
          },
        }}
      >
        <Box style={{ position: 'relative' }}>
          <View style={{ backgroundColor: background, height: 90 }}>
            <View style={{ width: 100, height: 40, objectFit: 'contain', margin: 25 }}>
              {brand}
            </View>
          </View>
          <Box style={{ position: 'absolute', top: 10, right: 10 }}>
            <TouchableOpacity onPress={handleFavouritePress}>
              <View>
                <FontAwesomeIcon
                  name={isFavourite ? 'heart' : 'heart-o'}
                  style={{
                    fontSize: 24,
                    color: 'white',
                  }}
                />
              </View>
            </TouchableOpacity>
          </Box>
        </Box>
        <VStack px="$4" pt="$1.5" pb="$6">
          <Text style={{ color: 'red' }} fontSize="$sm">
            {discount}
          </Text>
          <Heading _dark={{ color: '$textLight200' }} size="xs" my="$1" style={{ fontWeight: 'normal' }}>
            {product}
          </Heading>
          <View style={{ backgroundColor: '#E5E4E2', padding: 0.5, borderRadius: 6, width: '70%' }}>
            <Text _dark={{ color: '$textLight200' }} fontSize="$xs" style={{ textAlign: 'left', paddingLeft: 2, marginLeft: 2 }}>
              {expiration}
            </Text>
          </View>
        </VStack>
      </Box>
    </View>
  );
}

export default CouponCard;