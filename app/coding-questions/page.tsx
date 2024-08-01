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
  const lastCompanyName = useRef<string | null>(null); // To track the last requested company name
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

        const newSessionId = response.data.data.sessionId;
        localStorage.setItem("sessionId", newSessionId);
      } catch (err) {
        console.log(err);
      }
      router.push("/congratulation"); // Redirect to thank you page
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

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
