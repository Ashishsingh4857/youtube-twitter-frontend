import { useCallback } from "react";

const useDiscardChanges = (getValues, reset, options = {}) => {
  const {
    avatarPreview,
    coverPhotoPreview,
    setAvatarPreview,
    setCoverPhotoPreview,
    selectedAvatar,
    setSelectedAvatar,
    selectedCoverPhoto,
    setSelectedCoverPhoto,
    selectedFields,
    setSelectedFields,
    selectedEmail,
    setSelectedEmail,
    selectedFullName,
    setSelectedFullName,
    selectedUsername,
    setSelectedUsername,
    thumbnailPreview,
    setThumbnailPreview,
  } = options;

  const handleDiscardChanges = useCallback(
    () => {
      reset(getValues());
      if (avatarPreview && setAvatarPreview) {
        URL.revokeObjectURL(avatarPreview);
        setAvatarPreview(null);
      }
      if (coverPhotoPreview && setCoverPhotoPreview) {
        URL.revokeObjectURL(coverPhotoPreview);
        setCoverPhotoPreview(null);
      }
      if (setSelectedAvatar) setSelectedAvatar(null);
      if (setSelectedCoverPhoto) setSelectedCoverPhoto(null);
      if (setSelectedFields) setSelectedFields([]);
      if (setSelectedEmail) setSelectedEmail(false);
      if (setSelectedFullName) setSelectedFullName(false);
      if (setSelectedUsername) setSelectedUsername(false);
      if (thumbnailPreview && setThumbnailPreview) {
        URL.revokeObjectURL(thumbnailPreview);
        setThumbnailPreview(null);
      }
    },
    // dependency
    [
      reset,
      getValues,
      avatarPreview,
      coverPhotoPreview,
      setAvatarPreview,
      setCoverPhotoPreview,
      setSelectedAvatar,
      setSelectedCoverPhoto,
      selectedFields,
      setSelectedFields,
      setSelectedEmail,
      setSelectedFullName,
      setSelectedUsername,
      thumbnailPreview,
      setThumbnailPreview,
    ]
  );

  return { handleDiscardChanges };
};

export default useDiscardChanges;
