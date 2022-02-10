import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useMemo } from 'react';
import { Image, Linking, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Text, View } from '../../components/Themed';
import { BestSeller } from '../../model/BestSeller';
import { removeFromStore, storeBook } from '../../redux/actions';
import { GlobalState } from '../../redux/store';

export default function ShoppingCell({
  book,
}: {
  book: BestSeller,
}) {

  const dispatch = useDispatch()
  const shopping = useSelector((state: GlobalState) => state.shopping.shoppingList)
  const alreadyAddedToShop = useMemo(() => {
    if (shopping.some((shop: BestSeller) => shop.book_uri === book.book_uri)) {
      return true
    } else {
      return false
    }
  }, [book, shopping])

  const openAmazonLink = () => {
    Linking.canOpenURL(book.amazon_product_url).then(supported => {
      if (supported) {
        Linking.openURL(book.amazon_product_url);
      } else {
        console.log("Don't know how to open URI: " + book.amazon_product_url);
      }
    })
  }

  const addToShoppingList = () => {
    if (alreadyAddedToShop) {
      dispatch(removeFromStore(book))
    } else {
      dispatch(storeBook(book))
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Image 
          source={{ uri: book.book_image }} 
          resizeMode='stretch'
          style={styles.image}
        />
        <View style={styles.body}>
          <Text style={styles.title}>{book.title}</Text>
          <Text numberOfLines={2} ellipsizeMode='tail' style={styles.author}>
            by <Text style={{ fontWeight: 'bold'}}>{book.author}</Text>
          </Text>
          <Text numberOfLines={4} ellipsizeMode='tail'  style={styles.description}>
            {book.description}
          </Text>
          <View style={{ flex: 1 }} />
          <View style={styles.buttonsContainer}>
            <TouchableOpacity onPress={openAmazonLink} style={styles.button}>
              <MaterialCommunityIcons name='share-outline' size={24}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={addToShoppingList} style={styles.button}>
              {alreadyAddedToShop ? <Ionicons name='cart' size={24}/> : <Ionicons name='cart-outline' size={24}/>}
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.horDivider} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: '100%',
  },
  contentContainer: {
    height: 160,
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  body: {
    flexDirection: 'column',
    flex: 1,
    marginLeft: 20,
  },
  image: {
    width: 120,
    height: 160
  },
  title: {
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 14,
  },
  author: {
    fontSize: 11,
    marginTop: 3,
  },
  description: {
    marginTop: 5,
    fontSize: 13,
  },
  buttonsContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-end',
  },
  button: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  horDivider: {
    height: 1,
    backgroundColor: '#dfdfdf',
    width: '100%'
  }
})