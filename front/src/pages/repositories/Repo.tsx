import { Link } from "@mui/material";
import { styled } from "@mui/material/styles";
import { RepoType } from "../../types/repo";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { Month } from "../../constants/month";
import { FlexBox } from "../../styles/repositories";

const calculateDate = (time: string) => {
  const today = new Date();
  const updateDate = new Date(time);
  const upDateMonth = new Date(time).getMonth();
  const upDateDay = new Date(time).getDate();

  const betweenTimeMinutes = Math.floor((today.getTime() - updateDate.getTime()) / 1000 / 60);
  if (betweenTimeMinutes < 1) return "now";
  if (betweenTimeMinutes < 60) return `${betweenTimeMinutes} minutes  ago`;

  const betweenTimeHour = Math.floor(betweenTimeMinutes / 60);
  if (betweenTimeHour < 24) {
    return `${betweenTimeHour} hour  ago`;
  }

  const betweenTimeDay = Math.floor(betweenTimeMinutes / 60 / 24);
  if (betweenTimeDay < 32) return `${betweenTimeDay} day  ago`;
  return `on ${upDateDay + " " + Month[upDateMonth + 1]}`;
};

function Repo({ repo }: { repo: RepoType }) {
  const capitalization = (str: string) => {
    const visibilityFirstChar = str[0].toUpperCase();
    const visibilityLeftChar = str.slice(1, str.length);
    return visibilityFirstChar + visibilityLeftChar;
  };

  return (
    <EachRepo>
      <FlexBox>
        <RepoTitle href={repo.html_url} underline="hover">
          {repo.name}
        </RepoTitle>
        <RepoVisibility>{capitalization(repo.visibility)}</RepoVisibility>
      </FlexBox>
      <RepoDescription>{repo.description}</RepoDescription>
      <RepoTopics>
        {repo.topics.map((topic, index) => (
          <RepoTopic key={index}>{topic}</RepoTopic>
        ))}
      </RepoTopics>
      <FlexBox>
        <RepoOption>{repo.language}</RepoOption>
        <RepoOption>
          <StarBorderIcon />
          {repo.stargazers_count.toLocaleString()}
        </RepoOption>
        <RepoOption>Updated {calculateDate(repo.updated_at)}</RepoOption>
      </FlexBox>
    </EachRepo>
  );
}

export default Repo;

const EachRepo = styled("div")(() => ({
  margin: "1.2rem 0.5rem",
}));

const RepoTitle = styled(Link)(() => ({
  fontSize: 20,
  marginRight: 8,
  fontWeight: "bolder",
}));

const RepoVisibility = styled("span")(() => ({
  display: "flex",
  alignItems: "center",
  height: 20,
  fontSize: 12,
  fontWeight: "500",
  color: "#57606a",
  padding: "0 0.6rem",
  border: "1px solid gray",
  borderRadius: 20,
}));

const RepoDescription = styled("div")(() => ({
  marginTop: "0.5rem",
  color: "#57606a",
}));

const RepoTopics = styled("div")(() => ({
  display: "flex",
  flexWrap: "wrap",
}));

const RepoTopic = styled("span")(() => ({
  fontSize: 12,
  fontWeight: "500",
  backgroundColor: "#ddf4ff",
  color: "#0969da",
  margin: 5,
  marginLeft: 0,
  padding: "0.3rem 0.8rem",
  borderRadius: 20,
}));

const RepoOption = styled(FlexBox)(() => ({
  marginRight: 12,
  fontSize: 12,
  color: "#57606a",
}));
