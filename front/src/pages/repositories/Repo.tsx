import { RepoType } from "../../types/repo";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { Month } from "../../constants/month";
import {
  EachRepo,
  FlexBox,
  RepoDescription,
  RepoOption,
  RepoTitle,
  RepoTopic,
  RepoTopics,
  RepoVisibility,
} from "../../styles/repositories";

// last update date calculation function
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
  //return on Day Month
  return `on ${upDateDay + " " + Month[upDateMonth + 1]}`;
};

// visibility capitalization function
const capitalization = (str: string) => {
  const visibilityFirstChar = str[0].toUpperCase();
  const visibilityLeftChar = str.slice(1, str.length);
  return visibilityFirstChar + visibilityLeftChar;
};

function Repo({ repo }: { repo: RepoType }) {
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
