import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useRecoilState, useSetRecoilState } from "recoil";
import { languageState, repoPageState, sortState } from "../../stores/atom";
import { InputLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";

function SelectMenu() {
  const [language, setLanguage] = useRecoilState(languageState);
  const [sort, setSort] = useRecoilState(sortState);
  const setPage = useSetRecoilState(repoPageState);
  const navigate = useNavigate();

  const changeSort = (event: SelectChangeEvent) => {
    setSort(event.target.value);
    navigate(`?sort=${event.target.value}&language=${language}`);
    setPage(1);
  };

  const changeLanguage = (event: SelectChangeEvent) => {
    setLanguage(event?.target.value);
    navigate(`?sort=${sort}&language=${event?.target.value}`);
    setPage(1);
  };

  return (
    <>
      <FormControl sx={{ mr: 1, minWidth: 120 }} size="small">
        <InputLabel id="demo-select-small">Language</InputLabel>
        <Select value={language} onChange={changeLanguage} label="Language">
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="C++">C++</MenuItem>
          <MenuItem value="JavaScript">JavaScript</MenuItem>
          <MenuItem value="TypeScript">TypeScript</MenuItem>
          <MenuItem value="Java">Java</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, ml: 0, minWidth: 120 }} size="small">
        <InputLabel id="demo-select-small">Sort</InputLabel>
        <Select value={sort} onChange={changeSort} label="Sort">
          <MenuItem value="updated">최신 업데이트순</MenuItem>
          <MenuItem value="full_name">이름순</MenuItem>
        </Select>
      </FormControl>
    </>
  );
}

export default SelectMenu;
