import { Swiper, SwiperSlide } from "swiper/react";

import {
    A11y,
    Autoplay,
    EffectFade,
    Navigation,
    Pagination,
} from "swiper/modules";

import { bannerList } from "../../utils";
// import "swiper/swiper-bundle.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-fade";
import "swiper/css/autoplay";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HeroBanner = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        // sm:max-w-[720px]: md:max-w-[900px] lg:max-w-[1200px] xl:max-w-[1792px]
        <div className="sm:max-w-[720px]: md:max-w-[900px] lg:max-w-[1200px] xl:max-w-[1792px]">
            {/* lg:px-14 sm:px-8 px-4 */}
            <Swiper
                grabCursor={true}
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                }}
                modules={[Pagination, EffectFade, Navigation, Autoplay, A11y]}
                // spaceBetween={0}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                // scrollbar={{ draggable: true }}
                // onSwiper={(swiper) => console.log(swiper)}
                // onSlideChange={() => console.log("slide change")}
            >
                {bannerList.map((item, i) => (
                    <SwiperSlide key={item.id}>
                        <div
                            className={`carousel-item rounded-md sm:h-[500] h-96 ${item.color}`}
                        >
                            <div className="flex items-center justify-center">
                                <div className="hidden lg:flex justify-center w-1/2 p-8">
                                    <div className="text-center">
                                        <h3 className="text-3xl text-white font-bold">
                                            {item.title}
                                        </h3>
                                        <h1 className="text-5xl text-white font-bold mt-2">
                                            {item.subtitle}
                                        </h1>
                                        <p className="text-white font-bold mt-4">
                                            {item.description}
                                        </p>
                                        <Link
                                            className="mt-6 inline-block bg-black text-white py-2 px-4 rounded hover:bg-gray-800"
                                            to={"/products"}
                                        >
                                            SHOP
                                        </Link>
                                    </div>
                                </div>
                                <div className="w-full flex justify-center lg:w-1/2">
                                    <img src={item?.image} />
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default HeroBanner;
