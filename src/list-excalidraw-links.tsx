import { List } from "@raycast/api";
import { useLinks } from "./hooks/useLinks";
import { LinkItem } from "./components/LinkItem";

export default function Command() {
	const { data: links, isLoading, revalidate } = useLinks();

	// TODO: 过滤 archived links
	
	// Sort links by last_visited_at timestamp in descending order (most recently visited first)
	const sortedLinks = [...links].sort((a, b) => b.last_visited_at - a.last_visited_at);

	// TODO: 将 pinned 的 links 放到最前面

	return (
		<List isLoading={isLoading}>
			{sortedLinks.map((link) => (
				<LinkItem key={link.id} link={link} onRefresh={revalidate} />
			))}
		</List>
	);
}
