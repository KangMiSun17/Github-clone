import { useEffect } from "react";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import {
  languageState,
  menuValueState,
  pageState,
  searchWordState,
  sortState,
} from "../../stores/atom";
import { Content } from "../../styles/menu";

function OverView() {
  const resetLanguage = useResetRecoilState(languageState);
  const resetSort = useResetRecoilState(sortState);
  const setMenuValue = useSetRecoilState(menuValueState);
  const setSearchWord = useSetRecoilState(searchWordState);
  const setPage = useSetRecoilState(pageState);

  useEffect(() => {
    resetLanguage();
    resetSort();
    setMenuValue(0);
    setSearchWord("");
    setPage(1);
  }, []);

  return <Content>OverView 페이지입니다.</Content>;
}

export default OverView;
