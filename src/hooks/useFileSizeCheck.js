import { useState, useEffect } from "react";

const BYTES_IN_MB = 1024 * 1024;

const useFileSizeCheck = (maxSize, file) => {
  const [isSizeExceeded, setIsSizeExceeded] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (file) {
      const fileSizeInMB = file.size / BYTES_IN_MB;
      if (fileSizeInMB > maxSize) {
        setIsSizeExceeded(true);
        setErrorMessage(`File size exceeds the limit of ${maxSize} MB`);
      } else {
        setIsSizeExceeded(false);
        setErrorMessage("");
      }
    } else {
      setIsSizeExceeded(false);
      setErrorMessage("");
    }
  }, [file, maxSize]);

  return { isSizeExceeded, errorMessage };
};

export default useFileSizeCheck;
