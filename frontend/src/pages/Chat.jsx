import { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import Sidebar from "../components/Sidebar";

const socket = io(
  "http://13.60.99.228:5000"
);

function Chat() {

  const [message, setMessage] =
    useState("");

  const [messages, setMessages] =
    useState([]);

  const bottomRef =
    useRef(null);

  const lobbyId =
    localStorage.getItem(
      "selectedLobby"
    );

  const fetchMessages =
    async () => {

      try {

        const response =
          await fetch(
            `http://13.60.99.228:5000/api/chat/${lobbyId}`
          );

        const data =
          await response.json();

        setMessages(data);

      } catch (error) {

        console.log(error);

      }

    };

  useEffect(() => {

    fetchMessages();

    socket.emit(
      "joinLobby",
      lobbyId
    );

    socket.on(
      "receiveMessage",
      (data) => {

        setMessages(
          (prev) => [
            ...prev,
            data,
          ]
        );

      }
    );

    return () => {

      socket.off(
        "receiveMessage"
      );

    };

  }, []);

  useEffect(() => {

    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });

  }, [messages]);

  const sendMessage = () => {

    if (!message.trim())
      return;

    const data = {

      sender:
        localStorage.getItem(
          "userEmail"
        ),

      message,

      lobbyId,

    };

    socket.emit(
      "sendMessage",
      data
    );

    setMessage("");

  };

  return (

    <div className="flex min-h-screen bg-gradient-to-br from-[#071326] via-[#0a1830] to-[#10213f] text-white">
      <Sidebar />

      <div className="flex-1 p-8">

        <div className="bg-slate-900/60 backdrop-blur-md border border-slate-700 rounded-2xl p-5 mb-6">

          <p className="text-green-400">
            CampusCommute Chat
          </p>

          <h1 className="text-4xl font-bold">
            Lobby Chat 💬
          </h1>

          <p className="text-slate-400 mt-2">
            Talk with other students in real time.
          </p>

        </div>

<div
  className="
    bg-slate-900/60
    backdrop-blur-md
    border
    border-slate-700
    p-5
    rounded-2xl
    h-[70vh]
    overflow-y-auto
    flex
    flex-col
    gap-3
  "
>
          {messages.map((msg, index) => {

            const isMe =
              msg.sender ===
              localStorage.getItem(
                "userEmail"
              );



            return (

              <div
                key={index}
                className={`flex ${isMe
                  ? "justify-end"
                  : "justify-start"
                  } mb-3`}
              >

                <div
                  className={`
          p-3
          rounded-xl
max-w-[65%]
          ${isMe
                      ? "bg-gradient-to-r from-green-500 to-emerald-500 shadow-xl"
                      : "bg-slate-800/80 border border-slate-600"
                    }
        `}
                >

                  {!isMe && (
                    <div className="flex items-center gap-2 mb-1">
                      <div
                        className="
      w-8
      h-8
      rounded-full
      bg-emerald-600
      flex
      items-center
      justify-center
      text-xs
      font-bold
    "
                      >
                        {msg.sender?.[0]?.toUpperCase()}
                      </div>

                      <strong className="capitalize">
                        {msg.sender
                          .split("@")[0]
                          .replaceAll("_", " ")
                        }
                      </strong>
                    </div>
                  )}


                  <span className="text-xs ml-2">

                    {msg.createdAt
                      ? new Date(
                        msg.createdAt
                      ).toLocaleTimeString(
                        [],
                        {
                          hour: "numeric",
                          minute: "2-digit",
                        }
                      )
                      : ""}

                  </span>

                 <p className="mt-1">
  {msg.message}
</p>

{isMe && (
  <div className="text-right text-xs opacity-80 mt-1">
    ✓
  </div>
)}

                </div>

              </div>

            );

          })}

          <div ref={bottomRef}></div>

        </div>

        <div className="flex mt-4 gap-3 bg-slate-900/60 backdrop-blur-md p-3 rounded-2xl border border-slate-700">
          <input
            value={message}
            onChange={(e) =>
              setMessage(
                e.target.value
              )
            }
            onKeyDown={(e) => {

              if (e.key === "Enter") {

                sendMessage();

              }

            }}
            className="
  flex-1
  p-4
  bg-slate-800
  rounded-xl
  outline-none
  border
  border-slate-700
  focus:border-green-500
"
            placeholder="Type message..."
          />
          <button
            onClick={sendMessage}
            className="
    bg-gradient-to-r
    from-green-600
    to-emerald-600
    px-8
    rounded-xl
    font-semibold
    hover:scale-105
    transition-all
  "
          >
            Send ➜
          </button>

        </div>

      </div>
    </div>
  );
}





export default Chat;