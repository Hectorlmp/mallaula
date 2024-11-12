import React, { useEffect, useState } from "react";
import { Button } from '@mantine/core';
import './App.css';

const App = () => {
  const [subjectsData, setSubjectsData] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);

  useEffect(() => {
    fetch("/data/subjects.json")
      .then(response => response.json())
      .then(data => setSubjectsData(data.subjects))
      .catch(error => console.error('Error al cargar el JSON:', error));
  }, []);

  const subjectsBySemester = subjectsData.reduce((acc, subject) => {
    if (!acc[subject.semester]) {
      acc[subject.semester] = [];
    }
    acc[subject.semester].push(subject);
    return acc;
  }, {});

  const MAX_SUBJECTS_PER_SEMESTER = 7; 

  return (
    <div className="app-container">
      <div className="semester-container">
        {Object.keys(subjectsBySemester).map((semester) => (
          <div key={semester} className="semester-box">
            <h2>Semestre {semester}</h2>
            <div className="subjects-list">
              {subjectsBySemester[semester].map((subject, index) => {
                const isPrev = selectedSubject && selectedSubject.prev.includes(subject.name);
                const isNext = selectedSubject && selectedSubject.next.includes(subject.name);
                const isSelected = selectedSubject && selectedSubject.name === subject.name; // Verifica si el sujeto está seleccionado
                const buttonClass = `subject-button ${isPrev ? 'prev' : isNext ? 'next' : ''} ${isSelected ? 'selected' : ''}`; // Aplica la clase 'selected' si el sujeto está seleccionado

                return (
                  <Button
                    key={index}
                    className={buttonClass}
                    onClick={() => setSelectedSubject(subject)}
                    disabled={selectedSubject && selectedSubject.name === subject.name}
                  >
                    {subject.name}
                  </Button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;