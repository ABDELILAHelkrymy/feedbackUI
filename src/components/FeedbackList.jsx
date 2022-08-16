import React from 'react'
import {motion, AnimatePresence} from 'framer-motion'
import PropTypes from 'prop-types';
import FeedbackItem from './FeedbackItem';

function FeedbackList({feedback, handleDelete}) {
    if (!feedback || feedback.length === 0) {
        return <p>No Feedbak Yet</p>
    }


    return (
        <div className='feedback-list'>
            <AnimatePresence>
                {feedback.map((item) => (
                    <motion.div
                        key={item.id}
                        initial={{opacity:0}}
                        animate={{opacity:1}}
                        exit={{opacity:0}}
                    >
                        <FeedbackItem key={item.id} item={item} handleDelete = {handleDelete} />
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    )

    // return (
    //     <div>
    //         <ul>
    //         {feedback.map((item) => (
    //             <FeedbackItem key={item.id} item={item} handleDelete = {handleDelete} />
    //         ))}
    //         </ul>
    //     </div>
    // )
}

FeedbackList.propTypes = {
    feedback: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            rating: PropTypes.number.isRequired,
            text: PropTypes.string.isRequired,
        })
    )
}

export default FeedbackList
