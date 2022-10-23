import { useLocation, useNavigate, useParams } from "react-router-dom";
export function formatDate (timestamp) {
    const d = new Date(timestamp)
    const time = d.toLocaleTimeString('en-US')
    return time.substr(0, 5) + time.slice(-2) + ' | ' + d.toLocaleDateString()
}

export function formatQuestion (question, author, authedUser) {
    let hasAnswer = false;
    let isAuthor = false;
    let voteSelected = '';
  
    const {
      id,
      timestamp,
      optionOne: {
        // eslint-disable-next-line
        votes: [],
        text: optionOneText,
      },
      optionTwo: {
        // eslint-disable-next-line
        votes: [],
        text: optionTwoText,
      }
    } = question;
  
    if (question.optionOne.votes.includes(authedUser) || question.optionTwo.votes.includes(authedUser)) {
      hasAnswer = true;
      if (question.optionOne.votes.includes(authedUser)) {
        voteSelected = question.optionOne.text;
      } else if (question.optionTwo.votes.includes(authedUser)) {
        voteSelected = question.optionTwo.text;
      };
    };
  
    if (author === authedUser) {
      isAuthor = true;
    };
  
    const optionOneVotes = question.optionOne.votes.length;
    const optionTwoVotes = question.optionTwo.votes.length;
    const totalVotes = optionOneVotes + optionTwoVotes;
  
    const optionOnePercent = Math.round((optionOneVotes / totalVotes) * 100);
    const optionTwoPercent = Math.round((optionTwoVotes / totalVotes) * 100);
  
    return {
      id,
      timestamp,
      name: author.name,
      avatarURL: author.avatarURL,
      optionOneText,
      optionTwoText,
      hasAnswer,
      voteSelected,
      isAuthor,
      totalVotes,
      optionOnePercent,
      optionTwoPercent
    };
  };

export const withRouter = (Component) => {
  const ComponentWithRouterProp = (props) => {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  };

  return ComponentWithRouterProp;
};