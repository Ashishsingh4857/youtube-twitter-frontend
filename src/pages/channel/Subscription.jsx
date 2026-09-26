import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMySubscriptions } from "../../store/slices/subscriptionSlice";
import SubscriptionCard from "../../components/channel/SubscriptionCard";

export default function Subscription() {
  const dispatch = useDispatch();
  // logged in user
  const { userData } = useSelector((s) => s.auth);

  const { mySubscriptions, loading } = useSelector((s) => s.subscription);

  useEffect(() => {
    if (userData?._id) dispatch(fetchMySubscriptions(userData._id));
  }, [userData?._id, dispatch]);

  if (loading)
    return <div className="text-center mt-20 text-white">Loading...</div>;

  return (
    <div className="w-full  text-white">
      <div className="max-w-[900px] w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <h1 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8">
          All subscriptions
        </h1>

        <div className="flex flex-col gap-8">
          {mySubscriptions?.map((channel) => (
            <SubscriptionCard key={channel._id} channel={channel} />
          ))}
        </div>

        {!mySubscriptions?.length && (
          <p className="text-center text-gray-400 mt-20">
            You haven't subscribed to anyone yet.
          </p>
        )}
      </div>
    </div>
  );
}
