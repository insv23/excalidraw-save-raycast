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

	// 排序逻辑：
	// 1. 按照 pinned 状态分组（pinned=1 的在前）
	// 2. 每组内按照 last_visited_at 降序排列（最新访问的在前）
	const sortedLinks = [...filteredLinks].sort((a, b) => {
		if (a.pinned !== b.pinned) {
			return b.pinned - a.pinned;
		}
		
		return b.last_visited_at - a.last_visited_at;
	});

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
