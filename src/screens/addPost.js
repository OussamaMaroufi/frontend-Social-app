import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { showMessage } from "react-native-flash-message";
import ImgPicker from "../screens/pickImageScreen";


const Addpost = () => {
    const [base64Data, setBase64Data] = useState('');
    const [imageType, setImageType] = useState('');

    const [editImage, setEditImage] = useState({
        uri: ``
    });

    const imagePickedHandler = (base64, imageType) => {
        setBase64Data(base64);
        setImageType(imageType);
    }

    return (
        <View style={styles.container}>


            <ImgPicker
                onImageTaken={imagePickedHandler}
                editImage={editImage}
            // previousUpdate={previousUpdate}
            />

        </View>
    );
}


export default Addpost;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})