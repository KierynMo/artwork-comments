import React from 'react';
import {useState} from 'react';
import {comments} from './comment_data';
import {CommentList} from './comment-list';

function ArtworkComments() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [commentsData, setCommentsData] = useState(comments);


  const changeAcknowledged = (comment_id) => {
    let clonedData = [...commentsData];
    let objIndex = clonedData.findIndex((obj => obj.id == comment_id));
    clonedData[objIndex].acknowledged = true;
    {/* Couldn't change the acknowledged value inside a single object without recreating the whole dataset and replacing it.
    I'm sure there is a more elegent solution */}
    setCommentsData(clonedData);
  };


  {/*Checks how many unseen comments there are*/}
  let unseenComments = 1;
  {/*comments.map((comment) => {if(comment.seenBool === false) {unseenComments ++}});
  Next logical step would be to remove the bell-btn-blue class from the dropdown button if all comments are read.
  I need to learn more about 'lifting state up'.*/}

  return (
    <section className="artwork-comments-component">
      <div className='header'>
        <p className='head-border share-proof'>Share Proof</p>
        <div className="zoom-bar head-border">
          <p className="zoom"><strong>-   |  </strong>150%<strong>  |   +</strong ></p>

        </div>
        <p className={unseenComments === 0 ? 'head-border bell-btn' : 'head-border bell-btn bell-btn-blue'} onClick={() => {setShowDropdown(!showDropdown)}}>🔔</p>
      </div>
      { showDropdown === true ? <CommentList /> : null }
    </section>
  );
};

export default ArtworkComments;
