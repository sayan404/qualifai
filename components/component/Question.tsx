import { useState, useEffect, useRef } from "react";

interface QuestionProps {
  question: {
    _id: string;
    question: string;
    answer: string;
    difficulty: string;
  };
  onNextQuestion: () => void;
}

const Question: React.FC<QuestionProps> = ({ question, onNextQuestion }) => {
  const [isMuted, setIsMuted] = useState(true);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [recordingURL, setRecordingURL] = useState<string | null>(null);

  useEffect(() => {
    if (audioBlob) {
      uploadAudio(audioBlob);
    }
  }, [audioBlob]);

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
      console.log("Transcription Result:", result);
      // Handle the transcription result if needed
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
