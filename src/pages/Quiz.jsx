import React, { useState } from 'react';
import quizData from '../data/quizData.json';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { HelpCircle, CheckCircle2, XCircle, Award, RotateCcw, ArrowRight, Trophy } from 'lucide-react';

/**
 * Daily Space Quiz Page Component
 * Demonstrates useState, local storage high score tracking, progress calculation, conditional rendering, and quiz state machine logic.
 */
export function Quiz() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const [highScore, setHighScore] = useLocalStorage('celestial_high_score', 0);

  const currentQ = quizData[currentIdx];

  const handleSelectOption = (idx) => {
    if (isSubmitted) return; // prevent changing answer after submission
    setSelectedOption(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null) return;
    setIsSubmitted(true);
    if (selectedOption === currentQ.correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentIdx + 1 < quizData.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
    } else {
      setQuizCompleted(true);
      if (score + (selectedOption === currentQ.correctIndex ? 1 : 0) > highScore) {
        setHighScore(score + (selectedOption === currentQ.correctIndex ? 1 : 0));
      }
    }
  };

  const handleRestartQuiz = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsSubmitted(false);
    setScore(0);
    setQuizCompleted(false);
  };

  const progressPercent = Math.round(((currentIdx + 1) / quizData.length) * 100);

  return (
    <div className="container section-padding">
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <span className="badge" style={{ marginBottom: '0.75rem' }}>Daily Challenge</span>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, fontFamily: 'var(--font-heading)' }}>
          Daily Space Quiz
        </h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '580px', margin: '0.5rem auto 0 auto' }}>
          Test your astrophysics, planetary science, and orbital mechanics knowledge across 10 interactive questions.
        </p>
      </div>

      {!quizCompleted ? (
        <div className="glass-card" style={{ maxWidth: '720px', margin: '0 auto', padding: '2rem' }}>
          {/* Quiz Top Bar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            <span>Question {currentIdx + 1} of {quizData.length}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-cyan)' }}>
              <Trophy size={16} />
              <span>Personal Best: {highScore} / 10</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div style={{ width: '100%', height: '8px', background: 'var(--bg-tertiary)', borderRadius: '4px', overflow: 'hidden', marginBottom: '2rem' }}>
            <div
              style={{
                width: `${progressPercent}%`,
                height: '100%',
                background: 'linear-gradient(90deg, var(--accent-cyan), var(--accent-blue))',
                transition: 'width 0.3s ease'
              }}
            />
          </div>

          {/* Question Text */}
          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, fontFamily: 'var(--font-heading)', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
            {currentQ.question}
          </h2>

          {/* Multiple Choice Options List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '2rem' }}>
            {currentQ.options.map((option, idx) => {
              let optionStyle = {
                background: 'var(--bg-secondary)',
                border: '1px solid var(--glass-border)',
                color: 'var(--text-primary)'
              };

              if (selectedOption === idx) {
                optionStyle = {
                  background: 'rgba(59, 130, 246, 0.2)',
                  border: '1px solid var(--accent-blue)',
                  color: 'var(--accent-cyan)'
                };
              }

              if (isSubmitted) {
                if (idx === currentQ.correctIndex) {
                  optionStyle = {
                    background: 'rgba(16, 185, 129, 0.2)',
                    border: '1px solid #10b981',
                    color: '#10b981'
                  };
                } else if (selectedOption === idx) {
                  optionStyle = {
                    background: 'rgba(239, 68, 68, 0.2)',
                    border: '1px solid #ef4444',
                    color: '#ef4444'
                  };
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isSubmitted}
                  style={{
                    ...optionStyle,
                    padding: '1rem 1.25rem',
                    borderRadius: 'var(--radius-md)',
                    textAlign: 'left',
                    fontSize: '0.95rem',
                    fontWeight: 500,
                    cursor: isSubmitted ? 'default' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <span>{option}</span>
                  {isSubmitted && idx === currentQ.correctIndex && <CheckCircle2 size={18} />}
                  {isSubmitted && selectedOption === idx && idx !== currentQ.correctIndex && <XCircle size={18} />}
                </button>
              );
            })}
          </div>

          {/* Answer Explanation Feedback */}
          {isSubmitted && (
            <div
              style={{
                background: selectedOption === currentQ.correctIndex ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                border: `1px solid ${selectedOption === currentQ.correctIndex ? '#10b981' : '#ef4444'}`,
                padding: '1rem 1.25rem',
                borderRadius: 'var(--radius-md)',
                marginBottom: '1.5rem',
                fontSize: '0.9rem'
              }}
            >
              <strong>{selectedOption === currentQ.correctIndex ? 'Correct!' : 'Incorrect'}</strong> — {currentQ.explanation}
            </div>
          )}

          {/* Quiz Action Button */}
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            {!isSubmitted ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={selectedOption === null}
                className="btn btn-primary"
                style={{ opacity: selectedOption === null ? 0.5 : 1 }}
              >
                Submit Answer
              </button>
            ) : (
              <button onClick={handleNextQuestion} className="btn btn-primary">
                <span>{currentIdx + 1 === quizData.length ? 'See Final Score' : 'Next Question'}</span>
                <ArrowRight size={16} />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Quiz Final Score Summary Screen */
        <div className="glass-card" style={{ maxWidth: '600px', margin: '0 auto', padding: '3rem 2rem', textAlign: 'center' }}>
          <Award size={64} style={{ color: 'var(--accent-cyan)', margin: '0 auto 1rem auto' }} />
          <h2 style={{ fontSize: '2rem', fontWeight: 800, fontFamily: 'var(--font-heading)', marginBottom: '0.5rem' }}>
            Quiz Completed!
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
            You scored <strong>{score}</strong> out of <strong>{quizData.length}</strong> ({Math.round((score / quizData.length) * 100)}%).
          </p>

          <div style={{ background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', marginBottom: '2rem', border: '1px solid var(--glass-border)' }}>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>RANK AWARDED</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>
              {score >= 9 ? 'Galactic Commander 🚀' : score >= 7 ? 'Cosmic Voyager 🌌' : score >= 5 ? 'Stargazer Apprentice 🔭' : 'Space Cadet 🛰️'}
            </div>
          </div>

          <button onClick={handleRestartQuiz} className="btn btn-primary">
            <RotateCcw size={16} />
            <span>Retake Space Quiz</span>
          </button>
        </div>
      )}
    </div>
  );
}
