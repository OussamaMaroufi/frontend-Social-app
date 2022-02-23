import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

function Notifications() {
    return (
        <View style={styles.container}>
            <Text style={{color:"#fff"}}>

                Notifications
            </Text>
        </View>
    );
}

export default Notifications;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#333"

    }
})