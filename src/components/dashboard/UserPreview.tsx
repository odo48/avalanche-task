import React from "react";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export default function UserPreview(props: any) {
  const { userData } = props;
  const onSignOut = () => signOut();

  return (
    <Card className="border-black w-3/6">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">WELCOME</CardTitle>
        <CardDescription>Here are your account details:</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="font-bold mb-5">Username: {userData?.username}</div>
        <Button variant="outline" onClick={onSignOut}>
          Logout
        </Button>
      </CardContent>
    </Card>
  );
}
