import { useEffect, useRef } from "react";
interface MediaPlayerProps {
  audioSrc: string;
  onAudioEnd: () => void;
}

const MediaPlayer: React.FC<MediaPlayerProps> = ({ audioSrc, onAudioEnd }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    const audioElement = audioRef.current;

    if (videoElement && audioElement) {
      videoElement.style.display = "block";
      videoElement.muted = true;
      videoElement.loop = true;

      audioElement.src = audioSrc;
      audioElement.play();
      videoElement.play();

      audioElement.onended = () => {
        if (videoElement) {
          videoElement.pause();
          videoElement.loop = false; // Stop video from looping
        }
        onAudioEnd();
      };
    }
  }, [audioSrc, onAudioEnd]);

  return (
    <>
      <video
        ref={videoRef}
        id="interviewVideo"
        src="/images/interview.mp4"
        style={{ display: "none", width: "80%", height: "auto" }}
      />
      <audio ref={audioRef} style={{ display: "none" }} />
    </>
  );
};

export default MediaPlayer;
