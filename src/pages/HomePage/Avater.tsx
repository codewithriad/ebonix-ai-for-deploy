import img1 from "/avater1.webp";
import img10 from "/avater10.webp";
import img11 from "/avater11.webp";
import img12 from "/avater12.webp";
import img13 from "/avater13.webp";
import img14 from "/avater14.webp";
import img15 from "/avater15.webp";
import img16 from "/avater16.webp";
import img17 from "/avater17.webp";
import img18 from "/avater18.webp";
import img2 from "/avater2.webp";
import img3 from "/avater3.webp";
import img4 from "/avater4.webp";
import img5 from "/avater5.webp";
import img6 from "/avater6.webp";
import img7 from "/avater7.webp";
import img8 from "/avater8.webp";
import img9 from "/avater9.webp";

type Props = {};

const Avatar = (props: Props) => {
  const imgArray = [
    img1,
    img2,
    img3,
    img4,
    img5,
    img6,
    img7,
    img8,
    img9,
    img10,
    img11,
    img12,
    img13,
    img14,
    img15,
    img16,
    img17,
    img18,
  ];

  const images = imgArray.map((src, index) => ({
    id: index + 1,
    src,
  }));

  const chunkedImages = Array.from({ length: 3 }, (_, i) =>
    images.slice(i * 6, i * 6 + 6)
  );
  return (
    <>
      <div className="flex flex-col gap-4">
        {chunkedImages.map((group, groupIndex) => (
          <div
            key={groupIndex}
            className={`flex gap-2 justify-center ${
              groupIndex === 1 ? "ml-8" : ""
            }`}
          >
            {group.map((image) => (
              <img
                key={image.id}
                src={image.src}
                alt={`Image ${image.id}`}
                loading="lazy"
                className="w-6 h-6 md:w-14 md:h-14 rounded-full object-cover"
              />
            ))}
          </div>
        ))}
      </div>
    </>
  );
};
export default Avatar;
