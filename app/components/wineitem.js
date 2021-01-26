import React,{useState} from 'react'
import { StyleSheet, Text, View,Image,TouchableOpacity } from 'react-native'
import { scaleWidth, scaleHeight, moderateScale } from '../assets/globalstylefunctions'
import Card from './common/card'
import AppButton from './appbutton'
import { colors, fonts } from '../assets/globalstyleconstants'
import WineModal from './winemodal'
import Fav from './common/fav'
import { Bar } from 'react-native-progress';

const Item = ({item,index}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [isFav, setIsFav] = useState(false);
    return (
            <Card style={styles.container}>
                <View style={styles.fav}>
                    <Text style={styles.itemName}>{item.title}</Text>
                    <Fav isFav={isFav} onPress={()=>setIsFav(!isFav)}/>
                </View>
                <TouchableOpacity
                    onPress={() => {
                        setModalVisible(true);
                        }}
                >
                    <Image 
                        source={{uri:item.image}} 
                        style={styles.image}
                    />
                </TouchableOpacity>
                <View style={styles.barContainer}>
                    <Bar 
                    progress={0.4} 
                    width={scaleWidth('60%')} 
                    color={colors.wine1} 
                    unfilledColor={colors.white} 
                    borderWidth={0} 
                    animationType={'timing'} 
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <AppButton 
                       text='Buy' 
                       onPress={()=>alert('Buy')} 
                       style={styles.button}
                    />
                    <AppButton 
                       text='Add To Cart' 
                       onPress={()=>alert('cart')} 
                       style={styles.button}
                    />
                </View>
                <WineModal 
                    modalVisible={modalVisible} 
                    onPress={() => {setModalVisible(!modalVisible)}}
                    item={item}
                />
            </Card>
    )
}

const WineItem =({item,index})=>{
    return(
        <Item item={item} index={index}/>
    )
}


const styles = StyleSheet.create({
    container:{
        // width:scaleWidth('100%'),
        padding:scaleWidth('4%'),
        backgroundColor:colors.whiteFade,
        // alignItems:'center',
        // marginHorizontal:scaleWidth('2%')
    },
    itemName:{
        fontFamily:fonts.MontserratRegular,
        fontSize:moderateScale(22),
        color:colors.white,
    },
    fav:{
        // alignItems:'flex-end',
        flexDirection:'row',
        justifyContent:'space-between'
    },
    image:{
        // width:scaleWidth('100%'),
        height:scaleHeight('30%'),
        marginTop:scaleHeight('2%')
    },
    buttonContainer:{
        // width:scaleWidth('70%'),
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
    },
    button:{
        backgroundColor:colors.wine1,
        width:scaleWidth('30%'),
        height:scaleHeight('7%'),
        borderRadius:moderateScale(5),
        marginHorizontal:scaleWidth('3%'),
        marginVertical:moderateScale(8)
    },
    barContainer:{
        width:'100%',
        alignItems:'center',
        marginVertical:scaleWidth('2%')
    },

})

export default WineItem;