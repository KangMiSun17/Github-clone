import { useEffect } from "react";
import { useResetRecoilState } from "recoil";
import {
  languageState,
  menuValueState,
  repoPageState,
  searchWordState,
  sortState,
} from "../../stores/atom";
import { Content } from "../../styles/menu";

function OverView() {
  const resetLanguage = useResetRecoilState(languageState);
  const resetSort = useResetRecoilState(sortState);
  const resetMenuValue = useResetRecoilState(menuValueState);
  const resetSearchWord = useResetRecoilState(searchWordState);
  const resetRepoPage = useResetRecoilState(repoPageState);

  useEffect(() => {
    resetLanguage();
    resetSort();
    resetMenuValue();
    resetSearchWord();
    resetRepoPage();
  }, []);

  return <Content>OverView 페이지입니다.</Content>;
}

export default OverView;
