import express , { Request , Response , NextFunction} from 'express';
import AppointmentModel from '../2-models/appointment-model';
import dataService from '../5-services/data-service';

const router = express.Router();

// GET http://localhost:4000/api/groups
router.get("/groups" , async (request : Request , response : Response , next : NextFunction)=>{
    try{
        const groups = await dataService.getAllGroups();
        response.json(groups);
    }
    catch(err:any){
        next(err);
    }
});

// GET http://localhost:4000/api/appointment-by-group/:groupid
router.get("/appointment-by-group/:groupId([0-9]+)" , async (request : Request , response : Response , next : NextFunction)=>{
    try{
        // Extract id:
        const groupId = +request.params.groupId;

        // Call service:
        const appointments = await dataService.getAllAppointmentsByGroupId(groupId);

        // Response:
        response.json(appointments);
    }
    catch(err:any){
        next(err);
    }
});

// POST http://localhost:4000/api/appointments
router.post("/appointments" , async (request : Request , response : Response , next : NextFunction)=>{
    try{
        // Extract from body:
        const appointment = new AppointmentModel(request.body);

        // Add through service:
        const addedAppointment = await dataService.addAppointment(appointment);

        // Response:
        response.status(201).json(addedAppointment);
    }
    catch(err:any){
        next(err);
    }
});


export default router;