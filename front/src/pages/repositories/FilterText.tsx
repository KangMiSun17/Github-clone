import { useRecoilValue, useResetRecoilState } from "recoil";
import { languageState, searchWordState, sortState } from "../../stores/atom";
import { ClearButton, FilterContainer } from "../../styles/repositories";
import DisabledByDefaultSharpIcon from "@mui/icons-material/DisabledByDefaultSharp";
import { RepoType } from "../../types/repo";

function FilterText({ repos }: { repos: RepoType[] }) {
  const searchWord = useRecoilValue(searchWordState);
  const language = useRecoilValue(languageState);
  const sort = useRecoilValue(sortState);
  const whatSort = sort === "updated" ? "최신 업데이트순" : "이름순";
  const notNonLanguage = language !== "All" && language;
  const isFilter = searchWord || notNonLanguage;
  const resetSearchWord = useResetRecoilState(searchWordState);
  const resetSort = useResetRecoilState(sortState);
  const resetLanguage = useResetRecoilState(languageState);

  const resetFilter = () => {
    resetSearchWord();
    resetSort();
    resetLanguage();
  };

  return (
    <>
      {isFilter && (
        <FilterContainer>
          <span>
            {repos.length} results for <strong>all</strong> repositories{" "}
            {searchWord && (
              <>
                matching <strong>{searchWord + " "}</strong>
              </>
            )}
            {notNonLanguage && (
              <>
                written in <strong>{language + " "}</strong>
              </>
            )}
            {sort && (
              <>
                sorted by <strong>{whatSort}</strong>
              </>
            )}
          </span>
          <ClearButton onClick={resetFilter}>
            <DisabledByDefaultSharpIcon />
            Clear filter
          </ClearButton>
        </FilterContainer>
      )}
    </>
  );
}

export default FilterText;
