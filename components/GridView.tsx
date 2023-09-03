import { StyleSheet, Text, View } from "react-native";


const styles = StyleSheet.create(
    {
        grid: {
            flex:1, flexDirection:"row", flexWrap:"wrap", width:100, height:100, color:'#fff', margin:5, padding: 5
        }
    }
)

const GridView = () => {
    const userdata = [
        {
          id: "1",
          name: "Earnest Green",
        },
        {
          id: "2",
          name: "Winston Orn",
        },
        {
          id: "3",
          name: "Carlton Collins",
        },
        {
          id: "4",
          name: "Malcolm Labadie",
        },
        {
          id: "5",
          name: "Michelle Dare",
        },
        {
          id: "6",
          name: "Carlton Zieme",
        },
        {
          id: "7",
          name: "Jessie Dickinson",
        },
        {
          id: "8",
          name: "Julian Gulgowski",
        },
        {
          id: "9",
          name: "Ellen Veum",
        },
        {
          id: "10",
          name: "Lorena Rice",
        },
      
        {
          id: "11",
          name: "Carlton Zieme",
        },
        {
          id: "12",
          name: "Jessie Dickinson",
        },
        {
          id: "13",
          name: "Julian Gulgowski",
        },
        {
          id: "14",
          name: "Ellen Veum",
        },
        {
          id: "15",
          name: "Lorena Rice",
        },
    ]
    return( 
        <View>
            {
                userdata.map((item)=><Text style={styles.grid} >{item.name}</Text>)
            }
        </View>
    )
}



export default GridView