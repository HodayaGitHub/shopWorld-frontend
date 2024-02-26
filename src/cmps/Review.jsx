import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { showSuccessMsgRedux, showErrorMsgRedux } from '../store/actions/app.actions.js'
import { loadReviews, addReview, removeReview, getActionAddReview } from '../store/actions/review.actions.js'
import { loadUsers } from '../store/actions/user.actions'

import { REMOVE_REVIEW } from '../store/reducers/review.reducer.js'

import { socketService, SOCKET_EVENT_REVIEW_ADDED, SOCKET_EVENT_REVIEW_REMOVED } from '../services/socket.service.js'


export function Review() {

    const users = useSelector(storeState => storeState.userModule.users)
    const loggedInUser = useSelector(storeState => storeState.userModule.user)
    const reviews = useSelector(storeState => storeState.reviewModule.reviews)

    const [reviewToEdit, setReviewToEdit] = useState({ txt: '', aboutUserId: '' })

    const dispatch = useDispatch()

    useEffect(() => {
        loadReviews()
        loadUsers()

        // Todo - Add socket listener
        socketService.on(SOCKET_EVENT_REVIEW_ADDED, (review) => {
            dispatch(getActionAddReview(review))
        })

        socketService.on(SOCKET_EVENT_REVIEW_REMOVED, (reviewId) => {
            dispatch({ type: REMOVE_REVIEW, reviewId })
        })

        return () => {
            socketService.off(SOCKET_EVENT_REVIEW_ADDED)
            socketService.off(SOCKET_EVENT_REVIEW_REMOVED)
        }
    }, [])

    const handleChange = ev => {
        const { name, value } = ev.target
        setReviewToEdit({ ...reviewToEdit, [name]: value })
    }

    const onAddReview = async ev => {
        ev.preventDefault()
        if (!reviewToEdit.txt || !reviewToEdit.aboutUserId) return alert('All fields are required')
        try {

            await addReview(reviewToEdit)
            showSuccessMsgRedux('Review added')
            setReviewToEdit({ txt: '', aboutUserId: '' })
        } catch (err) {
            showErrorMsgRedux('Cannot add review')
        }
    }

    const onRemove = async reviewId => {
        try {
            await removeReview(reviewId)
            showSuccessMsgRedux('Review removed')
        } catch (err) {
            showErrorMsgRedux('Cannot remove')
        }
    }

    function canRemove(review) {
        if (!loggedInUser) return false
        return review.byUser._id === loggedInUser._id || loggedInUser.isAdmin
    }


    return (
        <div className="review-index">
            <h1> Toy Reviews</h1>
            {reviews && <ul className="review-list">
                {reviews.map(review => (
                    <li key={review._id}>
                        {canRemove(review) &&
                            <button onClick={() => onRemove(review._id)}>X</button>}
                        <p>
                            About:
                            <Link to={`/user/${review.aboutUser._id}`}>
                                {review.aboutUser.fullname}
                            </Link>
                        </p>
                        <h3>{review.txt}</h3>
                        <p>
                            By:
                            <Link to={`/user/${review.byUser._id}`}>
                                {review.byUser.fullname}
                            </Link>
                        </p>
                    </li>
                ))}
            </ul>}
            {users && loggedInUser &&
                <form onSubmit={onAddReview}>
                    <select
                        onChange={handleChange}
                        value={reviewToEdit.aboutUserId}
                        name="aboutUserId"
                    >
                        <option value="">Select User</option>
                        {users.map(user => (
                            <option key={user._id} value={user._id}>
                                {user.fullname}
                            </option>
                        ))}
                    </select>
                    
                    <textarea
                        name="txt"
                        onChange={handleChange}
                        value={reviewToEdit.txt}>
                    </textarea>

                    <button>Add</button>
                </form>}
            <hr />
        </div>
    )
}