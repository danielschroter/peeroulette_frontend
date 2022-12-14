import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from "@material-ui/core/Box";
import corporation from "../assets/corporation_1.jpg";
import Paper from "@material-ui/core/Paper";
import zoom_1 from "../assets/zoom_1.png";
import group_1 from "../assets/group_1.jpg";
import background from "../assets/corporation_1.jpg";
import StepperComponent from "./StepperComponent";
import BusinessIcon from '@material-ui/icons/Business';
import ParticleBackground from "./ParticleBackground";

const useStyles = makeStyles((theme) => ({
        root: {
            minHeight: '100vh',
            backgroundImage: `url(${background})`,
            // backgroundImage: "%PUBLIC_URL%/assets/bg_1.png",
            // backgroundImage: process.env.PUBLIC_URL + '/img/logo.png',
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
        },
        backCover: {
            position: 'absolute',
            height: "97%",
            width: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        content: {
            display: 'flex',
            color: "#fafafa",
            justifyContent: 'center',
            //alignItems: 'center',
            // textAlign: 'center',
        },
        paper: {
            background: 'rgba(0,0,0,0)',
            color: '#fff',
        },
        rootCard: {
            maxWidth: 645,
            background: 'rgba(0,0,0,0)',
            color: "#fafafa",
            margin: "20px",
        },
        media: {
            height: 440,
        },
        title: {
            fontSize: "2rem",
            fontWeight: "bold",
            color: "#fafafa",
        },
        description: {
            fontSize: "1.1rem",
            color: "#fff",

            //textAlign: "center",
        },
        corporateIcon: {
            textAlign: "center",
        },

    }))
;

export default function CorporatePaperComponent() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.backCover}>

                <ParticleBackground/>
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "inherit",
                    }}
                >
                    <div className={classes.content}>
                        <div>

                            <Box className={classes.corporateIcon} pt={10}>
                                <BusinessIcon style={{fontSize: "6rem"}} color="primary"/> <br/>
                            </Box>
                            <Box pt={2}>


                                <Typography variant="h4" align="center">
                                    Fostering corporate cultures with peeroulette...
                                </Typography>


                            </Box>

                            <Box pt={5}>

                                <Typography className={classes.description} align="center">
                                    We verify the members of your company by their e-mail domains.<br/>
                                    We ensure that your employees are only matched with each other if they choose so.<br/>
                                </Typography>

                            </Box>

                            <Box pt={10}>

                                <StepperComponent></StepperComponent>

                            </Box>


                        </div>

                        {/*<Card className={classes.rootCard}>*/}
                        {/*    <CardActionArea>*/}
                        {/*        <CardMedia*/}
                        {/*                className={classes.media}*/}
                        {/*                component="img"*/}
                        {/*                image ={corporation}*/}
                        {/*                title={ "corporation"}*/}
                        {/*            />*/}
                        {/*        <CardContent>*/}
                        {/*            <Typography className={classes.title} gutterBottom variant="h5" component="h2">*/}
                        {/*                Corporation Accounts*/}
                        {/*            </Typography>*/}

                        {/*            <Typography variant="body2" color="textSecondary" component="p" className={classes.description}>*/}
                        {/*                "Here is going to be the Text for the Corporate Accounts"*/}
                        {/*            </Typography>*/}
                        {/*        </CardContent>*/}
                        {/*    </CardActionArea>*/}
                        {/*    <CardActions>*/}
                        {/*        <Button size="small" color="primary">*/}
                        {/*            Match*/}
                        {/*        </Button>*/}
                        {/*    </CardActions>*/}
                        {/*</Card>*/}

                    </div>
                </div>

            </div>
        </div>
    );
}