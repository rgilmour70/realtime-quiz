import myData from '../data/questions.json';

const questions = myData;

const getUrlVars = () => {
  let vars = {};
  window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, (m,key,value) => { vars[key] = value });
  return vars;
}

export function getSelectedContent() {
	const activityNumber = parseInt(getUrlVars()['q']);
	const question = questions.filter(q => q.id === activityNumber)[0];
	return question;
}






