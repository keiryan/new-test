import { Configuration, OpenAIApi } from "openai";
import env from "react-dotenv";

export default async function callOpenAI(messagesArray) {
  let aiResponse = "";
  const configuration = new Configuration({
    apiKey: env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const refinedArray = messagesArray.map((message) => {
    if (message["data"] !== undefined) {
      return { role: message.data.choices[0].message.role, content: message.data.choices[0].message.content };
    } else {
      return message;
    }

  });

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{
        role: "system",
        content: `Write a cover letter for the provied job. Have a confident tone, but don't dont be a butt kisser. My name is Keiryan, I am a front end web developer with 2 years experience in react, vue, and HTML, css, and JS. These are the main bullet points from my current resume: Improved deployment and infrastructure by connecting Google Cloud Run with a Google Cloud SQL PostgreSQL database, deploying the app to Google Cloud Run using Docker containers, and configuring PostgreSQL on Google Cloud SQL. Improved software development processes by implementing a continuous integration pipeline using GitHub Actions and Docker containers, incorporating linting and type-checking using Husky pre-commit hooks, and running unit, integration, and end-to-end tests on every pre-push and new pull request. Improved API documentation and testing by implementing Swagger docs, writing Swagger JSDocs for API routes, and testing API routes using Chai-HTTP and a development/testing database. Improved code quality and maintainability by refactoring the backend codebase, incorporating test coverage reports in the frontend, and writing tests in both the backend (Mocha and Chai) and frontend (Jest and React Testing Library). Implemented API security measures, including using an API key to block outside access to the backend API and using the CORS library to block cross-origin requests. Facilitated onboarding and mentorship of junior developers by resolving problems, enforcing branch rules, and setting up a development environment locally on each developer's device.`
      }, ...refinedArray],
    });

    console.warn("completion", completion);

    aiResponse = completion;
  } catch (error) {
    if (error.response) {
      console.log(error);
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error)
      console.log(error.message);
    }
  }
  return aiResponse;
}
