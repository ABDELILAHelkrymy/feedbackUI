import React from 'react'
import { useState, useContext, useEffect } from 'react'
import RatingSelect from './RatingSelect'
import Button from './shared/Button'
import Card from './shared/Card'
import FeedbackContext from '../context/FeedbackContext'

function FeedbackForm() {
    const [text, setText] = useState('')
    const [rating, setRating] = useState(10)
    const [btnDidabled, setBtnDidabled] = useState(true)
    const [message, setMessage] = useState('')
    const {addFeedback, feedbackEdit, updateFeedback} = useContext(FeedbackContext)


    useEffect(() => {
        if(feedbackEdit.edit === true){
            setBtnDidabled(false)
            setText(feedbackEdit.item.text)
            setRating(feedbackEdit.item.rating)
        }
    }, [feedbackEdit])

    
    const handleTextChange = (e) => {
        if(text === ''){
            setBtnDidabled(true)
            setMessage(null)
        } else if (text !== '' && text.trim().length <= 10) {
            setMessage('Text must be at least 10 characters')
        } else {
            setMessage(null)
            setBtnDidabled(false)
        }

        setText(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(text.trim().length > 10) {
            const newFeedback = {
                text: text,
                rating
            }

            if(feedbackEdit.edit === true){
                updateFeedback(feedbackEdit.item.id, newFeedback)
            }else {
                addFeedback(newFeedback);
            }
            

            setText('')
        }
    }

    return (
        <Card>
        <form onSubmit={handleSubmit}>
            <h2>How would you rate your service with us?</h2>
            <RatingSelect select = {(rating) => (setRating(rating))}/>
            <div className='input-group'>
                <input onChange={handleTextChange} type="text" placeholder='Write a review'
                value={text}
                />
                <Button type='submit' isDisabled={btnDidabled}>Send</Button>
            </div>
            {message && <div className='message'>{message}</div>}
        </form>
        </Card>
    )
}

export default FeedbackForm
