const express = require("express");
const multer = require("multer");
const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");

const app = express();
const upload = multer({ dest: "uploads/" });

app.post("/upload", upload.single("video"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: "❌ No file uploaded." });
    }

    const videoPath = req.file.path;
    console.log("📂 Received a video upload request...");
    console.log(`🎥 Video saved at: ${videoPath}`);

    exec(`python3 analyze_video.py "${videoPath}"`, (error, stdout, stderr) => {
        if (error) {
            console.error(`🚨 Error executing script: ${stderr}`);
            return res.status(500).json({ success: false, message: "❌ Error analyzing video." });
        } 

        const lines = stdout.trim().split("\n");
        const result = lines.pop(); // Get last line (True or False)
        const confidenceScores = lines.filter(line => line.includes("Confidence:"));

        console.log("🔍 Confidence Scores:");
        confidenceScores.forEach(score => console.log(`   ${score}`));

        console.log(`📝 Analysis result: ${result}`);

        fs.unlink(videoPath, () => console.log("🗑️ Deleted uploaded video after analysis."));

        if (result === "True") {
            return res.json({ 
                success: true, 
                threatDetected: false, 
                message: "✅ No threats detected", 
                confidenceScores 
            });
        } else {
            return res.json({ 
                success: true, 
                threatDetected: true, 
                message: "🚨 Threat detected!", 
                confidenceScores 
            });
        }
    });
});

app.listen(5001, () => console.log("🚀 Server running on port 5001"));
