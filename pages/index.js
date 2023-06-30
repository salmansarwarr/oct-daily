// REACT-ICONS
import { MdModeEditOutline } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
// UTILS
import db from "./api/utils/connectDB";
// REACTJS
import { useEffect, useState } from "react";
// NEXTJS
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

const PAGE_SIZE = 5; // Number of messages to display per page

const Home = ({ messages }) => {
  const router = useRouter();
  const [width, setWidth] = useState(0);
  const [editState, setEditState] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [selectedId, setSelectedId] = useState(0);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Filter the messages based on the search texto
  const filteredMessages = messages.filter((message) =>
    message.text.toLowerCase().includes(searchText.toLowerCase())
  );

  // Sort the filtered messages based on the selected sort order
  const sortedMessages = filteredMessages.sort((a, b) => {
    if (sortOrder === "asc") {
      return a.id - b.id;
    } else if (sortOrder === "desc") {
      return b.id - a.id;
    }
  });

  // Get the current page's messages based on the pagination
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const displayedMessages = sortedMessages.slice(startIndex, endIndex);

  const totalPages = Math.ceil(sortedMessages.length / PAGE_SIZE);

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  const handleSortOrder = (event) => {
    setSortOrder(event.target.value);
  };

  // Function to add a new message to the database
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

  // Function to edit an existing message in the database
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

  // Function to delete a message from the database
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
      {/* Application heading */}
      <div className="h-10 text-white w-full flex justify-center items-center">
        <h1 className="text-[1.5rem] sm:text-4xl text-center font-bold">
          Oct Daily Internship Program
        </h1>
      </div>
      {/* Subheading */}
      <p className="text-[#E50194] mt-3 text-sm text-center sm:text-base md:text-lg">
        Crud app using nextjs and mysql
      </p>
      {/* Search and sort options */}
      <div className="flex flex-col gap-4 items-center justify-between mt-4">
        <input
          type="text"
          placeholder="Search"
          value={searchText}
          onChange={handleSearch}
          className="w-[15rem] p-1 border border-gray-400 rounded-md"
        />
        <div>
          <label htmlFor="sort-order" className="text-white">
            Sort Order:
          </label>
          <select
            id="sort-order"
            value={sortOrder}
            onChange={handleSortOrder}
            className="ml-2 border border-gray-400 rounded-md"
          >
            <option value="">None</option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>
      {/* Messages table */}
      <div className="bg-white w-[90%] md:w-[80%] lg:w-[75%] xl:w-[70%] p-4 mt-3 rounded-md flex flex-col items-center justify-around">
        <p className="text-black w-full text-center px-3 py-1 rounded-sm text-sm md:text-base bg-gray-200">
          Messages
        </p>
        <table className="bg-gray-800 w-full mt-3 rounded-sm">
          <thead className="text-sm md:text-base text-white w-full border-b-white border-b-2">
            <tr>
              <th>id</th>
              <th>Message</th>
              <th>Edit</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody className="text-[0.8rem] text-gray-200  md:text-[0.94rem] w-full text-center">
            {displayedMessages.map((message) => (
              <tr key={message.id}>
                <td>{message.id}</td>
                <td>
                  {/* {message.text.length > 15
                                        ? `${message.text.slice(0, 20)}...`
                                        : message.text} */}
                  {message.text}
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
        {/* Modal for delete confirmation */}
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
        {/* Loading indicator */}
        {loading && (
          <Modal open>
            <div className="w-full flex justify-center h-full items-center">
              <CircularProgress thickness={4} />
            </div>
          </Modal>
        )}
        {/* Textarea for message input */}
        <textarea
          type="text"
          placeholder="Enter a message"
          value={messageText}
          onChange={(event) => setMessageText(event.target.value)}
          className="w-full h-[5rem] border mt-3 align-top placeholder:text-sm p-1 text-sm focus:outline-gray-800 rounded border-gray-600"
        />
        <div className="mt-3">
          {/* Create/Edit message button */}
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
                        ? messages[messages.length - 1].no + 1
                        : 1,
                    text: messageText,
                  };
              editState
                ? editMessageHandler(newMessage)
                : addMessageHandler(newMessage);
              setMessageText("");
              setEditState(false);
            }}
            className="bg-[#E50194] text-white text-sm py-1 w-full sm:w-[10rem] rounded-md hover:bg-gray-800 px-1"
          >
            {editState ? "Edit selected message" : "Create new message"}
          </button>
          {/* Cancel editing button */}
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
        {/* Pagination controls */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-center justify-center mt-8">
          <div className="flex gap-2">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="bg-gray-700 text-white text-sm py-1 px-3 rounded-md hover:bg-gray-800"
            >
              Previous
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="bg-gray-700 text-white text-sm py-1 px-3 rounded-md hover:bg-gray-800"
            >
              Next
            </button>
          </div>
          <div className="flex gap-1">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`bg-gray-700 text-white text-sm py-1 px-3 rounded-md hover:bg-gray-800 ${
                  currentPage === index + 1 ? "bg-gray-800" : ""
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async () => {
  // Function to retrieve messages from the database
  const getMessages = async () => {
    return new Promise((resolve, reject) => {
      let sql = "SELECT * FROM messages";

      db.query(sql, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  };
  
  const messages = await getMessages("", "", "");

  return {
    props: {
      messages: messages.map((message) => ({
        id: message.id.toString(),
        no: message.no,
        text: message.text,
      })),
    },
  };
};

export default Home;
