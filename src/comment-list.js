import React from 'react';
import {useState} from 'react';
import {Comment} from './comment';
import {comments} from './comments';

function CommentList() {
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

//sorts the comments by how long ago they were posted
function compare( a, b ) {
  if ( a.postedTime > b.postedTime ){
    return -1;
  }
  if ( a.postedTime < b.postedTime ){
    return 1;
  }
  return 0;
};

export {CommentList, compare}
