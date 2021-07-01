// 파이어스토어
import { firestore } from "../../firebase";
const dict_db = firestore.collection("mydict");

// Action
const LOAD = "dict/LOAD";
const CREATE = "dict/CREATE";
const DELETE = "dict/DELETE";
const UPDATE = "dict/UPDATE";
const ISLOADED = "dict/ISLOADED";

// Initial State
const initialState = {
  list: [
    { word_name: "apple", word_desc: "fruits", word_ex: "I like apple" },
    {
      word_name: "hamburger",
      word_desc: "fast food",
      word_ex: "I like hamburger",
    },
    { word_name: "Mac", word_desc: "computer", word_ex: "I like Mac's UI" },
    { word_name: "ramen", word_desc: "food", word_ex: "I like ramen" },
  ],
  is_loaded: false,
  
};

// Action Creators
export const loadDict = (dictList) => {
  return { type: LOAD, dictList };
};

// newDictItems는 MakeWords에서 넘어오는 사용자 입력값
export const createDict = (newDictItems) => {
  return { type: CREATE, newDictItems };
};

export const deleteDict = (dictIndex) => {
  return { type: DELETE, dictIndex };
};

export const updateDict = (reDictItems, dictIndex) => {
  return { type: UPDATE, reDictItems, dictIndex };
};

export const isLoaded = (loaded) => {
  return { type: ISLOADED, loaded };
};

// 파이어베이스 통신 함수 만들기

export const loadDictFB = () => {
  return function (dispatch) {
    dict_db.get().then((docs) => {
      let dict_data = [];
      docs.forEach((doc) => {
        if (doc.exists) {
          dict_data = [...dict_data, { id: doc.id, ...doc.data() }];
        }
      });
      console.log(dict_data);
      dispatch(loadDict(dict_data));
    });
  };
};

export const createDictFB = (newDictItems) => {
  return function (dispatch) {
    let dict_data = newDictItems;

    // 파이어베이스 DB에 새로운 내용을 저장시키고 id값을 저장할 딕셔너리에 추가해서 저장해줌
    dict_db.add(newDictItems).then((docRef) => {
      dict_data = { ...dict_data, id: docRef.id };
      dispatch(createDict(dict_data));
      window.location.reload();
    });
  };
};

// 아래 updateDictFB 참고 같은 원리 임
export const deleteDictFB = (dictIndex) => {
  return function (dispatch, getState) {
    const before_dict_data = getState().dict.list[dictIndex];

    if (!before_dict_data.id) {
      return;
    }

    dict_db
      .doc(before_dict_data.id)
      .delete()
      .then((docRef) => {
        dispatch(deleteDict(dictIndex));
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const updateDictFB = (reDictItems, dictIndex) => {
  return function (dispatch, getState) {
    // 인덱스에 해당하는 변경되기 전 저장되어있던 리스트 값을 가져옴 
    const before_dict_data = getState().dict.list[dictIndex];

    let dict_data = reDictItems;

    // 그 값(단어카드에 들어가는 딕셔너리 내용)에 id값이 없다는 건 
    // 파이어베이스에 등록되지 않은 내용이므로 제외시킴 (id 내용은 createDictFB 참고)
    if (!before_dict_data.id) {
      return;
    }

    // 해당 아이디를 파이어베이스 DB에서 찾아서 해당 문서를 새로 받은 내용으로 업데이트시키고
    // FB업데이트 완료가 되고 나면 디스페치 액션크리에이터로 리덕스의 스토어도 연결시켜서 업데이트 시켜줌
    dict_db
      .doc(before_dict_data.id)
      .update(dict_data)
      .then((docRef) => {
        dispatch(updateDict(reDictItems, dictIndex));
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case "dict/LOAD": {
      if (action.dictList.length > 0) {
        return { list: action.dictList, is_loaded: true };
      }
      return {
        list: [
          {
            word_name: "단어를 입력하세요",
            word_desc: "어떤 뜻인가요?",
            word_ex: "재밌는 예시를 찾아볼까요?",
          },
        ],
        is_loaded: true,
      };
    }

    case "dict/CREATE": {
      const new_dict = [...state.list, action.newDictItems];
      return { list: new_dict };
    }

    case "dict/DELETE": {
      const dict_list = state.list.filter((l, idx) => {

        // 삭제하고 싶은 인덱스가 아닐때만 해당 내용물을 리턴해서 사전 리스트를 구성하라는 것
        if (idx !== action.dictIndex) {
          return l;
        }
      });
      return { list: dict_list };
    }

    case "dict/UPDATE": {
      const dict_list = state.list.map((l, ind) => {

        // 수정하고 싶은 인덱스가 나오면 해당 인덱스의 내용을 수정할 내용으로 리턴하라는 것
        if (ind === action.dictIndex) {
          return action.reDictItems;
        } else {
          return l;
        }
      });
      return { list: dict_list };
    }

    case "dict/ISLOADED": {
      return { ...state, is_loaded: action.loaded };
    }

    default:
      return state;
  }
}
