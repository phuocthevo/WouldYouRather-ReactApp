
import { _saveQuestion, _saveQuestionAnswer } from '../utils/_DATA';
import { showLoading, hideLoading } from 'react-redux-loading';

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const ADD_QUESTION = 'ADD_QUESTION';
export const ADD_QUESTION_ANSWER = 'ADD_QUESTION_ANSWER';

export function receiveQuestions(questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions
    }
}

export function addQuestion(question) {
    return {
        type: ADD_QUESTION,
        question
    }
}

export function handleSaveQuestion(optionOneText, optionTwoText,authedUser) {
    return (dispatch) => {
        dispatch(showLoading());
        return _saveQuestion({
            optionOneText,
            optionTwoText,
            author: authedUser
        })
        .then((question) => dispatch(addQuestion(question)))
        .then(() => dispatch(hideLoading()))
    }
}

export function addQuestionAnswer(answerObj) {
    return {
        type: ADD_QUESTION_ANSWER,
        ...answerObj
    }
}

export function handleAddQuestionAnswer(answerObj) {
    return (dispatch) => {
        dispatch(showLoading());
        return _saveQuestionAnswer(answerObj)
        .then(() => dispatch(addQuestionAnswer(answerObj)))
        .then(() => dispatch(hideLoading()))
    }
}
