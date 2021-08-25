import React from 'react';

export function Comment(props) {
  const {commentPosition, commentsData, setCommentsData} = props;
  let comment = commentsData.find(obj => obj.id === commentPosition);
  const {id, body, acknowledged, dates: {created: {date_time}}, user: {first_name, last_name, image: {square_url}}} = comment;

  // {/* Function changes comment state from false to true */}
  const changeAcknowledged = (comment_id) => {
    let clonedData = [...commentsData];
    let objIndex = clonedData.findIndex((obj => obj.id == comment_id));
    clonedData[objIndex].acknowledged = true;
    {/* Couldn't change the acknowledged value inside a single comment object without recreating the whole dataset and replacing it.
    I'm sure there is a more elegent solution */}
    setCommentsData(clonedData);
  };

  return (
    <section className='comment-component'>
      <img src={square_url} alt="" className='avatar' />
      <div>
        <p className="name">{first_name} {last_name}</p>
        <p className="content-body">{body}</p>
        <div className="comment-foot">
          <p className="time-elapsed">{formatTimeAgo(date_time)}</p>
          <p className='separator'> | </p>
          { acknowledged === false ? <p className='seen' onClick={() => {changeAcknowledged(commentPosition)}}>Mark as Seen</p> : null}
        </div>
      </div>
    </section>
  )
};

{/* Function takes in the date_time and gives off the time since posting relative to how long ago it was */}
function formatTimeAgo(date_time) {
  const splitDate = date_time.replace(/[\/\s:]/g, ' ');
  const split = splitDate.split(' ');
  const formattedDate = `${split[2]}-${split[1]}-${split[0]}T${split[3]}:${split[4]}:00`;
  const dateTimeObj = new Date(formattedDate);

  let timeAgo = '';
  if (dateTimeObj <= 60000) {
    timeAgo = `${Math.floor((Date.now() - dateTimeObj) / 60000)} mins ago`;
  } else if (dateTimeObj <= 3600000) {
    timeAgo = `${Math.floor((Date.now() - dateTimeObj) / 3600000)} hours ago`;
  } else if (dateTimeObj <= 86400000) {
    timeAgo = `${Math.floor((Date.now() - dateTimeObj) / 86400000)} days ago`;
  } else if (dateTimeObj >= 2629800000) {
    timeAgo = `${Math.floor((Date.now() - dateTimeObj) / 2629800000)} months ago`;
  } else {
    throw 'Error processing time';
  };
  return timeAgo;
};
