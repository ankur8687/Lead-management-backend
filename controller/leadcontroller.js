const Lead = require("../models/leadmodel");

exports.createLead = async (req, res) => {
    try {
        const { phone } = req.body;

        const existing = await Lead.findOne({ phone });


        if (existing) {
            return res.status(400).json({ message: "Lead already exists" });

        }


        const lead = await Lead.create(req.body);
        res.status(201).json(lead);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
exports.getLeads = async (req, res) => {
    try {
        // 🔹 query params 
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;

        const skip = (page - 1) * limit;

        // 🔹 filtering query params
        const filter = {};

        if (req.query.intent) {
            filter.intent = req.query.intent;
        }

        if (req.query.status) {
            filter.status = req.query.status;
        }

        if (req.query.project) {
            filter.project = req.query.project;
        }

        if (req.query.source) {
            filter.source = req.query.source;
        }

        // 🔹 fetch data from db
        const leads = await Lead.find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const total = await Lead.countDocuments(filter);

        res.json({
            total,
            page,
            totalPages: Math.ceil(total / limit),
            data: leads
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.addFollowUp = async (req, res) => {
    try {
        const { id } = req.params;
        const lead = await Lead.findById(id);

        if (!lead) {
            return res.status(404).json({ message: "Lead not found" });
        }

        // validation check before pushing
        const followDate = new Date(req.body.date);
        const today = new Date();

        if (followDate < today) {
            return res.status(400).json({
                message: "Follow-up date must be in the future"
            });
        }

        lead.followUps.push(req.body);
        if (req.body.date) {
            lead.nextFollowUpDate = req.body.date;
        }
        await lead.save();
        res.json(lead);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        // ✅ allowed values (from assignment)
        const allowed = ["new", "contacted", "qualified", "closed"];

        if (!allowed.includes(status)) {
            return res.status(400).json({ message: "Invalid status" });
        }

        const lead = await Lead.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!lead) {
            return res.status(404).json({ message: "Lead not found" });
        }

        res.json(lead);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.qualifyLead = (req, res) => {
  try {
    const text = req.body.message.toLowerCase();

    let project = null;
    let budget = null;
    let intent = "low";

    // 🟢 project detection
    if (text.includes("2bhk")) project = "2BHK";
    else if (text.includes("3bhk")) project = "3BHK";

    // 🟢 budget detection (extract number)
    const match = text.match(/\d+/);
    if (match) {
      budget = parseInt(match[0]);
    }

    // 🟢 intent detection
    if (text.includes("urgent") || text.includes("immediately")) {
      intent = "high";
    } else if (text.includes("looking") || text.includes("interested")) {
      intent = "medium";
    }

    res.json({ project, budget, intent });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};