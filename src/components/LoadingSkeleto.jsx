const LoadingSkeleton = ({ className = "" }) => {
  const SkeletonBox = ({ width, height, className: boxClassName = "" }) => (
    <div 
      className={`bg-gray-200 dark:bg-gray-800 animate-pulse rounded-2xl ${boxClassName}`}
      style={{ width, height }}
    />
  );

  return (
    <div className={`max-w-7xl mx-auto p-6 space-y-12 ${className}`}>
      {/* Breadcrumb Skeleton */}
      <div className="flex items-center space-x-2">
        <SkeletonBox width="60px" height="20px" className="rounded-lg" />
        <div className="w-1 h-1 bg-gray-300 dark:bg-gray-700 rounded-full" />
        <SkeletonBox width="80px" height="20px" className="rounded-lg" />
        <div className="w-1 h-1 bg-gray-300 dark:bg-gray-700 rounded-full" />
        <SkeletonBox width="120px" height="20px" className="rounded-lg" />
      </div>

      {/* Product Grid Skeleton */}
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Image Gallery Skeleton */}
        <div className="space-y-6">
          <SkeletonBox width="100%" height="500px" className="rounded-3xl" />
          <div className="flex gap-3">
            {[...Array(4)].map((_, i) => (
              <SkeletonBox key={i} width="80px" height="80px" className="rounded-2xl" />
            ))}
          </div>
        </div>

        {/* Product Info Skeleton */}
        <div className="space-y-8">
          {/* Category */}
          <SkeletonBox width="120px" height="32px" className="rounded-full" />
          
          {/* Product Name */}
          <div className="space-y-4">
            <SkeletonBox width="100%" height="60px" className="rounded-2xl" />
            <SkeletonBox width="80%" height="60px" className="rounded-2xl" />
          </div>
          
          {/* Rating */}
          <div className="flex items-center gap-3">
            <SkeletonBox width="150px" height="24px" className="rounded-lg" />
            <SkeletonBox width="100px" height="20px" className="rounded-lg" />
          </div>
          
          {/* Price */}
          <div className="flex items-end gap-4">
            <SkeletonBox width="200px" height="72px" className="rounded-2xl" />
            <SkeletonBox width="100px" height="40px" className="rounded-xl" />
            <SkeletonBox width="60px" height="32px" className="rounded-full" />
          </div>
          
          {/* Stock */}
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-gray-300 dark:bg-gray-700 rounded-full" />
            <SkeletonBox width="80px" height="20px" className="rounded-lg" />
          </div>
          
          {/* Description */}
          <div className="space-y-3">
            <SkeletonBox width="100%" height="24px" className="rounded-lg" />
            <SkeletonBox width="100%" height="24px" className="rounded-lg" />
            <SkeletonBox width="60%" height="24px" className="rounded-lg" />
          </div>
          
          {/* Actions Card */}
          <SkeletonBox width="100%" height="280px" className="rounded-3xl" />
        </div>
      </div>

      {/* Tabs Skeleton */}
      <div className="space-y-0">
        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 dark:border-gray-800">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex-1 p-6 text-center">
              <SkeletonBox width="120px" height="24px" className="rounded-lg mx-auto" />
            </div>
          ))}
        </div>
        
        {/* Tab Content */}
        <div className="p-12 space-y-6">
          <SkeletonBox width="200px" height="32px" className="rounded-xl" />
          <div className="space-y-4">
            <SkeletonBox width="100%" height="24px" className="rounded-lg" />
            <SkeletonBox width="100%" height="24px" className="rounded-lg" />
            <SkeletonBox width="100%" height="24px" className="rounded-lg" />
            <SkeletonBox width="80%" height="24px" className="rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;