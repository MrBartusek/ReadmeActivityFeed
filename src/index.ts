import get from 'axios';

export async function Generate(username: string, maxEvents?: number, token?: string): Promise<string | undefined> {
	return generate(username, maxEvents, token);
}

export async function generate(username: string, maxEvents?: number, token?: string): Promise<string | undefined> {
	if(maxEvents == undefined) maxEvents = 8;
	if(token == undefined) token = process.env.GITHUB_TOKEN;

	const result = [];
	let page = 1;
	while(result.length < maxEvents && page <= 3) {
		const response = await get(`https://api.github.com/users/${username}/events?per_page=100&page=${page}`);
		const data = response.data;
		page++;
		for(const event of data) {
			if(result.length >= maxEvents) break;
			const type = event.type as string;
			const repo = `[${event.repo.name}](https://github.com/${event.repo.name})`;
			const payload = event.payload;
			const action = payload.action as string;

			if(type == 'WatchEvent' && action == 'started') {
				result.push(`⭐ Starred ${repo}`);
			}
			else if(type == 'ForkEvent') {
				result.push(`⬇️ Forked ${repo}`);
			}
			else if(type == 'IssueCommentEvent' && action == 'created') {
				result.push(`🗣 Commented on ${issueOrPrURL(payload)} in ${repo}`);
			}
			else if(type == 'IssuesEvent' && ['created', 'closed', 'reopened'].includes(action)) {
				const emoji = action != 'closed' ? '❗️' : '✔️';
				result.push(`${emoji} ${capitalize(action)} ${issueOrPrURL(payload)} in ${repo}`);
			}
			else if (type == 'PublicEvent') {
				result.push(`🎉 Published ${repo}`);
			}
			else if (type == 'PullRequestEvent' && ['created', 'closed', 'reopened'].includes(action)) {
				const emoji = action != 'closed' ? '💪' : '❌';
				result.push(`${emoji} ${capitalize(action)} ${issueOrPrURL(payload)} in ${repo}`);
			}
			else if (type == 'ReleaseEvent' && action == 'published') {
				result.push(`🏷️ Published [${payload.release.tag_name}](${payload.release.html_url}) of ${repo}`);
			}
		}
	}
	return result.join('\n');
}

function issueOrPrURL(payload: any): string {
	const item = payload.issue || payload.pull_request;
	return `[#${item.number}](${item.html_url})`;
}

function capitalize(string: string): string {
	return string.charAt(0).toUpperCase() + string.slice(1);
}
