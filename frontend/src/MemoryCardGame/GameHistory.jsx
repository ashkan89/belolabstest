import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";
import background from "../assets/images/memory-bg.gif";
import axios from "axios";

const loadGameHistory = async (userID) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/memory/records?userID=${userID}`, {
      headers: { "Content-Type": "application/json" },
    });

    console.log("Game history loaded successfully", response.data);
    return response.data; // Return the data
  } catch (error) {
    console.error("Error fetching game history:", error.response ? error.response.data : error.message);
    return []; // Return an empty array in case of an error
  }
};

// Styled Components
const StyledGameContainer = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  width: "100vw",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  backgroundImage: `url(${background})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  position: "relative",
  padding: "20px",
  boxSizing: "border-box",
}));

const PixelButton = styled(Box)(({ theme }) => ({
  display: "inline-block",
  backgroundColor: "#2c2c54",
  color: "#fff",
  fontFamily: '"Press Start 2P", cursive',
  fontSize: "14px",
  padding: "15px 30px",
  border: "2px solid #00d9ff",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
  cursor: "pointer",
  textAlign: "center",
  transition: "transform 0.2s, background-color 0.2s, box-shadow 0.2s",
  "&:hover": {
    backgroundColor: "#40407a",
    borderColor: "#00aaff",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.4)",
  },
  "&:active": {
    transform: "scale(0.95)",
  },
}));

const ScrollableGrid = styled(Box)(({ theme }) => ({
  maxHeight: "70vh",
  overflowY: "auto",
  width: "100%",
  maxWidth: "700px",
  padding: "10px",
  backgroundColor: "rgba(0, 0, 0, 0.6)",
  borderRadius: "10px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
  marginTop: "20px",
  boxSizing: "border-box",

  // Custom Scrollbar Styling
  "&::-webkit-scrollbar": {
    width: "10px",
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: "10px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#00d9ff",
    borderRadius: "10px",
    border: "2px solid rgba(0, 0, 0, 0.6)",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    backgroundColor: "#00aaff",
  },
}));

const HistoryCard = styled(Box)(({ theme }) => ({
  backgroundColor: "#2c2c54",
  color: "#fff",
  fontFamily: '"Press Start 2P", cursive',
  fontSize: "12px",
  padding: "15px",
  border: "2px solid #00d9ff",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
  textAlign: "center",
  marginBottom: "10px",
  "&:hover": {
    backgroundColor: "#40407a",
    borderColor: "#00aaff",
  },
}));

const GameHistory = () => {
  const navigate = useNavigate();
  const [gameHistory, setGameHistory] = useState([]); // State to store game history

  const handleBackButton = () => {
    navigate("/play"); // Navigate to play
  };

  useEffect(() => {
    const userID = localStorage.getItem("userID"); // Fetch from local storage or auth context
    if (!userID) {
      console.error("Error: userID is missing.");
      return;
    }

    const fetchHistory = async () => {
      const history = await loadGameHistory(userID);
      setGameHistory(history); // Save the response to state
    };

    fetchHistory();
  }, []);

  return (
    <StyledGameContainer>
      <PixelButton onClick={handleBackButton} sx={{ alignSelf: "flex-start", margin: 2 }}>
        Back
      </PixelButton>
      <Typography variant="h4" sx={{ color: "#fff", fontFamily: '"Press Start 2P", cursive', marginBottom: "20px" }}>
        Game History
      </Typography>
      <ScrollableGrid>
        {gameHistory.length > 0 ? (
          gameHistory.map((item, index) => (
            <HistoryCard key={index}>
              <Typography>{`Difficulty: ${item.difficulty}`}</Typography>
              <Typography>{`Completed: ${item.completed ? "Yes" : "No"}`}</Typography>
              <Typography>{`Failed: ${item.failed ? "Yes" : "No"}`}</Typography>
              <Typography>{`Time Taken: ${item.timeTaken}s`}</Typography>
            </HistoryCard>
          ))
        ) : (
          <Typography sx={{ color: "#fff", textAlign: "center", marginTop: "20px" }}>
            No game history available.
          </Typography>
        )}
      </ScrollableGrid>
    </StyledGameContainer>
  );
};

export default GameHistory;
