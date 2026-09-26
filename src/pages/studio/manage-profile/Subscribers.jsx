import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SubscriptionCard from "../../../components/channel/SubscriptionCard.jsx";
import {
  fetchChannelSubscribers,
  removeSubscriber,
} from "../../../store/slices/subscriptionSlice.js";

const Subscribers = () => {
  const dispatch = useDispatch();
  const { channelSubscribers, loading } = useSelector(
    (state) => state.subscription
  );
  const { userData } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userData?._id) {
      dispatch(fetchChannelSubscribers(userData._id));
    }
  }, [dispatch, userData?._id]);

  const handleRemove = (subscriberId) => {
    dispatch(removeSubscriber(subscriberId));
  };

  if (loading) return <div className="text-white p-4">Loading...</div>;

  if (!channelSubscribers?.length) {
    return (
      <p className="text-center text-gray-400 mt-20">No subscribers yet.</p>
    );
  }

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto">
      <h1 className="text-xl sm:text-3xl font-bold mb-6 sm:mb-8 text-white">
        Channel subscribers
      </h1>

      <div className="grid gap-6">
        {channelSubscribers.map((user) => (
          <SubscriptionCard
            key={user?._id}
            channel={user}
            variant="remove"
            onRemove={handleRemove}
          />
        ))}
      </div>
    </div>
  );
};

export default Subscribers;
