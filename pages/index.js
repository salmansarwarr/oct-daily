//REACT-ICONS
import { MdModeEditOutline } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
//UTILS
import connectDB from "../utils/connectDB";
//REACTJS
import { useEffect, useState } from "react";
//NEXTJS
import { useRouter } from "next/router";
// MATERIAL UI
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { CircularProgress } from "@mui/material";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
};

export default function Home({ messages }) {
    const router = useRouter();
    const [width, setWidth] = useState(0);
    const [editState, setEditState] = useState(false);
    const [messageText, setMessageText] = useState("");
    const [selectedId, setSelectedId] = useState(0);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setWidth(window.innerWidth);
    }, []);

    const addMessageHandler = async (enteredMessage) => {
        const response = await fetch("/api/new-message", {
            method: "POST",
            body: JSON.stringify(enteredMessage),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        console.log(data);
        router.push("/");
        setLoading(false);
    };

    const editMessageHandler = async (enteredMessage) => {
        const response = await fetch("/api/edit-message", {
            method: "POST",
            body: JSON.stringify(enteredMessage),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        console.log(data);
        router.push("/");
        setLoading(false);
    };

    const deleteMessageHandler = async (id) => {
        const response = await fetch("/api/delete-message", {
            method: "POST",
            body: JSON.stringify(id),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        console.log(data);
        router.push("/");
        setLoading(false);
    };

    return (
        <div className="w-full h-[100vh] flex flex-col my-4 justify-center items-center">
            <div className="h-10 text-white w-full flex justify-center items-center">
                <h1 className="text-[1.5rem] sm:text-4xl font-bold">
                    Crud App
                </h1>
            </div>
            <p className="text-[#E50194] text-sm text-center sm:text-base md:text-lg">
                A create-read-update-delete app where you can made changes to
                the database through the UI!
            </p>
            <div className="bg-white w-[90%] md:w-[80%] lg:w-[75%] xl:w-[70%] p-4 mt-3 rounded-md flex flex-col items-center justify-around">
                <p className="text-black w-full text-center px-3 py-1 rounded-sm text-sm md:text-base bg-gray-200">
                    Messages
                </p>
                <table className="bg-gray-800 w-full mt-3 rounded-sm">
                    <thead className="text-sm md:text-base text-white w-full border-b-white border-b-2">
                        <tr>
                            <th>#</th>
                            <th>Message</th>
                            <th>Id</th>
                            <th>Edit</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody className="text-[0.8rem] text-gray-200  md:text-[0.94rem] w-full text-center">
                        {messages.map((message) => (
                            <tr key={message.id}>
                                <td>{message.no}</td>
                                <td>
                                    {message.text.length > 10
                                        ? `${message.text.slice(0, 9)}...`
                                        : message.text}
                                </td>
                                <td>
                                    {width < 640
                                        ? `${message.id.slice(0, 3)}...`
                                        : message.id}
                                </td>
                                <td>
                                    <MdModeEditOutline
                                        style={{
                                            margin: "auto",
                                            cursor: "pointer",
                                        }}
                                        onClick={() => {
                                            setMessageText(message.text);
                                            setEditState(true);
                                            setSelectedId(message.id);
                                        }}
                                    />
                                </td>
                                <td>
                                    <AiFillDelete
                                        style={{
                                            margin: "auto",
                                            cursor: "pointer",
                                        }}
                                        onClick={() => {
                                            setOpen(true);
                                            setSelectedId(message.id);
                                        }}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Modal
                    open={open}
                    onClose={() => setOpen(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style} className="rounded-md p-4">
                        <p>Do you want to delete this message?</p>
                        <div className="flex justify-center mt-3">
                            <button
                                onClick={() => {
                                    setLoading(true);
                                    deleteMessageHandler(selectedId);
                                    setOpen(false);
                                    setEditState(false);
                                    setMessageText("");
                                }}
                                className="bg-[#E50914] text-white text-sm py-1 px-3 rounded-md ml-1 hover:bg-[#cf0b14]"
                            >
                                Delete
                            </button>
                            <button
                                onClick={() => setOpen(false)}
                                className="bg-gray-700 text-white text-sm py-1 px-3 rounded-md ml-1 hover:bg-gray-800"
                            >
                                Cancel
                            </button>
                        </div>
                    </Box>
                </Modal>
                {loading && (
                    <Modal open>
                        <div className="w-full flex justify-center h-full items-center">
                            <CircularProgress thickness={4} />
                        </div>
                    </Modal>
                )}
                <textarea
                    type="text"
                    placeholder="Enter a message"
                    value={messageText}
                    onChange={(event) => setMessageText(event.target.value)}
                    className="w-full h-[5rem] border mt-3 align-top placeholder:text-sm p-1 text-sm focus:outline-gray-800 rounded border-gray-600"
                />
                <div className="mt-3">
                    <button
                        onClick={(event) => {
                            event.preventDefault();
                            setLoading(true);
                            const newMessage = editState
                                ? {
                                      id: selectedId,
                                      no: messages[messages.length - 1].no,
                                      text: messageText,
                                  }
                                : {
                                      no:
                                          messages.length !== 0
                                              ? messages[messages.length - 1]
                                                    .no + 1
                                              : 1,
                                      text: messageText,
                                  };
                            editState
                                ? editMessageHandler(newMessage)
                                : addMessageHandler(newMessage);
                            setMessageText("");
                            setEditState(false);
                        }}
                        className="bg-gray-700 text-white text-sm py-1 w-full sm:w-[10rem] rounded-md hover:bg-gray-800 px-1"
                    >
                        {editState
                            ? "Edit selected message"
                            : "Create new message"}
                    </button>
                    {editState && (
                        <button
                            onClick={() => {
                                setEditState(false);
                                setMessageText("");
                            }}
                            className="bg-[#E50914] text-white mt-1 text-sm py-1 w-full sm:w-[10rem] rounded-md sm:ml-1 hover:bg-[#cf0b14]"
                        >
                            cancel
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export const getServerSideProps = async () => {
    const { db } = await connectDB();
    const collection = db.collection("messages");
    const messages = await collection.find().toArray();

    return {
        props: {
            messages: messages.map((message) => ({
                id: message._id.toString(),
                no: message.no,
                text: message.text,
            })),
        },
    };
};
