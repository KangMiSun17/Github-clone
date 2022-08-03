import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useRecoilState, useSetRecoilState } from "recoil";
import { languageState, pageState, repositoriesState, sortState } from "../../stores/atom";
import { RepoType } from "../../types/repo";
import { InputLabel } from "@mui/material";
import { useEffect } from "react";

function SelectMenu() {
  const [language, setLanguage] = useRecoilState(languageState);
  const [sort, setSort] = useRecoilState(sortState);
  const setRepos = useSetRecoilState(repositoriesState);
  const setPage = useSetRecoilState(pageState);

  const getRepos = (codeLanguage: string) => {
    try {
      if (codeLanguage === "All") return;
      fetch(`https://api.github.com/orgs/facebook/repos?sort=${sort}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error();
          }
          return response.json();
        })
        .then((data) => {
          if (codeLanguage === "") return setRepos(data);
          const filterResult = data.filter((repo: RepoType) => repo.language === codeLanguage);
          setRepos(filterResult);
        });
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const changeSort = (event: SelectChangeEvent) => {
    setSort(event.target.value);
    setPage(1);
  };

  const changeLanguage = (event: SelectChangeEvent) => {
    setLanguage(event?.target.value);
    getRepos(event?.target.value);
    setPage(1);
  };

  useEffect(() => {
    getRepos(language);
  }, []);

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="demo-select-small">Language</InputLabel>
        <Select
          value={language}
          onChange={changeLanguage}
          label="Language"
          inputProps={{ "aria-label": "Without label" }}
        >
          <MenuItem value="All">
            <em>All</em>
          </MenuItem>
          <MenuItem value="C++">C++</MenuItem>
          <MenuItem value="JavaScript">JavaScript</MenuItem>
          <MenuItem value="TypeScript">TypeScript</MenuItem>
          <MenuItem value="Java">Java</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="demo-select-small">Sort</InputLabel>
        <Select value={sort} onChange={changeSort} label="Sort">
          <MenuItem value="updated">최신 업데이트순</MenuItem>
          <MenuItem value="full_name">이름순</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

export default SelectMenu;
