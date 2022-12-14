import { SetStateAction, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { languageState, repositoriesState, searchWordState, sortState } from "../../stores/atom";
import { SearchBox, SearchInput } from "../../styles/repositories";
import { RepoType } from "../../types/repo";
import SearchIcon from "@mui/icons-material/Search";
import ErrorPage from "../../components/ErrorPage";

function Search() {
  const [searchWord, setSearchWord] = useRecoilState(searchWordState);
  const setRepos = useSetRecoilState(repositoriesState);
  const language = useRecoilValue(languageState);
  const sort = useRecoilValue(sortState);
  const [error, setError] = useState(false);

  const changeInputValue = (e: { target: { value: SetStateAction<string> } }) => {
    setSearchWord(e.target.value);
  };

  const getRepos = async (codeLanguage: string) => {
    try {
      const response = await fetch(`https://api.github.com/orgs/facebook/repos?sort=${sort}`);
      if (!response.ok) {
        throw new Error();
      }
      const data = await response.json();
      setRepos(data);
      if (codeLanguage && codeLanguage !== "All") {
        const filterResult = data.filter((repo: RepoType) => repo.language === codeLanguage);
        setRepos(filterResult);
      }
      if (searchWord !== "") {
        setRepos((prev) =>
          prev.filter((repo: RepoType) =>
            repo.name.toLowerCase().includes(searchWord.toLowerCase())
          )
        );
      }
    } catch (error: any) {
      setError(true);
    }
  };

  useEffect(() => {
    if (searchWord === "") getRepos(language);
    if (searchWord !== "") {
      const getResult = setTimeout(async () => {
        getRepos(language);
      }, 1000);
      return () => clearTimeout(getResult);
    }
  }, [searchWord]);

  if (error) {
    return <ErrorPage />;
  }

  return (
    <SearchBox onSubmit={(e) => e.preventDefault()}>
      <SearchIcon />
      <SearchInput
        value={searchWord}
        onChange={changeInputValue}
        placeholder="Find a repository..."
      />
    </SearchBox>
  );
}

export default Search;
