import { z } from "zod";

// ===== AUTHENTICATION SCHEMAS =====

export const loginSchema = z.object({
    email: z.string()
        .email("Invalid email address")
        .min(5, "Email must be at least 5 characters")
        .max(100, "Email must be less than 100 characters"),
    password: z.string()
        .min(8, "Password must be at least 8 characters")
        .max(100, "Password must be less than 100 characters"),
});

export const signupSchema = z.object({
    name: z.string()
        .min(2, "Name must be at least 2 characters")
        .max(50, "Name must be less than 50 characters")
        .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),
    email: z.string()
        .email("Invalid email address")
        .min(5, "Email must be at least 5 characters")
        .max(100, "Email must be less than 100 characters"),
    password: z.string()
        .min(8, "Password must be at least 8 characters")
        .max(100, "Password must be less than 100 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
    role: z.enum(["client", "provider"], {
        errorMap: () => ({ message: "Role must be either 'client' or 'provider'" })
    }),
});

// ===== GIG SCHEMAS =====

export const createGigSchema = z.object({
    title: z.string()
        .min(10, "Title must be at least 10 characters")
        .max(100, "Title must be less than 100 characters"),
    description: z.string()
        .min(50, "Description must be at least 50 characters")
        .max(5000, "Description must be less than 5000 characters"),
    category: z.enum([
        "Development",
        "Design",
        "Marketing",
        "Writing",
        "Video",
        "Data Science",
        "Other"
    ]),
    budgetMin: z.number()
        .min(500, "Minimum budget must be at least ₹500")
        .max(10000000, "Minimum budget cannot exceed ₹1 crore"),
    budgetMax: z.number()
        .min(500, "Maximum budget must be at least ₹500")
        .max(10000000, "Maximum budget cannot exceed ₹1 crore"),
    skills: z.array(z.string())
        .min(1, "At least one skill is required")
        .max(10, "Maximum 10 skills allowed"),
    location: z.string()
        .min(2, "Location must be at least 2 characters")
        .max(100, "Location must be less than 100 characters"),
}).refine((data) => data.budgetMax > data.budgetMin, {
    message: "Maximum budget must be greater than minimum budget",
    path: ["budgetMax"],
});

// ===== WALLET SCHEMAS =====

export const addFundsSchema = z.object({
    amount: z.number()
        .min(100, "Minimum deposit is ₹100")
        .max(100000, "Maximum deposit is ₹1,00,000 per transaction")
        .int("Amount must be a whole number"),
});

export const withdrawFundsSchema = z.object({
    amount: z.number()
        .min(500, "Minimum withdrawal is ₹500")
        .max(100000, "Maximum withdrawal is ₹1,00,000 per transaction")
        .int("Amount must be a whole number"),
    accountNumber: z.string()
        .regex(/^\d{9,18}$/, "Invalid account number"),
    ifscCode: z.string()
        .regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC code"),
});

// ===== MESSAGE SCHEMAS =====

export const sendMessageSchema = z.object({
    content: z.string()
        .min(1, "Message cannot be empty")
        .max(2000, "Message must be less than 2000 characters"),
    receiverId: z.string()
        .uuid("Invalid receiver ID"),
});

// ===== PROFILE SCHEMAS =====

export const updateProfileSchema = z.object({
    name: z.string()
        .min(2, "Name must be at least 2 characters")
        .max(50, "Name must be less than 50 characters")
        .optional(),
    title: z.string()
        .min(5, "Title must be at least 5 characters")
        .max(100, "Title must be less than 100 characters")
        .optional(),
    bio: z.string()
        .min(10, "Bio must be at least 10 characters")
        .max(1000, "Bio must be less than 1000 characters")
        .optional(),
    skills: z.array(z.string())
        .max(20, "Maximum 20 skills allowed")
        .optional(),
    location: z.string()
        .min(2, "Location must be at least 2 characters")
        .max(100, "Location must be less than 100 characters")
        .optional(),
});

// ===== VERIFICATION SCHEMAS =====

export const aadhaarVerificationSchema = z.object({
    aadhaarNumber: z.string()
        .regex(/^\d{12}$/, "Aadhaar must be exactly 12 digits"),
    name: z.string()
        .min(2, "Name must match Aadhaar")
        .max(100, "Name is too long"),
});

// ===== TYPE EXPORTS =====

export type LoginInput = z.infer<typeof loginSchema>;
export type SignupInput = z.infer<typeof signupSchema>;
export type CreateGigInput = z.infer<typeof createGigSchema>;
export type AddFundsInput = z.infer<typeof addFundsSchema>;
export type WithdrawFundsInput = z.infer<typeof withdrawFundsSchema>;
export type SendMessageInput = z.infer<typeof sendMessageSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
export type AadhaarVerificationInput = z.infer<typeof aadhaarVerificationSchema>;
