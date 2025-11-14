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
  } = options;

  const handleDiscardChanges = useCallback(() => {
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
  }, [
    reset,
    getValues,
    avatarPreview,
    coverPhotoPreview,
    setAvatarPreview,
    setCoverPhotoPreview,
    setSelectedAvatar,
    setSelectedCoverPhoto,
  ]);

  return { handleDiscardChanges };
};

export default useDiscardChanges;
