import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Text, View } from '../../components/Themed';
import { BestSeller, BestSellerName } from '../../model/BestSeller';
import { loadBestSellers } from '../../service/nytimes/nytimesApi';
import BookCell from './BookCell';

export default function BestSellerSection({
  bestSellerName
}: {
  bestSellerName: BestSellerName
}) {

  const [list, setList] = useState<BestSeller[]>([])

  useEffect(() => {
    loadBestSellers(bestSellerName.list_name_encoded)
      .then(response => {
        setList(response.data.results.books)
      })
      .catch(err => {
        console.log("book api error => ", JSON.stringify(err))
      })
  }, [bestSellerName])

  return (
    <View>
      <Text style={styles.sellerName}>{bestSellerName.display_name} <AntDesign name='doubleright' size={16} /></Text>
      <FlatList
        style={styles.list}
        horizontal 
        data={list}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => <BookCell book={item} index={index} />}
        />
    </View>
  )
}

const styles = StyleSheet.create({
  sellerName: {
    fontWeight: 'bold',
    fontSize: 18,
    backgroundColor: '#efefef',
    paddingVertical: 20,
    paddingLeft: 20,
  },
  list: {
    width: '100%',
    marginVertical: 20,
    height: 240,
  }
})