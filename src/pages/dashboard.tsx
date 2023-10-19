import { getToken } from "next-auth/jwt";
import { getSession, signOut } from "next-auth/react";
import { verify } from "jsonwebtoken";
import UserPreview from "@/components/dashboard/UserPreview";

const Dashboard = (props: any) => {
  const { userData } = props;

  return (
    <div className="h-screen flex justify-center items-center">
      <UserPreview userData={userData} />
    </div>
  );
};

export default Dashboard;
export async function getServerSideProps(context: any) {
  const { req } = context;
  const token = await getToken({
    req,
    secret: process.env.NEXT_AUTH_SECRET,
  });

  const session = await getSession({ req });

  console.log(token);

  let decodedToken = {};
  if (token && token.sub && process.env.NEXT_AUTH_SECRET) {
    try {
      decodedToken = verify(token.sub, process.env.NEXT_AUTH_SECRET);
    } catch (e) {}
  }

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  } else {
    return {
      props: { userData: { ...decodedToken } },
    };
  }
}
