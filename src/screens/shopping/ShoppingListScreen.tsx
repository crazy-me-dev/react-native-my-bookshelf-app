import { FlatList, StyleSheet } from 'react-native'
import { Text, View } from '../../components/Themed'
import { useSelector } from 'react-redux'
import { GlobalState } from '../../redux/store';
import ShoppingCell from './ShoppingCell';

export default function ShoppingListScreen() {

  const shopping = useSelector((state: GlobalState) => state.shopping.shoppingList)

  const renderEmptyContent = () => (
    <View style={styles.emptyContentContainer}>
      <Text style={styles.emptyText}>
        There is no book in your cart.  Please add book to cart.
      </Text>
    </View>
  )
  
  return (
    <View style={styles.container}>
      <FlatList 
        data={shopping}
        renderItem={({ item }) => <ShoppingCell book={item} /> }
        keyExtractor={item => item.book_uri}
        ListEmptyComponent={renderEmptyContent}
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
