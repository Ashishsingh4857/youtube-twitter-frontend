// this is a custom hook used to discard the from changes
import { useCallback } from "react";
import { useFormContext } from "react-hook-form";

const useDiscardChanges = (reset, getValues) => {
  const handleDiscardChanges = useCallback(() => {
    const values = getValues();
    if (values && typeof values === "object") {
      Object.keys(values).forEach((fieldName) => {
        if (values[fieldName] instanceof FileList) {
          // Revoke object URL for file inputs
          URL.revokeObjectURL(values[fieldName][0]);
        }
      });
    }
    reset();
  }, [getValues, reset]);

  return { handleDiscardChanges };
};

export default useDiscardChanges;
