import React from 'react'
import { StyleSheet, Text, View ,Modal,TouchableOpacity,Alert,Image,TouchableWithoutFeedback} from 'react-native'
import { scaleHeight, moderateScale, scaleWidth } from '../assets/globalstylefunctions';
import { colors, fonts, detailText } from '../assets/globalstyleconstants';
import ScrollContainer from './common/scrollcontainer';
import PaymentCard from './common/payment';

export default function WineModal(props) {
    const {modalVisible,onPress,item} = props
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            }}
        >
            
            <TouchableOpacity
                style={styles.modalView}
                onPress={onPress}
                >

                <Text style={styles.modalText}>{item.title}</Text>
                <Image 
                    source={{uri:item.image}} 
                    style={styles.image}
                />
                <View style={styles.detailContainer}>
                    <Text style={styles.detailHeader}>Wine Details :</Text>
                    <Text style={styles.detailText}>{detailText}</Text>
                </View>

            </TouchableOpacity>
            <PaymentCard text='Proceed To Pay'/>
            
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalView: {
        // height:scaleHeight('100%'),
        marginTop:scaleHeight('18%'),
        backgroundColor: colors.white,
        // borderRadius: 20,
        borderTopLeftRadius:moderateScale(25),
        borderTopRightRadius:moderateScale(25),
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    modalText: {
        // marginBottom: 15,
        // textAlign: "center",
        fontSize:moderateScale(20),
        fontFamily:fonts.MontserratBold,
    },
    image:{
        // width:scaleWidth('100%'),
        backgroundColor:'red',
        width:scaleWidth('80%'),
        height:scaleHeight('25%'),
        marginTop:scaleHeight('2%')
    },
    detailContainer:{
        alignItems:'flex-start',
        width:'100%',
        marginTop:scaleHeight('2%'),
    },
    detailHeader:{
        fontFamily:fonts.MontserratMediumItalic,
        fontSize:moderateScale(18),
    },
    detailText:{
        fontFamily:fonts.MontserratRegular,
        textAlign:'justify',
    }
})
