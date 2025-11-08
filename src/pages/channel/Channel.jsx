import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { userChannelProfile } from "../../store/slices/userSlice.js";
const UserChannelProfile = () => {
  const dispatch = useDispatch();
  const { username } = useParams();

  const channel = useSelector((state) => state.user?.profileData);
  useEffect(() => {
    dispatch(userChannelProfile(username));
  }, [dispatch, username]);
  console.log(channel);

  return <div>user Channel profile</div>;
};

export default UserChannelProfile;
