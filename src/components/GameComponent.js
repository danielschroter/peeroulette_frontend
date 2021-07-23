import React, { useState, useEffect, useRef, Component } from "react";
// needed in tutorial
import io from "socket.io-client";

// needed for wheel
import { Wheel } from 'react-custom-roulette'
import Roulette from './Roulette'

// needed for table
import Table from 'react-bootstrap/Table'

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
    interestsButton: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
        fontSize: "15px",
        pointerEvents: "none",
    },
    talbeButton: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
        color: "black",
        fontSize: "15px",
    },
    roundButton: {
        backgroundColor: "#04AA6D",
        border: "none",
        color: "gold",
        padding: "20px",
        textAlign: "center",
        textDecoration: "none",
        display: "inlineBlock",
        fontSize: "15px",
        margin: "4px 2px",
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
function GameComponent(props) {
    const classes = useStyles();

    // user data
    const [thisUser_id, setThisUser_id] = React.useState("");

    const [otherUsername, setOtherUsername] = React.useState("");
    const [thisUsername, setThisUsername] = React.useState("");

    const [university, setUniversity] = React.useState("");
    const [organization, setOrganization] = React.useState("");

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

    // corporate Data
    const [compname, setCompname] = React.useState("");
    const [editCompname, setEditCompname] = React.useState(false);
    const [domains, setDomains] = React.useState("");
    const [editDomains, setEditDomains] = React.useState(false);
    const [changeState, setChangeState] = React.useState(false);

    const [userInterests, setUserInterests] = React.useState([]);
    const [peerInterests, setPeerInterests] = React.useState([]);
    const [commonInterests, setCommonInterests] = useState([]);
    const [wheelInterests, setwheelInterests] = useState([]);

    const bcrypt = require("bcryptjs");

    const extractUser = () => {
        if (!props.user) {
            return;
        }
        setThisUsername(props.user.username)
        setThisUser_id(props.user._id)

        // get common interests of both users
        if (props.commonInterests.length === 0) {
            UserService.getUser(props.user._id).then(function(userBackend) {
                setUserInterests(userBackend.interests)
                UserService.getUser(props.peer).then(function(peerBackend) {
                    setPeerInterests(peerBackend.interests)
                    let i = 0;
                    let userInterests = userBackend.interests;
                    let peerInterests = peerBackend.interests;
                    for (i; i < userInterests.length; i++) {
                        let j = 0;
                        for (j; j < peerInterests.length; j++) {
                            if (userInterests[i] === peerInterests[j]) {
                                commonInterests.push(userInterests[i])
                                props.commonInterests.push(userInterests[i])
                            }
                        }
                    }
                    setCommonInterests(commonInterests);
                });
            });
        }

        extractCommonInterests();

            // UserService.getUser(props.user._id).then(function(userBackend) {
        UserService.getUser(props.peer).then(function(userBackend) {
            setOtherUsername(userBackend.username);
            setInterests(userBackend.interests);
            setUniversity(userBackend.university);
            setOrganization(userBackend.organization);

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
        });
    };

    const extractCommonInterests = () => {
        let commonInterests = [];

        let i = 0;
        for (i; i < userInterests.length; i++) {
            let j = 0;
            for (j; j < peerInterests.length; j++) {
                if (userInterests[i] === peerInterests[j]) {
                    commonInterests.push(userInterests[i])
                }
            }
        }
        setCommonInterests(commonInterests);
    };

    const extractInterests = () => {
        UserService.getInterests().then(function(interestsBackend) {
            if (interestsBackend[0] !== undefined) {
                setAllInterests(interestsBackend[0].facebookInterests)
            }
        });
    };

    function duplicateInterest(newInterest, wheelInterests) {
        let i = 0;
        for (i; i < wheelInterests.length; i++) {
            if (wheelInterests[i] === newInterest) {
                return true
            }
        }
        return false;
    };

    const data = [
        { option: wheelInterests[0], style: { backgroundColor: '#ED7C31', textColor: 'black' } },
        { option: wheelInterests[1], style: { backgroundColor: 'black', textColor: 'white' } },
        { option: wheelInterests[2], style: { backgroundColor: '#ED7C31', textColor: 'black' } },
        { option: wheelInterests[3], style: { backgroundColor: 'black', textColor: 'white' } },
        { option: wheelInterests[4], style: { backgroundColor: '#ED7C31', textColor: 'black' } },
        { option: wheelInterests[5], style: { backgroundColor: 'black', textColor: 'white' } },
        { option: wheelInterests[6], style: { backgroundColor: '#ED7C31', textColor: 'black' } },
        { option: wheelInterests[7], style: { backgroundColor: 'black', textColor: 'white' } },
        { option: wheelInterests[8], style: { backgroundColor: '#ED7C31', textColor: 'black' } },
        { option: wheelInterests[9], style: { backgroundColor: 'black', textColor: 'white' } },
        { option: wheelInterests[10], style: { backgroundColor: '#ED7C31', textColor: 'black' } },
        { option: wheelInterests[11], style: { backgroundColor: 'black', textColor: 'white' } },
    ]

    const extractWheelInterests = () => {
        //console.warn("COMMON INTERESTS")
        //console.warn(commonInterests);

        UserService.getInterests().then(function(interestsBackend) {
            if (interestsBackend[0] !== undefined) {
                let allInterests = interestsBackend[0].facebookInterests;
                setAllInterests(allInterests)
                let i = 0;
                for (i; i < allInterests.length; i++) {
                    props.allFaceboookInterests.push(allInterests[i])
                }
            }
        });
        console.warn("PROPS ALL FACEBOOK INTERESTS")
        console.warn(props.allFaceboookInterests)

        {/*
        console.warn("ALL INTERESTS DEBUG")
        console.warn(props.allInterests)

        if (props.allInterests !== undefined) {
            let allInterestsBackend = props.allInterests;
            let allWheelInterests = [];
            let j = 0;

            console.warn("wheel interests should be empty")
            console.warn(allWheelInterests)

            console.warn("commoninterests ONLY")
            console.warn(commonInterests)
            for (j; j < commonInterests.length; j++) {
                console.warn("added common interest")
                allWheelInterests.push(commonInterests[j])
            }
            console.warn("wheel interests after adding common interests")
            console.warn(allWheelInterests)

            let fullInterestsNumber = 12 - commonInterests.length;
            let i = 0;
            for (i; i < fullInterestsNumber; i++) {
                if (i < commonInterests.length) {
                    allWheelInterests.push(commonInterests[i])
                    console.warn("added interest")
                    console.warn(commonInterests[i])
                } else {
                    let randomInterestIndex = Math.floor(Math.random() * allInterestsBackend.length);
                    let newInterest = allInterestsBackend[randomInterestIndex];
                    //if (!duplicateInterest(newInterest, wheelInterests)) {
                    if (true) {
                        allWheelInterests.push(newInterest)
                    } else {
                        i--;
                    }
                }
            }
            console.warn("Wheel interests")
            console.warn(allWheelInterests)
            setwheelInterests(allWheelInterests)
        }
            UserService.getInterests().then(function(interestsBackend) {
            if (interestsBackend[0] !== undefined) {
                setAllInterests(interestsBackend[0].facebookInterests[i])
                let i = 0;
                for (i; i < interestsBackend[0].facebookInterests.length; i++) {
                    props.allInterests.push(interestsBackend[0].facebookInterests[i])
                }
            }
        });
        */}

        //extractInterests();



        //console.warn("PROPS ALL INTERESTS DEBUG HANS")
        //console.warn(props.allInterests)
        //let interests = props.allInterests;
        //console.warn(interests)


        UserService.getInterests().then(function(interestsBackend) {
            if (interestsBackend[0] !== undefined) {
                let allInterestsBackend = interestsBackend[0].facebookInterests;
                let allInterestsWheel = []
                let j = 0;
                console.warn("wheel interests should be empty")
                console.warn(allInterestsWheel)

                //console.warn("commoninterests ONLY")
                //console.warn(commonInterests)
                for (j; j < commonInterests.length; j++) {
                    allInterestsWheel.push(commonInterests[j])
                }
                console.warn("wheel interests after adding common interests")
                console.warn(allInterestsWheel)

                let fullInterestsNumber = 12;
                fullInterestsNumber = fullInterestsNumber - commonInterests.length;
                let i = 0;
                for (i; i < fullInterestsNumber; i++) {
                    if (i < commonInterests.length) {
                        allInterestsWheel.push(commonInterests[i])
                        console.warn("added interest")
                        console.warn(commonInterests[i])
                    } else {
                        let randomInterestIndex = Math.floor(Math.random() * allInterestsBackend.length);
                        let newInterest = allInterestsBackend[randomInterestIndex];
                        //if (!duplicateInterest(newInterest, wheelInterests)) {
                        if (true) {
                            allInterestsWheel.push(newInterest)
                        } else {
                            i--;
                        }
                    }
                }
                console.warn("Wheel interests")
                console.warn(allInterestsWheel)
                setwheelInterests(allInterestsWheel)
            }
        });

        console.warn("WHEEL INTERESTS")
        console.warn(wheelInterests)
    };

    // data lucky wheel


    // code for socket io

    const [yourID, setYourID] = useState();
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState([]);
    const [mustspin, setMustspin] = useState(false);
    const [newPrizeNumber, setNewPrizeNumber] = useState(0);
    const [endSpin, setEndSpin] = useState(false);

    const [thisUserBet, setThisUserBet] = useState("");
    const [otherUserBet, setOtherUserBet] = useState("");

    const [userColour, setUserColour] = useState("white");
    const white = "white";

    const socketRef = useRef();

    useEffect(() => {
        extractUser();
        extractInterests();

        extractWheelInterests();

        // code for socket io
        socketRef.current = io.connect('/');

        socketRef.current.on("your id", id => {
            setYourID(id);
        })

        socketRef.current.on("message", (message) => {
            receivedMessage(message);
            if (message !== undefined) {
                let idOfUserSpinnedWheel = message.body[1];
                let idOfPeerOfUserSpinnedWheel = message.body[2];

                let thisUserSpinnedWheel = idOfUserSpinnedWheel === props.user._id && idOfPeerOfUserSpinnedWheel === props.peer;
                let peerUserSpinnedWheel = idOfUserSpinnedWheel === props.peer && idOfPeerOfUserSpinnedWheel === props.user._id;

                let blockSpin = message.body[4];

                // set other user bet only if message comes from peet
                if (peerUserSpinnedWheel) {
                    setOtherUserBet(message.body[3])
                }

                // spin wheel only in match of two peers
                if (thisUserSpinnedWheel || peerUserSpinnedWheel) {
                    if (!blockSpin) {
                        setMustspin(true);
                    }
                }
            }
        })

    }, [props.user, props.body]);

    // code for socket io
    function receivedMessage(message) {
            let tmp = messages;
            tmp.push(message.body)
            setMessages(tmp);
            setNewPrizeNumber(message.body[0])
            setEndSpin(false);
    }

    function sendMessage(e) {
        e.preventDefault();
        extractUser();

        let newPrizeNumber = Math.floor(Math.random() * data.length);
        console.log(newPrizeNumber)
        setNewPrizeNumber(newPrizeNumber)

        let userBet = props.userBet[0];

        // store id's of both users to ensure that wheel only spins on the match between both users
        // add other userBet to variables
        let messageBody = [newPrizeNumber, props.user._id, props.peer, userBet, props.blockSpin[0]]

        const messageObject = {
            body: messageBody,
            id: thisUser_id,
        };

        socketRef.current.emit("send message", messageObject);
    }

    // props for all grid items used below in the JSX
    const girdItemProps = {
        item: true,
        className: classes.padding,
    };

    // creating a object with all relevant data to update a user
    const packUser = () => {
        let back = {
            ...props.user,
        };

        back.username = otherUsername;
        back.interests = interests;
        back.university = university;
        back.organization = organization;

        return back;
    };

    console.log( interests );

    function handleChange(e) {
        setMessage(otherUsername);
        setBlockSpin(false);
        setEndSpin(false);

        sendMessage(e);
        extractUser();
    };

    const handleOnComplete = (value) => {
        console.log(value);
    };

    const options = [
        "war",
        "pain",
        "words",
        "love",
        "life",
    ];

    const setBlockSpin = (bool) => {
        resetBlockSpin();
        props.blockSpin.push(bool);
    }

    const resetBlockSpin = () => {
        let i = 0;
        for (i; i < props.blockSpin.length; i++) {
            props.blockSpin.splice(i, 1)
        }
    };

    const setPeerBet = (bet) => {
        resetPeerBet();
        props.userBet.push(bet);
    };

    const resetPeerBet = () => {
        let i = 0;
        for (i; i < props.userBet.length; i++) {
            props.userBet.splice(i, 1)
        }
    };


        return (
            <div>
                <Paper style={{ padding: 20, "backgroundColor":"#484848",
                    display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Wheel
                            mustStartSpinning={mustspin}
                            prizeNumber={newPrizeNumber}
                            data={data}
                            backgroundColors={['#3e3e3e', '#df3428']}
                            textColors={['#ffffff']}
                            onStopSpinning={() => {
                                setMustspin(false)
                                setEndSpin(true)
                            }}
                        />
                </Paper>
                <Paper style={{ padding: 20, "backgroundColor":"#484848"}}>
                    <Button
                        onClick={handleChange}
                        variant="contained"
                        color="primary"
                        className={classes.deleteProfileButton}
                        style={{"backgroundColor":"#ED7C31"}}
                    >
                        Spin Wheel
                    </Button>
                    { commonInterests.length === 1  ? (
                        <Typography variant="h5" style={{"marginTop":"15px", "color":"white"}}>You have {commonInterests.length} common interest.</Typography>
                    ) : (
                        <Typography variant="h5" style={{"marginTop":"15px", "color":"white"}}>You have {commonInterests.length} common interests!</Typography>
                    ) }
                    <Typography variant="h5" style={{"marginTop":"15px", "color":"white"}}>Spin the wheel to find out which one!</Typography>
                    { endSpin  ? (
                        <Typography variant="h5" style={{"marginTop":"15px", "color":"white"}}>Spinned interest: {data[newPrizeNumber].option}</Typography>
                        ) : (
                        <Typography variant="h5" style={{"marginTop":"15px", "color":"white"}}>Spinned interest:</Typography>
                    ) }
                    { thisUserBet == data[newPrizeNumber].option && thisUserBet == data[newPrizeNumber].option == otherUserBet && endSpin? (
                        <Typography variant="h5" style={{"marginTop":"15px", "color":"white"}}>It's a draw! You both win!</Typography>
                    ) : null }
                    { thisUserBet == data[newPrizeNumber].option && endSpin ? (
                        <Typography variant="h5" style={{"marginTop":"15px", "color":"white"}}>Winner: {thisUsername}</Typography>
                    ) : null }
                    { otherUserBet == data[newPrizeNumber].option && endSpin? (
                        <Typography variant="h5" style={{"marginTop":"15px", "color":"white"}}>Winner: {otherUsername}</Typography>
                    ) : null }

                </Paper>
                <Paper style={{ padding: 20 , "backgroundColor":"green"}}>
                    <Typography style={{"color":"gold"}}>Bet {thisUsername}: {thisUserBet} </Typography>
                    <Typography style={{"color":"gold"}}>Bet {otherUsername}: {otherUserBet} </Typography>

                    <Table striped bordered hover size="sm">
                        <tbody>
                        <tr>
                            {(() => {
                                let i = 0;
                                let dataTable = [];
                                for (i; i < data.length; i++) {
                                    dataTable.push(<button className={classes.roundButton} value={i}
                                                           onClick={(e) => {
                                                               setThisUserBet(data[e.target.value].option);
                                                               setBlockSpin(true);
                                                               setPeerBet(data[e.target.value].option, true)
                                                               sendMessage(e)
                                    }}>{data[i].option}</button>);
                                }
                                return dataTable;
                            })()}
                        </tr>
                        </tbody>
                    </Table>
                </Paper>
            </div>
        );
    }

// gameValues is Array which stores messages that are sent between users
// gameValues[ userBet, blockSpin, ... ]

// attributes of props and their type
GameComponent.propTypes = {
    user: PropTypes.object,
    onGetUser: PropTypes.func,
    gameValues: PropTypes.array,
    userBet: PropTypes.array,
    peerBet: PropTypes.array,
    commonInterests: PropTypes.array,
    blockSpin: PropTypes.array,
    allFaceboookInterests: PropTypes.array,
};

// withRouter() allows accsing the necessary functionality to navigate from this component
export default GameComponent;