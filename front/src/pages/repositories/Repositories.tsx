import { Pagination, Stack } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import Repo from "./Repo";
import SelectMenu from "./SelectMenu";
import {
  languageState,
  menuValueState,
  pageState,
  repositoriesState,
  searchWordState,
  sortState,
} from "../../stores/atom";
import { Content } from "../../styles/menu";
import { FlexBox, RepoList } from "../../styles/repositories";
import FilterText from "./FilterText";
import { RepoType } from "../../types/repo";
import Search from "./Search";
import { useNavigate } from "react-router-dom";

function Repositories() {
  const [repos, setRepos] = useRecoilState(repositoriesState);
  const [error, setError] = useState(false);
  const [page, setPage] = useRecoilState(pageState);
  const setValue = useSetRecoilState(menuValueState);
  const sort = useRecoilValue(sortState);
  const language = useRecoilValue(languageState);
  const searchWord = useRecoilValue(searchWordState);

  const getRepos = useCallback(() => {
    try {
      if (searchWord === "" && (!language || language === "All")) {
        fetch(`https://api.github.com/orgs/facebook/repos?sort=${sort}&per_page=10&page=${page}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error();
            }
            return response.json();
          })
          .then((data) => {
            setRepos(data);
          });
      }
      if (searchWord || (language && language !== "All")) {
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
              console.log("언어 필터!");
            }
            if (searchWord !== "") {
              console.log("검색어 필터!");
              setRepos((prev) =>
                prev.filter((repo: RepoType) =>
                  repo.name.toLowerCase().includes(searchWord.toLowerCase())
                )
              );
            }
          });

        return;
      }
    } catch (error: any) {
      setError(true);
    }
  }, [page, sort, language]);

  const changePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    setValue(1);
  }, []);

  useEffect(() => {
    getRepos();
  }, [getRepos]);

  if (error) {
    return <div>데이터 불러오기 실패!</div>;
  }

  return (
    <Content>
      <FlexBox>
        <Search />
        <SelectMenu />
      </FlexBox>
      <FilterText repos={repos} />
      <RepoList>
        {repos?.map((repo, index) => (
          <Repo key={index} repo={repo} />
        ))}
      </RepoList>
      {(!language || language === "All") && !(repos.length < 10) && (
        <Stack spacing={2}>
          <Pagination count={4} page={page} onChange={changePage} color="primary" />
        </Stack>
      )}
    </Content>
  );
}

export default Repositories;
