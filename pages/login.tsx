import LoginForm from "@/components/LoginForm";
import nookies from "nookies";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = nookies.get(context);
  const token = cookies.token || null;

  if (token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};


export default function Login() {
  return <LoginForm />;
}
