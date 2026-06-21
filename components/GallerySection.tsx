import Image from "next/image";
import { galleryImages } from "@/data/site";

const tileClasses = [
  "md:col-span-6 md:row-span-2",
  "md:col-span-3",
  "md:col-span-3",
  "md:col-span-4",
  "md:col-span-4",
  "md:col-span-4",
];

export default function GallerySection() {
  return (
    <section id="gallery" className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="section-eyebrow">Hình ảnh</p>
            <h2 className="section-title mt-3 max-w-3xl">
              Góc nhìn thật về không gian Mộc Nhiên
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-olive">
            Ảnh sử dụng từ khách hàng cung cấp, giúp khách xem nhanh không gian
            trước khi liên hệ đặt phòng.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-12 md:auto-rows-[220px] lg:auto-rows-[260px]">
          {galleryImages.map((image, index) => (
            <figure
              key={image.src}
              className={`group relative overflow-hidden rounded-lg bg-softbeige shadow-sm ${
                index === 0 ? "col-span-2 aspect-[4/3] md:aspect-auto" : "aspect-[4/5] md:aspect-auto"
              } ${tileClasses[index]}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes={
                  index === 0
                    ? "(min-width: 768px) 50vw, 100vw"
                    : "(min-width: 768px) 33vw, 50vw"
                }
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
