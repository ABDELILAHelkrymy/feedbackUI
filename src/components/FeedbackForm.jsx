import React from 'react'
import { useState } from 'react'
import RatingSelect from './RatingSelect'
import Button from './shared/Button'
import Card from './shared/Card'

function FeedbackForm({handleAdd}) {
    const [text, setText] = useState('')
    const [rating, setRating] = useState(10)
    const [btnDidabled, setBtnDidabled] = useState(true)
    const [message, setMessage] = useState('')

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

            handleAdd(newFeedback);

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