class AppointmentModel {

    public appointmentId : number;
    public groupId : number;
    public start : string;
    public end : string;
    public description : string;
    public room : string;
    
    public constructor(appointment : AppointmentModel){
        this.appointmentId = appointment.appointmentId;
        this.groupId = appointment.groupId;
        this.start = appointment.start;
        this.end = appointment.end;
        this.description = appointment.description;
        this.room = appointment.room;
    }
}

export default AppointmentModel;