import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const LoginFormSchema = z.object({
  username: z.string({ required_error: "Username is required" }).min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string({ required_error: "Password is required" }).min(2, {
    message: "Password must be at least 2 characters.",
  }),
});

type LoginFormValues = z.infer<typeof LoginFormSchema>;

const defaultValues: Partial<LoginFormValues> = {
  username: "",
  password: "",
};

export default function LoginForm() {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [serverError, setServerError] = useState<string>("");

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    serverError && setServerError("");

    try {
      await signIn("credentials", {
        ...data,
      });
    } catch (e) {
      setServerError("Server error");
      setIsLoading(false);
    }
  };

  return (
    <Card className="border-black w-3/6">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">LOGIN</CardTitle>
        <CardDescription>
          Enter your username and password below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Your username" {...field} />
                  </FormControl>
                  <FormMessage className="absolute text-red-600" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="absolute text-red-600" />
                </FormItem>
              )}
            />
            <div className="flex items-center">
              <Button disabled={isLoading} variant="outline" type="submit">
                Login
              </Button>
              <FormMessage className="ml-5 text-red-600">
                {serverError}
              </FormMessage>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
