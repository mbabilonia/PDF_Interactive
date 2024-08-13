import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const IAPanel = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const professionData = [
    { name: 'Mercadotecnia por teléfono', probabilidad: 0.99 },
    { name: 'Cajeros', probabilidad: 0.97 },
    { name: 'Albañiles', probabilidad: 0.94 },
    { name: 'Médicos y cirujanos', probabilidad: 0.0042 },
    { name: 'Maestros de primaria', probabilidad: 0.0044 },
  ];

  const quizQuestions = [
    {
      question: '¿Qué es la Inteligencia Artificial (IA)?',
      options: [
        'Un tipo de robot',
        'La rama de las ciencias computacionales que se encarga del diseño y construcción de sistemas capaces de realizar tareas asociadas con la inteligencia humana',
        'Un programa de computadora que juega ajedrez',
        'Una marca de computadoras'
      ],
      correctAnswer: 1
    },
    {
      question: '¿Cuál es una de las principales áreas de la IA?',
      options: [
        'Aprendizaje computacional',
        'Diseño gráfico',
        'Contabilidad',
        'Jardinería'
      ],
      correctAnswer: 0
    },
    {
      question: '¿Qué se estima que será el valor del mercado mundial de la IA en 2025?',
      options: [
        '10 mil millones de dólares',
        '50 mil millones de dólares',
        '126 mil millones de dólares',
        '500 mil millones de dólares'
      ],
      correctAnswer: 2
    },
    {
      question: '¿Qué porcentaje de empleos podrían ser automatizados en países en vías de desarrollo?',
      options: [
        'Menos del 20%',
        'Entre 20% y 40%',
        'Entre 40% y 60%',
        'Más del 65%'
      ],
      correctAnswer: 3
    },
    {
      question: '¿Cuál es una propiedad importante de cualquier sistema inteligente?',
      options: [
        'Velocidad',
        'Tamaño',
        'Transparencia',
        'Color'
      ],
      correctAnswer: 2
    },
    // ... (rest of the questions)
  ];

  const handleAnswerChange = (questionIndex, answerIndex) => {
    setQuizAnswers({
      ...quizAnswers,
      [questionIndex]: answerIndex
    });
  };

  const handleQuizSubmit = () => {
    setQuizSubmitted(true);
  };

  const calculateScore = () => {
    let score = 0;
    quizQuestions.forEach((question, index) => {
      if (quizAnswers[index] === question.correctAnswer) {
        score++;
      }
    });
    return score;
  };

  const renderTab = () => {
    switch(activeTab) {
      case 0:
        return (
          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-2">¿Qué es la IA?</h2>
            <p>La inteligencia artificial (IA) es la rama de las ciencias computacionales que se encarga del diseño y construcción de sistemas capaces de realizar tareas asociadas con la inteligencia humana.</p>
            
            <h2 className="text-xl font-semibold mt-4 mb-2">Aplicaciones de la IA</h2>
            <ul className="list-disc pl-5">
              <li>Reconocimiento visual</li>
              <li>Reconocimiento del lenguaje natural</li>
              <li>Estrategia y planeación</li>
              <li>Diagnóstico y apoyo en la toma de decisiones</li>
              <li>Colaboración humano-computadora</li>
            </ul>

            <h2 className="text-xl font-semibold mt-4 mb-2">Implicaciones</h2>
            <p>La IA tiene profundas implicaciones sociales, económicas, educativas y legales. Se estima que el valor del mercado mundial de la IA será de al menos 126 mil millones de dólares estadounidenses en 2025.</p>
          </div>
        );
      case 1:
        return (
          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-2">Probabilidad de Automatización por Profesión</h2>
            <BarChart width={600} height={300} data={professionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="probabilidad" fill="#8884d8" />
            </BarChart>
          </div>
        );
      case 2:
        return (
          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-2">Cuestionario de IA</h2>
            {quizQuestions.map((question, index) => (
              <div key={index} className="mb-4">
                <p className="font-semibold">{index + 1}. {question.question}</p>
                {question.options.map((option, optionIndex) => (
                  <div key={optionIndex}>
                    <input
                      type="radio"
                      id={`q${index}a${optionIndex}`}
                      name={`question${index}`}
                      value={optionIndex}
                      checked={quizAnswers[index] === optionIndex}
                      onChange={() => handleAnswerChange(index, optionIndex)}
                      disabled={quizSubmitted}
                    />
                    <label htmlFor={`q${index}a${optionIndex}`} className="ml-2">{option}</label>
                  </div>
                ))}
                {quizSubmitted && (
                  <p className={quizAnswers[index] === question.correctAnswer ? "text-green-600" : "text-red-600"}>
                    {quizAnswers[index] === question.correctAnswer ? "Correcto" : "Incorrecto"}
                  </p>
                )}
              </div>
            ))}
            {!quizSubmitted && (
              <button 
                onClick={handleQuizSubmit}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Enviar respuestas
              </button>
            )}
            {quizSubmitted && (
              <p className="font-semibold mt-4">Tu puntuación: {calculateScore()} de {quizQuestions.length}</p>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Panel Interactivo de Inteligencia Artificial</h1>
      <div className="flex border-b mb-4">
        <button 
          className={`px-4 py-2 ${activeTab === 0 ? 'border-b-2 border-blue-500' : ''}`}
          onClick={() => setActiveTab(0)}
        >
          Información Principal
        </button>
        <button 
          className={`px-4 py-2 ${activeTab === 1 ? 'border-b-2 border-blue-500' : ''}`}
          onClick={() => setActiveTab(1)}
        >
          Gráficos
        </button>
        <button 
          className={`px-4 py-2 ${activeTab === 2 ? 'border-b-2 border-blue-500' : ''}`}
          onClick={() => setActiveTab(2)}
        >
          Cuestionario
        </button>
      </div>
      {renderTab()}
    </div>
  );
};

export default IAPanel;
