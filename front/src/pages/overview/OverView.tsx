import { useEffect } from "react";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import { languageState, menuValueState, sortState } from "../../stores/atom";
import { Content } from "../../styles/menu";

function OverView() {
  const resetLanguage = useResetRecoilState(languageState);
  const resetSort = useResetRecoilState(sortState);
  const setMenuValue = useSetRecoilState(menuValueState);

  useEffect(() => {
    resetLanguage();
    resetSort();
    setMenuValue(0);
  }, []);

  return <Content>OverView 페이지입니다.</Content>;
}

export default OverView;
