import sql from "../config/db.js";
import { clerkClient } from "@clerk/express";
import { GoogleGenerativeAI } from "@google/generative-ai";

// ✅ Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateArticle = async (req, res) => {
    try {
        const { userId } = req.auth();
        const { prompt, length } = req.body;

        // ✅ Get user from Clerk
        const user = await clerkClient.users.getUser(userId);

        const plan = user.privateMetadata?.plan || "free";
        const free_usage = user.privateMetadata?.free_usage || 0;

        // ✅ Limit check
        if (plan !== "premium" && free_usage >= 10) {
            return res.json({
                success: false,
                message: "Limit reached. Upgrade to continue."
            });
        }

        // ✅ Gemini model
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash"
        });

        // ✅ Generate content
        const result = await model.generateContent(
            `${prompt}\n\nWrite an article of approx ${length} words.`
        );

        const content = result.response.text();

        // ✅ Save to DB
        await sql`
            INSERT INTO creations (user_id, prompt, content, type)
            VALUES (${userId}, ${prompt}, ${content}, 'article')
        `;

        // ✅ Update usage
        if (plan !== "premium") {
            await clerkClient.users.updateUserMetadata(userId, {
                privateMetadata: {
                    ...user.privateMetadata,
                    free_usage: free_usage + 1
                }
            });
        }

        // ✅ Final response
        return res.json({
            success: true,
            content
        });

    } catch (error) {
        console.log("ERROR:", error.message);

        return res.json({
            success: false,
            message: error.message
        });
    }
};