import { useRecoilValue, useResetRecoilState } from "recoil";
import { languageState, searchWordState, sortState } from "../../stores/atom";
import { BoldText, ClearButton, FilterContainer } from "../../styles/repositories";
import DisabledByDefaultSharpIcon from "@mui/icons-material/DisabledByDefaultSharp";
import { RepoType } from "../../types/repo";

function FilterText({ repos }: { repos: RepoType[] }) {
  const searchWord = useRecoilValue(searchWordState);
  const language = useRecoilValue(languageState);
  const sort = useRecoilValue(sortState);
  const resetSearchWord = useResetRecoilState(searchWordState);
  const resetSort = useResetRecoilState(sortState);
  const resetLanguage = useResetRecoilState(languageState);
  const whatSort = sort === "updated" ? "최신 업데이트순" : "이름순";
  const notNonLanguage = language !== "All" && language;
  const isFilter = searchWord || notNonLanguage;

  const resetFilter = () => {
    resetSearchWord();
    resetSort();
    resetLanguage();
  };

  return (
    <FilterContainer>
      <span>
        {isFilter && (
          <>
            {repos.length} results for <BoldText>all</BoldText> repositories{" "}
          </>
        )}
        {searchWord && (
          <>
            matching <BoldText>{searchWord + " "}</BoldText>
          </>
        )}
        {notNonLanguage && (
          <>
            written in <BoldText>{language + " "}</BoldText>
          </>
        )}
        {isFilter && sort && (
          <>
            sorted by <BoldText>{whatSort}</BoldText>
          </>
        )}
      </span>
      {isFilter && (
        <ClearButton onClick={resetFilter}>
          <DisabledByDefaultSharpIcon />
          Clear filter
        </ClearButton>
      )}
    </FilterContainer>
  );
}

export default FilterText;
