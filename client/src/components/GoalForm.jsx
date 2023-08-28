import { useState } from 'react'
import { useDispatch } from 'react-redux';

import { createGoal } from '../features/goals/goalSlice'

function GoalForm() {
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const onChange = e => {
    setText(e.target.value);
  }
  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(createGoal({text}));
    setText('');
  }

  return (
    <section className="form">
        <form>
          <div className="form-group">
            <input autoFocus className="form-control" type="text" value={text} placeholder='Type your goal' onChange={onChange}/>
          </div>
          <div className="form-group">
            <button type="submit" className='btn btn-block' onClick={onSubmit}>Add Goal</button>
          </div>
        </form>
      </section>
  )
}

export default GoalForm