import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
    Paper,
    Button,
    TextField,
    Typography,
    FormControlLabel,
    Checkbox,
} from "@material-ui/core";
import UserServiceCRUD from "../services/UserServiceCRUD";

const useStyles = makeStyles((theme) => ({
    usersignUpRoot: {
        margin: "auto",
    },
    signUpPaper: {
        width: "500px",
        padding: theme.spacing(2),
    },
    signUpRow: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        "&:last-child": {
            paddingBottom: theme.spacing(1),
        },
        "&:first-child": {
            paddingTop: theme.spacing(1),
        },
    },
    signUpButtons: {
        display: "flex",
        justifyContent: "flex-end",
    },
    signUpButton: {
        marginLeft: theme.spacing(1),
    },
    editNameButton: {
        marginRight: theme.spacing(1),
        marginLeft:"372px"
    },
    cancelNameButton: {
        marginRight: theme.spacing(1),
        marginLeft:"300px"
    },
    saveNameButton: {
        marginRight: theme.spacing(1),
        marginLeft:"0px"
    },
    editPasswordButton: {
        marginRight: theme.spacing(1),
        marginLeft:"350px"
    },

}));

/**
 * For register new users
 * @param {props} props
 */
function EditProfileComponentOld(props) {
    const classes = useStyles();

    const [username, setUsername] = React.useState(props.user.user.username);
    const [password, setPassword] = React.useState(props.user.user.password);
    const [password2, setPassword2] = React.useState(props.user.user.password);
    const [isAdmin, setIsAdmin] = React.useState(props.user.user.isAdmin);
    const [isCorporate, setIsCorporate] = React.useState(false);

    // Corporate Data
    const [compname, setCompname] = React.useState("");
    const [domains, setDomains] = React.useState("");
    const [registerError, setRegisterError] = React.useState("");

    // Data from old code, Ben
    const [editName, setEditName] = React.useState(false);
    const [saveName, setSaveName] = React.useState(false);



    useEffect(() => {
        if (props.user.error) {
            setRegisterError(props.user.error);
        } else {
            setRegisterError("");
        }
    }, [props.user]);

    // creating a object with all relevant data to update or create a changed movie
    const packUser = () => {
        let back = {
            ...props.user.user,
        };

        back.username = username;
        back.password = password;

        return back;
    };

    const onRegister = (e) => {
        setEditName(false);
        e.preventDefault();
        //console.warn(props.user);
        console.warn(packUser())
        console.warn(props.user.user)

        //props.onRegister(username, password, isAdmin, compname, domains);
        props.onRegister(packUser());
    };

    const onUpdateUser = (e) => {
        setEditName(false);
        e.preventDefault();
        //console.warn(props.user);
        console.warn("user frontend")
        console.warn(packUser())
        console.warn(props.user.user)

        console.warn("user backend")
        console.warn(props.user.user._id)

        //let user = props.onGetUser(props.user.user._id);
        let user = UserServiceCRUD.getUser(props.user.user._id);
        console.warn(user.valueOf())


        //props.onRegister(username, password, isAdmin, compname, domains);
        props.onUpdateUser(packUser());
    };

    const onGetUser = (e) => {
        setEditName(false);
        e.preventDefault();
        //console.warn(props.user);
        console.warn(packUser())
        console.warn(props.user.user)

        //props.onRegister(username, password, isAdmin, compname, domains);
        props.onRegister(packUser());
    };

    const onChangeUsername = (e) => {
        props.user.user.username = e.target.value;
        console.warn(props.user.user)
        // props.onLogout(username, password);
        setUsername(e.target.value);
        setRegisterError("");
    };

    const onChangePassword = (e) => {
        setPassword(e.target.value);
        setRegisterError("");
    };

    const onChangeCompname = (e) => {
        setCompname(e.target.value);
        setRegisterError("");
    };

    const onChangeDomains = (e) => {
        setDomains(e.target.value);
        setRegisterError("");
    };

    const onChangePassword2 = (e) => {
        setPassword2(e.target.value);
        setRegisterError("");
    };

    const onBlurPassword = (e) => {
        if (password !== "" && password2 !== "") {
            if (password !== password2) {
                setRegisterError("Passwords do not match.");
            } else {
                setRegisterError("");
            }
        }
    };

    return (
        <div className={classes.usersignUpRoot}>
            <Paper className={classes.signUpPaper} component="form">
                <div className={classes.signUpRow}>
                    <Typography variant="h4" align="center">
                        Profile
                    </Typography>
                </div>

                <div className={classes.signUpRow}>
                    { editName ? (
                        <div>
                            <div style={{"display":"flex"}}>
                                <p>Name:</p>
                                <Button
                                    className={classes.cancelNameButton}
                                    onClick={(e) => setEditName(false) }
                                > Cancel
                                </Button>
                                <Button
                                    className={classes.saveNameButton}
                                    onClick={onUpdateUser}
                                > Save
                                </Button>
                            </div>
                            <div>
                                <TextField
                                fullWidth
                                value={username}
                                onChange={onChangeUsername}
                            />
                            </div>
                        </div>

                    ) : (
                        <div>
                            <div style={{"display":"flex"}}>
                                <p>Name:</p>
                                <Button
                                    className={classes.editNameButton}
                                    onClick={(e) => setEditName(true)}
                                > Edit
                                </Button>
                            </div>
                                <p>{username}</p>
                        </div>
                    )}
                </div>

                <div className={classes.signUpRow}>
                    <div style={{"display":"flex"}}>
                        <p style={{"marginBottom":"0px"}}>Password:</p>
                        <Button
                            className={classes.editPasswordButton}
                            onClick={props.onCancel}
                        >
                            Edit
                        </Button>
                    </div>
                    <TextField
                        label="Password"
                        fullWidth
                        value={password}
                        onChange={onChangePassword}
                        error={registerError !== ""}
                        onBlur={onBlurPassword}
                        type="password"
                    />
                </div>
                <div className={classes.signUpRow}>
                    <TextField
                        label="Repeat Password"
                        fullWidth
                        value={password2}
                        onChange={onChangePassword2}
                        error={registerError !== ""}
                        onBlur={onBlurPassword}
                        type="password"
                    />
                </div>
                <div className={classes.signUpRow}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={isAdmin}
                                onChange={(e) => setIsAdmin(e.target.checked)}
                                color="primary"
                            />
                        }
                        label="Is Admin"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={isCorporate}
                                onChange={(e) => setIsCorporate(e.target.checked)}
                                color="primary"
                            />
                        }
                        label="Check if you want a Corporate Account."
                    />
                </div>
                {isCorporate ? (
                    <div className={classes.signUpRow}>
                        <div className={classes.signUpRow}>
                            <TextField
                                label="compname"
                                fullWidth
                                value={compname}
                                onChange={onChangeCompname}
                            />
                        </div>
                        <div className={classes.signUpRow}>
                            <TextField
                                label="domains"
                                fullWidth
                                value={domains}
                                onChange={onChangeDomains}
                            />
                        </div>
                    </div>
                ) : null}
                {registerError !== "" ? (
                    <div className={classes.signUpRow}>
                        <Typography color="error">{registerError}</Typography>
                    </div>
                ) : null}
                <div
                    className={classes.signUpRow + " " + classes.signUpButtons}
                >
                    <Button
                        className={classes.signUpButton}
                        onClick={props.onCancel}
                    >
                        Cancel
                    </Button>
                    <Button
                        className={classes.signUpButton}
                        variant="contained"
                        color="primary"
                        onClick={onRegister}
                        disabled={
                            username === "" ||
                            password === "" ||
                            password2 === "" ||
                            registerError !== "" ||
                            password !== password2
                        }
                        type="submit"
                    >
                        Register
                    </Button>
                </div>
            </Paper>
        </div>
    );
}

export default EditProfileComponentOld;