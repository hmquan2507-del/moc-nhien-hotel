export const hotelInfo = {
  brandName: "Mộc Nhiên Hotel",
  shortName: "Mộc Nhiên",
  slogan: "Boutique stay in Đà Nẵng",
  hotline: "02366272808",
  hotlineDisplay: "0236 627 2808",
  zaloPhone: "0789564888",
  zaloDisplay: "0789 564 888",
  email: "booking@mocnhienhotel.vn",
  address: "18 Phạm Văn Ngôn, Hòa Khánh Bắc, Liên Chiểu, Đà Nẵng",
  shortAddress: "18 Phạm Văn Ngôn, Đà Nẵng",
  zaloLink: "https://zalo.me/0789564888",
  facebookLink:
    "https://www.facebook.com/p/M%E1%BB%98C-NHI%C3%8AN-HOTEL-100093590269269/",
  googleMapLink:
    "https://www.google.com/maps/search/?api=1&query=M%E1%BB%99c+Nhi%C3%AAn+Hotel+18+Ph%E1%BA%A1m+V%C4%83n+Ng%C3%B4n+Li%C3%AAn+Chi%E1%BB%83u+%C4%90%C3%A0+N%E1%BA%B5ng",
  logo: {
    src: "/images/hotel/logo.png",
    alt: "Logo Mộc Nhiên Hotel",
  },
};

export const hotelImages = {
  hero: {
    src: "/images/hotel/exterior-main.jpg",
    alt: "Mặt tiền Mộc Nhiên Hotel tại Đà Nẵng",
  },
  exteriorFront: {
    src: "/images/hotel/exterior-front.jpg",
    alt: "Khu vực mặt tiền và lối vào Mộc Nhiên Hotel",
  },
  lobby: {
    src: "/images/hotel/lobby.jpg",
    alt: "Khu vực lễ tân sáng sạch tại Mộc Nhiên Hotel",
  },
  lobbySmall: {
    src: "/images/hotel/lobby.webp",
    alt: "Góc lễ tân phụ tại Mộc Nhiên Hotel",
  },
  garden: {
    src: "/images/hotel/garden.jpg",
    alt: "Không gian xanh tại Mộc Nhiên Hotel",
  },
  roomTable: {
    src: "/images/hotel/room-table.jpg",
    alt: "Bàn và tiện nghi trong phòng nghỉ Mộc Nhiên Hotel",
  },
  hallway: {
    src: "/images/hotel/hallway.jpg",
    alt: "Hành lang và khu vực thang máy tại Mộc Nhiên Hotel",
  },
  roomDoor: {
    src: "/images/hotel/room-door.jpg",
    alt: "Cửa phòng nghỉ tại Mộc Nhiên Hotel",
  },
};

export const navItems = [
  { label: "Trang chủ", href: "/#home" },
  { label: "Phòng nghỉ", href: "/#rooms" },
  { label: "Tiện nghi", href: "/#amenities" },
  { label: "Hình ảnh", href: "/#gallery" },
  { label: "Liên hệ", href: "/#contact" },
];

export const heroData = {
  badge: "Khách sạn boutique tại Đà Nẵng",
  title: "Mộc Nhiên Hotel",
  subtitle: "Không gian lưu trú ấm áp giữa trung tâm Đà Nẵng",
  description:
    "Phòng sạch sẽ, vị trí thuận tiện, lễ tân thân thiện, phù hợp cho du lịch, công tác và nghỉ dưỡng ngắn ngày.",
  primaryCta: "Đặt phòng ngay",
  secondaryCta: "Xem phòng",
  image: hotelImages.hero.src,
  stats: [
    { value: "24/7", label: "Hỗ trợ" },
    { value: "4", label: "Tiện ích chính" },
    { value: "3", label: "Loại phòng" },
  ],
};

export const trustBadges = [
  "Vị trí thuận tiện",
  "Phòng sạch sẽ",
  "Hỗ trợ nhanh",
  "Có thang máy",
];

export const bookingDefaults = {
  guests: ["1 khách", "2 khách", "3 khách", "4 khách", "Gia đình / nhóm"],
  roomTypes: ["Phòng tiêu chuẩn", "Phòng đôi", "Phòng gia đình", "Tư vấn loại phòng"],
};

export const aboutStats = [
  {
    value: "Gần trung tâm",
    label: "Dễ di chuyển trong khu vực Liên Chiểu và các điểm lân cận.",
  },
  {
    value: "Hỗ trợ 24/7",
    label: "Lễ tân hỗ trợ nhanh qua điện thoại hoặc Zalo.",
  },
  {
    value: "Sạch sẽ",
    label: "Không gian gọn gàng, phù hợp nghỉ ngắn ngày và công tác.",
  },
];

export type DurationKey = "2h" | "3h" | "overnight" | "day";

export const durationOptions = [
  {
    value: "2h",
    label: "2 giờ",
    checkoutText: "Trả phòng sau 2 giờ",
  },
  {
    value: "3h",
    label: "3 giờ",
    checkoutText: "Trả phòng sau 3 giờ",
  },
  {
    value: "overnight",
    label: "Qua đêm",
    checkoutText: "Trả phòng trước 12:00 hôm sau",
  },
  {
    value: "day",
    label: "Ngày đêm",
    checkoutText: "Nhận phòng theo ngày",
  },
] satisfies {
  value: DurationKey;
  label: string;
  checkoutText: string;
}[];

export const rooms = [
  {
    id: "phong-tieu-chuan",
    name: "Phòng tiêu chuẩn",
    shortName: "Tiêu chuẩn",
    description:
      "Không gian gọn gàng, riêng tư, phù hợp cho khách nghỉ ngắn ngày hoặc đi công tác.",
    image: hotelImages.roomDoor.src,
    imageAlt: hotelImages.roomDoor.alt,
    available: 1,
    prices: {
      "2h": 129000,
      "3h": 159000,
      overnight: 220000,
      day: 300000,
    },
    oldPrices: {
      "2h": 149000,
      "3h": 179000,
      overnight: 250000,
      day: 350000,
    },
    features: ["Wi-Fi", "Máy lạnh", "Nước uống", "Phòng tắm riêng"],
  },
  {
    id: "phong-doi-tien-nghi",
    name: "Phòng đôi",
    shortName: "Phòng đôi",
    description:
      "Phòng giường đôi thoải mái hơn cho cặp đôi hoặc khách cần không gian nghỉ ngơi rộng rãi.",
    image: hotelImages.roomTable.src,
    imageAlt: hotelImages.roomTable.alt,
    available: 2,
    prices: {
      "2h": 149000,
      "3h": 189000,
      overnight: 260000,
      day: 350000,
    },
    oldPrices: {
      "2h": 179000,
      "3h": 219000,
      overnight: 300000,
      day: 400000,
    },
    features: ["Wi-Fi", "Máy lạnh", "Nước uống", "Phòng tắm riêng"],
  },
  {
    id: "phong-gia-dinh",
    name: "Phòng gia đình",
    shortName: "Gia đình",
    description:
      "Lựa chọn phù hợp cho gia đình nhỏ hoặc nhóm bạn cần không gian lưu trú linh hoạt.",
    image: hotelImages.hallway.src,
    imageAlt: hotelImages.hallway.alt,
    available: 1,
    prices: {
      "2h": 199000,
      "3h": 249000,
      overnight: 350000,
      day: 450000,
    },
    oldPrices: {
      "2h": 249000,
      "3h": 299000,
      overnight: 400000,
      day: 500000,
    },
    features: ["Wi-Fi", "Máy lạnh", "Nước uống", "Phòng tắm riêng"],
  },
];

export const amenities = [
  {
    title: "Lễ tân thân thiện",
    description: "Hỗ trợ nhận phòng, trả phòng và tư vấn đặt phòng nhanh.",
    image: hotelImages.lobby.src,
    imageAlt: hotelImages.lobby.alt,
  },
  {
    title: "Không gian xanh",
    description: "Khu vực xanh tạo cảm giác dễ chịu sau một ngày di chuyển.",
    image: hotelImages.garden.src,
    imageAlt: hotelImages.garden.alt,
  },
  {
    title: "Thang máy tiện lợi",
    description: "Di chuyển thuận tiện giữa các tầng, phù hợp khách có hành lý.",
    image: hotelImages.hallway.src,
    imageAlt: hotelImages.hallway.alt,
  },
  {
    title: "Phòng sạch sẽ",
    description: "Không gian lưu trú được giữ gọn gàng, riêng tư và dễ nghỉ.",
    image: hotelImages.roomTable.src,
    imageAlt: hotelImages.roomTable.alt,
  },
  {
    title: "Vị trí dễ di chuyển",
    description: "Nằm tại Phạm Văn Ngôn, thuận tiện đi lại trong khu vực Đà Nẵng.",
    image: hotelImages.exteriorFront.src,
    imageAlt: hotelImages.exteriorFront.alt,
  },
];

export const galleryImages = [
  hotelImages.hero,
  hotelImages.garden,
  hotelImages.lobby,
  hotelImages.hallway,
  hotelImages.roomTable,
  hotelImages.roomDoor,
];

export const quickContactLinks = [
  { label: "Gọi ngay", href: `tel:${hotelInfo.hotline}` },
  { label: "Nhắn Zalo", href: hotelInfo.zaloLink, external: true },
  { label: "Xem bản đồ", href: hotelInfo.googleMapLink, external: true },
];

export const benefits = [
  {
    icon: "01",
    title: "Vị trí thuận tiện",
    description:
      "Tọa lạc tại 18 Phạm Văn Ngôn, thuận tiện di chuyển trong khu vực Liên Chiểu.",
  },
  {
    icon: "02",
    title: "Phòng nghỉ sạch sẽ",
    description:
      "Không gian lưu trú gọn gàng, riêng tư, phù hợp cho khách du lịch và công tác.",
  },
  {
    icon: "03",
    title: "Hỗ trợ nhanh",
    description:
      "Liên hệ trực tiếp qua điện thoại hoặc Zalo để hỏi phòng trống và nhận tư vấn.",
  },
  {
    icon: "04",
    title: "Tiện nghi thiết yếu",
    description:
      "Wi-Fi, máy lạnh, nước uống, phòng tắm riêng và thang máy tiện lợi.",
  },
];

export const experiences = [
  "Địa chỉ: 18 Phạm Văn Ngôn, Hòa Khánh Bắc, Liên Chiểu, Đà Nẵng",
  "Giá ngày đêm tham khảo từ 300.000đ",
  "Có hình thức thuê theo giờ, phù hợp khách cần nghỉ ngắn",
  "Tiện ích nổi bật: Wi-Fi, thang máy, hỗ trợ nhanh, phòng riêng",
];

export const offers = [
  {
    title: "Phòng ngày đêm",
    price: "Từ 300K",
    description:
      "Phù hợp cho khách du lịch, công tác hoặc cần lưu trú qua đêm tại Đà Nẵng.",
  },
  {
    title: "Thuê theo giờ",
    price: "Từ 120K",
    description:
      "Lựa chọn linh hoạt cho khách cần nghỉ ngắn. Nên liên hệ lễ tân để xác nhận phòng trống.",
  },
  {
    title: "Khách công tác",
    price: "Tiện lợi",
    description:
      "Vị trí phù hợp cho khách làm việc tại khu vực Hòa Khánh, Liên Chiểu.",
  },
  {
    title: "Đặt qua Zalo",
    price: "Nhanh chóng",
    description:
      "Gửi ngày nhận phòng, số lượng khách và nhu cầu lưu trú để được tư vấn nhanh.",
  },
];

export const testimonials = [
  {
    name: "Khách lưu trú",
    content:
      "Vị trí dễ tìm, phù hợp để nghỉ lại khi đi công tác tại khu vực Liên Chiểu.",
  },
  {
    name: "Khách đặt qua Zalo",
    content:
      "Liên hệ đặt phòng nhanh, thông tin rõ ràng, tiện cho khách cần phòng gấp.",
  },
  {
    name: "Khách du lịch",
    content:
      "Không gian lưu trú đơn giản, tiện nghi cơ bản đầy đủ, giá phù hợp.",
  },
];

export const faqs = [
  {
    question: "Mộc Nhiên Hotel nằm ở đâu?",
    answer:
      "Mộc Nhiên Hotel nằm tại 18 Phạm Văn Ngôn, Hòa Khánh Bắc, Liên Chiểu, Đà Nẵng.",
  },
  {
    question: "Giá phòng Mộc Nhiên Hotel là bao nhiêu?",
    answer:
      "Giá phòng thay đổi theo thời lượng lưu trú. Khách nên gọi lễ tân hoặc nhắn Zalo để xác nhận giá và phòng trống.",
  },
  {
    question: "Khách sạn có tiện ích gì?",
    answer:
      "Các tiện ích nổi bật gồm Wi-Fi, thang máy, phòng riêng, nước nóng và hỗ trợ đặt phòng nhanh.",
  },
  {
    question: "Có thể đặt phòng qua Zalo không?",
    answer:
      "Có. Khách có thể gọi lễ tân hoặc liên hệ Zalo 0789 564 888 để hỏi phòng trống và đặt phòng.",
  },
  {
    question: "Website có hiển thị giá chính xác không?",
    answer:
      "Giá trên website là giá tham khảo. Khách sạn sẽ xác nhận lại phòng trống và giá chính xác qua điện thoại hoặc Zalo.",
  },
];

export function formatPrice(price: number) {
  return new Intl.NumberFormat("vi-VN").format(price) + " VNĐ";
}

export function getRoomById(roomId: string) {
  return rooms.find((room) => room.id === roomId);
}

export function getDurationLabel(duration: DurationKey) {
  return (
    durationOptions.find((item) => item.value === duration)?.label ?? "2 giờ"
  );
}

export function getDurationCheckoutText(duration: DurationKey) {
  return (
    durationOptions.find((item) => item.value === duration)?.checkoutText ??
    "Trả phòng sau 2 giờ"
  );
}

export function getValidDuration(duration?: string): DurationKey {
  if (
    duration === "2h" ||
    duration === "3h" ||
    duration === "overnight" ||
    duration === "day"
  ) {
    return duration;
  }

  return "day";
}
