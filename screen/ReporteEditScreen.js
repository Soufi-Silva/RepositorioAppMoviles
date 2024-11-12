import { View, Text, TextInput, StyleSheet, Button} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useContext, useState } from "react";
import { ReporteContext } from "../store/reporte-context";
import { removeReporte, updateReporte } from "../http";
import Footer from "../components/Footer";

function ReporteEditScreen(){
    const reporteCTX = useContext(ReporteContext)
    const route = useRoute()
    const navigator = useNavigation();
    const id = route.params.id;

    const reporte = reporteCTX.reportes.find(item=>item.id === id)
    
    const [name, setName] = useState(reporte?.name)

    function editReporte(){
        reporte.name = name
        reporteCTX.editReporte(id, reporte)
        updateReporte(id, reporte)
        navigator.navigate('Reporte')
    }
    function deleteReporte(){
        reporteCTX.deleteReporte(id);
        removeReporte(id)
        navigator.goBack()
    }
    
    return (
        <View style={styles.container}>
            <TextInput onChangeText={(text)=>{setName(text)}} style={styles.input} value={name}/>
            <View style={styles.buttonContainer}>
                <Button title='Edit' color={'#5FC2D9'} onPress={editReporte} />
                <Button title='Delete' color={'#D94F30'} onPress={deleteReporte}/>
            </View>
            <Footer navigation={navigator} /> 
        </View>
    )
}

export default ReporteEditScreen;

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: '#204C68',
        
    },
    buttonContainer:{
        flexDirection:'row',
        justifyContent:'center',
        gap:10
    },
    input:{
        padding:8,
        borderWidth:1,
        borderColor:'#ccc',
        width:'80%',
        marginVertical:8,
        color:'white',
        width: 300,
        height:100
    },
})