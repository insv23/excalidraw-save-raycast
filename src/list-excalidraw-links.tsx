import { List } from "@raycast/api";
import { useLinks } from "./hooks/useLinks";
import { LinkItem } from "./components/LinkItem";

export default function Command() {
	const { data: links, isLoading, revalidate } = useLinks();

	// TODO: 过滤 archived links
	
	// Sort links by created_at timestamp in descending order (newest first)
	const sortedLinks = [...links].sort((a, b) => b.created_at - a.created_at);

	// TODO: 将 pinned 的 links 放到最前面

	return (
		<List isLoading={isLoading}>
			{sortedLinks.map((link) => (
				<LinkItem key={link.id} link={link} onRefresh={revalidate} />
			))}
		</List>
	);
}
