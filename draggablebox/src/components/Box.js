import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';

const Box = () => {
  const [position, setPosition] = useState({
    difL: 0,
    difT: 0,
    difR: 0,
    difB: 0,
    isDragging: false,
  });
  const [styles, setStyles] = useState({
    margin: 'auto',
  });

  const handleDragStart = (e) => {
    e.dataTransfer.setDragImage(new Image(), 0, 0);
    setPosition({
      difL: e.clientX - e.currentTarget.getBoundingClientRect().left,
      difT: e.clientY - e.currentTarget.getBoundingClientRect().top,
      difR: e.currentTarget.getBoundingClientRect().right - e.clientX,
      difB: e.currentTarget.getBoundingClientRect().bottom - e.clientY,
      isDragging: true,
    });
  };

  const handleDrag = (e) => {
    if (position.isDragging) {
      const left =
        e.clientX -
        position.difL -
        e.currentTarget.parentElement.getBoundingClientRect().left;
      const right =
        e.clientX +
        position.difR -
        e.currentTarget.parentElement.getBoundingClientRect().left;
      const top =
        e.clientY -
        position.difT -
        e.currentTarget.parentElement.getBoundingClientRect().top;
      const bottom =
        e.clientY +
        position.difB -
        e.currentTarget.parentElement.getBoundingClientRect().top;
      if (e.clientY >= e.screenY) {
        return;
      }
      // Left
      if (
        e.clientX - position.difL <=
        e.currentTarget.parentElement.getBoundingClientRect().left
      ) {
        if (
          top <= -4 ||
          bottom >=
            e.currentTarget.parentElement.getBoundingClientRect().height - 4
        ) {
          return;
        }

        setStyles({
          left: 0,
          top: top,
        });
      } else if (
        //top
        e.clientY - position.difT <=
        e.currentTarget.parentElement.getBoundingClientRect().top
      ) {
        if (
          left <= -2 ||
          right + 2 >=
            e.currentTarget.parentElement.getBoundingClientRect().width
        ) {
          return;
        }

        setStyles({
          left: left,
          top: 0,
        });
      } else if (
        //right
        e.clientX + position.difR >=
        e.currentTarget.parentElement.getBoundingClientRect().right
      ) {
        if (
          top <= -4 ||
          bottom + 2 >=
            e.currentTarget.parentElement.getBoundingClientRect().height
        ) {
          return;
        }

        setStyles({
          top: top,
          left:
            e.currentTarget.parentElement.getBoundingClientRect().width -
            e.currentTarget.getBoundingClientRect().width,
        });
      } else if (
        //bottom
        e.clientY + position.difB >=
        e.currentTarget.parentElement.getBoundingClientRect().bottom
      ) {
        if (
          left <= -2 ||
          right + 2 >=
            e.currentTarget.parentElement.getBoundingClientRect().width
        ) {
          return;
        }

        setStyles({
          top:
            e.currentTarget.parentElement.getBoundingClientRect().height -
            e.currentTarget.getBoundingClientRect().height,
          left: left,
        });
      } else {
        setStyles({
          ...styles,
          left: left,
          top: top,
        });
      }
    }
  };

  const handleDragEnd = (e) => {
    if (
      e.clientX - position.difL <=
      e.currentTarget.parentElement.getBoundingClientRect().left
    ) {
      if (
        e.clientY -
          position.difT -
          e.currentTarget.parentElement.getBoundingClientRect().top <=
          -4 ||
        e.clientY +
          position.difB -
          e.currentTarget.parentElement.getBoundingClientRect().top >=
          e.currentTarget.parentElement.getBoundingClientRect().height - 4
      ) {
        return;
      }

      setStyles({
        left: 0,
        top:
          e.clientY -
          position.difT -
          e.currentTarget.parentElement.getBoundingClientRect().top,
      });
    }
    if (
      e.clientY - position.difT <=
      e.currentTarget.parentElement.getBoundingClientRect().top
    ) {
      if (
        e.clientX -
          position.difL -
          e.currentTarget.parentElement.getBoundingClientRect().left <=
          -2 ||
        e.clientX +
          position.difR -
          e.currentTarget.parentElement.getBoundingClientRect().left +
          2 >=
          e.currentTarget.parentElement.getBoundingClientRect().width
      ) {
        return;
      }
      setStyles({
        left:
          e.clientX -
          position.difL -
          e.currentTarget.parentElement.getBoundingClientRect().left,
        top: 0,
      });
    }
    if (
      e.clientX + position.difR >=
      e.currentTarget.parentElement.getBoundingClientRect().right
    ) {
      if (
        e.clientY -
          position.difT -
          e.currentTarget.parentElement.getBoundingClientRect().top <=
          -4 ||
        e.clientY +
          position.difB -
          e.currentTarget.parentElement.getBoundingClientRect().top +
          2 >=
          e.currentTarget.parentElement.getBoundingClientRect().height
      ) {
        return;
      }
      setStyles({
        top:
          e.clientY -
          position.difT -
          e.currentTarget.parentElement.getBoundingClientRect().top,
        left:
          e.currentTarget.parentElement.getBoundingClientRect().width -
          e.currentTarget.getBoundingClientRect().width,
      });
    }
    if (
      e.clientY + position.difB >=
      e.currentTarget.parentElement.getBoundingClientRect().bottom
    ) {
      if (
        e.clientX -
          position.difL -
          e.currentTarget.parentElement.getBoundingClientRect().left <=
          -2 ||
        e.clientX +
          position.difR -
          e.currentTarget.parentElement.getBoundingClientRect().left +
          2 >=
          e.currentTarget.parentElement.getBoundingClientRect().width
      ) {
        return;
      }
      setStyles({
        top:
          e.currentTarget.parentElement.getBoundingClientRect().height -
          e.currentTarget.getBoundingClientRect().height,
        left:
          e.clientX -
          position.difL -
          e.currentTarget.parentElement.getBoundingClientRect().left,
      });
    }
    setPosition({
      ...position,
      isDragging: false,
    });
  };

  return (
    <Container
      style={styles}
      draggable="true"
      onDragStart={handleDragStart}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
    >
      <Card>
        <p>I'm draggable!Drag me around!</p>
      </Card>
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 1128px;
  margin-top: 1rem auto;
`;
const Card = styled.div`
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 300px;
  height: 300px;
  border: 2px solid #87e1ed;
  border-radius: 1rem;
  & > p {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 2rem;
    font-weight: 600;
  }
`;

export default Box;
