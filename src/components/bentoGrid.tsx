import React from 'react';

const Example: React.FC = () => {
  return (
    <div className="bg-white py-24 sm:py-32 dark:bg-black">
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-center text-base/7 font-semibold text-gray-800 dark:text-gray-300 tracking-wider uppercase">Premium Technology</h2>
        <p className="mx-auto mt-2 max-w-lg text-center text-4xl font-light tracking-tight text-balance text-black sm:text-5xl dark:text-white">
          Crafted for Excellence
        </p>
        <div className="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2">
          
          {/* MacBook Pro - Large Left Panel */}
          <div className="relative lg:row-span-2">
            <div className="absolute inset-px rounded-lg bg-gray-50 lg:rounded-l-4xl dark:bg-gray-900 border border-gray-200 dark:border-gray-800" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] lg:rounded-l-[calc(2rem+1px)]">
              <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                <p className="mt-2 text-lg font-light tracking-tight text-black max-lg:text-center dark:text-white">
                  MacBook Pro M3
                </p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center dark:text-gray-400 font-light">
                  Unleash your creativity with the most advanced chip architecture. 22-hour battery life meets professional-grade performance.
                </p>
              </div>
              <div className="@container relative min-h-120 w-full grow max-lg:mx-auto max-lg:max-w-sm">
                <div className="absolute inset-x-10 top-10 bottom-0 overflow-hidden rounded-t-[12cqw] border-x-[3cqw] border-t-[3cqw] border-gray-300 bg-black shadow-2xl dark:border-gray-600 dark:shadow-none">
                  <img
                    alt="MacBook Pro with sleek black design"
                    src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRkZGRkZGIi8+CjxyZWN0IHg9IjUwIiB5PSI4MCIgd2lkdGg9IjMwMCIgaGVpZ2h0PSIxODAiIHJ4PSIxMCIgZmlsbD0iIzAwMDAwMCIvPgo8cmVjdCB4PSI2MCIgeT0iOTAiIHdpZHRoPSIyODAiIGhlaWdodD0iMTYwIiByeD0iNSIgZmlsbD0iIzExMTExMSIvPgo8Y2lyY2xlIGN4PSIyMDAiIGN5PSIyNzAiIHI9IjMiIGZpbGw9IiNBQUFBQUEiLz4KPHN2Zz4K"
                    className="size-full object-cover object-center"
                  />
                </div>
              </div>``
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-black/5 lg:rounded-l-4xl dark:outline-white/10" />
          </div>

          {/* iPhone 15 Pro - Top Center */}
          <div className="relative max-lg:row-start-1">
            <div className="absolute inset-px rounded-lg bg-gray-50 max-lg:rounded-t-4xl dark:bg-gray-900 border border-gray-200 dark:border-gray-800" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]">
              <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                <p className="mt-2 text-lg font-light tracking-tight text-black max-lg:text-center dark:text-white">
                  iPhone 15 Pro
                </p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center dark:text-gray-400 font-light">
                  Titanium design with A17 Pro chip. Photography redefined with 5x telephoto camera.
                </p>
              </div>
              <div className="flex flex-1 items-center justify-center px-8 max-lg:pt-10 max-lg:pb-12 sm:px-10 lg:pb-2">
                <div className="w-20 h-36 bg-black rounded-3xl border-2 border-gray-800 shadow-xl relative">
                  <div className="w-16 h-32 bg-gray-900 rounded-3xl m-0.5 relative overflow-hidden">
                    <div className="w-8 h-1 bg-gray-700 rounded-full mx-auto mt-2"></div>
                    <div className="w-12 h-20 bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl mx-auto mt-2"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-black/5 max-lg:rounded-t-4xl dark:outline-white/10" />
          </div>

          {/* AirPods Pro - Bottom Center */}
          <div className="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2">
            <div className="absolute inset-px rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)]">
              <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                <p className="mt-2 text-lg font-light tracking-tight text-black max-lg:text-center dark:text-white">
                  AirPods Pro
                </p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center dark:text-gray-400 font-light">
                  Adaptive Audio with personalized spatial audio. Active noise cancellation redefined.
                </p>
              </div>
              <div className="@container flex flex-1 items-center justify-center max-lg:py-6 lg:pb-2">
                <div className="flex space-x-4 items-center">
                  <div className="w-6 h-8 bg-white rounded-full shadow-lg border border-gray-200 relative">
                    <div className="w-1 h-3 bg-gray-800 rounded-full mx-auto mt-1"></div>
                  </div>
                  <div className="w-12 h-8 bg-white rounded-xl shadow-lg border border-gray-200"></div>
                  <div className="w-6 h-8 bg-white rounded-full shadow-lg border border-gray-200 relative">
                    <div className="w-1 h-3 bg-gray-800 rounded-full mx-auto mt-1"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-black/5 dark:outline-white/10" />
          </div>

          {/* Apple Watch Ultra - Large Right Panel */}
          <div className="relative lg:row-span-2">
            <div className="absolute inset-px rounded-lg bg-gray-50 max-lg:rounded-b-4xl lg:rounded-r-4xl dark:bg-gray-900 border border-gray-200 dark:border-gray-800" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-r-[calc(2rem+1px)]">
              <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                <p className="mt-2 text-lg font-light tracking-tight text-black max-lg:text-center dark:text-white">
                  Apple Watch Ultra
                </p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center dark:text-gray-400 font-light">
                  Aerospace-grade titanium. Built for extreme conditions with 36-hour battery life and precision GPS.
                </p>
              </div>
              <div className="relative min-h-120 w-full grow flex items-center justify-center">
                <div className="w-32 h-40 relative">
                  {/* Watch Face */}
                  <div className="w-24 h-24 bg-black rounded-2xl mx-auto shadow-2xl border border-gray-800 relative overflow-hidden">
                    <div className="w-20 h-20 bg-gray-900 rounded-xl m-0.5 relative">
                      <div className="absolute inset-2 border border-gray-700 rounded-lg"></div>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-white rounded-full"></div>
                    </div>
                  </div>
                  {/* Watch Band */}
                  <div className="w-6 h-16 bg-gray-800 rounded-full mx-auto -mt-2"></div>
                  <div className="w-8 h-6 bg-gray-700 rounded-lg mx-auto -mt-1"></div>
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-black/5 max-lg:rounded-b-4xl lg:rounded-r-4xl dark:outline-white/10" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Example;