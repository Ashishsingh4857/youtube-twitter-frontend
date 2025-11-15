// custom hook for checking the uploading file type
import { useState, useEffect } from "react";

const useFileTypeCheck = (acceptedTypes, file) => {
  const [isFileTypeValid, setIsFileTypeValid] = useState(true); // Set initial state to true
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (file) {
      const fileType = file.type;
      const isValid = acceptedTypes.includes(fileType);
      if (isValid) {
        setIsFileTypeValid(true);
        setErrorMessage("");
      } else {
        setIsFileTypeValid(false);
        setErrorMessage(
          `Invalid file type. Accepted types are: ${acceptedTypes.join(", ")}`
        );
      }
    } else {
      setIsFileTypeValid(true); // Reset to true when no file is selected
      setErrorMessage("");
    }
  }, [file, acceptedTypes]);

  return { isFileTypeValid, errorMessage };
};

export default useFileTypeCheck;
