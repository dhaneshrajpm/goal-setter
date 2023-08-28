import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import GoalForm from '../components/GoalForm'
import { getGoals, reset } from '../features/goals/goalSlice';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import GoalItem from '../components/GoalItem';

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { goals, isError, isLoading, message } = useSelector(state => state.goals);

  useEffect(() => {
    if(!user) {
      navigate('/login')
    }

    if(isError) {
      toast.error(message);
    }

    if (user) {
      dispatch(getGoals());
    }

    return () => {
      dispatch(reset());
    }
  }, [user, isError, message, navigate, dispatch]);

  if (isLoading) {
    return (
      <Spinner />
    )
  }

  return (
    <>
      <section className="heading">
        <h1>Welcome {user && user.name}</h1>
        <p>Goal Dashboard</p>
      </section>

      <GoalForm />
      {goals.length > 0
        ? <div className="goals">
            {goals.map(goal => (
              <GoalItem key={goal._id} goal={goal} />
            ))}
          </div>
        : <p>There is no goals available</p>
      }
    </>
  )
}

export default Dashboard