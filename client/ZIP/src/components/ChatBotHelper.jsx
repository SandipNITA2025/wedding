import React, { useState, useEffect } from "react";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
import axios from "axios";

const BotImage = ({ Imgurl }) => {
  return (
    <div className="imagebox">
      <img src={Imgurl} alt="wedimg" width="300px" />
    </div>
  );
};

const BotLocation = ({ url, message }) => {
  return (
    <div>
      {message}
      <iframe src={url} title="location"></iframe>
    </div>
  );
};

const BotRegisterForm = () => {
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const formSubmit = (e) => {
    e.preventDefault();

    const userData = {
      loginId: "100",
      guestName,
      guestEmail,
      guestStatus: "Yes",
      inviteType: "none",
    };

    axios
      .post("https://weddingapi-rutm.onrender.com/api/adduser", userData)
      .then((response) => {
        console.log("User data stored successfully:", response.data);
        setFormSubmitted(true);
        setGuestName("");
        setGuestEmail("");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="frombox">
      <form onSubmit={formSubmit}>
        <label htmlFor="">
          Name
          <input
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            type="text"
            placeholder="Name"
            required
          />
        </label>

        <label htmlFor="">
          Email
          <input
            value={guestEmail}
            onChange={(e) => setGuestEmail(e.target.value)}
            type="email"
            placeholder="Email"
            required
          />
        </label>

        <button type="submit">Submit</button>
      </form>
      {formSubmitted ? (
        <p>
          Thanks! Response Submitted{" "}
          <span role="img" aria-label="Smiling face">
            😀
          </span>
        </p>
      ) : (
        ""
      )}
    </div>
  );
};

const CHATBOT_THEME = {
  background: "#FFFEFC",
  fontFamily: "Roboto",
  headerBgColor: "#ba5fc7",
  headerFontColor: "#fff",
  headerFontSize: "15px",
  botBubbleColor: "#00d8d6",
  botFontColor: "#fff",
  userBubbleColor: "#ba5fc7",
  userFontColor: "#fff",
};

const ChatBotHelper = () => {
  const [conversation, setConversation] = useState([]);
  const [morePics, setMorePics] = useState([]);
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    axios
      .get("https://weddingapi-rutm.onrender.com/api/mergedetails")
      .then((response) => {
        setDetails(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (details.mergedData) {
      const messages = details.mergedData[0].messages;
      setConversation(messages);
      const photos = details.mergedData[0].eventDetails.photos;
      setMorePics(photos);
      //   console.log(photos);
    }
  }, [details.mergedData]);

  //URLS START:
  const photoUrl = details.mergedData ? details.mergedData[0].photo.url : null;

  const venue = details.mergedData
    ? details.mergedData[0].eventDetails.venue
    : null;
  const locationUrl = details.mergedData
    ? details.mergedData[0].eventDetails.location
    : null;

  const date = details.mergedData
    ? details.mergedData[0].eventDetails.date
    : null;
  const time = details.mergedData
    ? details.mergedData[0].eventDetails.time
    : null;

  //URLS END:

  const steps = [
    {
      id: "start",
      message: "Hi, There! 👋",
      trigger: "2",
    },
    // dynamic msg
    ...conversation.map((msg, index) => ({
      id: String(index + 2),
      message: msg,
      trigger: String(index + 3),
    })),
    {
      id: String(conversation.length + 2),
      component: photoUrl ? (
        <>
          <BotImage Imgurl={photoUrl} />
        </>
      ) : null,
      trigger: "date-details",
    },
    {
      id: "date-details",
      options: [{ value: 1, label: "When is the wedding?", trigger: "date" }],
    },
    {
      id: "date",
      message: `It's ${date}, ${time}`,
      trigger: "location-details",
    },
    {
      id: "location-details",
      options: [
        { value: 1, label: "Where is the wedding?", trigger: "location" },
      ],
    },
    {
      id: "location",
      component: <BotLocation message={venue} url={locationUrl} />,
      trigger: "more-photos",
    },
    {
      id: "more-photos",
      options: [
        { value: 1, label: "Show me more photos!", trigger: "more-pics" },
      ],
    },
    {
      id: "more-pics",
      component: photoUrl ? (
        <div className="image-container">
          {morePics.map((pic, index) => (
            <BotImage key={index} Imgurl={pic.url} />
          ))}
        </div>
      ) : null,
      trigger: "blessing",
    },
    {
      id: "blessing",
      message: "Will you be joining and blessing us?",
      trigger: "yesNo",
    },
    {
      id: "yesNo",
      options: [
        { value: 1, label: "Yeah! How can I miss this.", trigger: "yes" },
        { value: 2, label: "Nope. I'm super busy", trigger: "no" },
      ],
    },
    {
      id: "no",
      message: "Okay! No problem.",
    },
    {
      id: "yes",
      message: "Nice! Please provide your name and emai",
      trigger: "form",
    },
    {
      id: "form",
      component: (
        <BotRegisterForm
          formSubmitted={formSubmitted}
          setFormSubmitted={setFormSubmitted}
        />
      ),
      trigger: formSubmitted === true ? "success" : undefined,
    },
    {
      id: "success",
      message: "Thanks! Registration Successful. 😀",
      end: true,
    },
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="boticon relative">
      <ThemeProvider theme={CHATBOT_THEME}>
        <div className="boticon absolute top-0 left-0">
          <ChatBot steps={steps} floating={true} />
        </div>
      </ThemeProvider>
    </div>
  );
};

export default ChatBotHelper;
