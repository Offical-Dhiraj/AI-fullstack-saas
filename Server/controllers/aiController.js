// import OpenAI from "openai";
// import sql from "../config/db.js";
// import { clerkClient } from "@clerk/express";
// import { v2 as cloudinary } from "cloudinary";
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import fs from "fs"
// import pdfParse from "pdf-parse";

// const pdf = pdfParse.default || pdfParse;

// const AI = new OpenAI({
//   apiKey: process.env.GROQ_API_KEY,
//   baseURL: "https://api.groq.com/openai/v1",
// });


// // ================= ARTICLE =================
// export const generateArticle = async (req, res) => {
//   try {
//     const { userId } = req.auth();
//     const { prompt, length } = req.body;

//     if (!prompt) {
//       return res.json({ success: false, message: "Prompt required" });
//     }

//     const response = await AI.chat.completions.create({
//       model: "llama-3.1-8b-instant",
//       messages: [{ role: "user", content: prompt }],
//       temperature: 0.7,
//       max_tokens: parseInt(length) || 200,
//     });

//     const content = response.choices[0].message.content;

//     await sql`
//       INSERT INTO creations (user_id, prompt, content, type)
//       VALUES (${userId}, ${prompt}, ${content}, 'article')
//     `;

//     res.json({
//       success: true,
//       content,
//     });

//   } catch (error) {
//     console.error(error);
//     res.json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // ================= BLOG TITLE =================
// export const generateBlogTitle = async (req, res) => {
//   try {
//     const { userId } = req.auth();
//     const { prompt } = req.body;

//     if (!prompt) {
//       return res.json({ success: false, message: "Prompt required" });
//     }

//     const response = await AI.chat.completions.create({
//       model: "gemini-1.5-flash",
//       messages: [{ role: "user", content: prompt }],
//       max_tokens: 50,
//     });

//     const content = response.choices[0].message.content;

//     await sql`
//       INSERT INTO creations (user_id, prompt, content, type)
//       VALUES (${userId}, ${prompt}, ${content}, 'blog-title')`;

//     res.json({ success: true, content });

//   } catch (error) {
//     console.error(error);
//     res.json({ success: false, message: error.message });
//   }
// };



// // ================= IMAGE (FREE WORKING) =================
// export const generateImage = async (req, res) => {
//   try {
//     const { userId } = req.auth();
//     const { prompt, publish } = req.body;

//     if (!prompt) {
//       return res.json({ success: false, message: "Prompt required" });
//     }

//     if (req.plan !== "premium") {
//       return res.json({
//         success: false,
//         message: "Premium only feature",
//       });
//     }

//     //  FREE image generation (no API key)
//     const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}`;

//     // upload to cloudinary
//     const upload = await cloudinary.uploader.upload(imageUrl);

//     await sql`
//       INSERT INTO creations (user_id, prompt, content, type, publish)
//       VALUES (${userId}, ${prompt}, ${upload.secure_url}, 'image', ${publish ?? false})`;

//     res.json({
//       success: true,
//       content: upload.secure_url,
//     });

//   } catch (error) {
//     console.error(error);
//     res.json({
//       success: false,
//       message: error.message,
//     });
//   }
// };




// // ================= REMOVE BACKGROUND =================


// export const removeImageBackground = async (req, res) => {
//   try {
//     const { userId } = req.auth();
//     const { image } = req.file;
//     const plan = req.plan

//     if (!prompt) {
//       return res.json({ success: false, message: "Prompt required" });
//     }

//     if (plan != 'premium') {
//       return res.json({ success: false, message: "This feature is only available for premium subscriptions" })
//     }

//     const { secure_url } = await cloudinary.uploader.upload(image.path, {
//       transformation: [{
//         effect: 'background_removal',
//         background_removal: 'remove_the_background'
//       }]
//     })


//     const content = response.choices[0].message.content;

//     await sql`
//       INSERT INTO creations (user_id, prompt, content, type)
//       VALUES (${userId}, ' Remove background from image', ${secure_url}, 'image')`;

//     res.json({
//       success: true,
//       content: secure_url,
//     });

//   } catch (error) {
//     console.error(error);
//     res.json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // ================= REMOVE OBJECT =================




// export const removeImageObject = async (req, res) => {
//   try {
//     const { userId } = req.auth();
//     const { object } = req.body
//     const { image } = req.file;
//     const plan = req.plan

//     if (!prompt) {
//       return res.json({ success: false, message: "Prompt required" });
//     }

//     if (plan != 'premium') {
//       return res.json({ success: false, message: "This feature is only available for premium subscriptions" })
//     }

//     const { public_id } = await cloudinary.uploader.upload(image.path)

//     const imageUrl = cloudinary.url(public_id, {
//       transformation: [{
//         effect: `gen_remove:${object}`
//       }],
//       resource_type: 'image'
//     })


//     await sql`
//       INSERT INTO creations (user_id, prompt, content, type)
//       VALUES (${userId}, ${`Removed ${object} from image`}, ${imageUrl}, 'image')`;

//     res.json({
//       success: true,
//       content: imageUrl,
//     });

//   } catch (error) {
//     console.error(error);
//     res.json({
//       success: false,
//       message: error.message,
//     });
//   }
// };





// // ================= RESUME REVIEW =================


// export const remsumeReview = async (req, res) => {
//   try {
//     const { userId } = req.auth();
//     const resume = req.file
//     const plan = req.plan

//     if (!prompt) {
//       return res.json({ success: false, message: "Prompt required" });
//     }

//     if (plan != 'premium') {
//       return res.json({ success: false, message: "This feature is only available for premium subscriptions" })
//     }

//     if (resume.size > 5 * 1024 * 1024) {
//       return res.json({
//         success: false,
//         message: "Resume file size exceeds allowed size (5MB)"
//       })

//     }

//     const dataBuffer = fs.readFileSync(resume.path)
//     const pdfData = await pdf(dataBuffer)

//     const prompt = `Review the following resume and provide constructive feedback on its strength,
//     weakness, and areas for improvement. Resume Content:\n\n${pdfData.text}`

//     const response = await AI.chat.completions.create({
//       model: "llama-3.1-8b-instant",
//       messages: [{ role: "user", content: prompt }],
//       temperature: 0.7,
//       max_tokens: parseInt(length) || 2000,
//     });

//     const content = response.choices[0].message.content;

//     await sql`
//       INSERT INTO creations (user_id, prompt, content, type)
//       VALUES (${userId}, 'Review the uploaded resume' , ${content}, 'resume-review')`;

//     res.json({
//       success: true,
//       content
//     });

//   } catch (error) {
//     console.error(error);
//     res.json({
//       success: false,
//       message: error.message,
//     });
//   }
// };




import OpenAI from "openai";
import sql from "../config/db.js";
import { clerkClient } from "@clerk/express";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const pdf = require("pdf-parse");

// ================= AI SETUP =================
const AI = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

// ================= ARTICLE =================
export const generateArticle = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt, length } = req.body;

    if (!prompt) {
      return res.json({ success: false, message: "Prompt required" });
    }

    const response = await AI.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: parseInt(length) || 200,
    });

    const content = response.choices[0].message.content;

    await sql`
      INSERT INTO creations (user_id, prompt, content, type)
      VALUES (${userId}, ${prompt}, ${content}, 'article')
    `;

    res.json({ success: true, content });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ================= BLOG TITLE =================
export const generateBlogTitle = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt } = req.body;

    if (!prompt) {
      return res.json({ success: false, message: "Prompt required" });
    }

    const response = await AI.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 50,
    });

    const content = response.choices[0].message.content;

    await sql`
      INSERT INTO creations (user_id, prompt, content, type)
      VALUES (${userId}, ${prompt}, ${content}, 'blog-title')
    `;

    res.json({ success: true, content });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ================= IMAGE GENERATION =================
export const generateImage = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt, publish } = req.body;

    if (!prompt) {
      return res.json({ success: false, message: "Prompt required" });
    }

    if (req.plan !== "premium") {
      return res.json({
        success: false,
        message: "Premium only feature",
      });
    }

    const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}`;

    const upload = await cloudinary.uploader.upload(imageUrl);

    await sql`
      INSERT INTO creations (user_id, prompt, content, type, publish)
      VALUES (${userId}, ${prompt}, ${upload.secure_url}, 'image', ${publish ?? false})
    `;

    res.json({
      success: true,
      content: upload.secure_url,
    });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ================= REMOVE BACKGROUND =================
export const removeImageBackground = async (req, res) => {
  try {
    const { userId } = req.auth();
    const image = req.file;
    const plan = req.plan;

    if (!image) {
      return res.json({ success: false, message: "Image required" });
    }

    if (plan !== "premium") {
      return res.json({
        success: false,
        message: "Premium only feature",
      });
    }

    const { secure_url } = await cloudinary.uploader.upload(image.path, {
      transformation: [
        {
          effect: "background_removal",
          background_removal: "remove_the_background",
        },
      ],
    });

    await sql`
      INSERT INTO creations (user_id, prompt, content, type)
      VALUES (${userId}, 'Remove background', ${secure_url}, 'image')
    `;

    res.json({
      success: true,
      content: secure_url,
    });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ================= REMOVE OBJECT =================
export const removeImageObject = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { object } = req.body;
    const image = req.file;
    const plan = req.plan;

    if (!image || !object) {
      return res.json({ success: false, message: "Image and object required" });
    }

    if (plan !== "premium") {
      return res.json({
        success: false,
        message: "Premium only feature",
      });
    }

    const { public_id } = await cloudinary.uploader.upload(image.path);

    const imageUrl = cloudinary.url(public_id, {
      transformation: [{ effect: `gen_remove:${object}` }],
      resource_type: "image",
    });

    await sql`
      INSERT INTO creations (user_id, prompt, content, type)
      VALUES (${userId}, ${`Removed ${object}`}, ${imageUrl}, 'image')
    `;

    res.json({
      success: true,
      content: imageUrl,
    });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ================= RESUME REVIEW =================
export const resumeReview = async (req, res) => {
  try {
    const { userId } = req.auth();
    const resume = req.file;
    const plan = req.plan;

    if (!resume) {
      return res.json({ success: false, message: "Resume required" });
    }

    if (plan !== "premium") {
      return res.json({
        success: false,
        message: "Premium only feature",
      });
    }

    if (resume.size > 5 * 1024 * 1024) {
      return res.json({
        success: false,
        message: "File too large (max 5MB)",
      });
    }

    const buffer = fs.readFileSync(resume.path);
    const pdfData = await pdf(buffer);

    const prompt = `Review this resume and give feedback:\n\n${pdfData.text}`;

    const response = await AI.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 2000,
    });

    const content = response.choices[0].message.content;

    await sql`
      INSERT INTO creations (user_id, prompt, content, type)
      VALUES (${userId}, 'Resume review', ${content}, 'resume-review')
    `;

    res.json({
      success: true,
      content,
    });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

