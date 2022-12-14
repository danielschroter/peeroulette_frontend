import React, { useEffect } from "react";
import { Route , withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
    Button,
    TextField,
    Grid,
    Typography,
    Paper,
} from "@material-ui/core";
import CustomTextField from "./CustomTextField";
import DetailsArea from "./DetailsArea";
import PropTypes from "prop-types";
import UserService from "../services/UserService";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MatchDBService from "../services/MatchDBService";


const useStyles = makeStyles((theme) => ({
    flexCol: {
        display: "flex",
        flexDirection: "column",
    },
    flexRow: {
        display: "flex",
        flexDirection: "row",
    },
    justifySpaceBetween: {
        justifyContent: "space-between",
    },
    flex: {
        flex: 1,
    },
    flexEnd: {
        justifyContent: "flex-end",
    },
    marginSides: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    center: {
        margin: "auto",
    },
    padding: {
        padding: theme.spacing(2),
    },
    maxWidth: {
        width: "100%",
        maxWidth: "1500px",
    },
    pageArea: {
        paddingBottom: theme.spacing(2),
        "&:last-child": {
            paddingBottom: 0,
        },
    },
    title: {
        marginTop: theme.spacing(4),
    },
    barMinHeight: {
        minHeight: theme.spacing(5),
        position: "absolute",
        top: theme.spacing(1),
        right: theme.spacing(2),
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
    userDataFont: {
        color: "black",
        fontWeight: "bold",
    },
    deleteProfileButton: {
        marginRight: theme.spacing(1),
        backgroundColor:"#cc0000",
        marginTop:"12px",
    },
    editNameButton: {
        marginRight: theme.spacing(1),
        marginLeft: theme.spacing(1),
    },
    cancelNameButton: {
        marginRight: theme.spacing(1),
        marginLeft: theme.spacing(1),
    },
    saveNameButton: {
        marginRight: theme.spacing(1),
    },
    cancelPasswordButton: {
        marginRight: theme.spacing(1),
        marginLeft:theme.spacing(1),
    },
    savePasswordButton: {
        marginRight: theme.spacing(1),
    },
    editPasswordButton: {
        marginRight: theme.spacing(1),
        marginLeft: theme.spacing(1),
    },
    interestsButton: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
        fontSize: "15px",
        pointerEvents: "none",
    },
    deleteInterestsIcon: {
        marginTop: theme.spacing(1),
        fontSize: "15px",
        pointerEvents: "none",
    },
    deleteInterestsCross: {
        marginTop: theme.spacing(1),
        fontSize: "15px",
        marginRight: theme.spacing(1),
        color:"#cc0000",
    },
    addInterestsIcon: {
        marginTop: theme.spacing(1),
        fontSize: "15px",
        marginRight: theme.spacing(1),
        color:"green",
    },
    addInterestsButton: {
        marginTop: theme.spacing(2),
        marginRight: theme.spacing(1),
        backgroundColor:"green",

    },
    deleteInterestsButton: {
        marginTop: theme.spacing(2),
        marginRight: theme.spacing(1),
        backgroundColor:"#cc0000",
    },

}));

/**
 * For register new users
 * @param {props} props
 */
function PeerInformation(props) {
    const classes = useStyles();

    // user data
    const [_id, set_id] = React.useState("");
    const [username, setUsername] = React.useState("");
    const [matchedCount, setMatchedCount] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [password2, setPassword2] = React.useState("");
    const [city, setCity] = React.useState("");
    const [university, setUniversity] = React.useState("");
    const [organization, setOrganization] = React.useState("");

    const [refresh, setRefresh] = React.useState(0);

    //interests
    const [interests, setInterests] = React.useState([""]);
    const [allInterests, setAllInterests] = React.useState([]);
    const [editInterests, setEditInterests] = React.useState(false);
    const [deleteInterests, setDeleteInterests] = React.useState(false);
    const [addInterests, setAddInterests] = React.useState(false);
    const [search, setSearch] = React.useState("");

    // identify coperate accounts
    const [corporate_id, setCorporate_id] = React.useState("");
    const [isCorporate, setIsCorporate] = React.useState(false);
    const [curPage, setCurPage] = React.useState(0);
    // corporate Data
    const [compname, setCompname] = React.useState("");
    const [editCompname, setEditCompname] = React.useState(false);
    const [domains, setDomains] = React.useState("");
    const [editDomains, setEditDomains] = React.useState(false);
    const bcrypt = require("bcryptjs");

    // extract all the user data from the backend
    const extractUser = () => {
        if (!props.user) {
            return;
        }

        // UserService.getUser(props.user._id).then(function(userBackend) {
            UserService.getAvailable(props.user._id, curPage).then(function(userBackend) {
                set_id(userBackend._id);
                setUsername(userBackend.username);
                setMatchedCount(userBackend.matchedCount);
                setCity(userBackend.city);
                // setInterests(userBackend.interests);
                setUniversity(userBackend.university);

                if (userBackend.organization !== undefined) {
                    UserService.getOrganization(userBackend.organization).then(function (organizationBackend) {
                        setOrganization(organizationBackend.company_name)
                    })
                }


                console.log("BACKEND:");
                console.log(userBackend);

                if (userBackend.account_owner_of_organization !== undefined) {
                    setIsCorporate(true);
                    UserService.getOrganization(userBackend.account_owner_of_organization).then(function(organizationBackend) {
                        setCompname(organizationBackend.company_name);
                        setDomains(organizationBackend.domains);
                        setCorporate_id(organizationBackend._id);
                    });
                } else {
                    setIsCorporate(false);
                }
            }).catch(function(error){
                  //400+ response codes
                  setUsername('Nope');
                  console.log("No Match");
            });
    };

    const userIsOnline = async () => {
        // console.log("isOnline");
        if (!props.user) {
            return;
        }
        let uID = await props.user._id;
        // console.log("u Online: "+uID);
        if(uID != ""){
            await UserService.onlineUser(uID).then(function(userBackend) {
                // console.log("written online to db: "+uID+" & "+uID);
            }).catch(function(error){
                //400+ response codes
                // console.log("error in writing online to db");
            });
        }
    };

    useEffect(() => {
        extractUser();
        userIsOnline();
    }, [props.user, curPage, refresh]);

    console.log({_id});
    console.log(username);
    console.log(props);

    if(username == 'Nope'){
      return (
        <Paper style={{ padding: 20 }}>
            <Typography variant="h4">No Match found</Typography>
            <Typography variant="h5">Sorry, we couldn't find a fitting match for you. Please try again later or try to add more Interests in your Profile!</Typography>
            <Button
                variant="contained"
                color="primary"
                className={classes.deleteProfileButton}
                // onClick={() => { window.location.href = "/wait/"+(curPage+1); }}
                onClick={() => {
                    setRefresh(refresh+1);
                    setCurPage(0)
                }}
            >
                Retry
            </Button>
        </Paper>
      );
    }else{
      return (
        <Paper style={{ padding: 20 }}>
            <Typography variant="h4">{username} </Typography>
            <Typography><strong variant="h5">Common Interests: {matchedCount}</strong></Typography>
            <Typography variant="h5">Information about {username}</Typography>
            <ul>
                <li>{city}</li>
                <li>{university}</li>
                {(organization!=="") ? <li>{organization}</li> : null }
            </ul>
            {/*<Typography variant="h5">Interests</Typography>
            <ul>
                {interests.map(interest => {
                      return <li>{interest}</li>;
                })}
            </ul> */}
            <Button
                variant="contained"
                color="primary"
                className={classes.deleteProfileButton}
                onClick={() => props.history.push("/lobby/"+_id)}
            >
              Start call
            </Button>
            <Button
                variant="contained"
                color="primary"
                className={classes.deleteProfileButton}
                // onClick={() => { window.location.href = "/wait/"+(curPage+1); }}
                // onClick={() => props.history.push("/wait/"+(curPage+1))}
                onClick={() => setCurPage(curPage+1)}
            >
              Look for a new Match
            </Button>
        </Paper>
      );
    }
}

// attributes of props and their type
PeerInformation.propTypes = {
    user: PropTypes.object,
    onGetUser: PropTypes.func,
};

// withRouter() allows accsing the necessary functionality to navigate from this component
export default withRouter(PeerInformation);
