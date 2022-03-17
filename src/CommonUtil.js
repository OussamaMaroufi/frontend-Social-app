
const getFormatedChatUser = (chatUsers,userId) => {

    return chatUsers.reduce((acumulator, item) => {
      if (item.type === "DM" || item.type === "SELF") {
        let newResult = {};
        newResult["roomId"] = item.roomId;
        let member = null;
        for (let user of item.member) {
          if (user.id !== userId || item.type === "SELF") {
            member = user;
          }
        }
        if (member) {
          newResult["name"] = member.username
          newResult["image"] = member.profile.profile_pic;
          newResult["id"] = member.id;
        //   newResult["isOnline"] = onlineUserList?.includes(member.id);
        }
        acumulator.push(newResult);
        return acumulator;
      }
      return acumulator;
    }, []);
  };

  export default getFormatedChatUser;