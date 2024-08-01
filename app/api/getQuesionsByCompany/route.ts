import axios from "axios";
import { NextResponse } from "next/server";

const companies = [
  { name: "Google" },
  { name: "Amazon" },
  { name: "Microsoft" },
  { name: "Apple" },
  { name: "Facebook" },
  { name: "Uber" },
];

export async function GET(req: Request) {
  const url = new URL(req.url);
  const query = Object.fromEntries(url.searchParams.entries());

  async function getSelectedVerbalQs() {
    try {
      const response = await axios.get(
        "https://qualifai-xi.vercel.app/api/verbalQuestions"
      );
      const questionsData = response.data;
      const questions = questionsData.questions.questions;
      const easyQuestions = questions.filter(
        (q: any) => q.difficulty === "easy"
      );
      const mediumQuestions = questions.filter(
        (q: any) => q.difficulty === "medium"
      );
      const getRandomQuestion = (array: any) => {
        return array[Math.floor(Math.random() * array.length)];
      };
      const selectedEasyQuestion =
        easyQuestions.length > 0 ? getRandomQuestion(easyQuestions) : null;
      const selectedMediumQuestion =
        mediumQuestions.length > 0 ? getRandomQuestion(mediumQuestions) : null;

      return [selectedEasyQuestion, selectedMediumQuestion];
    } catch (error: any) {
      console.log("Error fetching or processing questions:", error.message);
      throw new Error("Failed to fetch verbal questions");
    }
  }

  async function getfilteredCompanybasedQs(query: any) {
    try {
      const response = await axios.get(
        `https://qualifai-xi.vercel.app/api/companyBasedQuestion?company=${query}`
      );
      const questionsData = response.data;
      const questions = questionsData.questions.questions;
      const easyQuestions = questions.filter(
        (q: any) => q.difficulty === "easy"
      );
      const mediumQuestions = questions.filter(
        (q: any) => q.difficulty === "medium"
      );
      const hardQuestions = questions.filter(
        (q: any) => q.difficulty === "hard"
      );
      const getRandomQuestion = (array: any) => {
        return array[Math.floor(Math.random() * array.length)];
      };
      const selectedEasyQuestion =
        easyQuestions.length > 0 ? getRandomQuestion(easyQuestions) : null;
      const selectedMediumQuestion =
        mediumQuestions.length > 0 ? getRandomQuestion(mediumQuestions) : null;
      const selectedHardQuestion =
        hardQuestions.length > 0 ? getRandomQuestion(hardQuestions) : null;

      return [
        selectedEasyQuestion,
        selectedMediumQuestion,
        selectedHardQuestion,
      ];
    } catch (error: any) {
      console.log("Error fetching or processing questions:", error.message);
      throw new Error("Failed to fetch company-based questions");
    }
  }

  try {
    if (!query.company) {
      throw new Error("Company query parameter is required");
    }

    const companyExists = companies.some(
      (company) => company.name.toLowerCase() === query.company.toLowerCase()
    );

    if (!companyExists) {
      throw new Error("Company not found in the list");
    }

    const filteredVerbalQuestions = await getSelectedVerbalQs();
    const filteredCompanybasedQuestions = await getfilteredCompanybasedQs(
      query.company
    );

    const selectedqs = {
      verbal: filteredVerbalQuestions,
      companyDSAQs: filteredCompanybasedQuestions,
    };

    return NextResponse.json(
      {
        message: "Filtered Data",
        selectedqs: selectedqs,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.log("Error in GET handler:", error.message);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
