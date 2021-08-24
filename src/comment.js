import React from 'react';
import {useState} from 'react';
import {comments} from './comments';

export function Comment(props) {
  const {avatar, name, content, postedTime, seenBool} = props;
  const [isSeen, setIsSeen] = useState(seenBool);

  const timeSincePostedMins = Math.floor((Date.now() - postedTime) / 60000)
  return (
    <section className='comment-component'>
      <img src={avatar} alt="" className='avatar' />
      <div>
        <p className="name">{name}</p>
        <p>{content}</p>
        <div className="comment-foot">
          <p className="time-elapsed">{timeSincePostedMins} mins ago</p>
          <p className='separator'> | </p>
          {/* If you re-render the comment by clicking on/off the bell the 'mark as seen' state is not preserved.
          This is because there is no functionality to change the comments seenBool */}
          { isSeen === false ? <p className='seen' onClick={() => {setIsSeen(true)}}>Mark as Seen</p> : null}
        </div>
      </div>
    </section>
  )
};

