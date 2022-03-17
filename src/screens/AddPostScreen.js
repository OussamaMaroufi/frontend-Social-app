import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput, Image, Keyboard, TouchableWithoutFeedback,KeyboardAvoidingView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'
import { createPost, listPosts } from "../actions/postActions"
import { useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from "expo-camera";
import Colors from '../constants/Colors';
import { showMessage, hideMessage } from "react-native-flash-message";



const Addpostscreen = ({ navigation }) => {

    const dispatch = useDispatch()
    const [content, setContent] = useState('');

    const data = useSelector((state) => state.postCreate)

    //Image picker 
    const [pickedImage, setPickedImage] = useState();
    // console.log("THis is your picked image ", pickedImage);

    const [base64Data, setBase64Data] = useState('');
    const [imageType, setImageType] = useState('');

    const clearForm = () => {
        setContent("");
        setPickedImage();
    }
    //This Function used to verify permission of using camera 
    const verifyPermissions = async () => {
        const result = await Camera.requestCameraPermissionsAsync()
        if (result.status !== 'granted') {
            Alert.alert(
                'Insufficient permissions!',
                'You need to grant camera permissions to use this app.',
                [{ text: 'Okay' }]
            );
            return false;
        }
        return true;
    };


    //This Function to Handle get image from gallery or by camera 

    const takeImageHandler = async (type) => {
        const hasPermission = await verifyPermissions();
        if (!hasPermission) {
            return;
        }
        let image;
        try {
            if (type === 'gallery') {
                image = await ImagePicker.launchImageLibraryAsync({
                    allowsEditing: true,
                    base64: true,
                    // aspect: [16, 9],
                    quality: 0.4,
                });
            } else {
                image = await ImagePicker.launchCameraAsync({
                    allowsEditing: true,
                    base64: true,
                    // aspect: [16, 9],
                    quality: 0.4,
                });
            }
            if (!image.cancelled) {
                setPickedImage(image);
                let res = image.uri.split('.');
                let imageExtenstion = res[res.length - 1];
                let imageType = `${image.type}/${imageExtenstion}`;
                setBase64Data(image.base64);
                setImageType(imageType);

                // props.onImageTaken(image.base64, imageType);

            }
        } catch (error) {
            console.log("Image Error -", error)
        }
    };



    //Handle Submit 

    let inputs = {
        content: content,
        image: {
            base64Data: base64Data,
            imageType: imageType
        }
    }

    const handleSubmit = () => {

      

        if (content !== "") {

            dispatch(createPost(inputs))

            if (data.success) {
                clearForm();
                showMessage({
                    message: "Your post was successfully created.",
                    type: "success",
                    duration: 2000,
                    icon: { icon: "success", position: 'left' }
                });

                navigation.navigate("Home",{
                    screen:"home",
                    params:{
                       "post" :data.post
                    }
                })

            } else {
                console.log("something goes wrong here !!!");
            }
        } else {
            showMessage({
                message: "Your Post Should NOt be Empty!",
                type: "danger",
                duration: 3000,
                icon: { icon: "danger", position: 'left' }
            });
            return
        }
    }


    return (
        
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} >
            <View style={styles.container}>
                <Text style={{ color: "#fff", fontSize: 20, marginBottom: 15 }}>Add Your Post Here ! </Text>

                <TextInput
                    placeholder='What do you want to say !'
                    placeholderTextColor='#808e9b'
                    style={styles.input}
                    value={content}
                    multiline={true}
                    numberOfLines={4}
                    onChangeText={(content) => setContent(content)}
                />

                <View style={styles.imgPick}>
                {/** <Text style={{ color: "#fff", fontSize: 20, textAlign: "center", marginBottom: 10 }}>Here image picker </Text>*/} 

                    <View style={styles.imagePreview} >
                        {!pickedImage ? (
                            <Text style={{ fontSize: 18 }} >No Image Picked</Text>
                        ) : (
                            <Image
                                style={styles.image}
                                source={{ uri: pickedImage.uri }}
                            />
                        )}
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: "space-around" }} >
                        <TouchableOpacity
                            style={[styles.buttonContainer, styles.loginButton]}
                            onPress={takeImageHandler.bind(this, 'gallery')}
                        >
                            <Text style={styles.loginText}>
                                Pick Image
                            </Text>
                        </TouchableOpacity>
                        <Text style={{ color: "#fff", marginTop: 9, fontSize: 20 }}>OR</Text>
                        <TouchableOpacity
                            style={[styles.buttonContainer, styles.loginButton]}
                            onPress={takeImageHandler.bind(this, 'camera')}
                        >
                            <Text style={styles.loginText}>
                                Take Image
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>



                <TouchableOpacity style={{ backgroundColor: "lightgrey", width: 120, padding: 8, marginTop: 20, borderRadius: 60 }} onPress={handleSubmit}>
                    <Text style={{ color: "red", textAlign: "center", fontSize: 20 }}>Add</Text>
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
       

    );
}


export default Addpostscreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 30,
        alignItems: "center",
        backgroundColor: "#1f1f1f",
        padding: 10
    },
    input: {
        width: '100%',
        height: 70,
        backgroundColor: '#333',
        borderRadius: 6,
        marginTop: 10,
        paddingHorizontal: 10,
        fontSize: 16,
        color: '#808e9b',
    },
    text: {
        color: "#fff",
        fontSize: 20
    },
    imgPick: {
        marginTop: 20
    },
    imagePicker: {
        alignItems: 'center',
        marginBottom: 15,
    },
    imagePreview: {
        width: 320,
        height: 200,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: "#ED4C67",
        borderWidth: 1,
        backgroundColor: '#c2c2c2'
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    },
    buttonContainer: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        marginRight: 10,
        width: 100,
        borderRadius: 20,
        backgroundColor: 'transparent'
    },
    loginButton: {
        backgroundColor: "#ED4C67",
        shadowColor: "#808080",
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.50,
        shadowRadius: 12.35,

        elevation: 20,
    },
    loginText: {
        color: 'white',
    },
})