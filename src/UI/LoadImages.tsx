import React, { useState, useEffect } from "react";

import { ErrorMessage, LoadingMessage } from "../Messages";

type LoadImagesProps = {
  readonly children: any;
  readonly images: string[];
}

const LoadImages = (props : LoadImagesProps) => {
  const
    [loaded, setLoaded] = useState(false),
    [hasError, setHasError] = useState(false),

    fetchAll = () => {
      setHasError(false);
      setLoaded(false);

      const
        loadImage = (image : any) => new Promise((resolve, reject) => {
          const loadImg = new Image();

          loadImg.src = image;
          loadImg.onload = () => {
            resolve(image);
          };
          loadImg.onerror = (err) => {
            reject(err);
          };
        });

      Promise.all(props.images.map((image) => loadImage(image))).
        then(() => setLoaded(true)).
        catch(() => () => {
          setHasError(true);
          setLoaded(false);
        });
    };

  useEffect(() => {
    fetchAll();
  }, []);


  if (loaded) {
    return props.children;
  }

  if (hasError) {
    return <ErrorMessage message="Problem loading" onRetry={fetchAll} />;
  }

  return (
    <LoadingMessage className="mt-5" />
  );
};

export default LoadImages;
