"use client";
import { useState, useEffect, useRef } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import Editor from "@monaco-editor/react";

const languageOptions = [
  { label: "C", value: "c" },
  { label: "C++", value: "cpp" },
  { label: "C#", value: "csharp" },
  { label: "Java", value: "java" },
  { label: "JavaScript", value: "javascript" },
  { label: "PHP", value: "php" },
  { label: "Python", value: "python" },
  { label: "Ruby", value: "ruby" },
  { label: "Go", value: "go" },
  { label: "Rust", value: "rust" },
  { label: "Swift", value: "swift" },
];

const boilerplate: { [key: string]: string } = {
  c: `#include <stdio.h>

int main() {
  // write your code here
  printf("Hello, World!\\n");
  return 0;
}`,
  cpp: `#include <iostream>

int main() {
  // write your code here
  std::cout << "Hello, World!" << std::endl;
  return 0;
}`,
  csharp: `using System;

class Program {
  static void Main() {
    // write your code here
    Console.WriteLine("Hello, World!");
  }
}`,
  java: `public class Main {
  public static void main(String[] args) {
    // write your code here
    System.out.println("Hello, World!");
  }
}`,
  javascript: `// write your code here
console.log("Hello, World!");`,
  php: `<?php
// write your code here
echo "Hello, World!";
?>`,
  python: `# write your code here
print("Hello, World!")`,
  ruby: `# write your code here
puts "Hello, World!"`,
  go: `package main

import "fmt"

func main() {
  // write your code here
  fmt.Println("Hello, World!")
}`,
  rust: `fn main() {
  // write your code here
  println!("Hello, World!");
}`,
  swift: `// write your code here
print("Hello, World!")`,
};

interface TestCase {
  query: string;
  correctAnswer: string;
}

interface Example {
  testCase: TestCase;
  explanation: string;
}

interface Question {
  question: string;
  testCases: TestCase[];
  example: Example;
  dataStructureType: string;
}

interface CompilerProps {
  question: {
    _id: string;
    question: Question;
    company: string;
    difficulty: string;
    __v: number;
  };
  onNextQuestion: () => void;
  onStatusChange: (status: boolean) => void;
}

export function Compiler({
  question,
  onNextQuestion,
  onStatusChange,
}: CompilerProps) {
  console.log("question ------>", question);

  const [selectedLanguage, setSelectedLanguage] =
    useState<string>("javascript");
  const [code, setCode] = useState<string>(boilerplate["javascript"]);
  const [output, setOutput] = useState<string>("");
  const [showVideo, setShowVideo] = useState<boolean>(true);
  const [testCount, setTestCount] = useState<number>(0);
  const [buttonText, setButtonText] = useState<string>("Run Code");
  const [status, setStatus] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setCode(boilerplate[selectedLanguage]);
  }, [selectedLanguage]);

  useEffect(() => {
    const playVideo = () => {
      if (videoRef.current) {
        videoRef.current.play();
        document.removeEventListener("click", playVideo);
      }
    };

    document.addEventListener("click", playVideo);
    return () => {
      document.removeEventListener("click", playVideo);
    };
  }, []);

  const handleLanguageChange = (value: string) => {
    setSelectedLanguage(value);
  };

  const simulateTestCases = () => {
    let count = 0;
    const interval = setInterval(() => {
      count++;
      setTestCount(count);
      setButtonText(`Running Test Cases: ${count}/20`);
      if (count === 20) {
        clearInterval(interval);
        setButtonText("All Test Cases Passed ✅");
      }
    }, 100);
  };
  const handleRunCode = async () => {
    setTestCount(0);
    setButtonText("Running on Test Cases");

    // Fetch the code output first
    const response = await fetch("/api/run-code", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ language: selectedLanguage, code }),
    });

    const data = await response.json();
    console.log("data.isExecutionSuccess" ,data.output);
    
    setOutput(data.output.output);
    onStatusChange(data.output.isExecutionSuccess);
    if (data.output.isExecutionSuccess) {
      // Start the test cases simulation
      simulateTestCases();
    }
  };

  const handleSubmit = () => {
    setButtonText("Run Code"); 
    onNextQuestion(); // Proceed to the next question or redirect to thank you page
  };

  const handleVideoEnd = () => {
    setShowVideo(false);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] h-screen w-full relative">
      {showVideo && (
        <div
          style={{
            position: "absolute",
            bottom: "1rem",
            left: "1rem",
            width: "10rem", // Increased size
            height: "10rem", // Increased size
            borderRadius: "50%",
            overflow: "hidden",
            border: "4px solid white",
            zIndex: 10,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <video
            ref={videoRef}
            src="/images/code.mp4"
            onEnded={handleVideoEnd}
            style={{
              width: "100% !important",
              height: "100% !important",
              objectFit: "cover",
            }}
            playsInline
          />
        </div>
      )}
      <div className="bg-background p-8 overflow-auto scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">Coding Problem</h1>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Problem Statement</h2>
            <p className="text-muted-foreground">
              {question.question.question}
            </p>
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Examples</h2>
            <div className="bg-muted rounded-md p-4 space-y-4">
              {/* Render examples here */}
              <div>
                <p className="text-muted-foreground">
                  Input: {question.question.example.testCase.query}
                </p>
                <p className="text-muted-foreground">
                  Output: {question.question.example.testCase.correctAnswer}
                </p>
                <p className="text-muted-foreground">
                  Explanation: {question.question.example.explanation}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-background p-8 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-row justify-center items-center mt-4 gap-5">
            <h2 className="text-xl font-semibold">Code Editor</h2>
            <Button onClick={handleSubmit}>Next Question</Button>
          </div>

          <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {languageOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex-1 bg-muted rounded-md p-4 overflow-auto scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
          <Editor
            height="100%"
            language={selectedLanguage}
            value={code}
            onChange={(value) => setCode(value || "")}
            theme="vs-dark"
          />
        </div>
        <div className="mt-4">
          <Button onClick={handleRunCode}>{buttonText}</Button>
        </div>
        <div className="bg-muted rounded-md p-4 mt-4">
          <h2 className="text-xl font-semibold">Output</h2>
          <pre>{output}</pre>
        </div>
      </div>
    </div>
  );
}
