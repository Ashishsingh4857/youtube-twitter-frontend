import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleSubscription,
  checkSubscriptionStatus,
} from "../../store/slices/subscriptionSlice";

const sizeStyles = {
  sm: {
    button: "px-3 py-1.5 text-xs",
    icon: "w-3 h-3",
    spinner: "w-4 h-4",
  },
  md: {
    button: "px-6 py-2.5 text-sm",
    icon: "w-4 h-4",
    spinner: "w-5 h-5",
  },
  lg: {
    button: "px-8 py-3 text-base",
    icon: "w-5 h-5",
    spinner: "w-6 h-6",
  },
};

function SubscribeButton({ channelId, size = "md", className = "" }) {
  const dispatch = useDispatch();
  const { subscribedMap, loading, statusLoading } = useSelector(
    (state) => state.subscription
  );

  useEffect(() => {
    if (channelId && subscribedMap?.[channelId] === undefined) {
      dispatch(checkSubscriptionStatus(channelId));
    }
  }, [channelId, subscribedMap, dispatch]);

  if (!channelId) return null;

  const isSubscribed = subscribedMap?.[channelId] || false;
  const isChecking = statusLoading && subscribedMap?.[channelId] === undefined;
  const s = sizeStyles[size] || sizeStyles.md;

  const handleClick = () => {
    dispatch(toggleSubscription(channelId));
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading || isChecking}
      className={`
        relative ${s.button} rounded-full font-semibold
        transition-all duration-300 ease-in-out transform
        active:scale-95 hover:scale-105
        disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100
        shadow-lg hover:shadow-xl
        ${
          isSubscribed
            ? "bg-gray-800 text-white hover:bg-gray-900 border border-gray-600"
            : "bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 shadow-red-500/30"
        }
        ${className}
      `}
    >
      <span
        className={`flex items-center gap-2 transition-opacity duration-200 ${loading ? "opacity-0" : "opacity-100"}`}
      >
        {isChecking ? (
          "Loading..."
        ) : isSubscribed ? (
          <>
            <svg className={s.icon} fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            Subscribed
          </>
        ) : (
          <>
            <svg
              className={s.icon}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Subscribe
          </>
        )}
      </span>

      {loading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <span
            className={`${s.spinner} border-2 border-white/30 border-t-white rounded-full animate-spin`}
          ></span>
        </span>
      )}
    </button>
  );
}

export default SubscribeButton;
