import React from 'react';
import Box from './Box';
import styled from 'styled-components';

const DraggableBox = () => {
  const handleDragOver = (e) => {
    e.preventDefault();
  };
  return (
    <Container>
      <h1>I'm Draggable! Do not go outside of me!</h1>
      <Draggable onDragOver={handleDragOver}>
        <Box />
      </Draggable>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  & > h1 {
    font-weight: 500;
    line-height: 1.2;
    margin-top: 2px;
  }
`;

const Draggable = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1000px;
  height: 800px;
  border: 2px solid #ffc7c7;
  border-radius: 1rem;
`;

export default DraggableBox;
