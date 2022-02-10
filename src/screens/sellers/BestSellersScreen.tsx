import { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';

import { Text, View } from '../../components/Themed';
import { BestSellerName } from '../../model/BestSeller';
import { RootTabScreenProps } from '../../navigation/BottomTabNavigator';
import { loadBestSellerNames, loadBestSellers } from '../../service/nytimes/nytimesApi';
import BestSellerSection from './BestSellerSection';

export default function BestSellersScreen({ navigation }: RootTabScreenProps<'BestSellers'>) {

  const [bestSellerNames, setBestSellersNames] = useState<BestSellerName[]>([])

  const callBestSellersNamesApi = () => {
    loadBestSellerNames().then(response => {
      setBestSellersNames(response.data.results.slice(0, 10))
    }).catch(err => {
      console.log("best seller names api error => ", JSON.stringify(err))
    })
  }

  useEffect(() => {
    callBestSellersNamesApi()
  }, [])

  return (
    <View style={styles.container}>
      <FlatList
        data={bestSellerNames}
        renderItem={({item}) => <BestSellerSection bestSellerName={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});
