import get from 'axios';

export async function Generate(username: string, maxEvents?: number, token?: string): Promise<string | undefined> {
	return generate(username, maxEvents, token);
}

export async function generate(username: string, maxEvents?: number, token?: string): Promise<string | undefined> {
	if(maxEvents == undefined) maxEvents = 5;
	if(token == undefined) token = process.env.GITHUB_TOKEN;

	const result = [];
	let page = 1;
	while(result.length < maxEvents && page <= 3) {
		const headers = token == undefined ? {} : {authorization: `Bearer ${token}`};
		const response = await get(`https://api.github.com/users/${username}/events?per_page=100&page=${page}`, { headers: headers });
		const data = response.data;
		page++;
		for(const event of data) {
			if(result.length >= maxEvents) break;
			const type = event.type as string;
			const repo = `[${event.repo.name}](https://github.com/${event.repo.name})`;
			const payload = event.payload;
			const action = payload.action as string;

			if(type == 'ForkEvent') {
				result.push(`🔀 Forked ${repo}`);
			}
			else if(type == 'IssueCommentEvent' && action == 'created') {
				result.push(`🗣 Commented on ${issueOrPrURL(payload)} in ${repo}`);
			}
			else if(type == 'IssuesEvent' && ['opened', 'closed', 'reopened'].includes(action)) {
				result.push(`❗️ ${capitalize(action)} ${issueOrPrURL(payload)} in ${repo}`);
			}
			else if (type == 'PublicEvent') {
				result.push(`🎉 Published ${repo}`);
			}
			else if (type == 'PullRequestEvent' && ['opened', 'closed', 'reopened'].includes(action)) {
				const merged = payload.pull_request.merged;
				const emoji = action == 'opened' ? '💪' : (merged ? '🎉' : '❌');
				result.push(`${emoji} ${capitalize(merged ? 'Merged' : action)} PR ${issueOrPrURL(payload)} in ${repo}`);
			}
			else if (type == 'ReleaseEvent' && action == 'published') {
				result.push(`🏷️ Published [${payload.release.tag_name}](${payload.release.html_url}) of ${repo}`);
			}
		}
	}
	return result.join('<br>\n');
}

function issueOrPrURL(payload: any): string {
	const item = payload.issue || payload.pull_request;
	return `[#${item.number}](${item.html_url})`;
}

function capitalize(string: string): string {
	return string.charAt(0).toUpperCase() + string.slice(1);
}
