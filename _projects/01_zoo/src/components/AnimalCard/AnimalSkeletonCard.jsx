import React from "react";
import ContentLoader from "react-content-loader";

const AnimalSkeletonCard = (props) => (
  <ContentLoader
    speed={2}
    width={579}
    height={193}
    viewBox="0 0 579 193"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="28" y="58" rx="0" ry="0" width="532" height="83" />
    <rect x="28" y="161" rx="0" ry="0" width="227" height="21" />
    <rect x="28" y="17" rx="0" ry="0" width="182" height="21" />
  </ContentLoader>
);

export default AnimalSkeletonCard;
