import React from 'react';
import {useState} from 'react';
import {comments} from './comment_data';
import {CommentList} from './comment-list';

function ArtworkComments() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [commentsData, setCommentsData] = useState(comments);

  {/* Checks if there are unacknowledged comments, if so the button is blue*/}
  let unseenComments = commentsData.some(obj => obj.acknowledged === false);

  return (
    <section className="artwork-comments-component">
      <div className='header'>
        <p className='head-border share-proof'>Share Proof</p>
        <div className="zoom-bar head-border grid">
          <p className='c1'><strong>-</strong></p>
          <p className='c2'>150%</p>
          <p className='c3'><strong>+</strong></p>
        </div>
        <p className={unseenComments === false ? 'head-border bell-btn' : 'head-border bell-btn bell-btn-blue'} onClick={() => {setShowDropdown(!showDropdown)}}>🔔</p>
      </div>
      { showDropdown === true ? <CommentList commentsData={commentsData} setCommentsData={setCommentsData} /> : null }
    </section>
  );
};

export default ArtworkComments;
