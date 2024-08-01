# QualifAi

## Overview

QualifAi is an innovative AI-driven platform designed to revolutionize job interview preparation. Our solution provides tailored mock interviews using an AI avatar that simulates real interview scenarios. Users receive immediate feedback on their coding skills, verbal responses, and overall performance, including detailed analysis of emotional cues and vocabulary usage.

## Problem We Solve

Current mock interview services often lack integration of coding practice, oral questions, and resume-oriented questions, making them expensive and inaccessible for many job seekers. QualifAi addresses this gap by offering a comprehensive, affordable solution that replicates real-life interviews with instant feedback.

## Approach

QualifAi leverages advanced language models to compare user answers with correct responses, integrates sophisticated voice models for realistic interactions, and uses separate AI models for sentiment and verbal analysis. The platform includes:
- A coding compiler
- A dataset of frequently asked verbal questions
- Tailored resume-specific questions

## Unique Selling Proposition (USP)

QualifAi provides a unique interview preparation experience where users can select an interviewer, choose their preferred role, start the interview, and receive immediate feedback with no wait time.

## Features

- Realistic AI avatars for mock interviews
- Instant feedback on coding and verbal responses
- Emotional and vocabulary analysis
- Customizable interviews with company-specific and role-specific tags
- Integrated coding compiler
- Extensive database of frequently asked questions
- Tailored resume questions for personalized preparation
- Company-specific questions (e.g., SDE at Google, Front-End at Microsoft)
- Can be used by companies for initial screening rounds
- Immediate interview setup and feedback

## Architecture

![Architecture Diagram](https://firebasestorage.googleapis.com/v0/b/uploadika-b352f.appspot.com/o/images%2FWhatsApp%20Image%202024-08-02%20at%2004.56.42_9051c666.jpg?alt=media&token=8c7782b5-d576-49c7-84ff-6fbc1ab10391)

## Tech Stack

**Frontend && Backend:**
- **Next.js:** Provides a fast and responsive user interface.

**Voice Interaction:**
- **Deepgram Voice API:** Processes and analyzes voice interactions during mock interviews.

**Language Models:**
- **OpenAI** Implements large language models for comparing answers, generating questions, and natural language processing.

**Data Scraping:**
- **Scraping Solutions:** Collects questions and interview experiences to build a comprehensive database.

**Sentiment and Verbal Analysis:**
- **AI Models:** Analyzes emotional cues and verbal responses.

**Coding Compiler:**
- **JDoodle:** Compiles and runs coding questions within the platform.

**Database:**
- **MongoDB:** Stores user information and interview questions.

**User Management:**
- **Clerk:** Handles user authentication, sign-in, and management functionalities.

## Getting Started

To get started with QualifAi, clone the repository and follow the setup instructions in the [INSTALL.md](INSTALL.md) file.

---

Feel free to modify or expand the README.md as needed for your project.
