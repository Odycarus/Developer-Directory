import DeveloperSkeleton from "./DeveloperSkeleton";

function SkeletonList() {

  return (
    <div className="developer-grid">

      {Array.from({ length: 9 }).map((_, index) => (
        <DeveloperSkeleton key={index} />
      ))}

    </div>
  );

}

export default SkeletonList;