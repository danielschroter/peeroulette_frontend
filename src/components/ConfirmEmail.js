import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Typography, Container } from "@material-ui/core";
import { useParams } from "react-router-dom";
import UserService from "../services/UserService";

const useStyles = makeStyles((theme) => ({
	loginButtons: {
		display: "flex",
		justifyContent: "space-between",
	},
	loginButton: {
		margin: "auto",
	},
	confirmText: {
		color: "#fff"
	}
}));
function ConfirmEmail(props) {
	const classes = useStyles();

	const [username, setUsername] = React.useState("");
	const [confirmation, setConfirmation] = React.useState(false);

	// get user_id OR domain_id + domain_name from URL "/confirm/:id/:domain"
	const { id, domain } = useParams();

	const extractUser = async () => {
		props.OnConfirm(id);
		await UserService.getUser(id).then(function (userBackend) {
			setUsername(userBackend.username);
			setConfirmation(userBackend.confirmed);
		});
	};

	useEffect(() => {
		extractUser();
	});

	const onSignIn = () => {
		// navigate to the login page
		props.onSignIn();
	};

	return (
		<div style={{ marginTop: "150px", marginBottom: "150px" }}>
			<Container maxWidth="sm">
				{!domain ? (
					!username ? (
						<Typography className={classes.confirmText} variant="h4" align="center" gutterBottom>
							No user found for confirmation. Check your confirmation link!
						</Typography>
					) : confirmation ? (
						<Typography className={classes.confirmText} variant="h4" align="center" gutterBottom>
							Email confirmation for user "{username}" was successful. You now
							can log in!
						</Typography>
					) : (
						<Typography className={classes.confirmText} variant="h4" align="center" gutterBottom>
							Email confirmation for user "{username}" failed.
						</Typography>
					)
				) : (
					<Typography className={classes.confirmText} variant="h4" align="center" gutterBottom>
						Email confirmation for domain: "{domain}" was successful.
					</Typography>
				)}

				<div className={classes.loginButtons}>
					<Button
						className={classes.loginButton}
						variant="contained"
						color="primary"
						onClick={onSignIn}
						type="submit"
					>
						Login
					</Button>
				</div>
			</Container>
		</div>
	);
}

export default ConfirmEmail;
