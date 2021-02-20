import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity,Image } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import {useNavigation} from '@react-navigation/native';
import {WineSvg1} from '../assets/svgs/winesvg1';
import {WineSvg2} from '../assets/svgs/winesvg2';
import {WineSvg3} from '../assets/svgs/winesvg3';
import { scaleHeight, scaleWidth } from '../assets/globalstylefunctions';

export default function OnboardingScreen(){

    const navigation = useNavigation();

    const Dots = ({selected}) => {
        let backgroundColor;
    
        backgroundColor = selected ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.3)';
    
        return (
            <View 
                style={{
                    width:6,
                    height: 6,
                    marginHorizontal: 3,
                    backgroundColor
                }}
            />
        );
    }
    
    const Skip = ({...props}) => (
        <TouchableOpacity
            style={{marginHorizontal:10}}
            {...props}
        >
            <Text style={{fontSize:16}}>Skip</Text>
        </TouchableOpacity>
    );
    
    const Next = ({...props}) => (
        <TouchableOpacity
            style={{marginHorizontal:10}}
            {...props}
        >
            <Text style={{fontSize:16}}>Next</Text>
        </TouchableOpacity>
    );
    
    const Done = ({...props}) => (
        <TouchableOpacity
            style={{marginHorizontal:10}}
            {...props}
        >
            <Text style={{fontSize:16}}>Done</Text>
        </TouchableOpacity>
    );

    return (
        <Onboarding
            SkipButtonComponent={Skip}
            NextButtonComponent={Next}
            DoneButtonComponent={Done}
            DotComponent={Dots}
            onSkip={() => navigation.replace("SignIn")}
            onDone={() => navigation.navigate("SignIn")}
            pages={[
            {
                backgroundColor: '#a6e4d0',
                // image: <WineSvg1 width={scaleWidth('18%')} height={scaleHeight('20%')}/>,
                title: 'Connect to the Moments',
                subtitle: 'A New Way To Connect With The World',
            },
            {
                backgroundColor: '#fdeb93',
                // image: <WineSvg2 width={scaleWidth('18%')} height={scaleHeight('20%')}/>,
                title: 'Share Your Feelings',
                subtitle: 'Share Your Thoughts With Similar Kind of People',
            },
            {
                backgroundColor: '#e9bcbe',
                // image: <WineSvg3 width={scaleWidth('18%')} height={scaleHeight('20%')}/>,
                title: 'Become The Bold',
                subtitle: "Let The Spot Light Capture You",
            },
            ]}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center'
      }
})
