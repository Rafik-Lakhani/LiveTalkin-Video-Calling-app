import { Router } from "express";
const router = Router();
import { createMetting,joinMeeting } from "../controllers/meeting.controller";


router.get('/create-meeting',createMetting);
router.get('/join-meeting',joinMeeting);

export default router;