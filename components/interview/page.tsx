import { useEffect, useState } from "react";
import Question from "../component/Question";
import MediaPlayer from "../component/MediaPlayer";
import "../../app/globals.css";

const Interview = ({ questions , companyName }: { questions?: any , companyName : any}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [audioPlaying, setAudioPlaying] = useState(true);
  const [audio, setAudio] = useState("");
  const currentQuestion =
    questions.selectedqs.verbal[currentQuestionIndex] || null;
  const isLastQuestion =
    currentQuestionIndex === questions?.selectedqs?.verbal.length - 1;

  const getAudioFromText = async (currentQuestion: any) => {
    const { question } = currentQuestion;
    try {
      const response = await fetch("/api/textToSpeech", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const arrayBuffer = await response.arrayBuffer();
      const audioUrl = URL.createObjectURL(
        new Blob([arrayBuffer], { type: "audio/mp3" })
      );
      setAudio(audioUrl);
      console.log(audioUrl);
    } catch (error) {
      console.error("Error fetching or playing audio:", error);
    }
  };

  useEffect(() => {
    if (currentQuestion) {
      setTimeout(() => {
        getAudioFromText(currentQuestion);
      }, 500);
    }
  }, [audioPlaying]);

  const handleAudioEnd = () => {
    setAudioPlaying(false);
  };

  const handleNextQuestion = async () => {
    setTimeout(() => {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setAudioPlaying(true);
    }, 2000); // Delay before asking the next question
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      {currentQuestion && audioPlaying ? (
        <MediaPlayer audioSrc={`${audio}`} onAudioEnd={handleAudioEnd} />
      ) : (
        currentQuestion &&
        !audioPlaying && (
          <Question
            question={currentQuestion}
            onNextQuestion={handleNextQuestion}
            isLastQuestion={isLastQuestion}
            companyName={companyName}
          />
        )
      )}
    </div>
  );
};

export default Interview;
