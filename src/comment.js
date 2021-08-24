import React from 'react';



export function Comment(props) {
  const {id, body, acknowledged, dates: {created: {date_time}}, user: {first_name, last_name, image: {square_url}}} = props;
  const [isSeen, setIsSeen] = React.useState(acknowledged);

  return (
    <section className='comment-component'>
      <img src={square_url} alt="" className='avatar' />
      <div>
        <p className="name">{first_name} {last_name}</p>
        <p className="content-body">{body}</p>
        <div className="comment-foot">
          <p className="time-elapsed">{formatTimeAgo(date_time)}</p>
          <p className='separator'> | </p>
          {/* If you re-render the comment by clicking on/off the bell the 'mark as seen' state is not preserved.
          This is because there is no functionality to change the comments seenBool */}
          { isSeen === false ? <p className='seen' onClick={() => {setIsSeen(true)}}>Mark as Seen</p> : null}
        </div>
      </div>
    </section>
  )
};

{/* Function takes in the date_time and gives off the time since posting relative to how long ago it was */}
function formatTimeAgo(props) {
  const splitDate = props.replace(/[\/\s:]/g, ' ');
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
