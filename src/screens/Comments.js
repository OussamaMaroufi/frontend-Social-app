import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const Comments = () => {
    return (
        <View style={styles.container}>
            <Text style={{ color: "#fff", fontSize: 20 }}>Here where comments will be displayed  </Text>
        </View>
    );
}

export default Comments;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#333"
    }
})