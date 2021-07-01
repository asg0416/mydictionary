// 단어 카드 상세 내용 확인 페이지
// 여기서 수정 페이지 넘어가고, 삭제 가능

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { deleteDictFB } from "./redux/modules/dict";

// 디자인 관련 내용
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

  // props의 match에서 인덱스 값 들고 오는 것 (ind 라고 쓴 이유는 App.js에서 url 파라미터 넘겨줄때 그렇게 써서 그런 것)
  let dict_index = parseInt(props.match.params.ind);

  // 스토어에 저장된 리스트 값 해당 인덱스로 불러오기
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
