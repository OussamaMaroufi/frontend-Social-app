
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Dimensions,
} from 'react-native';


import { Feather as Icon } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux'
import Post from '../components/Post';
import { listUserPosts } from "../actions/userActions"
import { useRoute } from '@react-navigation/native';

const Profilescreen = ({ route, navigation }) => {

  // const route = useRoute()
  // console.log("this is are route params",route.params);


  const [showContent, setShowContent] = useState('posts');
  const [posts, setPosts] = useState([]);
  const auth = useSelector((state) => state.userLogin)
  const [currentProfile, setCurrentProfile] = useState(auth.userInfo.profile)

  const { loading, data, error } = useSelector((state) => state.userPostsList)
  console.log(currentProfile.username);


  const dispatch = useDispatch();

  //will be dynamic  if we gonna see other user profile 
  // const username = currentProfile.username
  // console.log("username",currentProfile.username);

  // console.log(data)

  // useEffect(() => {
  //   // console.log(route.params);
  //   if(route.params){
  //     const { user } = route.params
  //     console.log("this is the user", user);

  //     setCurrentProfile(route.params)
  //     console.log(currentProfile.username);
  //   }else{
  //     setCurrentProfile(auth.userInfo.profile)
  //   }


  // }, [navigation])


  const setCurrentUser = () => {
    if (route.params) {
      const { user } = route.params
      console.log("this is the user", user);

      setCurrentProfile(route.params)
      console.log(currentProfile.username);
    } else {
      setCurrentProfile(auth.userInfo.profile)
    }
  }



  const LoadResult = async () => {

  


    if (showContent === "posts") {
      await dispatch(listUserPosts(currentProfile.username))
      if (!loading) {
        setPosts(data.results)
      }

    } else {
      // console.log(showContent);
    }
  }

  useEffect(() => {
    LoadResult()
  }, [dispatch])



  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#1f1f1f" }}>
        <ActivityIndicator size={22} color="red" />
      </View>
    )
  }






  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView showsVerticalScrollIndicator={false}>

        <View>
          <Image
            style={styles.coverImage}
            source={{ uri: 'https://picsum.photos/500/500?random=211' }}
          />
        </View>

        <View style={styles.profileContainer}>
          {/* Profile Details */}
          <View>
            {/* Profile Image */}
            <View style={styles.profileImageView}>
              <Image
                style={styles.profileImage}
                source={{
                  uri: `http://192.168.1.100:8000${auth.userInfo.profile.profile_pic}`,
                }}
              />
            </View>
            {/* Profile Name and Bio */}
            <View style={styles.nameAndBioView}>
              <Text style={styles.userFullName}>{auth.userInfo.profile.username}</Text>
              <Text style={styles.userBio}>{'I love capturing photos'}</Text>
            </View>
            {/* Posts/Followers/Following View */}
            <View style={styles.countsView}>
              <View style={styles.countView}>
                <Text style={styles.countNum}>{posts.length}</Text>
                <Text style={styles.countText}>Posts</Text>
              </View>
              <View style={styles.countView}>
                <Text style={styles.countNum}>1246</Text>
                <Text style={styles.countText}>Followers</Text>
              </View>
              <View style={styles.countView}>
                <Text style={styles.countNum}>348</Text>
                <Text style={styles.countText}>Following</Text>
              </View>
            </View>

            {/* Interact Buttons View */}
            {
              currentProfile.username !== auth.userInfo.profile.username && (<View style={styles.interactButtonsView}>
                <TouchableOpacity style={styles.interactButton}>
                  <Text style={styles.interactButtonText}>Follow</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    ...styles.interactButton,
                    backgroundColor: 'white',
                    borderWidth: 2,
                    borderColor: '#4b7bec',
                  }}
                >
                  <Text
                    style={{ ...styles.interactButtonText, color: '#4b7bec' }}
                  >
                    Message
                  </Text>
                </TouchableOpacity>
              </View>)
            }


            {/* Mutual Followed By Text */}
            <View style={{ paddingHorizontal: 25, marginTop: 10 }}>
              <Text style={{ fontFamily: 'NSRegular', fontSize: 16 }}>
                {'Followed by '}
                <Text style={{ fontFamily: 'NSBold' }}>john_doe </Text>
                {'and '}
                <Text style={{ fontFamily: 'NSBold' }}>19 others</Text>
              </Text>
            </View>

          </View>

          <View style={{ marginTop: 15 }}>
            <View style={styles.profileContentButtonsView}>
              <TouchableOpacity
                style={{
                  ...styles.showContentButton,
                  borderBottomWidth: showContent === 'posts' ? 2 : 0,
                }}
                onPress={() => setShowContent('posts')}
              >
                <Text style={styles.showContentButtonText}>Posts</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  ...styles.showContentButton,
                  borderBottomWidth: showContent === 'Albums' ? 2 : 0,
                }}
                onPress={() => setShowContent('Albums')}
              >
                <Text style={styles.showContentButtonText}>Albums</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  ...styles.showContentButton,
                  borderBottomWidth: showContent === 'Tags' ? 2 : 0,
                }}
                onPress={() => setShowContent('Tags')}
              >
                <Text style={styles.showContentButtonText}>Tags</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ marginTop: 20, backgroundColor: "#1f1f1f" }}>
            {
              posts.map((post) => (
                <View style={{ marginBottom: 7, backgroundColor: "#1f1f1f", borderRadius: 10, marginHorizontal: 10 }}>
                  <Post post={post} />

                </View>
              ))
            }
          </View>



          {/**
              {showContent === 'posts' ? (
                
                posts.map((post)=>{
                  <Post post={post}/>
                })
                
              ) : showContent === 'Albums' ? (
                // <Albums />
                <Text>Albums</Text>
              ) : (
                // <Tags photos={new Array(23).fill(1)} />
                <Text>Tags</Text>
              )}*/}



        </View>

      </ScrollView>
    </View>
  );

}

export default Profilescreen;


const styles = StyleSheet.create({
  coverImage: { height: 300, width: '100%' },
  profileContainer: {
    // height: 1000,
    backgroundColor: '#fff',
    marginTop: -100,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flex: 1
  },
  profileImageView: { alignItems: 'center', marginTop: -50 },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: '#fff',
  },
  nameAndBioView: { alignItems: 'center', marginTop: 10 },
  userFullName: { fontFamily: 'NSBold', fontSize: 26 },
  userBio: {
    fontFamily: 'NSRegular',
    fontSize: 18,
    color: '#333',
    marginTop: 4,
  },
  countsView: { flexDirection: 'row', marginTop: 20 },
  countView: { flex: 1, alignItems: 'center' },
  countNum: { fontFamily: 'NSBold', fontSize: 20 },
  countText: { fontFamily: 'NSRegular', fontSize: 18, color: '#333' },
  interactButtonsView: {
    flexDirection: 'row',
    marginTop: 10,
    paddingHorizontal: 20,
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
  profileContentButtonsView: {
    flexDirection: 'row',
    borderTopWidth: 2,
    borderTopColor: '#f1f3f6',
    marginHorizontal: 4
  },
  showContentButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomColor: "#ED4C67",
  },
  showContentButtonText: {
    fontFamily: 'NSRegular',
    fontSize: 18,
  },
  postsView: { paddingHorizontal: 10, marginTop: 10, backgroundColor: '#1f1f1f' },
});