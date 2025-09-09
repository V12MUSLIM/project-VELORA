import { Link } from "react-router-dom";
const BentoGrid = () => {
  const devices = [
    {
      id: "phone",
      name: "Phone",
      image: `${import.meta.env.BASE_URL}phone.jpeg`,
      gridClass: "md:col-span-1 md:row-span-2",
    },
    {
      id: "gpu",
      name: "GPU",
      image: `${import.meta.env.BASE_URL}gpu.jpeg`,
      gridClass: "md:col-span-2 md:row-span-1",
    },
    {
      id: "laptop",
      name: "Laptop",
      image: `${import.meta.env.BASE_URL}laptop.jpeg`,
      gridClass: "md:col-span-2 md:row-span-2",
    },
    {
      id: "tablet",
      name: "Tablet",
      image: `${import.meta.env.BASE_URL}tablet.jpeg`,
      gridClass: "md:col-span-1 md:row-span-1",
    },
    {
      id: "headset",
      name: "Headset",
      image: `${import.meta.env.BASE_URL}headset.jpeg`,
      gridClass: "md:col-span-1 md:row-span-1",
    },
    {
      id: "drone",
      name: "Drone",
      image: `${import.meta.env.BASE_URL}drone.jpeg`,
      gridClass: "md:col-span-1 md:row-span-1",
    },
    {
      id: "watch",
      name: "Watch",
      image: `${import.meta.env.BASE_URL}watch.jpeg`,
      gridClass: "md:col-span-1 md:row-span-1",
    },
    {
      id: "tv",
      name: "TV",
      image: `${import.meta.env.BASE_URL}tv.jpeg`,
      gridClass: "md:col-span-1 md:row-span-1",
    },
    {
      id: "tower",
      name: "Tower",
      image: `${import.meta.env.BASE_URL}tower.jpeg`,
      gridClass: "md:col-span-1 md:row-span-1",
    },
    {
      id: "vr",
      name: "VR",
      image: `${import.meta.env.BASE_URL}vr.jpeg`,
      gridClass: "md:col-span-1 md:row-span-1",
    },
  ];

  return (
    <div className="min-h-screen p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-20">
          <h1 className="text-5xl sm:text-7xl lg:text-9xl font-thin text-black dark:text-white mb-6 sm:mb-8 tracking-[0.3em] leading-none">
            COLLECTIONS
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-base sm:text-xl font-extralight tracking-[0.15em] sm:tracking-[0.2em] uppercase">
            Curated Excellence
          </p>
          <div className="w-16 sm:w-24 h-[1px] bg-black dark:bg-white mx-auto mt-8 sm:mt-12 opacity-20"></div>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[200px] sm:auto-rows-[250px] md:auto-rows-[300px] gap-2 sm:gap-4">
          {devices.map((device) => (
            <div
              key={device.id}
              className={`${device.gridClass} group relative overflow-hidden cursor-pointer`}
            >
              {/* Image Container */}
              <div className="relative w-full h-full overflow-hidden bg-gray-100 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 hover:border-black dark:hover:border-white transition-all duration-700 ease-out">
                <img
                  src={device.image}
                  alt={device.name}
                  className="w-full h-full object-cover transition-all duration-1000 ease-out group-hover:scale-105 filter grayscale group-hover:grayscale-0"
                  onError={(e) => {
                    e.currentTarget.onerror = null; // prevent infinite loop
                    e.currentTarget.src = `${import.meta.env.BASE_URL}no-image.jpeg`; // fallback stored in public/no-image.jpeg
                  }}
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                {/* Minimalist Label */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                  <div className="text-center transform translate-y-6 group-hover:translate-y-0 transition-transform duration-700 ease-out">
                    <div className="w-px h-6 sm:h-8 bg-white mx-auto mb-3 sm:mb-4 opacity-60"></div>
                    <h3 className="text-white text-sm sm:text-lg font-light tracking-[0.2em] sm:tracking-[0.3em] uppercase">
                      {device.name}
                    </h3>
                    <div className="w-px h-6 sm:h-8 bg-white mx-auto mt-3 sm:mt-4 opacity-60"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 sm:mt-16 lg:mt-20 text-center">
          <Link to="/shop">
            <button className="group relative px-6 sm:px-12 lg:px-16 py-3 sm:py-5 lg:py-6 border-2 border-black dark:border-white text-black dark:text-white font-light tracking-[0.15em] sm:tracking-[0.3em] uppercase text-xs sm:text-sm transition-all duration-700 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black">
              <span className="relative z-10">View Collection</span>
              <div className="absolute inset-0 bg-black dark:bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
            </button>
          </Link>
          <div className="mt-6 sm:mt-10 lg:mt-12">
            <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm font-light tracking-[0.1em] sm:tracking-[0.2em] uppercase">
              Premium • Minimalist • Timeless
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BentoGrid;
