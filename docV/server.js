import express from "express";
import mongoose from "mongoose";
import path from "path";
import session from "express-session";
import bcrypt from "bcrypt";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import Web3 from "web3";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { createWorker } from 'tesseract.js';
import qrcode from 'qrcode';
import MongoStore from "connect-mongodb-session";
import pinataSDK from '@pinata/sdk';
import stream from 'stream';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '.env') });

// Debug: Log environment variables loading
console.log('🔧 Environment variables loaded:');
console.log('- MONGODB_URI:', process.env.MONGODB_URI ? '✅ Set' : '❌ Missing');
console.log('- PINATA_API_KEY:', process.env.PINATA_API_KEY ? '✅ Set' : '❌ Missing');
console.log('- PINATA_SECRET_API_KEY:', process.env.PINATA_SECRET_API_KEY ? '✅ Set' : '❌ Missing');
console.log('- WEB3_PROVIDER_URL:', process.env.WEB3_PROVIDER_URL ? '✅ Set' : '❌ Missing');
console.log('- ACCOUNT_ADDRESS:', process.env.ACCOUNT_ADDRESS ? '✅ Set' : '❌ Missing');
console.log('- PRIVATE_KEY:', process.env.PRIVATE_KEY ? '✅ Set' : '❌ Missing');
console.log('- SESSION_SECRET:', process.env.SESSION_SECRET ? '✅ Set' : '❌ Missing');
console.log('- PORT:', process.env.PORT ? '✅ Set' : '❌ Missing');
console.log('📍 Current working directory:', process.cwd());
console.log('📁 .env file path:', path.join(__dirname, '.env'));
console.log('📊 Total env vars loaded:', Object.keys(process.env).length);
const app = express();
const port = process.env.PORT || 3000;

app.set('trust proxy', 1);

// CORS configuration for frontend-backend communication
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3001');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

app.use(express.json());

// --- CRITICAL FIX: Reading MONGODB_URI from environment ---
const MONGODB_URI = process.env.MONGODB_URI;
// --- Reading PINATA keys from environment ---
const PINATA_API_KEY = process.env.PINATA_API_KEY;
const PINATA_SECRET_API_KEY = process.env.PINATA_SECRET_API_KEY;
const SESSION_SECRET = process.env.SESSION_SECRET || "DEFAULT_SECRET_KEY";

// --- PINATA SETUP ---
const pinata = new pinataSDK(PINATA_API_KEY, PINATA_SECRET_API_KEY);
// -----------------------------------------------------------------


// --- SESSION STORE FIX: MongoDBStore ---
const MongoDBStore = MongoStore(session);
const sessionStore = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions',
    expires: 1000 * 60 * 60 * 24 * 7,
});

sessionStore.on('error', function(error) {
    console.error("Session Store Error:", error);
});

app.use(
    session({
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: sessionStore,
        cookie: {
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 1000 * 60 * 60 * 24 * 7
        },
    })
);

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Serve vanilla frontend from frontend folder
app.use(express.static(path.join(__dirname, 'frontend')));

mongoose
    .connect(MONGODB_URI)
    .then(() => console.log(" Successfully connected to MongoDB Atlas!"))
    .catch((err) => console.error(" MongoDB Connection error:", err.message));

// --- Blockchain Setup (omitted for brevity) ---
const web3 = new Web3(process.env.WEB3_PROVIDER_URL || "http://127.0.0.1:7545");
const accountAddress = process.env.ACCOUNT_ADDRESS;
const privateKey = process.env.PRIVATE_KEY;

async function sendHashToBlockchain(fileHash) {
    try {
        if (!web3.utils.isAddress(accountAddress)) {
            throw new Error(`Invalid account address: ${accountAddress}. Please check your .env file.`);
        }
        if (!privateKey || privateKey.length < 64) {
            throw new Error("Private key is missing or invalid. Please check your .env file.");
        }

        const txCount = await web3.eth.getTransactionCount(accountAddress);
        const networkGasPrice = await web3.eth.getGasPrice();

        const increasedGasPrice = BigInt(networkGasPrice) * BigInt(125) / BigInt(100);

        const tx = {
            nonce: web3.utils.toHex(txCount),
            gasLimit: web3.utils.toHex(500000),
            gasPrice: web3.utils.toHex(increasedGasPrice),
            to: accountAddress,
            value: "0x0",
            data: web3.utils.toHex(fileHash),
        };

        const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
        if (!signedTx || !signedTx.rawTransaction) {
            throw new Error("Failed to sign transaction, rawTransaction is missing.");
        }

        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        console.log(" Blockchain Tx Successful:", receipt.transactionHash);
        return receipt.transactionHash;
    } catch (err) {
        console.error(" Blockchain Tx Failed:", err.message || err);
        return null;
    }
}
// --- Tesseract.js Worker Initialization (improved) ---
let worker;
let workerReady = false;

(async () => {
    try {
        worker = await createWorker('eng');
        // Note: loadLanguage and initialize are deprecated in newer versions
        // Workers now come pre-loaded and pre-initialized
        workerReady = true;
        console.log(" Tesseract.js worker initialized successfully.");
    } catch (err) {
        console.error(" Error initializing Tesseract.js worker:", err.message || err);
        workerReady = false;
    }
})();

// Helper function to ensure worker is ready
async function ensureWorkerReady() {
    if (!worker || !workerReady) {
        throw new Error('OCR worker is not ready. Please try again in a moment.');
    }
    return worker;
}

// --- Mongoose Schemas ---
const userSchema = new mongoose.Schema({
    fullName: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String },
    walletAddress: { type: String, unique: true, sparse: true }
});
const User = mongoose.model("User", userSchema, "users");

const authorizedDocumentSchema = new mongoose.Schema({
    docNumber: { type: String, required: true, unique: true },
    docType: String,
});
const AuthorizedDocument = mongoose.model(
    "AuthorizedDocument",
    authorizedDocumentSchema,
    "authorized_documents"
);

const verificationSchema = new mongoose.Schema({
    qrId: { type: String, unique: true, sparse: true },
    docId: String,
    docType: String,
    docNumber: String,
    fileHash: String,
    transactionHash: String,
    verificationStatus: { type: String, default: "Pending" },
    userId: mongoose.Schema.Types.ObjectId,
    submittedAt: { type: Date, default: Date.now },
    documentCID: String, // <-- Stores the IPFS Content Identifier
});
const DocumentVerification = mongoose.model(
    "DocumentVerification",
    verificationSchema,
    "document_verifications"
);

const messageSchema = new mongoose.Schema({
    subject: String,
    message: String,
    submittedBy: mongoose.Schema.Types.ObjectId,
    submittedAt: { type: Date, default: Date.now },
});
const ContactMessage = mongoose.model(
    "ContactMessage",
    messageSchema,
    "contact_messages"
);

const settingsSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, unique: true },
    emailNotifications: { type: Boolean, default: true },
    smsNotifications: { type: Boolean, default: false },
});
const UserSettings = mongoose.model("UserSettings", settingsSchema, "user_settings");

// --- Middleware (omitted for brevity) ---
function isAuthenticated(req, res, next) {
    if (req.session.userId) return next();
    res.status(401).json({ message: "Authentication required" });
}

// ----------------------------------------------------
// --- ROUTES (Defined after all Models & Middleware) ---
// ----------------------------------------------------

// Authentication Routes (omitted for brevity)
app.post("/api/auth/signup", async (req, res) => {
    const { fullName, email, password, phone } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ fullName, email, password: hashedPassword, phone });
        await user.save();

        req.session.userId = user._id;
        await new UserSettings({ userId: user._id }).save();

        res.status(201).json({ message: "Account created successfully!" });
    } catch (error) {
        console.error("Error during sign-up:", error.message);
        res.status(400).json({ message: "Email already in use or invalid data." });
    }
});

app.post("/api/auth/signin", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid credentials." });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials." });

        req.session.userId = user._id;
        res.json({ message: "Signed in successfully!", user: { fullName: user.fullName } });
    } catch (error) {
        console.error("Error during sign-in:", error.message);
        res.status(500).json({ message: "Internal server error." });
    }
});

app.post("/api/auth/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Error destroying session:", err);
            return res.status(500).json({ message: "Failed to log out." });
        }
        res.json({ message: "Logged out successfully." });
    });
});

// User Profile Routes (omitted for brevity)
app.get("/api/profile", isAuthenticated, async (req, res) => {
    try {
        const user = await User.findById(req.session.userId).select("-password");
        if (!user) return res.status(404).json({ message: "User not found." });
        res.json(user);
    } catch (error) {
        console.error("Error fetching profile:", error.message);
        res.status(500).json({ message: "Failed to fetch profile." });
    }
});

app.put("/api/profile", isAuthenticated, async (req, res) => {
    try {
        const { fullName, email, phone } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser && existingUser._id.toString() !== req.session.userId.toString()) {
            return res.status(400).json({ message: "Email already in use by another account." });
        }

        await User.findByIdAndUpdate(req.session.userId, { fullName, email, phone }, { new: true });
        res.json({ message: "Profile updated successfully!" });
    } catch (error) {
        console.error("Error updating profile:", error.message);
        res.status(500).json({ message: "Failed to update profile." });
    }
});

app.put("/api/settings", isAuthenticated, async (req, res) => {
    try {
        const { emailNotifications, smsNotifications } = req.body;
        await UserSettings.findOneAndUpdate({ userId: req.session.userId }, { emailNotifications, smsNotifications }, { new: true, upsert: true });
        res.json({ message: "Settings updated successfully!" });
    } catch (error) {
        console.error("Error updating settings:", error.message);
        res.status(500).json({ message: "Failed to update settings." });
    }
});

// --- RESTORED ROUTE: Link Wallet Address to Profile (FIXED LOCATION) ---
app.post("/api/profile/link-wallet", isAuthenticated, async (req, res) => {
    const { walletAddress } = req.body;
    const userId = req.session.userId;

    if (!walletAddress || !web3.utils.isAddress(walletAddress)) {
        return res.status(400).json({ message: "Invalid wallet address provided." });
    }

    try {
        const existingUser = await User.findOne({ walletAddress: web3.utils.toChecksumAddress(walletAddress) });
        if (existingUser && existingUser._id.toString() !== userId.toString()) {
            return res.status(400).json({ message: "This wallet address is already linked to another user account." });
        }

        await User.findByIdAndUpdate(userId, { walletAddress: web3.utils.toChecksumAddress(walletAddress) });
        res.json({ message: "Wallet address linked successfully!" });
    } catch (error) {
        console.error("Error linking wallet:", error.message);
        res.status(500).json({ message: "Failed to link wallet." });
    }
});

// Document Verification Route (omitted for brevity)
app.post("/api/verify", isAuthenticated, upload.single("document"), async (req, res) => {
    try {
        // Check if worker is ready
        await ensureWorkerReady();
    } catch (error) {
        return res.status(503).json({ message: error.message });
    }

    const { docType, docNumber } = req.body;
    const userId = new mongoose.Types.ObjectId(req.session.userId);

    if (!docType || !docNumber || !req.file) {
        return res.status(400).json({ message: "All fields are required (Document Type, Document Number, and Document File)." });
    }
    if (!req.file.buffer) {
        return res.status(400).json({ message: "Uploaded file is empty or corrupted." });
    }

    let documentCID = null;
    let verificationStatus = "Rejected";
    let transactionHash = null;
    let qrId;
    let qrCodeDataUrl = null;
    let qrLink = null;

    try {
        // =================================================================
        // *** FIX: STEP 1 - CHECK FOR EXISTING VERIFIED RECORD BY USER ***
        // =================================================================
        const existingRecord = await DocumentVerification.findOne({
            docNumber: docNumber,
            userId: userId, // Check by user ID as well
            verificationStatus: "Verified"
        });

        if (existingRecord) {
            console.log("Existing verified record found for this user. Regenerating QR Code Image.");

            const existingQrId = existingRecord.qrId;
            const existingQrLink = existingQrId ?
                `${process.env.RENDER_APP_URL || `http://localhost:${port}`}/verify-qr?id=${existingQrId}`
                : null;

            let existingQrCodeDataUrl = null;

            // --- CRITICAL FIX: Regenerate the QR Code Image Data URL ---
            if (existingQrLink) {
                existingQrCodeDataUrl = await qrcode.toDataURL(existingQrLink);
                console.log("QR Code Image Regenerated Successfully.");
            }
            // -----------------------------------------------------------

            return res.json({
                message: "Document Already Verified!",
                verificationStatus: "Verified",
                fileHash: existingRecord.fileHash,
                transactionHash: existingRecord.transactionHash,
                documentCID: existingRecord.documentCID,
                qrCodeLink: existingQrLink,       // Pass the permanent link
                qrCodeDataUrl: existingQrCodeDataUrl, // <-- PASS THE REGENERATED IMAGE DATA
            });
        }
        // =================================================================

        // --- STEP 2: PROCEED WITH NEW VERIFICATION (If no existing record found) ---

        // --- 2.1 OCR AND HASHING ---
        let text = '';
        try {
            const result = await worker.recognize(req.file.buffer);
            text = result.data.text;
            console.log("OCR Extracted Text:", text);
        } catch (ocrError) {
            console.error("OCR Recognition Error:", ocrError.message);
            return res.status(500).json({ 
                message: "OCR processing failed. Please ensure the document is clear and readable.",
                error: ocrError.message 
            });
        }





        const fileHash = web3.utils.sha3(req.file.buffer);

        // --- 2.2 IPFS UPLOAD LOGIC ---
        if (pinata && PINATA_API_KEY && PINATA_SECRET_API_KEY) {
            const readableStreamForFile = stream.Readable.from(req.file.buffer);
            readableStreamForFile.path = req.file.originalname;

            const pinataResponse = await pinata.pinFileToIPFS(readableStreamForFile, {
                pinataMetadata: {
                    name: `Verified_Doc_${docNumber}`,
                    keyvalues: { docNumber: docNumber, userId: userId.toString() }
                }
            });

            documentCID = pinataResponse.IpfsHash;
            console.log("IPFS Upload Successful. CID:", documentCID);
        } else {
            console.error("Pinata SDK not fully initialized (check environment keys). Document CID will be null.");
        }

        // --- 2.3 AUTHORIZATION AND BLOCKCHAIN ---

        const docNumberFoundInText = text.includes(docNumber);



        if (docNumberFoundInText) {
            const isAuthorized = await AuthorizedDocument.findOne({ docNumber: docNumber });
            if (isAuthorized) {
                verificationStatus = "Verified";

                if (documentCID) {
                    transactionHash = await sendHashToBlockchain(fileHash);
                } else {
                    verificationStatus = "Rejected";
                    console.error("Verification failed: Document could not be pinned to IPFS.");
                }
            }
        }

        // --- 2.4 FINAL RECORD AND QR GENERATION ---
        if (verificationStatus === "Verified" && transactionHash && documentCID) {
            qrId = uuidv4(); // Generate new QR ID only for a new successful verification
            const baseUrl = process.env.RENDER_APP_URL || `http://localhost:${port}`;
            qrLink = `${baseUrl}/verify-qr?id=${qrId}`;
            qrCodeDataUrl = await qrcode.toDataURL(qrLink);
        } else {
            verificationStatus = "Rejected";
        }

        const verificationData = {
            docId: uuidv4(),
            docType,
            docNumber,
            fileHash,
            transactionHash,
            verificationStatus,
            userId,
            documentCID
        };

// ✅ ONLY add qrId if it exists
        if (qrId) {
            verificationData.qrId = qrId;
        }

        const newVerification = new DocumentVerification(verificationData);
        await newVerification.save();


        if (verificationStatus === "Verified") {
            res.json({
                message: "Document Found and Verified!",
                verificationStatus: "Verified",
                fileHash,
                transactionHash,
                qrCodeDataUrl,
                documentCID: documentCID,
                qrCodeLink: qrLink,
            });
        } else {
            res.status(404).json({
                message: "Document not found or invalid. Verification Rejected.",
                verificationStatus: "Rejected",
                fileHash: newVerification.fileHash, // Return hash even if rejected for debugging
                transactionHash: null,
                documentCID: null,
                qrCodeDataUrl: null,
                qrCodeLink: null
            });
        }

    } catch (error) {
        console.error("Error during verification:", error.message);
        if (error.message && error.message.includes('API Key') || error.message.includes('pinFileToIPFS')) {
            return res.status(500).json({ message: "Verification failed. Pinata API Keys may be incorrect or missing from your .env/Render environment." });
        }
        res.status(500).json({ message: `An internal server error occurred during verification: ${error.message}` });
    }
});


// QR Code Initial Check Endpoint (omitted for brevity)
app.get("/api/qr-check", async (req, res) => {
    const qrId = req.query.id;
    if (!qrId) {
        return res.status(400).json({ message: "QR Document ID is required." });
    }

    try {
        const verificationRecord = await DocumentVerification.findOne({ qrId: qrId });

        if (!verificationRecord) {
            return res.status(404).json({ message: "Document verification record not found for this QR code." });
        }

        res.json({
            verificationStatus: verificationRecord.verificationStatus,
            docType: verificationRecord.docType,
            submittedAt: verificationRecord.submittedAt,
            message: "Initial verification check successful."
        });
    } catch (error) {
        console.error("Error during QR initial check:", error.message);
        res.status(500).json({ message: "An internal server error occurred during QR check." });
    }
});

// FINAL: Web3 Signature Verification Endpoint with Authorization Check
app.post("/api/qr-verify-signature", async (req, res) => {
    const { qrId, walletAddress, signature, message } = req.body;

    if (!qrId || !walletAddress || !signature || !message) {
        return res.status(400).json({ message: "QR ID, Wallet Address, Signature, and Message are required." });
    }

    try {
        const recoveredAddress = await web3.eth.accounts.recover(message, signature);
        const recoveredAddressChecksum = web3.utils.toChecksumAddress(recoveredAddress);
        const walletAddressChecksum = web3.utils.toChecksumAddress(walletAddress);

        if (recoveredAddressChecksum !== walletAddressChecksum) {
            return res.status(401).json({ message: "Invalid cryptographic signature." });
        }

        const verificationRecord = await DocumentVerification.findOne({ qrId: qrId });
        if (!verificationRecord) {
            return res.status(404).json({ message: "Document record not found." });
        }

        const owner = await User.findById(verificationRecord.userId);

        if (!owner) {
            return res.status(404).json({ message: "Document owner not found." });
        }

        // IMPROVED LOGIC: Allow access if user has no wallet linked OR if wallet matches
        if (!owner.walletAddress) {
            // If owner hasn't linked a wallet, allow any valid signature but warn
            console.log(`⚠️  Document owner has no wallet linked. Allowing access for wallet: ${recoveredAddressChecksum}`);
            
            return res.json({
                message: "Signature verified. Full details revealed. (Note: Document owner has not linked a wallet)",
                docType: verificationRecord.docType,
                docNumber: verificationRecord.docNumber,
                fileHash: verificationRecord.fileHash,
                transactionHash: verificationRecord.transactionHash,
                verificationStatus: verificationRecord.verificationStatus,
                documentCID: verificationRecord.documentCID,
                warning: "The document owner has not linked a MetaMask wallet to their account."
            });
        }

        const ownerWalletChecksum = web3.utils.toChecksumAddress(owner.walletAddress);

        if (recoveredAddressChecksum !== ownerWalletChecksum) {
            console.warn(`ACCESS DENIED: Wallet ${recoveredAddressChecksum} tried to unlock document owned by ${ownerWalletChecksum}`);
            return res.status(403).json({ 
                message: "Access Denied: The signing wallet does not match the registered document owner.",
                details: {
                    yourWallet: recoveredAddressChecksum,
                    requiredWallet: ownerWalletChecksum,
                    suggestion: "Please use the correct wallet or link your current wallet to your account in the Profile section."
                }
            });
        }

        // Perfect match - wallet is linked and matches
        console.log(`✅ Wallet verification successful: ${recoveredAddressChecksum} matches owner wallet`);
        
        res.json({
            message: "Signature verified. Full details revealed.",
            docType: verificationRecord.docType,
            docNumber: verificationRecord.docNumber,
            fileHash: verificationRecord.fileHash,
            transactionHash: verificationRecord.transactionHash,
            verificationStatus: verificationRecord.verificationStatus,
            documentCID: verificationRecord.documentCID,
        });

    } catch (error) {
        console.error("Error during signature verification:", error.message || error);
        res.status(500).json({ message: "An internal server error occurred during signature verification." });
    }
});

// Test endpoint to add authorized documents (for development)
app.post("/api/add-test-documents", async (req, res) => {
    try {
        const testDocuments = [
            { docNumber: "BC-2023-001", docType: "Birth Certificate" },
            { docNumber: "BC-2023-002", docType: "Birth Certificate" },
            { docNumber: "EC-2023-001", docType: "Educational Certificate" },
            { docNumber: "EC-2023-002", docType: "Educational Certificate" },
            { docNumber: "PD-2023-001", docType: "Property Document" },
            { docNumber: "PD-2023-002", docType: "Property Document" },
            { docNumber: "ID-2023-001", docType: "Identity Document" },
            { docNumber: "ID-2023-002", docType: "Identity Document" },
            { docNumber: "TEST-001", docType: "Birth Certificate" },
            { docNumber: "TEST-002", docType: "Educational Certificate" }
        ];

        for (const doc of testDocuments) {
            await AuthorizedDocument.findOneAndUpdate(
                { docNumber: doc.docNumber },
                doc,
                { upsert: true, new: true }
            );
        }

        res.json({ 
            message: "Test authorized documents added successfully!", 
            count: testDocuments.length,
            documents: testDocuments
        });
    } catch (error) {
        console.error("Error adding test documents:", error.message);
        res.status(500).json({ message: "Failed to add test documents." });
    }
});

// Statistics and Contact Routes (omitted for brevity)
app.get("/api/stats", isAuthenticated, async (req, res) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.session.userId);
        console.log("📊 Fetching statistics for user ID:", userId);

        // Get comprehensive document statistics
        const totalDocuments = await DocumentVerification.countDocuments({ userId });
        const verifiedDocuments = await DocumentVerification.countDocuments({
            userId,
            verificationStatus: "Verified",
        });
        const rejectedDocuments = await DocumentVerification.countDocuments({
            userId,
            verificationStatus: "Rejected",
        });
        const pendingDocuments = await DocumentVerification.countDocuments({
            userId,
            verificationStatus: "Pending",
        });

        // Get documents by type
        const documentsByType = await DocumentVerification.aggregate([
            { $match: { userId: userId } },
            { $group: { _id: "$docType", count: { $sum: 1 } } }
        ]);

        // Get recent activity (last 30 days)
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        
        const recentActivity = await DocumentVerification.countDocuments({
            userId,
            submittedAt: { $gte: thirtyDaysAgo }
        });

        // Calculate success rate
        const successRate = totalDocuments > 0 ? Math.round((verifiedDocuments / totalDocuments) * 100) : 0;

        const statistics = {
            // Dashboard compatibility (old field names)
            totalVerified: totalDocuments,
            successfulVerifications: verifiedDocuments,
            pendingRequests: pendingDocuments,
            
            // New comprehensive statistics
            totalDocuments,
            verifiedDocuments,
            rejectedDocuments,
            pendingDocuments,
            documentsByType: documentsByType.reduce((acc, item) => {
                acc[item._id] = item.count;
                return acc;
            }, {}),
            recentActivity,
            successRate,
            
            // Additional metrics
            totalIPFSUploads: await DocumentVerification.countDocuments({ 
                userId, 
                documentCID: { $exists: true, $ne: null } 
            }),
            totalBlockchainTransactions: await DocumentVerification.countDocuments({ 
                userId, 
                transactionHash: { $exists: true, $ne: null } 
            }),
        };

        console.log("📊 Statistics calculated:", statistics);
        res.json(statistics);
    } catch (error) {
        console.error("Error fetching statistics:", error.message);
        res.status(500).json({ message: "Failed to fetch statistics." });
    }
});

// Get user's verified documents
app.get("/api/documents", isAuthenticated, async (req, res) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.session.userId);
        console.log("📊 Fetching documents for user ID:", userId);

        const documents = await DocumentVerification.find({ userId })
            .sort({ submittedAt: -1 }) // Most recent first
            .select('docId docType docNumber fileHash transactionHash verificationStatus submittedAt documentCID qrId');

        console.log(`📊 Found ${documents.length} documents for user`);

        // Transform the documents to match frontend expectations
        const transformedDocuments = documents.map(doc => ({
            id: doc.docId,
            docId: doc.docId,
            name: `${doc.docType} - ${doc.docNumber}`,
            docNumber: doc.docNumber,
            docType: doc.docType,
            ipfsHash: doc.documentCID,
            documentCID: doc.documentCID,
            uploadDate: doc.submittedAt, // Keep as Date object
            submittedAt: doc.submittedAt, // Keep as Date object
            status: doc.verificationStatus,
            fileType: 'application/pdf', // Default file type
            fileHash: doc.fileHash,
            transactionHash: doc.transactionHash,
            qrId: doc.qrId,
        }));

        console.log("📊 Transformed documents:", transformedDocuments.length);
        res.json(transformedDocuments);
    } catch (error) {
        console.error("Error fetching documents:", error.message);
        res.status(500).json({ message: "Failed to fetch documents." });
    }
});

// Get document content from IPFS with MetaMask verification
app.post("/api/documents/:docId/view", isAuthenticated, async (req, res) => {
    try {
        const { docId } = req.params;
        const { walletAddress, signature } = req.body;
        
        console.log("🔍 Document view request for docId:", docId);
        console.log("🦊 Wallet address:", walletAddress);
        
        // Find the document
        const userId = new mongoose.Types.ObjectId(req.session.userId);
        const document = await DocumentVerification.findOne({ 
            docId: docId, 
            userId: userId 
        });
        
        if (!document) {
            return res.status(404).json({ message: "Document not found." });
        }
        
        // Verify MetaMask signature
        if (!walletAddress || !signature) {
            return res.status(400).json({ message: "MetaMask verification required." });
        }
        
        try {
            // Verify the signature
            const message = `Access document: ${docId}`;
            const recoveredAddress = web3.eth.accounts.recover(message, signature);
            
            if (recoveredAddress.toLowerCase() !== walletAddress.toLowerCase()) {
                return res.status(401).json({ message: "Invalid MetaMask signature." });
            }
            
            console.log("✅ MetaMask signature verified for document access");
        } catch (sigError) {
            console.error("❌ Signature verification failed:", sigError.message);
            return res.status(401).json({ message: "Invalid signature format." });
        }
        
        // Fetch document from IPFS
        if (!document.documentCID) {
            return res.status(404).json({ message: "Document not found in IPFS." });
        }
        
        try {
            console.log("📥 Fetching document from IPFS:", document.documentCID);
            
            // Fetch from Pinata IPFS gateway
            const ipfsUrl = `https://gateway.pinata.cloud/ipfs/${document.documentCID}`;
            const response = await fetch(ipfsUrl);
            
            if (!response.ok) {
                throw new Error(`IPFS fetch failed: ${response.status}`);
            }
            
            const contentType = response.headers.get('content-type') || 'application/octet-stream';
            const buffer = await response.arrayBuffer();
            
            console.log("✅ Document fetched from IPFS successfully");
            
            // Return document metadata and content
            res.json({
                success: true,
                document: {
                    id: document.docId,
                    name: `${document.docType} - ${document.docNumber}`,
                    docType: document.docType,
                    docNumber: document.docNumber,
                    contentType: contentType,
                    size: buffer.byteLength,
                    ipfsHash: document.documentCID,
                    transactionHash: document.transactionHash,
                    verificationStatus: document.verificationStatus,
                    submittedAt: document.submittedAt
                },
                content: Buffer.from(buffer).toString('base64'), // Base64 encoded content
                downloadUrl: ipfsUrl
            });
            
        } catch (ipfsError) {
            console.error("❌ IPFS fetch error:", ipfsError.message);
            res.status(500).json({ message: "Failed to fetch document from IPFS." });
        }
        
    } catch (error) {
        console.error("❌ Document view error:", error.message);
        res.status(500).json({ message: "Failed to access document." });
    }
});

app.post("/api/contact", isAuthenticated, async (req, res) => {
    const { subject, message } = req.body;
    try {
        const contactMessage = new ContactMessage({
            subject,
            message,
            submittedBy: req.session.userId,
        });
        await contactMessage.save();
        res.status(201).json({ message: "Message sent successfully!" });
    } catch (error) {
        console.error("Error sending contact message:", error.message);
        res.status(500).json({ message: "Failed to send message." });
    }
});

// Catch-all handler: send back vanilla frontend's index.html file for client-side routing
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

// --- Server Start ---
app.listen(port, () => {
    console.log(` Server is running on http://localhost:${port}`);
});