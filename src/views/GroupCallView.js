import React, {useState, useEffect} from 'react'
import {withRouter} from "react-router-dom";
import {connect, useSelector} from "react-redux";

import {makeStyles} from "@material-ui/core/styles";
import {AppBar, IconButton, Toolbar, Typography, Container, Grid, Button, Paper} from "@material-ui/core";
import {Jutsu, useJitsi} from 'react-jutsu'
import ParticleBackground from "../components/ParticleBackground";

import {
    login,
    register,
    changeUser,
    getUser,
    deleteUser,
    deleteOrganization,
    changeOrganization,
    registerOrganization
} from "../redux/actions";
import PeerInformation from "../components/PeerInformation";
import GameComponent from "../components/GameComponent";

import UserService from "../services/UserService";


function CallView(props) {
    const user = useSelector((state) => state.user.user);


    const onGetUser = (id) => {
        props.dispatch(getUser(id));
    };

    const [room, setRoom] = useState('')
    const [name, setName] = useState('')
    const [call, setCall] = useState(false)
    const [password, setPassword] = useState('')


    useEffect(() => {
    }, [user, props.history]);

    const handleClick = event => {
        event.preventDefault()
        if (room && name) setCall(true)
    }

    let {match} = props;
    console.log(match);

    let roomArray = [user._id, match.params.id];
    console.log(roomArray);
    roomArray.sort();
    console.log(roomArray);
    let roomName = roomArray[0] + roomArray[1];
    console.log(roomName);


    const jitsiConfig = {
        roomName: roomName,
        // displayName: 'David Osterberger',
        // userInfo: {
        //     email: 'david@osterberger.eu',
        //     displayName: 'David Osterberger'
        // },
        subject: 'peeroulette',
        password: 'asamplepasswordforpeeroulette',
        parentNode: 'jitsi-container',
        width: '100%',
        height: '100%',
        configOverwrite: {
            startWithAudioMuted: false,
            enableWelcomePage: false,
        },
        interfaceConfigOverwrite: {
            DEFAULT_REMOTE_DISPLAY_NAME: 'Fellow Peer',
            DISPLAY_WELCOME_FOOTER: false,
            DISPLAY_WELCOME_PAGE_ADDITIONAL_CARD: false,
            DISPLAY_WELCOME_PAGE_CONTENT: false,
            DISPLAY_WELCOME_PAGE_TOOLBAR_ADDITIONAL_CONTENT: false,
            RECENT_LIST_ENABLED: false,
            SETTINGS_SECTIONS: [],
            SHARING_FEATURES: [],
            SHOW_JITSI_WATERMARK: false,
            GENERATE_ROOMNAMES_ON_WELCOME_PAGE: false,
        },
    };

    const {loading, error, jitsi} = useJitsi(jitsiConfig);

    const extractAllInterests = () => {
        UserService.getInterests().then(function (interestsBackend) {
            if (interestsBackend[0] !== undefined) {
                //setAllInterests(interestsBackend[0].facebookInterests);
                return interestsBackend[0].facebookInterests;
            }
        });
    };

    const tmpInterests = extractAllInterests();

    return (
        //<Grid
        //   container
        //   direction="row"
        //   justifyContent="center"
        //   alignItems="flex-start"
        //   style={{height:"100%"}}
        //   spacing="2"
        //>
        <div>
            <ParticleBackground></ParticleBackground>
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                }}
            >

                <Grid container spacing={3} style={{height: "100%", padding: 20}}>
                    <Grid item xs>
                        {/*<Paper style={{ padding: 20 }}>xs</Paper>*/}
                    </Grid>
                    <Grid item xs={6} style={{height: "100%"}}>
                        <Paper style={{height: "100%", padding: 20}}>
                            <div style={{height: "100%"}}>
                                {/*{error && <p>{error}</p>}*/}
                                <div style={{height: "100%"}} id={jitsiConfig.parentNode}/>
                                {/*<Typography variant="h1">Jitsi</Typography>*/}
                            </div>
                        </Paper>
                    </Grid>
                    <Grid item xs>

                    </Grid>


                </Grid>

            </div>
        </div>
    );
}

export default connect()(CallView);
