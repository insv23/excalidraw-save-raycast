// src/components/LinkItem.tsx

import {
	List,
	ActionPanel,
	Action,
	Icon,
	confirmAlert,
	Alert,
	Keyboard,
} from "@raycast/api";
import type { Link } from "../types";
import { recordVisit, deleteLink } from "../services/api/endpoints/links";
import { LinkDetail } from "./LinkDetail";

interface LinkItemProps {
	link: Link;
	onRefresh: () => void;
}

export function LinkItem({ link, onRefresh }: LinkItemProps) {
	const handleDelete = async () => {
		if (
			await confirmAlert({
				title: "Delete Link",
				message: "Are you sure you want to delete this link?",
				primaryAction: {
					title: "Delete",
					style: Alert.ActionStyle.Destructive,
				},
				dismissAction: {
					title: "Cancel",
					style: Alert.ActionStyle.Cancel,
				},
			})
		) {
			await deleteLink(link.id);
			onRefresh();
		}
	};

	return (
		<List.Item
			icon={
				link.pinned === 1 ? Icon.Tack : link.archived === 1 ? Icon.Folder : ""
			}
			title={link.description}
			accessories={[
				{
					icon: Icon.Eye,
					text: new Date(link.last_visited_at * 1000).toLocaleString(),
				},
			]}
			actions={
				<ActionPanel>
					<Action.OpenInBrowser
						url={link.url}
						onOpen={async () => {
							await recordVisit(link.id);
							onRefresh();
						}}
					/>
					<Action.Push
						icon={Icon.Paragraph}
						title="Edit"
						target={<LinkDetail link={link} onRefresh={onRefresh} />}
					/>
					<Action
						icon={Icon.Trash}
						title="Delete Link"
						style={Action.Style.Destructive}
						shortcut={Keyboard.Shortcut.Common.Remove}
						onAction={handleDelete}
					/>
				</ActionPanel>
			}
		/>
	);
}
