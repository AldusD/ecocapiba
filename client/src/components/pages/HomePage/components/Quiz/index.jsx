import { useEffect, useState } from "react";
import enums from "../../../../../enums/index";
import { Options, QuizStyles, Option, Filter, QuizReport } from "./styles";
import quizMock from "./mock";
import Timer from "./Timer";
import controller, { ANSWER_BENCHMARK, CAPIBAS_PER_QUIZ, TIME_TO_ANSWER, XP_PER_QUIZ } from "./controller";
import Icons from "../../../../shared/Icons";

export default function Quiz({ closeQuiz, onQuizComplete }) {
  const [selected, setSelected] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [timeEnded, setTimeEnded] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [imageStr, setImageStr] = useState();
  const [quizData, setQuizData] = useState(null);

  const {
    choiceImage,
    handleAnswer,
    randomizeQuiz,
    handleOptionClass,
    handleTimeEnded,
    sendQuizAttempt
  } = controller({
    selected, setSelected, 
    feedback, setFeedback,
    currentIndex, setCurrentIndex,
    correctCount, setCorrectCount,
    imageStr, setImageStr,
    timeEnded, setTimeEnded,
    quizData, setQuizData,
    isLastQuestion: () => {currentIndex === quizData.questions.length - 1},
    onQuizComplete
  });

  useEffect(() => {
      setQuizData(randomizeQuiz(quizMock));
      choiceImage();
    }, [])

  useEffect(() => {
    handleTimeEnded();
  }, [timeEnded])
  
  useEffect(() => {
    if (quizData && !quizData.questions[currentIndex]) {
      sendQuizAttempt();
    }
  }, [currentIndex])

  function render() {
    if (!quizData) return <></>
    if (!quizData.questions[currentIndex]) {
    return (
      <QuizStyles>
        <div className="title">
          <h2>{quizData.type}</h2>
          <Icons.QUIT className="quit" onClick={closeQuiz} />
        </div>
        <img src={imageStr} alt="type_img" />
        <QuizReport>
          { correctCount >= ANSWER_BENCHMARK ?
            <>
              <h2 style={{ color: enums.COLORS.PRIMARY_TEXT }}>Quiz Concluido!</h2>
              <p>Aguarde até amanhã para realizar outro!</p>
              <strong>Voce recebeu {CAPIBAS_PER_QUIZ} moedas Capibas e {XP_PER_QUIZ} XP!</strong>
            </> :
            <>
              <h2 style={{ color: enums.COLORS.PRIMARY_TEXT }}>Não foi dessa vez :(</h2>
              <p>Volte amanhã para uma nova tentativa</p>
            </>
          }
          <Icons.FLAG className={correctCount >= ANSWER_BENCHMARK ? 'green' : 'red' } />
          <p style={{ color: enums.COLORS.PRIMARY_TEXT }}>
            Você acertou {correctCount} de {quizData?.questions.length} perguntas.
          </p>
        </QuizReport>
      </QuizStyles>
    );
    }

    return (
      <QuizStyles>
        <div className="title">
          <h2>{quizData.type}</h2>
          <Timer key={currentIndex} triggerTimeEnded={() => setTimeEnded(true)} startTime={TIME_TO_ANSWER} />
        </div>
        <img src={imageStr} alt="type_img" />
        <Options>
          <p>{quizData.questions[currentIndex].title}</p>
          {quizData.questions[currentIndex].options.map((option, i) => {
            const classStr = handleOptionClass(option);
            return(
            <Option
              key={i}
              onClick={() => handleAnswer(option)}
              disabled={selected !== null}
              className={classStr}
            >
              {option.text}
            </Option>)
          })}
        </Options>

        {feedback && (
          <div className="feedback">
            <strong>{feedback}</strong>
          </div>
        )}

        <div className="progress">
          Pergunta {currentIndex + 1} / {quizData.questions.length}
        </div>
      </QuizStyles>
  );
  }

  return (
    <Filter>
      {
        render()
      }
    </Filter>
    
  )
}