import { useState } from "react";
import { List } from "@raycast/api";
import { useLinks } from "./hooks/useLinks";
import { LinkItem } from "./components/LinkItem";

const filterOptions = [
	{ id: "default", name: "Default" },
	{ id: "all", name: "All" },
	{ id: "archived", name: "Archived" },
	{ id: "pinned", name: "Pinned" },
];

export default function Command() {
	const { data: links, isLoading, revalidate } = useLinks();
	const [selectedFilter, setSelectedFilter] = useState("default");

	const filteredLinks = links.filter((link) => {
		if (selectedFilter === "default") return link.archived === 0;
		if (selectedFilter === "all") return true;
		if (selectedFilter === "archived") return link.archived === 1;
		if (selectedFilter === "pinned") return link.pinned === 1;
		return true;
	});

	// Sort links by last_visited_at timestamp in descending order (most recently visited first)
	const sortedLinks = [...filteredLinks].sort(
		(a, b) => b.last_visited_at - a.last_visited_at,
	);

	// TODO: 将 pinned 的 links 放到最前面

	return (
		<List
			isLoading={isLoading}
			searchBarPlaceholder="Search links..."
			navigationTitle="Excalidraw Links"
			searchBarAccessory={
				<List.Dropdown
					tooltip="Filter Links"
					storeValue={true}
					onChange={setSelectedFilter}
					defaultValue="default"
				>
					{filterOptions.map((option) => (
						<List.Dropdown.Item
							key={option.id}
							title={option.name}
							value={option.id}
						/>
					))}
				</List.Dropdown>
			}
		>
			{sortedLinks.map((link) => (
				<LinkItem key={link.id} link={link} onRefresh={revalidate} />
			))}
		</List>
	);
}
