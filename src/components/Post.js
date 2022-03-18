import React, { useState,useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { Feather as Icon, AntDesign as FAIcon } from '@expo/vector-icons/';
import formatDate from '../utilities/formatDate'
import { useRoute } from '@react-navigation/native';
import store from "../store"
import axios from 'axios';
import Menuitem from './MenuItem';
function Post({ post, navigation }) {


    const [react, setReact] = useState('')
    const [likeNo,setLikeNo] = useState()
    const [dislikeNo,setDislikeNo] = useState()
    // console.log(post);
    const route = useRoute();
    // console.log(route);
    const {
        userLogin: { userInfo },
    } = store.getState()


    const config = {
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${userInfo.access}`
        }
    }

    const handleLike = async () => {
        try {

            const { data } = await axios.post(`http://192.168.1.100:8000/api/posts/react/${post.id}/`, { value: "like" }, config)
            if(react === "dislike"){
                setReact('like');
                setLikeNo((prev)=>prev+1);
                setDislikeNo((prev)=>prev-1)
            }else{
                if(react === "like"){
                    setReact("");
                    setLikeNo((prev)=>prev-1)
                }else{
                    setReact("like");
                    setLikeNo((prev)=>prev+1)
                }
            }
    
        } catch {
            console.log("There is some error here !! ");
        }

    }

    const handleDislike = async () => {
        try {

            

            console.log("You dislike this post ", post.id);
            const { data } = await axios.post(`http://192.168.1.100:8000/api/posts/react/${post.id}/`, { value: "dislike" }, config)

            if(react === 'like'){
                setReact('dislike');
                setDislikeNo((prev)=>prev+1);
                setLikeNo((prev)=>prev-1);
            }else{
                if(react === "dislike"){
                    setReact("");
                    setDislikeNo((prev)=>prev-1);
                }else{
                    setReact("dislike")
                    setDislikeNo((prev)=>prev+1);
                }
            }
          
        } catch {
            console.log("There is some error Here !!! ");
        }
    }

  useEffect(()=>{
      let  up_voters_Ids = post.up_voters.map((voter)=>voter.id);
      let  down_voters_Ids = post.down_voters.map((voter)=>voter.id) 
      setLikeNo(post.up_voters.length);
      setDislikeNo(post.down_voters.length)

        if(up_voters_Ids.includes(userInfo.id)){
            setReact('like');
        }else{
            if(down_voters_Ids.includes(userInfo.id)){
                setReact('dislike');
            }else{
                setReact('');
            }
        }
        
    
  },[])

  const menuProps = {
       target:"post",
       data:post
  }




    function getRandomImage() {
        let max = 100;
        let min = 1;
        let n = Math.floor(Math.random() * (max - min + 1) + min);
        let url = `https://randomuser.me/api/portraits/${n % 2 == 0 ? 'men' : 'women'
            }/${n}.jpg`;
        return url;
    }
    return (
        <View style={[styles.postView, route.name == "home" ? { borderRadius: 10, marginTop: 10, } : { borderRadius: 0, marginTop: 0 }]}>
            {/* Post Header */}
            <View style={styles.postHeader}>
                <View>
                    <Image
                        style={{ width: 50, height: 50, borderRadius: 100 }}
                        source={{
                            uri: `http://192.168.1.100:8000${post.user.profile_pic}/`,
                        }}
                    />
                    {/*Display Time created */}

                </View>
                <View style={{ flex: 1, paddingHorizontal: 10 }}>
                    <Text style={{ color: '#fff', fontFamily: 'NSBold', fontSize: 18 }}>
                        {post.user.username}
                    </Text>
                    <Text
                        style={{ color: '#fff', fontFamily: 'NSRegular', fontSize: 16 }}
                    >
                        {post.user.username}
                    </Text>
                </View>

                <View>

                    <Text style={{ color: "#fff" }} >{formatDate.distanceDate(post.created)}</Text>
                    <TouchableOpacity style={{marginTop:15,marginRight:2}}>
                       {/**<Icon name='more-horizontal' color='#fff' size={28} style={{ alignSelf: "flex-end" }} /> */}  
                       <Menuitem menuProps={menuProps}/>
                    </TouchableOpacity>
                </View>
            </View>
            {/* Post Content */}
            <View style={{ marginTop: 10 }}>
                <Text
                    style={{
                        color: '#fafafa',
                        fontFamily: 'NSRegular',
                        fontSize: 14,
                        paddingHorizontal: 10,
                    }}
                >
                    {post.content}
                </Text>
                {post.image && (
                    <Image
                        style={{ width: '100%', height: 300, marginTop: 10 }}
                        source={{ uri: `http://192.168.1.100:8000${post.image}/`, }}
                    />
                ) }
            </View>
            {/* Post Stats */}
            <View
                style={{ marginTop: 10, flexDirection: 'row', paddingHorizontal: 10 }}
            >
                <TouchableOpacity style={styles.postStatsOpacity} onPress={handleLike}>
                    {
                        (react === "like" ||post.up_voters.includes(userInfo.profile))  ?(
                            <FAIcon name='like2' color="blue" size={20} />
                        ):(

                            <FAIcon name='like2' color="#fff" size={20} />
                        )
                    }
                    <Text
                        style={{
                            marginLeft: 6,
                            fontFamily: 'NSRegular',
                            color: '#fff',
                        }}
                    >
                        {likeNo>0?likeNo:''}
                       

                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    ...styles.postStatsOpacity,
                    marginLeft: 10,
                }} onPress={handleDislike}>
                    {
                        (react === "dislike" || post.down_voters.includes(userInfo.profile)) ?(
                            <FAIcon name='dislike2' color="red" size={20} />
                        ):(

                            <FAIcon name='dislike2' color="#fff" size={20} />
                        )
                    }
                    <Text
                        style={{
                            marginLeft: 6,
                            fontFamily: 'NSRegular',
                            color: '#fff',
                        }}
                    >
                        {dislikeNo>0?dislikeNo:""}
                       

                    </Text>
                </TouchableOpacity>

                {route.name == "home" && <TouchableOpacity
                    style={{
                        ...styles.postStatsOpacity,
                        marginLeft: 10,
                    }}
                    onPress={() => navigation.navigate("comment", { post })}
                >
                    <Icon name='message-circle' color='#fff' size={16} />

                    {
                        post.comment_count > 0 ? (
                            <Text
                                style={{
                                    marginLeft: 6,
                                    fontFamily: 'NSRegular',
                                    color: '#fff',
                                }}
                            >
                                {post.comment_count}
                            </Text>
                        ) :
                            <Text></Text>
                    }


                </TouchableOpacity>}


            </View>

        </View>
    );
}

export default Post;



const styles = StyleSheet.create({
    postHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        maxHeight:60
    },
    postStatsOpacity: {
        backgroundColor: '#222',
        padding: 8,
        borderRadius: 6,
        flexDirection: 'row',
        alignItems: 'center',
    },
    postView: {
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

})