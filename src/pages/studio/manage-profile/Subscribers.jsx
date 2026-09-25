import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SubscriptionCard from "../../../components/channel/SubscriptionCard.jsx";
import {
  fetchChannelSubscribers,
  removeSubscriber,
} from "../../../store/slices/subscriptionSlice.js";
import SubscribersSkeleton from "../../../skeleton/SubscriptionSkeleton.jsx";

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

  return (
    <div className="w-full max-w-[900px] mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <h1 className="text-lg sm:text-2xl font-bold mb-4 sm:mb-6 text-white px-1">
        Channel subscribers
      </h1>

      {loading ? (
        <div className="grid gap-3 sm:gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <SubscribersSkeleton key={i} />
          ))}
        </div>
      ) : channelSubscribers?.length ? (
        <div className="grid gap-3 sm:gap-4">
          {channelSubscribers.map((user) => (
            <SubscriptionCard
              key={user?._id}
              channel={user}
              variant="remove"
              onRemove={handleRemove}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 sm:py-20">
          <p className="text-gray-400 text-sm sm:text-base">
            No subscribers yet.
          </p>
          <p className="text-gray-600 text-xs sm:text-sm mt-1">
            When someone subscribes to your channel, they'll appear here.
          </p>
        </div>
      )}
    </div>
  );
};

export default Subscribers;
