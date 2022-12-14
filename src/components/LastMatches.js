import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Typography, Container, Avatar } from "@material-ui/core";
import { useParams } from "react-router-dom";
import MatchService from "../services/MatchService";
import UserService from "../services/UserService";
import { format } from "timeago.js";

const useStyles = makeStyles((theme) => ({
	avatar: {
		marginRight: theme.spacing(1),
	},
	deleteMatchButton: {
		marginRight: theme.spacing(1),
		backgroundColor: "#cc0000",
		marginTop: "12px",
		color: "#ffffff",
	},
}));

function LastMatches({
	lastMatch,
	currentId,
	setCurrentChat,
	setLastMatches,
	setMatchesUpdated,
}) {
	const classes = useStyles();

	const [matchName, setMatchName] = React.useState("");
	const [matchUserId, setMatchUserId] = React.useState("");
	const [matchDeleted, setMatchDeleted] = React.useState(false);

	const extractMatchingPartner = async () => {
		if (lastMatch.usera === currentId) {
			try {
				const res = await UserService.getUser(lastMatch.userb);
				setMatchName(res.username);
				setMatchUserId(res._id);
			} catch (err) {
				console.log(err);
			}
		} else {
			try {
				const res = await UserService.getUser(lastMatch.usera);
				setMatchName([res.username]);
				setMatchUserId(res._id);
			} catch (err) {
				console.log(err);
			}
		}
	};

	useEffect(() => {
		extractMatchingPartner();
	}, [currentId, matchDeleted]);

	const handleClick = async (currentId, matchID) => {
		try {
			const res = await UserService.getConversation(matchID, currentId);
			setCurrentChat(res);
		} catch (err) {
			console.log(err);
		}
		try {
			const res = await UserService.addConversation(matchID, currentId);
			setCurrentChat(res);
		} catch (err) {
			console.log(err);
		}
	};

	const handleDelete = async (lastMatch) => {
		try {
			await MatchService.deleteMatch(lastMatch._id);
			setMatchesUpdated(true);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div>
			<Container maxWidth="sm">
				<Typography
					style={{ fontSize: "1.1rem", fontWeight: "bold" }}
					variant="h6"
					align="left"
					gutterBottom
				>
					<div onClick={() => handleClick(currentId, matchUserId)}>
						<Avatar className={classes.avatar}>
							{matchName ? matchName[0] : ""}
						</Avatar>
						{matchName} {format(lastMatch.createdAt)}
					</div>
					<div>
						<Button
							onClick={() => handleDelete(lastMatch)}
							variant="contained"
							color="primary"
							size="small"
							className={classes.deleteMatchButton}
						>
							Delete
						</Button>
					</div>
				</Typography>
			</Container>
		</div>
	);
}

export default LastMatches;
