const express = require("express");
const router = express.Router();

const {
    createLead,
    getLeads,
    addFollowUp,
    updateStatus,
    qualifyLead
} = require("../Controller/leadcontroller");

router.post("/" , createLead);
router.get("/" , getLeads);
router.post("/:id/followUp", addFollowUp);
router.patch("/:id", updateStatus);
router.post("/ai/qualify", qualifyLead);


module.exports = router;