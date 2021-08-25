import React from 'react';
import {Comment} from './comment';
import {comments} from './comment_data';

export function CommentList(props) {
  const {commentsData, setCommentsData} = props;
  commentsData.sort( compare );
  return (
    <div className="comments-feed">
      <section className="comment-section-outer">
        {commentsData.map( (comment) => {
          return <Comment key={comment.id} commentPosition={comment.id} commentsData={commentsData} setCommentsData={setCommentsData} {...comment} />
        })}
      </section>
    </div>
  )
};

{/*sorts the comments by how long ago they were posted*/}
function compare( a, b ) {
  if ( a.dates.created.date_time > b.dates.created.date_time ){
    return -1;
  }
  if ( a.dates.created.date_time < b.dates.created.date_time ){
    return 1;
  }
  return 0;
};

