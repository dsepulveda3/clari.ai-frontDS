import { Send, ThumbDown, ThumbUp, Cached } from '@mui/icons-material'
import { Box, Button, IconButton, Typography, Divider } from '@mui/material'
import { useRouter } from 'next/router'
import { useContext, useEffect, useRef, useState } from 'react'
import { create_question, dislike_question, like_question, feedback_question } from '../../API/questions'
import Header from '../../components/Header'
import Loader from '../../components/Loader'
import OpinionForm from '../../components/OpinionForm'
import TextInput from '../../components/TextInput'
import useTranslate from '../../hooks/TranslationHook'
import theme from '../../styles/theme'
import { AppContext } from '../_app'

const css = {
  container: {
    maxWidth: 800,
    margin: 'auto',
    padding: '36px 24px'
  },
  textarea: {
    width: '100%',
    resize: 'none',
    minHeight: 200,
    height: 'fit-content',
    border: 'none',
    padding: 12,
    boxSizing: 'border-box',
    fontFamily: "'Quicksand', sans-serif",
    fontWeight: 600,
    fontSize: 14,
    color: "#1a1a1a",
    lineHeight: 1.5,
    background: 'whitesmoke',
    borderRadius: 12
  },
  buttons: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    marginTop: 1
  },
  like_mark: {
    background: theme.palette.success.main,
    color: 'white'
  },
  dislike_mark: {
    background: theme.palette.error.main,
    color: 'white'
  },
  waiting_time: {
    textAlign: 'left',
    fontWeight: 'bold'
  },
  disclaimer: {
    textAlign: 'right'
  },
  title: {
    fontWeight: 'bold'
  },
  question: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 3
  }
}

function Questions({ value }) {

  const { lang } = useContext(AppContext);
  const [D, T] = useTranslate(lang, "main");
  const [question, setQuestion] = useState({});
  const router = useRouter();
  const [content, setContent] = useState(router.query.content);
  const answerRect = useRef(null);
  const [loading, setLoading] = useState(false);
  const [asked, setAsked] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [retry, setRetry] = useState(true);

  const [showPopup, setShowPopup] = useState(false);
  const [thanksFeedback, setThanksFeedback] = useState(false);
  const [contentFeedback, setFeedbackContent] = useState("");
  const elementRef = useRef(null);

  useEffect(() => {
    if (showPopup) {
      // Trigger pop-up code here
      console.log("Pop-up triggered!");
      // elementRef.current.scrollIntoView({ behaviour: 'smooth' });


    }
  }, [showPopup]);


  useEffect(() => {
    if (!!question.answer) {
      answerRect.current.innerHTML = question.answer
    }
  }, [question])

  useEffect(() => {
    if (!!router.query.content && !asked) {
      createQuestion(null, router.query.content)
      setAsked(true)
    }
  }, [asked, router.query])

  useEffect(() => {
    if (attempt == 3 || attempt == 0) {
      setRetry(true)
    } else {
      setRetry(false)
    }
  }, [attempt])

  async function createQuestion(e, forced_content = "") {
    if (attempt == 3) {
      setAttempt(0)
    }
    const body = { content: forced_content ? forced_content : content, lang, attempt }
    setThanksFeedback(false)
    setShowPopup(false)
    setLoading(true)
    const response = await create_question(body)
    setLoading(false)
    setQuestion(response.data.info)
    setAttempt(attempt + 1)
  }

  async function createFeedbackQuestion(e, forced_content = "") {
    console.log("In feedback question function")
    // const body = { contentFeedback: forced_content ? forced_content : contentFeedback, lang }
    const response = await feedback_question({ id: question.id, feedback: contentFeedback });
    setFeedbackContent("");
    //poner en falso para hacer desaparecer sección feedback
  }

  function onValuate(option) {

    return async () => {
      if (option) {
        const response = await like_question({ id: question.id })
        setQuestion(response.data.info)
        setShowPopup(true);
        // elementRef.current.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => elementRef.current.scrollIntoView({ behavior: 'smooth' }), 300);
        setThanksFeedback(false);
      } else {
        const response = await dislike_question({ id: question.id })
        setQuestion(response.data.info)
        setShowPopup(true);
        // elementRef.current.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => elementRef.current.scrollIntoView({ behavior: 'smooth' }), 300);
        setThanksFeedback(false)
      }
    }
  }

  // const handleButtonClickTrue = () => {
  //   setShowPopup(true);
  //   onValuate(true);
  //   setThanksFeedback(false);
  // };

  // const handleButtonClickFalse = function () {
  //   onValuate(false);
  //   setShowPopup(true);
  //   setThanksFeedback(false);
  // };



  const { valuation } = question
  const isLike = valuation !== null && valuation?.is_positive
  const isDislike = valuation !== null && !valuation?.is_positive

  return (
    <Box>
      <Header />
      <Box sx={css.container}>
        <Typography variant='h1' style={css.title}>{T(D.title)}</Typography>
        <Typography variant='h4'>{T(D.input_text)}</Typography>
        <TextInput onChange={e => setContent(e.target.value)} value={content} />
        <Box sx={{ textAlign: 'end', margin: '12px 0' }}>
          <Typography style={css.waiting_time} variant='h5'>{T(D.waiting_time_answer)}</Typography>
          <Button disabled={loading || !retry} color="secondary" variant="contained" onClick={createQuestion} endIcon={<Send />}>
            {T(D.ask)}
          </Button>
        </Box>
        {loading && <Loader />}
        {!!question.answer && !loading &&
          <Box>
            <Divider orientation="horizontal" flexItem />
            <Typography variant='subtitle2'>{T(D.answer_title) + attempt + ")"}</Typography>
            <textarea readOnly style={css.textarea} ref={answerRect} />
            <Typography style={css.disclaimer} variant='h5'>{T(D.disclaimer)}</Typography>
            <Button disabled={retry} color="info" variant="contained" onClick={createQuestion} endIcon={<Cached />}>
              {T(D.change_prompt)}
            </Button>
            <Typography style={css.question} variant='h4'>{T(D.usefull)}</Typography>
            <Box sx={css.buttons}>
              <IconButton sx={isDislike ? css.dislike_mark : {}} color="error" onClick={onValuate(false)}>
                <ThumbDown />
              </IconButton>
              <IconButton sx={isLike ? css.like_mark : {}} color="success" onClick={onValuate(true)}>
                <ThumbUp />
              </IconButton>
            </Box>
          </Box>
        }
        {showPopup && <OpinionForm elementRef={elementRef} setShowPopup={setShowPopup} setThanksFeedback={setThanksFeedback} contentFeedback={contentFeedback}
          setFeedbackContent={setFeedbackContent} createFeedbackQuestion={createFeedbackQuestion} T={T} D={D} />}
        {thanksFeedback && <Typography variant='h4'>{T(D.feedback_received)}</Typography>}
        {/* {thanksFeedback && <Typography variant='h4'>{contentFeedback}</Typography>} */}
      </Box>
    </Box>
  )
}

export default Questions