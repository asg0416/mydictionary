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
    dict_db.add(newDictItems).then((docRef) => {
      dict_data = { ...dict_data, id: docRef.id };
      dispatch(createDict(dict_data));
      window.location.reload();
    });
  };
};

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
    const before_dict_data = getState().dict.list[dictIndex];

    let dict_data = reDictItems;

    if (!before_dict_data.id) {
      return;
    }

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
        if (idx !== action.dictIndex) {
          return l;
        }
      });
      return { list: dict_list };
    }

    case "dict/UPDATE": {
      const dict_list = state.list.map((l, ind) => {
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
