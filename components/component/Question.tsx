import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

interface QuestionProps {
  question: {
    _id: string;
    question: string;
    answer: string;
    difficulty: string;
  };
  onNextQuestion: () => void;
  isLastQuestion?: boolean; // Add this prop
  companyName: string;
}

const Question: React.FC<QuestionProps> = ({
  question,
  onNextQuestion,
  isLastQuestion,
  companyName
}) => {
  const { user } = useUser();
  const router = useRouter(); // Initialize router for redirection

  const [isMuted, setIsMuted] = useState(true);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [recordingURL, setRecordingURL] = useState<string | null>(null);
  let alldataSaved = false;
  useEffect(() => {
    if (audioBlob) {
      uploadAudio(audioBlob);
    }
  }, [audioBlob]);

  useEffect(() => {
    if (isLastQuestion && alldataSaved && audioBlob === null) {
      // Redirect after the last question is processed
      const timer = setTimeout(() => {
        router.push("/coding-questions");
      }, 3000); // Delay for 3 seconds before redirecting

      return () => clearTimeout(timer); // Cleanup timeout on unmount
    }
  }, [isLastQuestion, audioBlob, router, alldataSaved]);

  const handleMicButtonClick = async () => {
    if (isMuted) {
      // Start recording
      setIsMuted(false);
      navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            setAudioBlob(event.data);
            setRecordingURL(URL.createObjectURL(event.data));
          }
        };

        mediaRecorder.start();
      });
    } else {
      // Stop recording and upload audio
      setIsMuted(true);
      mediaRecorderRef.current?.stop();
      setAudioBlob(null); // Trigger the effect to upload the audio
      onNextQuestion(); // Proceed to the next question
    }
  };

  const uploadAudio = async (blob: Blob) => {
    const formData = new FormData();
    formData.append("audio", blob, "recording.mp3");

    try {
      const response = await fetch("/api/speechToText", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      let sessionId = "";
      const questionData = {
        question: question.question,
        answer: result?.resultData,
      };
      const storedSessionId = localStorage.getItem("sessionId");

      if (storedSessionId) {
        sessionId = storedSessionId;
      }
      try {
        const response = await axios.post("/api/qna", {
          sessionId: sessionId || 0,
          userId: user?.id.toString(),
          question: questionData,
        });
        const newSessionId = response.data.data.sessionId;
        localStorage.setItem("sessionId", newSessionId);
        if (isLastQuestion) {
         setTimeout(() => {
            router.push(`/coding-questions?company=${companyName}`);
          }, 1000); // Delay for 3 seconds before redirecting
        }
      } catch (err) {
        console.log(err);
      }
    } catch (error) {
      console.error("Error uploading audio:", error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <p>{question.question}</p>
      <button
        onClick={handleMicButtonClick}
        style={{
          backgroundColor: isMuted ? "gray" : "green",
          color: "white",
          border: "none",
          borderRadius: "5px",
          padding: "10px 20px",
        }}
      >
        {isMuted ? "Unmute" : "Mute"}
      </button>
      {recordingURL && <audio controls src={recordingURL} />}
    </div>
  );
};

export default Question;
