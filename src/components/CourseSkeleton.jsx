import React from 'react';
import ContentLoader from 'react-content-loader';

const CourseSkeleton = props => {
  return (
    <ContentLoader
      speed={2}
      width={1100}
      height={760}
      viewBox="0 0 1100 760"
      backgroundColor="#c9c9c9"
      foregroundColor="#ffffff"
      {...props}
    >
      <path d="M 0 0 h 188 v 711 H 0 z M 202.998 0 h 885 v 711 h -885 z" />
    </ContentLoader>
  );
};

export default CourseSkeleton;
