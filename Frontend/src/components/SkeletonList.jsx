import "../styles/SkeletonList.css";

function SkeletonList() {
  return (
    <div className="skeleton-list">
      {Array.from({ length: 9 }).map((_, index) => (
        <div className="skeleton-card" key={index}>
          <div className="skeleton-avatar shimmer"></div>

          <div className="skeleton-content">
            <div className="skeleton-name shimmer"></div>

            <div className="skeleton-title shimmer"></div>

            <div className="skeleton-location shimmer"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SkeletonList;