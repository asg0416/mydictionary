import React from "react";
import styled from "styled-components";
import AddCircleIcon from '@material-ui/icons/AddCircle';

const WordList = (props) => {
  const word_list = props.list;
  console.log(props);

  const check = (id, ind) => {
    if (id){
      props.history.push("/detail/" + ind)
    } else {
      alert('단어를 추가해주세요')
    }
  };

  return (
    <div>
      <Title>My Dict</Title>
      <ListStyle>
        {word_list.map((list, ind) => {
          return (
            <ItemStyle
              key={ind}
              onClick={() => {check(list.id, ind);}}
            >
              <ItemTitle>
                <IndTitle>단어</IndTitle>
                <span>{list.word_name}</span>
              </ItemTitle>
              <ItemDesc>
                <IndTitle>설명</IndTitle>
                <span>{list.word_desc}</span>
              </ItemDesc>
              <Item>
                <IndTitle>예시</IndTitle>
                <span>{list.word_ex}</span>
              </Item>
            </ItemStyle>
          );
        })}
        <PlusBtn
          onClick={() => {
            props.history.push("/makewords");
          }}
        >
          <AddCircleIcon style={{fontSize: 50, color: '#ff6348'}}/>
        </PlusBtn>
      </ListStyle>
    </div>
  );
};

export const ListStyle = styled.div`
  display: flex;
  flex-direction: column;
  height: 80vh;
  overflow-x: hidden;
  overflow-y: auto;
  &:: -webkit-scrollbar {
    display: none;
  }
`;

export const ItemStyle = styled.div`
  border-radius: 5px;
  border: 1px solid #ddd;
  padding: 16px;
  margin: 8px;
  background-color: #fefefe;
  cursor:pointer;
`;

export const Title = styled.h1`
  background-color: #fefefe;
  border-radius: 5px;
  border: 1px solid #8aaae5;
  padding: 20px;
  margin: 0;
  font-size: 20px;
  color: #8aaae5;
  text-align: left;
  z-index: 1;
  justify-content: space-between;
`;

export const IndTitle = styled.span`
  background-color: #fefefe;
  text-decoration: underline;
  text-underline-position: under;
  font-weight: bold;
  font-size: 14px;
  margin-right: 10px;
  color: #747d8c;
  text-align: left;
`;

const ItemTitle = styled.h2`
  background-color: #fefefe;
  padding: 5px;
  margin: 0 0 20px 0;
  color: #57606f;
  text-align: left;
  overflow-x: hidden;
  & span {
    white-space: nowrap;
  }
`;

const ItemDesc = styled.p`
  background-color: #fefefe;
  padding: 5px;
  margin: 0 0 20px 0;
  color: #57606f;
  text-align: left;
  overflow-x: hidden;
  & span {
    white-space: nowrap;
  }
`;

const Item = styled.p`
  background-color: #fefefe;
  padding: 5px;
  margin: 0 0 20px 0;
  color: #3742fa;
  text-align: left;
  overflow-x: hidden;
  & span {
    white-space: nowrap;
  }
`;

const PlusBtn = styled.button`
  border: none;
  background-color: rgba(0, 0, 0, 0);
  padding: 0;
  position: absolute;
  bottom: 0;
  right: 0;
  width: 60px;
  height: 60px;
  transition: all 0.2s;
  cursor:pointer;
  &: hover {
    box-shadow: 200px 0 0 0 rgba(0, 0, 0, 0.05) inset,
      -200px 0 0 0 rgba(0, 0, 0, 0.05) inset;
  }
  &: active {
    box-shadow: 200px 0 0 0 rgba(0, 0, 0, 0.1) inset;
      -200px 0 0 0 rgba(0, 0, 0, 0.1) inset;
  }
`;

export default WordList;
