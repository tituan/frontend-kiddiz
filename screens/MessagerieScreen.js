import { StyleSheet, View, ScrollView, FlatList, ActivityIndicator, Text, Item} from 'react-native';
import HeaderNavigation from './components/HeaderNavigation'; 
import { LinearGradient } from 'expo-linear-gradient'

type ItemData = {
    id: string;
    title: string;
  };
  
  const DATA: ItemData[] = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
  ];
  
  type ItemProps = {
    item: ItemData;
    onPress: () => void;
    backgroundColor: string;
    textColor: string;
  };
  
  const Item = ({item, onPress, backgroundColor, textColor}: ItemProps) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, {backgroundColor}]}>
      <Text style={[styles.title, {color: textColor}]}>{item.title}</Text>
    </TouchableOpacity>
  );

export default function MessagerieScreen({ navigation }) {

    const [selectedId, setSelectedId] = useState<string>();

    const renderItem = ({item}: {item: ItemData}) => {
    const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';
    const color = item.id === selectedId ? 'white' : 'black';

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );

    return (
    <View style={styles.container}>
        <LinearGradient
            colors={['rgba(34,193,195,1)', 'rgba(253,187,45,1)']} // Couleurs du dégradé
            start={{ x: 0, y: 1 }} // Point de départ du dégradé (0,1 = bas)
            end={{ x: 0, y: 0 }} // Point d'arrivée du dégradé (0,0 = haut)
            style={styles.header}
        >
            <HeaderNavigation onPress={() => navigation.navigate("Connection")}/>  
        </LinearGradient> 
        {/* <Text>Messagerie List</Text> */}
        <FlatList
            data={DATA}
            renderItem={({item}) => <Item title={item.title} />}
            keyExtractor={item => item.id}
        />
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fffff',
    },
    header: {
        padding: 20,
        borderBottomColor: '#00000',
        borderBottomWidth: 1,
        paddingBottom: 20,
        shadowColor: "#000", // Couleur de l'ombre
        shadowOffset: { width: 0, height: 3 }, // Décalage vertical de l'ombre
        shadowOpacity: 0.9, // Opacité de l'ombre
        shadowRadius: 4, // Flou de l'ombre
        elevation: 5, // Ajoute l'ombre sur Android
    
    },
})