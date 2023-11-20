import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { Button } from '@mui/material'
import { useState } from 'react'
import { styled } from '@mui/system';
import { useMemo } from 'react';
import classes from './CommentTextArea.module.css'

const blue = {
  100: '#DAECFF',
  200: '#b6daff',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  900: '#003A75',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};
const CommentTextarea: React.FC<{ submitComment: (e: React.MouseEvent<HTMLButtonElement>, comment: string) => void }> = (props) => {

  const [comment, setComment] = useState('');

  const Textarea = useMemo(() => styled(BaseTextareaAutosize)(
    ({ theme }) => `
    width: 320px;
    min-width: 200px;
    max-width: 400px;
    max-height: 200px;
    min-height: 20px;
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 12px;
    border-radius: 12px 12px 0 12px;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};

    &:hover {
      border-color: ${blue[400]};
    }

    &:focus {
      outline: 0;
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
    }

    // firefox
    &:focus-visible {
      outline: 0;
    }
  `,
  ), [])

  return (
    <>
      <div className={classes.textAreaBox}>
        <Textarea value={comment} maxLength={210} onChange={(e) => setComment(e.target.value)} aria-label="empty textarea" placeholder="Type your comment..." />
        <p>{comment.length}/210</p>
      </div>
      <Button
        variant='contained'
        size='small'
        sx={{
          color: 'white', borderColor: 'blue', '&:hover': { borderColor: 'gray' }
        }}
        onClick={(e) => props.submitComment(e, comment)}>
        Submit comment
      </Button>

    </>
  )
}

export default CommentTextarea;