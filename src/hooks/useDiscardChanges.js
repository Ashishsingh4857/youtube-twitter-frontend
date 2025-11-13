// this is a custom hook used to discard the from changes
// expecting parameters fields
//   const exampleFields = {
//     avatar: { type: "file" },
//     coverPhoto: { type: "file" },
//     email: { type: "text" },
//     fullName: { type: "text" },
//     username: { type: "text" },
//     reset, // =>  rect hook from
//   };
import { useRef, useCallback } from "react";

const useDiscardChanges = (fields) => {
  const inputRefs = useRef({});

  const handleDiscardChanges = useCallback(() => {
    Object.keys(fields).forEach((fieldName) => {
      if (inputRefs.current[fieldName]) {
        if (fields[fieldName].type === "file") {
          URL.revokeObjectURL(inputRefs.current[fieldName].current);
        }
        inputRefs.current[fieldName].current = null;
      }
    });

    fields.reset();
  }, [fields]);

  const registerInputRef = (fieldName, type) => {
    inputRefs.current[fieldName] = useRef(null);
    return {
      ref: inputRefs.current[fieldName],
      onChange: (e) => {
        if (type === "file") {
          inputRefs.current[fieldName].current = e.target.files[0];
        }
      },
    };
  };

  return { handleDiscardChanges, registerInputRef };
};

export default useDiscardChanges;
