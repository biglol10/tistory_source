import { NextResponse } from "next/server";

const middleware = (request) => {
  const cookieValue = request.cookies.get("token");
  const pagePath = request.nextUrl.pathname;

  const protectedRoutesArray = ["/protected"];

  const isWithProtectedRoutes = () => {
    const isProtected = protectedRoutesArray.some((path) =>
      pagePath.startsWith(path)
    );
    return isProtected;
  };

  if (!cookieValue && isWithProtectedRoutes()) {
    return NextResponse.redirect(
      `http://localhost:3000/${
        process.env.NODE_ENV === "development" ? "develop" : "production"
      }/login`
    );
  }
};

export default middleware;
