import React from "react";
import SubscribeButton from "../elements/SubscribeButton";

export default function SubscriptionCard({
  channel,
  variant = "subscribe",
  onRemove,
}) {
  const avatarUrl = channel?.avatar?.url || "/default-avatar.png";

  return (
    <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4 w-full">
      {/* Avatar and info */}
      <div className="flex items-start gap-4 flex-1 min-w-0">
        <img
          src={avatarUrl}
          alt={channel?.username}
          className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover shrink-0 bg-[#272727]"
        />
        <div className="flex-1 min-w-0">
          <h2 className="text-lg font-semibold truncate">
            {channel?.fullName || channel?.username}
          </h2>
          <p className="text-sm text-gray-400 truncate">
            @{channel?.username} •{" "}
            {(channel?.subscribersCount || 0).toLocaleString()} subscribers
          </p>
          <p className="text-sm text-gray-400 mt-1 line-clamp-2">
            {channel?.description ||
              `Warm Welcome to ${channel?.fullName || channel?.username}.`}
          </p>
        </div>
      </div>

      {/* Button */}
      <div className="pl-24 sm:pl-0 shrink-0">
        {variant === "remove" ? (
          <button
            onClick={() => onRemove(channel?._id)}
            className="px-4 py-1.5 rounded-full text-xs font-semibold bg-red-500/10 text-red-500 border border-red-500/30 hover:bg-red-500 hover:text-white transition-all"
          >
            Remove
          </button>
        ) : (
          <SubscribeButton channelId={channel?._id} size="sm" />
        )}
      </div>
    </div>
  );
}
