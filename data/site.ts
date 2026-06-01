export const hotelInfo = {
  brandName: "Mộc Nhiên Hotel",
  slogan: "Đà Nẵng • Liên Chiểu",
  hotline: "02366272808",
  hotlineDisplay: "0236 627 2808",
  zaloPhone: "0789564888",
  zaloDisplay: "0789 564 888",
  email: "booking@mocnhienhotel.vn",
  address: "18 Phạm Văn Ngôn, Hoà Khánh Bắc, Liên Chiểu, Đà Nẵng",
  zaloLink: "https://zalo.me/0789564888",
  facebookLink:
    "https://www.facebook.com/p/M%E1%BB%98C-NHI%C3%8AN-HOTEL-100093590269269/",
  googleMapLink:
    "https://www.google.com/maps/search/?api=1&query=M%E1%BB%99c+Nhi%C3%AAn+Hotel+18+Ph%E1%BA%A1m+V%C4%83n+Ng%C3%B4n+Li%C3%AAn+Chi%E1%BB%83u+%C4%90%C3%A0+N%E1%BA%B5ng",
};

export const heroData = {
  badge: "Khách sạn tại Liên Chiểu, Đà Nẵng",
  title: "Mộc Nhiên Hotel",
  subtitle: "Nghỉ ngơi thoải mái, đặt phòng nhanh, giá hợp lý.",
  description:
    "Không gian lưu trú gọn gàng, riêng tư, phù hợp cho khách nghỉ ngắn, qua đêm, công tác hoặc du lịch tại khu vực Liên Chiểu.",
  primaryCta: "Xem phòng & giá",
  secondaryCta: "Chat Zalo đặt phòng",
  image: "/images/hotel-front.webp",
  stats: [
    {
      value: "Từ 120K",
      label: "Thuê theo giờ",
    },
    {
      value: "Từ 300K",
      label: "Ngày đêm",
    },
    {
      value: "24/7",
      label: "Hỗ trợ",
    },
  ],
};

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

export const benefits = [
  {
    icon: "📍",
    title: "Vị trí dễ tìm",
    description:
      "Tọa lạc tại 18 Phạm Văn Ngôn, Hoà Khánh Bắc, Liên Chiểu, thuận tiện di chuyển trong khu vực phía Tây Bắc Đà Nẵng.",
  },
  {
    icon: "🛏️",
    title: "Phòng nghỉ sạch sẽ",
    description:
      "Không gian lưu trú gọn gàng, riêng tư, phù hợp cho khách cần nghỉ ngơi, đi công tác hoặc lưu trú qua đêm.",
  },
  {
    icon: "🚗",
    title: "Có chỗ đậu xe",
    description:
      "Phù hợp cho khách đi xe máy, ô tô cá nhân hoặc khách công tác cần nơi lưu trú tiện lợi.",
  },
  {
    icon: "🛎️",
    title: "Hỗ trợ nhanh",
    description:
      "Có lễ tân hỗ trợ đặt phòng, nhận phòng, trả phòng và tư vấn thông tin lưu trú nhanh chóng.",
  },
];

export const rooms = [
  {
    id: "phong-tieu-chuan",
    name: "Phòng Tiêu Chuẩn",
    shortName: "Tiêu Chuẩn",
    description:
      "Phòng gọn gàng, sạch sẽ, phù hợp cho khách nghỉ ngắn, lưu trú tiết kiệm hoặc đi công tác tại khu vực Liên Chiểu.",
    image: "/images/room-standard.webp",
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
    features: [
      "Giường êm",
      "Điều hòa",
      "WiFi",
      "Nước nóng",
      "Nhà vệ sinh riêng",
    ],
  },
  {
    id: "phong-doi-tien-nghi",
    name: "Phòng Đôi Tiện Nghi",
    shortName: "Đôi Tiện Nghi",
    description:
      "Phòng giường đôi rộng rãi hơn, không gian riêng tư, phù hợp cho cặp đôi hoặc khách muốn nghỉ ngơi thoải mái hơn.",
    image: "/images/room-double.webp",
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
    features: [
      "Giường đôi",
      "Không gian riêng tư",
      "Điều hòa",
      "WiFi",
      "Nước nóng",
      "Phòng tắm riêng",
    ],
  },
  {
    id: "phong-gia-dinh",
    name: "Phòng Gia Đình",
    shortName: "Gia Đình",
    description:
      "Phòng có nhiều giường, phù hợp cho gia đình nhỏ hoặc nhóm bạn cần không gian lưu trú rộng rãi và tiện nghi hơn.",
    image: "/images/room-family.webp",
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
    features: [
      "Nhiều giường",
      "Không gian rộng",
      "Điều hòa",
      "WiFi",
      "Nước nóng",
      "Phòng tắm riêng",
    ],
  },
];

export const experiences = [
  "Địa chỉ: 18 Phạm Văn Ngôn, Hoà Khánh Bắc, Liên Chiểu, Đà Nẵng",
  "Giá ngày đêm tham khảo từ 300.000đ",
  "Có hình thức thuê theo giờ, phù hợp khách cần nghỉ ngắn",
  "Tiện ích nổi bật: WiFi, chỗ đậu xe, thang máy, hỗ trợ nhanh",
];

export const offers = [
  {
    title: "Phòng ngày đêm",
    price: "Từ 300K",
    description:
      "Phù hợp cho khách cần lưu trú qua đêm khi đi du lịch, công tác hoặc ghé khu vực Liên Chiểu.",
  },
  {
    title: "Thuê theo giờ",
    price: "Từ 120K",
    description:
      "Lựa chọn linh hoạt cho khách cần nghỉ ngắn. Nên liên hệ lễ tân để xác nhận phòng trống và giá hiện tại.",
  },
  {
    title: "Khách công tác",
    price: "Tiện lợi",
    description:
      "Vị trí phù hợp cho khách làm việc tại khu vực Hoà Khánh, Liên Chiểu và các khu vực lân cận.",
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
      "Mộc Nhiên Hotel nằm tại 18 Phạm Văn Ngôn, Hoà Khánh Bắc, Liên Chiểu, Đà Nẵng.",
  },
  {
    question: "Giá phòng Mộc Nhiên Hotel là bao nhiêu?",
    answer:
      "Giá phòng thay đổi theo thời lượng lưu trú như 2 giờ, 3 giờ, qua đêm hoặc ngày đêm. Khách nên gọi lễ tân hoặc chat Zalo để xác nhận giá và phòng trống.",
  },
  {
    question: "Khách sạn có tiện ích gì?",
    answer:
      "Các tiện ích nổi bật gồm WiFi, chỗ đậu xe, thang máy, phòng riêng, nước nóng và hỗ trợ đặt phòng nhanh.",
  },
  {
    question: "Có thể đặt phòng qua Zalo không?",
    answer:
      "Có. Khách có thể gọi lễ tân hoặc liên hệ Zalo 0789 564 888 để hỏi phòng trống và đặt phòng.",
  },
  {
    question: "Website có hiển thị giá chính xác không?",
    answer:
      "Giá trên website là giá tham khảo theo từng thời lượng lưu trú. Khách sạn sẽ xác nhận lại phòng trống và giá chính xác qua điện thoại hoặc Zalo.",
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

  return "2h";
}