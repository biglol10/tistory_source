import { NextResponse } from "next/server";

const middleware = (request) => {
  const cookieValue = request.cookies.get("token");
  const pagePath = request.nextUrl.pathname;

  // Protected routes 목록
  const protectedRoutesArray = ["/protected", "/dashboard"];

  // Proctected routes로 진입하는지 확인
  const isWithProtectedRoutes = () => {
    return protectedRoutesArray.some((route) => pagePath.startsWith(route));
  };

  // 쿠키값이 없으며 protected routes로 진입할 경우 로그인 페이지로 이동
  if (!cookieValue && isWithProtectedRoutes()) {
    return NextResponse.redirect(
      `http://localhost:3000/${
        process.env.NODE_ENV === "development" ? "develop" : "production"
      }/login`
    );
  }
};

export default middleware;
