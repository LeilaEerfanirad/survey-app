const express = require('express');
const router = express.Router();
const SurveyModel = require('../../models/Survey');
const { getDataJwt } = require('../../functions/jwtHandler');

router.post("/:surveyId", async (req, resp) => {
    const { surveyId } = req.params;
    const { buildingId, scopId } = req.body;

    try {
        // Find the survey by its ID
        const survey = await SurveyModel.findById(surveyId);
        if (!survey) {
            return resp.status(404).json({
                status: "error",
                msg: "Survey not found"
            });
        }

        // Check if the scop is in the survey
        const scopExists = survey.scops.some(scop =>
            scop.buildingId === buildingId && scop.scopIds.includes(scopId)
        );

        if (scopExists) {
            return resp.status(200).json({
                status: "success",
                msg: "Scop exists in the survey"
            });
        } else {
            return resp.status(404).json({
                status: "error",
                msg: "Scop not found in the survey"
            });
        }

    } catch (e) {
        console.error('Error checking scop:', e);
        return resp.status(500).json({
            status: "error",
            msg: "Internal Server Error"
        });
    }
});

module.exports = router;
