import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  // Fetch questions when the component loads
  useEffect(() => {
    fetch('http://localhost:4000/questions')
      .then((response) => response.json())
      .then((data) => setQuestions(data))
      .catch((error) => console.error('Error fetching questions:', error));
  }, []);

  const handleQuestionFormSubmit = (newQuestion) => {
    setQuestions([...questions, newQuestion]);
    setPage("List");
  };

  const handleDeleteQuestion = (id) => {
    // Remove the deleted question from the state
    setQuestions(questions.filter((question) => question.id !== id));
  };

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm onQuestionFormSubmit={handleQuestionFormSubmit} />
      ) : (
        <QuestionList questions={questions} onDeleteQuestion={handleDeleteQuestion} />
      )}
    </main>
  );
}

export default App;
