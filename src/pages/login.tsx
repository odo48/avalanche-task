import { getProviders, getSession, signIn } from "next-auth/react";

import LoginForm from "@/components/authentification/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login Page",
  description: "Authentication using a basic login form.",
};

const Login = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <LoginForm />
    </div>
  );
};

export default Login;

export async function getServerSideProps(context: any) {
  const { req } = context;
  const session = await getSession({ req });
  const providers = await getProviders();
  if (session) {
    return {
      redirect: { destination: "/dashboard" },
    };
  }
  return {
    props: {
      providers,
    },
  };
}
