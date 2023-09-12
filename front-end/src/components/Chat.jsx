import { useState } from "react";
import { BsFillSendFill } from "react-icons/bs";

import Logo from "./Lgo";
import Avatar from "./Avatar";

export default function Chat() {
  const [newMessageText, setNewMessageText] = useState("");

  const users = [
    {
      id: 1,
      name: "John Doe",
    },
    {
      id: 2,
      name: "Ali Doe",
    },
    {
      id: 3,
      name: "Mayers Doe",
    },
    {
      id: 4,
      name: "Stan Doe",
    },
  ];

  function sendMessage(event) {
    event.preventDefault();
    console.log(newMessageText);
    setNewMessageText("");
  }

  console.log(`newMessageText: ${newMessageText}`);

  return (
    <main className="flex h-screen">
      {/* left side */}
      <div className="w-1/3 bg-blue-gray">
        <Logo />
        {users.map((user) => (
          <div key={user.id}>
            <div className="flex items-center gap-2 py-2 pl-4">
              <Avatar username={user.name} userId={user.id} />
              <span className="font-bold">{user.name}</span>
            </div>
            <hr />
          </div>
        ))}
      </div>
      {/* right side */}
      <div className="bg-purple-light w-2/3 flex flex-col pt-4 justify-between">
        <div className="h-2/3 flex items-center justify-center">
          messages here
        </div>
        <form className="flex gap-1 mx-2" onSubmit={sendMessage}>
          <input
            type="text"
            value={newMessageText}
            onChange={(event) => setNewMessageText(event.target.value)}
            placeholder="Type a message"
            className="flex-grow p-2 border rounded bg-slate-50"
          />
          <button
            type="submit"
            className="bg-blue-700 p-2 flex items-center justify-center text-white rounded-lg w-14"
          >
            <BsFillSendFill className="rotate-12 " />
          </button>
        </form>
      </div>
    </main>
  );
}
