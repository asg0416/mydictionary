import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { deleteDictFB } from "./redux/modules/dict";

import { ListStyle, Title, IndTitle } from "./WordList";
import { Button } from "./MakeWords";
import { HomeBtn } from "./Reposting";
import HomeIcon from "@material-ui/icons/Home";

const Detail = (props) => {
  // 함수형에서 디스패치 사용하는 법
  const dispatch = useDispatch();

  // 스토어에서 상태값 가져오는 것
  const dict_list = useSelector((state) => state.dict.list);
  console.log(dict_list);
  console.log(props);

  let dict_index = parseInt(props.match.params.ind);

  const name = dict_list[dict_index] && dict_list[dict_index].word_name;
  const desc = dict_list[dict_index] && dict_list[dict_index].word_desc;
  const ex = dict_list[dict_index] && dict_list[dict_index].word_ex;

  return (
    <div>
      <Title style={{ paddingBottom: 18 }}>
        My Dict 내용
      </Title>
      <HomeBtn
        onClick={() => {
          props.history.push("/");
        }}
      >
        <HomeIcon style={{ fontSize: 30 }} />
      </HomeBtn>
      <ListStyle>
        <ItemStyle>
          <IndTitle>단어</IndTitle>
          <p>{name}</p>
        </ItemStyle>
        <ItemStyle>
          <IndTitle>설명</IndTitle>
          <p>{desc}</p>
        </ItemStyle>
        <ItemStyle>
          <IndTitle>예시</IndTitle>
          <p>{ex}</p>
        </ItemStyle>

        <Button
          style={{ marginTop: 15, padding: 14 }}
          onClick={() => {
            props.history.push("/reposting/" + dict_index);
          }}
        >
          수정하기
        </Button>

        <Button
          style={{ marginTop: 0, padding: 14 }}
          onClick={() => {
            props.history.goBack();
            dispatch(deleteDictFB(dict_index));
          }}
        >
          삭제하기
        </Button>
      </ListStyle>
    </div>
  );
};

const SubTitle = styled.span`
  color: #747d8c;
  height: 20px;
  font-size: 19px;
  word-wrap: break-word;
`;

const ItemStyle = styled.div`
  border-radius: 5px;
  border: 1px solid #ddd;
  padding: 16px;
  margin: 8px;
  background-color: #fefefe;
  word-wrap: break-word;
`;

export default Detail;
