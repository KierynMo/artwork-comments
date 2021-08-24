import React from 'react';
import {Comment} from './comment';
import {comments} from './comment_data';

export function CommentList() {
  comments.sort( compare );
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

