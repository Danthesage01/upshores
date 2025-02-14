import React from "react";
import { useRouteError, Link, useLocation } from "react-router-dom";

export function ErrorPage() {
  const error = useRouteError();

  if (error?.status == 404) {
    return (
      <main className="grid min-h-[100vh] place-items-center px-8">
        <div className="text-center font-bold text-4xl">
          <p className="text-9xl font-semibold text-primary">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
            Page Not Found
          </h1>
          <p className="mt-6 text-lg leading-7">
            Sorry, we couldn't find the page you are looking for.
          </p>
          <div className="mt-10">
            <Link
              to="/"
              className="btn btn-secondary"
            >
              Go Back Home
            </Link>
          </div>
        </div>
      </main>
    );
  }
  return (
    <main className="grid min-h-[100vh] place-items-center px-8">
      <div className="text-center font-bold text-4xl">
        <h4 className="text-center font-bold text-4xl">Oops!</h4>
        <h5 className="text-center font-bold text-2xl">
          Either something went wrong error at our end.
        </h5>
        <h5 className="text-center font-bold text-2xl">Or </h5>
        <h5 className="text-center font-bold text-2xl">
          You are not authorized to visit this page.
        </h5>
        <br></br>
        <Link
          to="/"
          className="btn btn-secondary underline underline-offset-4 "
        >
          Go Back Home
        </Link>
      </div>
    </main>
  );
}
