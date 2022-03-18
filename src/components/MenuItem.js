import React from 'react';
import { View, Text } from "react-native";
import {
    MenuContext,
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
    renderers
} from 'react-native-popup-menu';
const { SlideInMenu, Popover } = renderers;

import { MaterialCommunityIcons } from '@expo/vector-icons';
// import Colors from '../../constants/Colors';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
const Menuitem = (props) => {

    // console.log("THis is target post ", props.menuProps)

    const auth = useSelector((state) => state.userLogin);
    console.log(auth.userInfo.id);
    // console.log("Usre",props.menuProps.data.user);

    const dispatch = useDispatch();
    const navigation = useNavigation();

    const deletePostHandler = ()=>{

    }

    const viewProfileHandler = ()=>{
        navigation.navigate("profile",{
            user:props.menuProps.data.user
        })
    }





    return (

        <Menu renderer={Popover} >
            <MenuTrigger>
                <MaterialCommunityIcons
                    name="dots-horizontal"
                    size={24}
                    color={Platform.OS === 'android' ? '#fff' : Colors.brightBlue}
                    style={{ padding: 5, marginRight: 2, marginLeft: 65 }}
                />
            </MenuTrigger>
            <MenuOptions optionsContainerStyle={{ marginLeft: 3, paddingHorizontal: 15 }}>

                {
                    props.menuProps.target === "post" ? (

                        props.menuProps.data.user.user === auth.userInfo.id ? (
                            <View>
                                <MenuOption onSelect={viewProfileHandler}>
                                    <Text>View Profile</Text>
                                </MenuOption>

                                <MenuOption onSelect={deletePostHandler}>

                                    <Text>Delete Post</Text>
                                </MenuOption>



                            </View>
                        ) : (
                            <MenuOption onSelect={viewProfileHandler}>
                                <Text>View Profile</Text>
                            </MenuOption>
                        )


                    ) : (
                        <View>
                            <MenuOption onSelect={() => console.log("View procfile fct ")}>
                                <Text>View Profile</Text>
                            </MenuOption>

                            <MenuOption onSelect={() => console.log("Bloc user function ")}>
                                <Text>Bloc user</Text>
                            </MenuOption>

                            <MenuOption onSelect={() => console.log("hide user function ")}>
                                <Text>Hide user</Text>
                            </MenuOption>
                        </View>
                    )
                }



            </MenuOptions>

        </Menu>

    );
}

// const styles = StyleSheet.create({})

export default Menuitem;
