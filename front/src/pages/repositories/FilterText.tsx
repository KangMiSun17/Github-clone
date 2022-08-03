import { useRecoilValue, useResetRecoilState } from "recoil";
import { languageState, sortState } from "../../stores/atom";
import { BoldText, ClearButton, FilterContainer } from "../../styles/repositories";
import DisabledByDefaultSharpIcon from "@mui/icons-material/DisabledByDefaultSharp";
import { RepoType } from "../../types/repo";

function FilterText({ repos }: { repos: RepoType[] }) {
  const language = useRecoilValue(languageState);
  const sort = useRecoilValue(sortState);
  const resetSort = useResetRecoilState(sortState);
  const resetLanguage = useResetRecoilState(languageState);
  const whatSort = sort === "updated" ? "최신 업데이트순" : "이름순";

  const resetFilter = () => {
    resetSort();
    resetLanguage();
  };

  return (
    <>
      {language !== "All" && language && (
        <FilterContainer>
          <span>
            {repos.length} result for <BoldText>all</BoldText> repositories written in{" "}
            <BoldText>{language}</BoldText>{" "}
            {sort && (
              <>
                sorted by <BoldText>{whatSort}</BoldText>
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
