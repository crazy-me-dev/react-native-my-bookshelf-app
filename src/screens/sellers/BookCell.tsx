import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Image, Linking, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '../../components/Themed';
import { BestSeller, } from '../../model/BestSeller';

export default function BookCell({
  book,
  index,
}: {
  book: BestSeller,
  index: number,
}) {
  const openAmazonLink = () => {
    Linking.canOpenURL(book.amazon_product_url).then(supported => {
      if (supported) {
        Linking.openURL(book.amazon_product_url);
      } else {
        console.log("Don't know how to open URI: " + book.amazon_product_url);
      }
    })
  }
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: book.book_image }} 
            resizeMode='stretch'
            style={styles.image}
          />
          <Text style={styles.textIndex}>{index + 1}</Text>
        </View>
        <Text style={styles.title}>{book.title}</Text>
        <Text style={styles.author}>
          by <Text style={{ fontWeight: 'bold'}}>{book.author}</Text>
        </Text>
        <Text numberOfLines={2} ellipsizeMode='tail'  style={styles.description}>
          {book.description}
        </Text>
        <View style={{ flex: 1 }} />
        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={openAmazonLink} style={styles.button}>
            <MaterialCommunityIcons name='share-outline' size={24}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Ionicons name='cart-outline' size={24}/>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.vertDivider} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  contentContainer: {
    width: 160,
    flexDirection: 'column',
    marginLeft: 10,
    marginRight: 10,
  },
  imageContainer: { 
    width: 160, 
    alignItems: 'center' 
  },
  image: {
    width: 100,
    height: 120
  },
  textIndex: {
    position: 'absolute',
    left: 0,
    top: 0,
    fontWeight: 'bold',
    fontSize: 20,
  },
  title: {
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 12,
  },
  author: {
    fontSize: 11,
    marginTop: 3,
  },
  description: {
    marginTop: 5,
    fontSize: 10,
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
  vertDivider: {
    width: 1,
    backgroundColor: '#dfdfdf',
    height: '100%'
  }
})