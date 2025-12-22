import { Progress } from "@/repo/ui/components/ui/progress";

export const HandlePassword = ({ form }) => {
  const password = "" || form.getValues().password;
  if (password === undefined || password.length == 0)
    return <Progress value={0} />;
  if (password.length < 8) {
    return <Progress value={25} />;
  }
  if (password.length < 12) {
    return <Progress value={50} />;
  }
  if (password.length >= 12) {
    return <Progress value={75} />;
  }
  if (password.length >= 12 && /[A-Za-z0-9]/.test(password)) {
    return <Progress value={100} />;
  }
};
