import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  togglePublishStatus,
  getVideosByUser,
} from "../../../store/slices/videoSlice.js";
import { FiChevronDown, FiChevronUp, FiMoreVertical } from "react-icons/fi";
import { AiOutlineInfoCircle } from "react-icons/ai";
import ClickAwayListener from "react-click-away-listener";

const VideoTable = () => {
  const { username } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getVideosByUser(username));
  }, [dispatch, username]);

  // userprofile data from store
  const videos = useSelector((state) => state.video?.userVideos?.docs);
  const [VideoVisibilityDropdown, setVideoVisibilityDropdown] = useState(null);
  const [videoInfoDropdown, setVideoInfoDropdown] = useState(null);
  const [actionsDropdown, setActionsDropdown] = useState(null);

  // handle video visibility change
  const handleVisibilityChange = async (videoId) => {
    await dispatch(togglePublishStatus(videoId));
    setVideoVisibilityDropdown(null);
  };

  const handleEditVideo = (videoId) => {
    console.log(`Edit video ${videoId}`);
    setActionsDropdown(null);
  };

  const handleDeleteVideo = (videoId) => {
    console.log(`delete video ${videoId}`);
    setActionsDropdown(null);
  };

  const handleClickAway = (dropdownType, videoId) => {
    if (dropdownType === "actions") {
      setActionsDropdown(null);
    } else if (dropdownType === "visibility") {
      setVideoVisibilityDropdown(null);
    } else if (dropdownType === "info") {
      setVideoInfoDropdown(null);
    }
  };

  return (
    <div className="overflow-x-auto min-h-screen">
      <table className="w-full text-left text-white">
        <thead>
          <tr className="border-b border-gray-700 h-12">
            <th className="px-4 py-2 text-sm font-medium flex-1 ">Title</th>
            <th className="px-4 py-2 text-sm font-medium">Actions</th>
            <th className="px-4 py-2 text-sm font-medium">Visibility</th>
            <th className="px-4 py-2 text-sm font-medium">Restrictions</th>
            <th className="px-4 py-2 text-sm font-medium">Date</th>
            <th className="px-4 py-2 text-sm font-medium">Views</th>
            <th className="px-4 py-2 text-sm font-medium">Comments</th>
            <th className="px-4 py-2 text-sm font-medium">Likes</th>
          </tr>
        </thead>
        {videos && videos.length > 0
          ? videos.map((video) => {
              const {
                thumbnail,
                title,
                description,
                views,
                createdAt,
                updatedAt,
                duration,
                isPublished,
                likesCount,
                commentsCount,
                _id,
              } = video || {};

              const formattedDuration = `${Math.floor(duration / 60)}:${duration % 60 < 10 ? "0" : ""}${duration % 60}`;

              return (
                <tbody key={_id}>
                  <tr className="border-b border-gray-700 hover:bg-gray-800 h-21">
                    <td className="px-4 py-2 text-sm flex flex-col md:flex-row items-center min-w-60">
                      <div className="relative mr-2">
                        <img
                          src={thumbnail?.url}
                          alt={title}
                          className="w-30 h-15 object-cover "
                        />
                        <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-1 py-0.5 rounded-md">
                          {formattedDuration}
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <span className="overflow-hidden">
                          {title.length > 30 ? (
                            <span>
                              {title.substring(0, 30)}...
                              <AiOutlineInfoCircle
                                size={20}
                                className="ml-1 cursor-pointer"
                                onClick={() =>
                                  setVideoInfoDropdown(
                                    videoInfoDropdown === _id ? null : _id
                                  )
                                }
                              />
                            </span>
                          ) : (
                            title
                          )}
                        </span>
                        <span className="overflow-hidden text-gray-500 text-xs">
                          {description.length > 30 ? (
                            <span>
                              {description.substring(0, 30)}...
                              <AiOutlineInfoCircle
                                size={20}
                                className="ml-1 cursor-pointer"
                                onClick={() =>
                                  setVideoInfoDropdown(
                                    videoInfoDropdown === _id ? null : _id
                                  )
                                }
                              />
                            </span>
                          ) : (
                            description
                          )}
                        </span>
                        {videoInfoDropdown === _id && (
                          <ClickAwayListener
                            onClickAway={() => handleClickAway("info", _id)}
                          >
                            <div className="absolute bg-gray-800 border border-gray-700 rounded-md p-2 w-64 z-10 text-sm">
                              <span className="font-bold ">{title}</span>
                              <br />
                              <span>{description}</span>
                              <FiChevronUp
                                className="ml-1 cursor-pointer"
                                onClick={() =>
                                  setVideoInfoDropdown(
                                    videoInfoDropdown === _id ? null : _id
                                  )
                                }
                              />
                            </div>
                          </ClickAwayListener>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-2 text-sm relative">
                      <button
                        className="text-gray-400 hover:text-white cursor-pointer"
                        onClick={() =>
                          setActionsDropdown(
                            actionsDropdown === _id ? null : _id
                          )
                        }
                      >
                        <FiMoreVertical size={30} />
                      </button>
                      {actionsDropdown === _id && (
                        <ClickAwayListener
                          onClickAway={() => handleClickAway("actions", _id)}
                        >
                          <div className="absolute right-0 bg-gray-800 border border-gray-700 rounded-md p-2 w-32 z-10">
                            <ul>
                              <li
                                className="px-2 py-1 hover:bg-gray-700 cursor-pointer"
                                onClick={() => handleEditVideo(_id)}
                              >
                                Edit Video
                              </li>
                              <li
                                className="px-2 py-1 hover:bg-gray-700 cursor-pointer"
                                onClick={() => handleDeleteVideo(_id)}
                              >
                                Delete Video
                              </li>
                            </ul>
                          </div>
                        </ClickAwayListener>
                      )}
                    </td>
                    <td className="px-4 py-2 text-sm relative">
                      <div
                        className="flex items-center cursor-pointer"
                        onClick={() =>
                          setVideoVisibilityDropdown(
                            VideoVisibilityDropdown === _id ? null : _id
                          )
                        }
                      >
                        <span>{isPublished ? "Public" : "Private"}</span>
                        <FiChevronDown className="ml-2" />
                      </div>
                      {VideoVisibilityDropdown === _id && (
                        <ClickAwayListener
                          onClickAway={() => handleClickAway("visibility", _id)}
                        >
                          <div className="absolute bg-gray-800 border border-gray-700 rounded-md p-2 w-32 z-10">
                            <ul>
                              {!isPublished ? (
                                <li
                                  className="px-2 py-1 hover:bg-gray-700 cursor-pointer"
                                  onClick={() => handleVisibilityChange(_id)}
                                >
                                  Public
                                </li>
                              ) : (
                                <li
                                  className="px-2 py-1 hover:bg-gray-700 cursor-pointer"
                                  onClick={() => handleVisibilityChange(_id)}
                                >
                                  Private
                                </li>
                              )}
                            </ul>
                          </div>
                        </ClickAwayListener>
                      )}
                    </td>
                    <td className="px-4 py-2 text-sm">-</td>
                    <td className="px-4 py-2 text-sm">
                      {" "}
                      <span>
                        {createdAt !== updatedAt ? `Updated ` : `Published `}
                        {new Date(
                          updatedAt !== createdAt ? updatedAt : createdAt
                        ).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-sm">{views}</td>
                    <td className="px-4 py-2 text-sm">{commentsCount}</td>
                    <td className="px-4 py-2 text-sm">{likesCount}</td>
                  </tr>
                </tbody>
              );
            })
          : null}
      </table>
    </div>
  );
};

export default VideoTable;
