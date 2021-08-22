import React from 'react';
import ReactDom from 'react-dom';
import './index.css';
import {useState} from 'react';

const comments = [
{
  id: 1,
  avatar: "https:\//img-premium.flaticon.com/png/512/4134/premium/4134163.png?token=exp=1629642894~hmac=fa7201ab9e830063dab5d24ab93b121a",
  name: 'Kieryn Moore',
  content: "Hi mate, I'm running to the shop for lunch, you need anything?",
  postedTime: new Date( Date.now() - 1000 * (60 * 5) ),
  seenBool: true
},
{
  id: 2,
  avatar: "https:\//img-premium.flaticon.com/png/512/3006/premium/3006898.png?token=exp=1629642931~hmac=4c0aff7ee754644b14943b46b9c4116a",
  name: 'Ken Greef',
  content: "Thanks anyway, I have a meeting in 5.",
  postedTime: new Date( Date.now() - 1000 * (60 * 2) ),
  seenBool: false
},
{
  id: 3,
  avatar: "https:\//img-premium.flaticon.com/png/512/4134/premium/4134114.png?token=exp=1629642785~hmac=0f6a14a27f4599617992bd4c66989873",
  name: 'Mat Roberts',
  content: "I'm okay thanks Kieryn, I have a tuna wrap!",
  postedTime: new Date( Date.now() - 1000 * (60 * 3) ),
  seenBool: false
}
];


//sorts the comments by how long ago they were posted
function compare( a, b ) {
  if ( a.postedTime > b.postedTime ){
    return -1;
  }
  if ( a.postedTime < b.postedTime ){
    return 1;
  }
  return 0;
}
comments.sort( compare );



function ArtworkComments() {
  const [showDropdown, setShowDropdown] = useState(false);

  // Checks how many unseen comments there is
  let unseenComments = 0;
  comments.map((comment) => {if(comment.seenBool === false) {unseenComments ++}});


  return (
    <section className="artwork-comments-component">
      <div className='header'>
        <p className='head-border'>📧 Share Proof</p>
        <div className="zoom-bar head-border">
          <p className='right-border'>-</p>
          <p>150%</p>
          <p className='left-border'>+</p>
        </div>
        <p className={unseenComments > 0 ? 'head-border bell-btn bell-btn-blue' : 'head-border bell-btn'} onClick={() => {setShowDropdown(!showDropdown)}}>🔔</p>
      </div>
      { showDropdown === true ? <CommentList /> : null }
    </section>
  );
};

function CommentList() {
  return (
    <div className="comments-feed">
      <section className="comment-section-outer">
        {comments.map( (comment) => {
          return <Comment key={comment.id} {...comment} />
        })}
      </section>
    </div>
  )
};
//add this to css
//make fixed height thats less than less than 3 comments
//define overflow-y auto

function Comment(props) {
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
          <p className="time-elapsed">{timeSincePostedMins}mins ago</p>
          <p className='separator'> | </p>
          {/* If you re-render the comment by clicking on/off the bell the 'mark as seen' state is not preserved.
          This is because there is no functionality to change the comments seenBool */}
          { isSeen === false ? <p className='seen' onClick={() => {setIsSeen(true)}}>Mark as Seen</p> : null}
          {/* {comments.forEach((comment, index) => {if(comment.name === name) {comments[index].seenBool = true}})}} */}
        </div>
      </div>
    </section>

  )
};

ReactDom.render(<ArtworkComments {...comments} />, document.getElementById('root'));
