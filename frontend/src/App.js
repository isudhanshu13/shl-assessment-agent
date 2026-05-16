import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

function App() {

  const [message, setMessage] = useState("");

  const [chat, setChat] = useState([]);

  const [loading, setLoading] = useState(false);

  const chatEndRef = useRef(null);


  useEffect(() => {

    chatEndRef.current?.scrollIntoView({
      behavior: "smooth"
    });

  }, [chat, loading]);


  const sendMessage = async () => {

    if (!message.trim()) return;

    const updatedChat = [
      ...chat,
      {
        role: "user",
        content: message
      }
    ];

    setChat(updatedChat);

    setLoading(true);

    try {

      const response = await axios.post(
        "https://shl-assessment-agent-production.up.railway.app/docs#/",
        {
          messages: updatedChat
        }
      );

      setChat([
        ...updatedChat,
        {
          role: "assistant",
          content: response.data.reply,
          recommendations:
            response.data.recommendations
        }
      ]);

    } catch (error) {

      console.log(error);

      setChat([
        ...updatedChat,
        {
          role: "assistant",
          content: "Something went wrong. Please try again.",
          recommendations: []
        }
      ]);
    }

    setMessage("");

    setLoading(false);
  };


  return (

    <div style={styles.page}>

      <div style={styles.sidebar}>

        <h2 style={styles.logo}>SHL AI</h2>

        <div style={styles.sidebarCard}>
          <p style={styles.sidebarTitle}>Features</p>

          <ul style={styles.sidebarList}>
            <li>Assessment</li> 
            <li>Recommendations</li>
            <li>Conversation Refinement</li>
            <li>Comparison Support</li>
            <li>SHL Test Discovery</li>
          </ul>
        </div>

      </div>


      <div style={styles.main}>

        <div style={styles.header}>

          <div>
            <h1 style={styles.heading}>
              SHL Assessment Assistant
            </h1>

            <p style={styles.subHeading}>
              AI-powered SHL assessment recommendation chatbot
            </p>
          </div>

          <div style={styles.statusBadge}>
            ● Online
          </div>

        </div>


        <div style={styles.chatBox}>

          {chat.length === 0 && (

            <div style={styles.emptyState}>

              <h2>Welcome 👋</h2>

              <p>
                Ask about hiring roles, coding skills,
                personality assessments, or SHL recommendations.
              </p>

            </div>
          )}


          {chat.map((msg, index) => (

            <div
              key={index}
              style={{
                display: "flex",
                justifyContent:
                  msg.role === "user"
                    ? "flex-end"
                    : "flex-start",
                marginBottom: "20px"
              }}
            >

              <div
                style={{
                  ...styles.messageBubble,
                  background:
                    msg.role === "user"
                      ? "linear-gradient(135deg, #4f46e5, #7c3aed)"
                      : "#1e293b",
                  color: "white",
                  borderRadius:
                    msg.role === "user"
                      ? "20px 20px 4px 20px"
                      : "20px 20px 20px 4px"
                }}
              >

                <div style={styles.roleLabel}>
                  {msg.role === "user"
                    ? "You"
                    : "Assistant"}
                </div>

                <p style={styles.messageText}>
                  {msg.content}
                </p>


                {msg.recommendations &&
                  msg.recommendations.length > 0 && (

                  <div style={styles.cardContainer}>

                    {msg.recommendations.map(
                      (rec, idx) => (

                        <div
                          key={idx}
                          style={styles.card}
                        >

                          <div style={styles.cardTop}>

                            <h3 style={styles.cardTitle}>
                              {rec.name}
                            </h3>

                            <span style={styles.tag}>
                              {rec.test_type}
                            </span>

                          </div>


                          <a
                            href={rec.url}
                            target="_blank"
                            rel="noreferrer"
                            style={styles.linkButton}
                          >
                            Open Assessment →
                          </a>

                        </div>
                      )
                    )}

                  </div>
                )}

              </div>

            </div>
          ))}


          {loading && (

            <div style={styles.loadingBubble}>
              Thinking...
            </div>
          )}


          <div ref={chatEndRef}></div>

        </div>


        <div style={styles.inputArea}>

          <input
            value={message}
            onChange={(e) =>
              setMessage(e.target.value)
            }
            placeholder="Ask about hiring assessments..."
            style={styles.input}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
          />


          <button
            onClick={sendMessage}
            style={styles.button}
          >
            Send
          </button>

        </div>

      </div>

    </div>
  );
}


const styles = {

  page: {
    display: "flex",
    height: "100vh",
    background: "#0f172a",
    color: "white",
    fontFamily: "Inter, Arial"
  },


  sidebar: {
    width: "260px",
    background: "#111827",
    padding: "25px",
    borderRight: "1px solid #1f2937"
  },


  logo: {
    marginBottom: "30px",
    fontSize: "30px"
  },


  sidebarCard: {
    background: "#1e293b",
    padding: "18px",
    borderRadius: "16px"
  },


  sidebarTitle: {
    fontWeight: "bold",
    marginBottom: "10px"
  },


  sidebarList: {
    lineHeight: "2"
  },


  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    padding: "25px"
  },


  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px"
  },


  heading: {
    margin: 0,
    fontSize: "36px"
  },


  subHeading: {
    color: "#94a3b8",
    marginTop: "8px"
  },


  statusBadge: {
    background: "#14532d",
    color: "#4ade80",
    padding: "10px 18px",
    borderRadius: "30px",
    fontWeight: "bold"
  },


  chatBox: {
    flex: 1,
    overflowY: "auto",
    padding: "20px",
    borderRadius: "20px",
    background: "#111827",
    border: "1px solid #1f2937"
  },


  emptyState: {
    textAlign: "center",
    marginTop: "100px",
    color: "#94a3b8"
  },


  messageBubble: {
    maxWidth: "75%",
    padding: "18px",
    boxShadow: "0 4px 18px rgba(0,0,0,0.3)"
  },


  roleLabel: {
    fontSize: "13px",
    opacity: 0.7,
    marginBottom: "8px"
  },


  messageText: {
    fontSize: "16px",
    lineHeight: "1.6"
  },


  cardContainer: {
    marginTop: "18px",
    display: "grid",
    gap: "14px"
  },


  card: {
    background: "#0f172a",
    border: "1px solid #334155",
    borderRadius: "16px",
    padding: "18px"
  },


  cardTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "15px"
  },


  cardTitle: {
    margin: 0,
    fontSize: "18px"
  },


  tag: {
    background: "#312e81",
    color: "#c7d2fe",
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "12px"
  },


  linkButton: {
    textDecoration: "none",
    background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
    color: "white",
    padding: "10px 16px",
    borderRadius: "12px",
    display: "inline-block",
    fontWeight: "bold"
  },


  loadingBubble: {
    background: "#1e293b",
    padding: "14px",
    borderRadius: "14px",
    width: "fit-content"
  },


  inputArea: {
    display: "flex",
    gap: "15px",
    marginTop: "20px"
  },


  input: {
    flex: 1,
    padding: "18px",
    borderRadius: "16px",
    border: "1px solid #334155",
    background: "#111827",
    color: "white",
    fontSize: "16px",
    outline: "none"
  },


  button: {
    background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
    color: "white",
    border: "none",
    padding: "16px 28px",
    borderRadius: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "16px"
  }
};


export default App;

