import {  NextPage, NextPageContext } from "next";
import nookies from "nookies";
import { useRouter } from "next/router";
import { useEffect } from "react";

const withAuth = (WrappedComponent: NextPage) => {
  const Wrapper = (props: any) => {
    const router = useRouter();

    useEffect(() => {
      if (!props.token) {
        router.replace("/login");
      }
    }, [props.token, router]);

    return props.token ? <WrappedComponent {...props} /> : null;
  };

  Wrapper.getInitialProps = async (ctx: NextPageContext) => {
    const cookies = nookies.get(ctx);
    const token = cookies.token || null;

    if (!token && ctx.res) {
      ctx.res.writeHead(302, { Location: "/login" });
      ctx.res.end();
    }

    const componentProps =
      WrappedComponent.getInitialProps &&
      (await WrappedComponent.getInitialProps(ctx));

    return { ...componentProps, token };
  };

  return Wrapper;
};

export default withAuth;
