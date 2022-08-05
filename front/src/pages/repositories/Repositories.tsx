import { Pagination } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import Repo from "./Repo";
import SelectMenu from "./SelectMenu";
import {
  languageState,
  menuValueState,
  repoPageState,
  repositoriesState,
  searchWordState,
  sortState,
} from "../../stores/atom";
import { Content } from "../../styles/menu";
import { FlexBox, MovePage, RepoList } from "../../styles/repositories";
import FilterText from "./FilterText";
import { RepoType } from "../../types/repo";
import Search from "./Search";
import ErrorPage from "../../components/ErrorPage";

function Repositories() {
  const [repos, setRepos] = useRecoilState(repositoriesState);
  const [error, setError] = useState(false);
  const [repoPage, setRepoPage] = useRecoilState(repoPageState);
  const setMenuValue = useSetRecoilState(menuValueState);
  const sort = useRecoilValue(sortState);
  const language = useRecoilValue(languageState);
  const searchWord = useRecoilValue(searchWordState);
  const notIsLanguage = !language || language === "All";

  const getAllRepos = () => {
    fetch(`https://api.github.com/orgs/facebook/repos?sort=${sort}&per_page=10&page=${repoPage}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error();
        }
        return response.json();
      })
      .then((data) => {
        setRepos(data);
      });
  };

  const getFilterRepos = () => {
    fetch(`https://api.github.com/orgs/facebook/repos?sort=${sort}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error();
        }
        return response.json();
      })
      .then((data) => {
        setRepos(data);
        if (language && language !== "All") {
          const filterResult = data.filter((repo: RepoType) => repo.language === language);
          setRepos(filterResult);
        }
        if (searchWord !== "") {
          setRepos((prev) =>
            prev.filter((repo: RepoType) =>
              repo.name.toLowerCase().includes(searchWord.toLowerCase())
            )
          );
        }
      });
  };

  const getRepos = useCallback(() => {
    try {
      if (searchWord === "" && notIsLanguage) {
        getAllRepos();
      }
      if (searchWord || (language && language !== "All")) {
        getFilterRepos();
      }
    } catch (error: any) {
      setError(true);
    }
  }, [repoPage, sort, language]);

  const changePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setRepoPage(value);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    setMenuValue(1);
  }, []);

  useEffect(() => {
    getRepos();
  }, [getRepos]);

  if (error) {
    return <ErrorPage />;
  }

  return (
    <Content>
      <FlexBox>
        <Search />
        <SelectMenu />
      </FlexBox>
      <FilterText repos={repos} />
      <RepoList>
        {repos?.map((repo) => (
          <Repo key={repo.id} repo={repo} />
        ))}
      </RepoList>
      {notIsLanguage && !(repos.length < 10) && (
        <MovePage>
          <Pagination count={4} page={repoPage} onChange={changePage} color="primary" />
        </MovePage>
      )}
    </Content>
  );
}

export default Repositories;
