import React from 'react';
import ReactDom from 'react-dom';
import './index.css';

const comments = [
{
  id: 1,
  avatar: "https:\//egghead.io/_next/image?url=https%3A%2F%2Fd2eip9sf3oo6c2.cloudfront.net%2Finstructors%2Favatars%2F000%2F000%2F210%2Fsquare_64%2Fchris_new.png&w=48&q=75",
  name: 'Kieryn Moore',
  content: "Hi mate, I'm running to the shop for lunch, you need anything?",
  postedTime: new Date( Date.now() - 1000 * (60 * 5) ),
  seenBool: true
},
{
  id: 2,
  avatar: "https:\//egghead.io/_next/image?url=https%3A%2F%2Fd2eip9sf3oo6c2.cloudfront.net%2Finstructors%2Favatars%2F000%2F000%2F210%2Fsquare_64%2Fchris_new.png&w=48&q=75",
  name: 'Ken Greef',
  content: "Thanks anyway, I have a meeting in 5.",
  postedTime: new Date( Date.now() - 1000 * (60 * 2) ),
  seenBool: false
},
{
  id: 3,
  avatar: "https:\//egghead.io/_next/image?url=https%3A%2F%2Fd2eip9sf3oo6c2.cloudfront.net%2Finstructors%2Favatars%2F000%2F000%2F210%2Fsquare_64%2Fchris_new.png&w=48&q=75",
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
  return (
    <section className="artwork-comments-component">
      <div className='header'>
        <p className='head-border'>📧 Share Proof</p>
        <div className="zoom-bar head-border">
          <p className='right-border'>-</p>
          <p>150%</p>
          <p className='left-border'>+</p>
        </div>
        <p className='head-border'>🔔</p>
      </div>
      <div className="comments-feed">
        <section className="comment-section-outer">
          {comments.map( (comment) => {
            return <Comment key={comment.id} {...comment} />
          })}
        </section>
      </div>
    </section>
  );
};

function Comment(props) {
  const {avatar, name, content, postedTime, seenBool} = props;
  const timeSincePostedMins = Math.floor((Date.now() - postedTime) / 60000)
  console.log(timeSincePostedMins)
  return (
    <section className='comment-component'>
      <img src={avatar} alt="" className='avatar' />
      <div>
        <p>{name}</p>
        <p>{content}</p>
        <div className="comment-foot">
          <p>{timeSincePostedMins}mins ago</p>
          <p className='separator'> | </p>
          <p>Mark as Seen</p>
        </div>
      </div>
    </section>

  )
};

ReactDom.render(<ArtworkComments />, document.getElementById('root'));
