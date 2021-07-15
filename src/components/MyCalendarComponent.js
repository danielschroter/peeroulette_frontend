import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import AppointmentService from "../services/AppointmentService";
import {ViewState, EditingState, IntegratedEditing} from '@devexpress/dx-react-scheduler';
import Link from 'react-router-dom/Link';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Autocomplete from "@material-ui/lab/Autocomplete";
import Chip from "@material-ui/core/Chip";
import {
    Scheduler,
    Toolbar,
    DateNavigator,
    Appointments,
    AppointmentForm,
    AppointmentTooltip,
    WeekView,
    EditRecurrenceMenu,
    AllDayPanel,
    ConfirmationDialog,
    TodayButton,

} from '@devexpress/dx-react-scheduler-material-ui';
import {withStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import UserService from "../services/UserService";
import {useSelector} from "react-redux";


const style = ({palette}) => ({
    icon: {
        color: palette.action.active,
    },
    textCenter: {
        textAlign: 'Center',
    },
    firstRoom: {
        background: 'url(https://js.devexpress.com/Demos/DXHotels/Content/Pictures/Lobby-4.jpg)',
    },
    secondRoom: {
        background: 'url(https://js.devexpress.com/Demos/DXHotels/Content/Pictures/MeetingRoom-4.jpg)',
    },
    thirdRoom: {
        background: 'url(https://js.devexpress.com/Demos/DXHotels/Content/Pictures/MeetingRoom-0.jpg)',
    },
    header: {
        height: '260px',
        backgroundSize: 'cover',
    },
    commandButton: {
        backgroundColor: 'rgba(255,255,255,0.65)',
    },
});


const messages = {
    moreInformationLabel: '',
};

const TextEditor = (props) => {
    if(props.type === 'multilineTextEditor'){
        return null;
    }return <AppointmentForm.TextEditor {...props} />
}

const BasicLayout = ({onFieldChange, appointmentData, ...restProps}) => {

    const values = ["hello", "world", "was ", "ist ", "denn ", "das ", "für ", "ein ", "Selektor"];

    const currencies = [
        {
            value: 'USD',
            label: '$',
        },
        {
            value: 'EUR',
            label: '€',
        },
        {
            value: 'BTC',
            label: '฿',
        },
        {
            value: 'JPY',
            label: '¥',
        },
    ];


    const onURLFieldChange = (nextValue) => {
        onFieldChange({link: nextValue})
    };

    const onDescriptionFieldChange = (nextValue) => {
        onFieldChange({description: nextValue})
    };

    const onInterestFieldChange = (event, nextValue) => {
        onFieldChange({interests: nextValue})
    };

    return (
        <AppointmentForm.BasicLayout
           appointmentData={appointmentData}
           onFieldChange={onFieldChange}
            {...restProps}
            >
            <AppointmentForm.Label
                text = "Video URL"
                type = "title"
                />
            <AppointmentForm.TextEditor
                value={appointmentData.link}
                placeholder="We will automatically set this value after saving :)"
                onValueChange={onURLFieldChange}
                readOnly
                />
            <AppointmentForm.Label
                text = "Description"
                type = "title"
            />
            <AppointmentForm.TextEditor
                type='multilineTextEditor'
                value={appointmentData.description}
                placeholder="Description Field"
                onValueChange={onDescriptionFieldChange}
            />

            <AppointmentForm.Label
                style={{'marginTop':'20px'}}
                text = "Interests"
                type = "title"
            />

            <Autocomplete
                style={{'marginTop':'10px'}}
                multiple
                id="tags-outlined"
                options={values}
                getOptionLabel={(option) => option}
                defaultValue={appointmentData.interests}
                filterSelectedOptions
                onChange={onInterestFieldChange}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="outlined"
                        label="Your Interests"
                        placeholder="Your Labels"
                    />
                )}
            />

        </AppointmentForm.BasicLayout>
    );
};

const appointments = [
    {
        id: 234234,
        startDate: '2021-07-13T10:45',
        endDate: '2021-07-13T12:45',
        title: 'Gym',
        link: "Jitsi URL1",
        description: "Get ready in the gym for summer"
    },
    {
        id: 12312323,
        startDate: '2021-07-13T17:30',
        endDate: '2021-07-13T19:30',
        title: 'DeepL Exam',
        link: "Jitsi URL2",
        description: "Make an Exam in DeepLearning Test"
    },
];



export default class MyCalendarComponent extends React.PureComponent {



    constructor(props) {
        super(props);
        this.state = {
            data: appointments,
            currentDate: '2021-07-13',
            addedAppointment: {},
            appointmentChanges: {},
            editingAppointment: undefined,
            user: props.user,
            interests: ["was", "für"],
            mappings: {},
        };
        this.currentDataChange = (currentDate) => {
            this.setState({currentDate});
        };
        this.commitChanges = this.commitChanges.bind(this);
        this.changeAddedAppointment = this.changeAddedAppointment.bind(this);
        this.changeAppointmentChanges = this.changeAppointmentChanges.bind(this);
        this.changeEditingAppointment = this.changeEditingAppointment.bind(this);
    }

    mapAppointmentData = (appointment) => ({
        id: appointment._id,
        startDate: appointment.startDate,
        endDate: appointment.endDate,
        title: appointment.title,
        description: appointment.description,
        link: appointment.link,
        user: appointment.user,
        interests:["was", "für"],
    });

    async componentDidMount() {
        let response = await AppointmentService.getAppointments();
        let apps = response.appointments;
        let mapping = response.mapping;
        // for (var i in response){
        //     try{
        //         const u = await UserService.getUser('' + response[i].user);
        //         console.log("u " + u);
        //     }catch (e) {
        //
        //     }
        //
        // }
        console.log("vorher" + mapping[apps[0].user]);
        // const val =  mapping[apps[0].user];
        // apps[0].user = val;
        console.log("nachher" + mapping[apps[0].user]);
        let res_mapped = apps.map(this.mapAppointmentData, mapping);
        // for (var i in res_mapped){
        //     const val = mapping[apps[i].user];
        //     res_mapped[i].user = val;
        // }
        this.setState({data: res_mapped, mapping: mapping});
    }



    changeAddedAppointment(addedAppointment) {
        this.setState({addedAppointment});
    }

    changeAppointmentChanges(appointmentChanges) {
        this.setState({appointmentChanges});
    }

    changeEditingAppointment(editingAppointment) {
        this.setState({editingAppointment});
    }

    async commitChanges({added, changed, deleted}) {
        var app = null;

        if (added){
            try{
                added["user"] = this.state.user._id;
                added["link"] = "localhost:3000/call/"+Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
                const response = await AppointmentService.createAppointment(added);
                app = response.map(this.mapAppointmentData)[0];
            }catch (e) {
                return e;
            }
        }
        this.setState((state) => {
            let {data} = state;
            if (added) {
                //const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
                data = [...data, {id: app.id, ...added}];
            }
            if (changed) {

                data = data.map(appointment => (
                    changed[appointment.id] ? {...appointment, ...changed[appointment.id]} : appointment));
                const key = Object.keys(changed)[0];
                var obj = null;
                for(var i in data){
                    if(data[i].id == key){
                        // Add an element to the dictionary
                        obj = data[i];
                        const resp = AppointmentService.updateAppointment(obj);
                        console.log("resp: " + resp);
                        break; // If you want to break out of the loop once you've found a match
                    }
                }



            }
            if (deleted !== undefined) {
                data = data.filter(appointment => appointment.id !== deleted);
                AppointmentService.deleteAppointment(deleted);
            }
            console.log(data);
            return {data};
        });
    }

    render() {
        const {
            currentDate, data, addedAppointment, appointmentChanges, editingAppointment,
        } = this.state;

        const Content = withStyles(style, {name: 'Content'})(({
                                                                  children, appointmentData, classes, ...restProps
                                                              }) => (
            <AppointmentTooltip.Content {...restProps} appointmentData={appointmentData}>
                <Grid container alignItems="center">
                    <Grid item xs={2} className={classes.textCenter}>
                        <span>Link: </span>
                    </Grid>
                    <Grid item xs={10}>
                    {
                        appointmentData.link ?
                            (
                                <Link to={appointmentData.link.split("3000")[1]}>{appointmentData.link}</Link>
                            ):
                            (<Link to="#">{appointmentData.link}</Link>)
                    }
                    </Grid>
                    <Grid item xs={2} className={classes.textCenter}>
                        <span>What: </span>
                    </Grid>
                    <Grid item xs={10}>
                        <span>{appointmentData.description}</span>
                    </Grid>
                    <Grid item xs={2} className={classes.textCenter}>
                        <span>Who: </span>
                    </Grid>
                    <Grid item xs={10}>
                        <span>{this.state.mapping[appointmentData.user]}</span>
                    </Grid>
                </Grid>
            </AppointmentTooltip.Content>
        ));

        return (
            <Paper>
                <Scheduler
                    data={data}
                    height={660}
                >
                    <ViewState
                        currentDate={currentDate}
                        onCurrentDateChange={this.currentDataChange}
                    />
                    <EditingState
                        onCommitChanges={this.commitChanges}
                        addedAppointment={addedAppointment}
                        onAddedAppointmentChange={this.changeAddedAppointment}
                        appointmentChanges={appointmentChanges}
                        onAppointmentChangesChange={this.changeAppointmentChanges}
                        editingAppointment={editingAppointment}
                        onEditingAppointmentChange={this.changeEditingAppointment}
                    />
                    <WeekView
                        startDayHour={0}
                        endDayHour={24}
                    />
                    <Toolbar/>
                    <DateNavigator/>
                    <AllDayPanel/>
                    <TodayButton/>
                    <EditRecurrenceMenu/>
                    <ConfirmationDialog/>
                    <Appointments/>
                    <AppointmentTooltip
                        contentComponent={Content}
                        showOpenButton
                        showDeleteButton
                    />
                    <AppointmentForm
                    basicLayoutComponent={BasicLayout}
                    // textEditorComponent={TextEditor}
                    messages={messages}/>
                </Scheduler>
            </Paper>
        );
    }
}