// custom hook for checking the uploading file type
import { useState, useEffect } from "react";

const useFileTypeCheck = (acceptedTypes, file) => {
  const [isFileTypeValid, setIsFileTypeValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (file) {
      const fileType = file.type;
      console.log(fileType);

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
      setIsFileTypeValid(false);
      setErrorMessage("");
    }
  }, [file, acceptedTypes]);

  return { isFileTypeValid, errorMessage };
};

export default useFileTypeCheck;
