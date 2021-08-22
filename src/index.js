import React from 'react';
import ReactDom from 'react-dom';
import './index.css';
import {useState} from 'react';

const comments = [
{
  id: 1,
  avatar: "https:\//www.terrainhopperusa.com/wp-content/uploads/2019/01/avatar-woman.png",
  name: 'Kieryn Moore',
  content: "Hi mate, I'm running to the shop for lunch, you need anything?",
  postedTime: new Date( Date.now() - 1000 * (60 * 5) ),
  seenBool: true
},
{
  id: 2,
  avatar: "https:\//image.shutterstock.com/image-vector/young-man-avatar-character-260nw-661669825.jpg",
  name: 'Ken Greef',
  content: "Thanks anyway, I have a meeting in 5.",
  postedTime: new Date( Date.now() - 1000 * (60 * 2) ),
  seenBool: false
},
{
  id: 3,
  avatar: "https:\//www.terrainhopperusa.com/wp-content/uploads/2019/01/avatar-man.png",
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

  // Checks how many unseen comments there are
  let unseenComments = 0;
  comments.map((comment) => {if(comment.seenBool === false) {unseenComments ++}});
  // Next logical step would be to remove the bell-btn-blue class from the dropdown button if all comments are read.

  return (
    <section className="artwork-comments-component">
      <div className='header'>
        <p className='head-border share-proof'>Share Proof</p>
        <div className="zoom-bar head-border">
          <p className="zoom"><strong>-   |  </strong>150%<strong>  |   +</strong ></p>

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

ReactDom.render(<ArtworkComments {...comments} />, document.getElementById('root'));
