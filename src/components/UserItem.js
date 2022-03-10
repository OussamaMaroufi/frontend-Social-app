import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';

const Useritem = ({ user }) => {

    const followHandler = ()=>{

    }

    return (
        <View style={styles.cardView}>
            <View style={styles.cardHeader}>

                <TouchableOpacity onPress={()=>console.log('Navigate to user  profile !')}>
                    <Image
                        style={{ width: 50, height: 50, borderRadius: 100 }}
                        source={{
                            uri: `http://192.168.1.100:8000${user.profile.profile_pic}/`
                        }}
                    />
                </TouchableOpacity>

                <View style={{ flex: 1, paddingHorizontal: 10 }}>
                    <Text style={{ color: '#fff', fontFamily: 'NSBold', fontSize: 18 }}>
                        {user.profile.username}
                    </Text>
                    <Text
                        style={{ color: '#fff', fontFamily: 'NSRegular', fontSize: 16 }}
                    >
                        {user.profile.name}
                    </Text>
                </View>

                <TouchableOpacity style={styles.interactButton} onPress={followHandler}>
                    <Text style={styles.interactButtonText}>Follow</Text>
                </TouchableOpacity>

            </View>


        </View>
    );
}


export default Useritem;


const styles = StyleSheet.create({
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    cardView: {
        marginHorizontal: 3,
        borderRadius: 15,
        paddingVertical: 10,
        backgroundColor: '#333',
        shadowColor: '#1e1e1e',
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        elevation: 8,
    },
    interactButton: {
        flex: 1,
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: '#4b7bec',
        margin: 5,
        borderRadius: 4,
    },
    interactButtonText: {
        fontFamily: 'NSBold',
        color: '#fff',
        fontSize: 18,
        paddingVertical: 6,
    },

})