import dal from "../4-utils/dal"
import { OkPacket } from "mysql"
import GroupModel from "../2-models/group-model"
import AppointmentModel from "../2-models/appointment-model";
import { ValidationError } from "../2-models/client-errors";


async function getAllGroups() : Promise<GroupModel[]>{

    // SQL:
    const sql = 'select * from groups';

    // Execute:
    const groups = await dal.execute(sql);

    // Return:
    return groups;
}

async function getAllAppointmentsByGroupId(groupId : number) : Promise<AppointmentModel[]>{


    // SQL:
    const sql = "SELECT * FROM appointments where groupId = ?";

    // Execute:
    const appointments = await dal.execute(sql , [groupId]);

    // Return:
    return appointments;
}

async function addAppointment(appointment : AppointmentModel) : Promise<AppointmentModel> {

    
    // Check for overlapping appointments:
    const appointments = await getAllAppointmentsByGroupId(appointment.groupId);
    const overlapping = appointments.some((a) => {
        const start1 = new Date(a.start).getTime();
        const end1 = new Date(a.end).getTime();
        const start2 = new Date(appointment.start).getTime();
        const end2 = new Date(appointment.end).getTime();
        return (start1 < end2 && end1 > start2);
    });

    if (overlapping) {
        throw new ValidationError("Another appointment already exists for this group during the specified time.");
    }

    // Check for valid start and end times:
    const startTime = new Date(appointment.start).getTime();
    const endTime = new Date(appointment.end).getTime();
    if (endTime <= startTime) {
        throw new ValidationError("The end time must be after the start time.");
        }

    // SQL:
    const sql = 'INSERT INTO appointments values (DEFAULT , ? , ? , ? , ? , ?)';

    // Execute:
    const result : OkPacket = await dal.execute(sql , [appointment.groupId , appointment.start , appointment.end , appointment.description , appointment.room]);

    // Insert id:
    appointment.appointmentId = result.insertId;

    // Return added appointment:
    return appointment;
}



export default {
    getAllGroups,
    getAllAppointmentsByGroupId,
    addAppointment
}