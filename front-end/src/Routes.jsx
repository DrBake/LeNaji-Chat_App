import { useContext } from "react";
import { UserContext } from "./UserContext";
import Chat from "./components/Chat";
import RegisterAndLogin from "./components/RegisterAndLogIn";

export default function Routes() {
  const { username } = useContext(UserContext);
  if (username) {
    return (
      <main className="h-screen w-full">
        <Chat />
      </main>
    );
  }
  return <RegisterAndLogin />;
}
