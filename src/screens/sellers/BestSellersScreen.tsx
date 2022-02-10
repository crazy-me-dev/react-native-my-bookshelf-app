import { useEffect, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet } from 'react-native';

import { Text, View } from '../../components/Themed';
import { BestSellerName } from '../../model/BestSeller';
import { RootTabScreenProps } from '../../navigation/BottomTabNavigator';
import { loadBestSellerNames } from '../../service/nytimes/nytimesApi';
import BestSellerSection from './BestSellerSection';

export default function BestSellersScreen({ navigation }: RootTabScreenProps<'BestSellers'>) {

  const [bestSellerNames, setBestSellersNames] = useState<BestSellerName[]>([])
  const [refreshing, setRefreshing] = useState(false)

  const callBestSellersNamesApi = () => {
    loadBestSellerNames().then(response => {
      setBestSellersNames(response.data.results.slice(0, 10))
      setRefreshing(false)
    }).catch(err => {
      setRefreshing(false)
      console.log("best seller names api error => ", JSON.stringify(err))
    })
  }

  const renderEmptyContent = () => (
    <View style={styles.emptyContentContainer}>
      <Text style={styles.emptyText}>
        We cannot load books because of API limit.  Please pull down to refresh list again later.
      </Text>
    </View>
  )

  const onRefresh = () => {
    console.log("REFRESHING")
    setRefreshing(true)
    callBestSellersNamesApi()
  }

  useEffect(() => {
    callBestSellersNamesApi()
  }, [])

  return (
    <View style={styles.container}>
      <FlatList
        data={bestSellerNames}
        renderItem={({item}) => <BestSellerSection bestSellerName={item} />}
        keyExtractor={(item, index) => `${item.list_name_encoded}-${index}`}
        ListEmptyComponent={renderEmptyContent}
        refreshControl={<RefreshControl colors={["#9Bd35A", "#689F38"]} refreshing={refreshing} onRefresh={onRefresh}/>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyContentContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  emptyText: {
    backgroundColor: 'transparent',
    marginTop: 60,
    marginLeft: 20,
    marginRight: 20,
  }
});
