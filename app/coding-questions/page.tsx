"use client";
import React, { useEffect, useRef, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Compiler } from "@/components/component/Compiler";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "@clerk/nextjs";
import axios from "axios";

const CodingQuestionPage = () => {
  const { isLoaded, isSignedIn } = useSession();
  const searchParams = useSearchParams();
  const companyName = searchParams?.get("company");
  console.log(companyName);
  const { user } = useUser();
  const router = useRouter();
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const lastCompanyName = useRef<string | null>(null); 
  const [status, setStatus] = useState<boolean>(false);
  useEffect(() => {
    if (!isSignedIn) router.push("/");
  }, [isSignedIn, router]);

  const handleStatusChange = (newStatus: boolean) => {
    setStatus(newStatus);
    console.log("Status updated to:", newStatus);
  };
  useEffect(() => {
    let isMounted = true;

    const getQuestions = async () => {
      if (companyName && companyName !== lastCompanyName.current) {
        try {
          const response = await axios.get(
            `/api/getQuesionsByCompany?company=${companyName}`
          );
          if (isMounted) {
            console.log("response.data", response.data);

            setQuestions(response.data.selectedqs.companyDSAQs);
            setLoading(false);
            lastCompanyName.current = companyName;
          }
        } catch (err) {
          if (isMounted) {
            setError("Failed to fetch questions.");
            setLoading(false);
          }
        }
      }
    };

    if (companyName) {
      getQuestions();
    }

    return () => {
      isMounted = false;
    };
  }, [companyName]);

  const handleNextQuestion = async () => {
    if (currentQuestionIndex < questions.length - 1) {
      let sessionId = "";
      const storedSessionId = localStorage.getItem("sessionId");

      if (storedSessionId) {
        sessionId = storedSessionId;
      }
      const questionData = {
        question: questions[currentQuestionIndex].question.question,
        answer: status ? "Success" : "Failed",
      };
      console.log("questionData from coding-ques", questionData);

      try {
        const response = await axios.post("/api/qna", {
          sessionId: sessionId || 0,
          userId: user?.id.toString(),
          question: questionData,
        });
        console.log("response data from coding-ques", response);

        const newSessionId = response.data.data.sessionId;
        localStorage.setItem("sessionId", newSessionId);
      } catch (err) {
        console.log(err);
      }
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      let sessionId = "";
      const storedSessionId = localStorage.getItem("sessionId");

      if (storedSessionId) {
        sessionId = storedSessionId;
      }
      const questionData = {
        question: questions[questions.length - 1].question.question,
        answer: status ? "Success" : "Failed",
      };
      console.log("questionData from coding-ques", questionData);

      try {
        const response = await axios.post("/api/qna", {
          sessionId: sessionId || 0,
          userId: user?.id.toString(),
          question: questionData,
        });
        console.log("response data from coding-ques", response);
        // localStorage.removeItem("sessionId");
      } catch (err) {
        console.log(err);
      }
      router.push(`/congratulation?sessionId=${sessionId}`); // Redirect to thank you page
    }
  };

  if (loading)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div id="loader" className="loader">
          {/* Loader SVG */}
          <div>
            <ul>
              {[...Array(5)].map((_, i) => (
                <li key={i}>
                  <svg fill="currentColor" viewBox="0 0 90 120">
                    <path d="M90,0 L90,120 L11,120 C4.92486775,120 0,115.075132 0,109 L0,11 C0,4.92486775 4.92486775,0 11,0 L90,0 Z M71.5,81 L18.5,81 C17.1192881,81 16,82.1192881 16,83.5 C16,84.8254834 17.0315359,85.9100387 18.3356243,85.9946823 L18.5,86 L71.5,86 C72.8807119,86 74,84.8807119 74,83.5 C74,82.1745166 72.9684641,81.0899613 71.6643757,81.0053177 L71.5,81 Z M71.5,57 L18.5,57 C17.1192881,57 16,58.1192881 16,59.5 C16,60.8254834 17.0315359,61.9100387 18.3356243,61.9946823 L18.5,62 L71.5,62 C72.8807119,62 74,60.8807119 74,59.5 C74,58.1192881 72.8807119,57 71.5,57 Z M71.5,33 L18.5,33 C17.1192881,33 16,34.1192881 16,35.5 C16,36.8254834 17.0315359,37.9100387 18.3356243,37.9946823 L18.5,38 L71.5,38 C72.8807119,38 74,36.8807119 74,35.5 C74,34.1192881 72.8807119,33 71.5,33 Z"></path>
                  </svg>
                </li>
              ))}
            </ul>
          </div>
          <span>Loading</span>
        </div>
      </div>
    );

  if (error) return <div>{error}</div>;
  return (
    <div>
      {questions.length > 0 && (
        <Compiler
          question={questions[currentQuestionIndex]}
          onNextQuestion={handleNextQuestion}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
};

export default CodingQuestionPage;
