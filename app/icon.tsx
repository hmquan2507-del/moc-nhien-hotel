import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 256,
  height: 256,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "256px",
          height: "256px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "56px",
          background: "#12332B",
          color: "#FFFFFF",
          fontSize: "132px",
          fontWeight: 900,
          fontFamily: "Arial, sans-serif",
        }}
      >
        M
      </div>
    ),
    {
      width: 256,
      height: 256,
    }
  );
}