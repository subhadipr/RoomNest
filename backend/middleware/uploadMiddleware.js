const multer = require("multer");
const path = require("path");
const fs = require("fs");

// =========================================================
// UPLOAD DIRECTORY
// =========================================================
const uploadDirectory = path.join(
    __dirname,
    "../uploads/properties"
);

// Create directory if it does not exist
if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(
        uploadDirectory,
        {
            recursive: true
        }
    );
}


// =========================================================
// STORAGE CONFIGURATION
// =========================================================
const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(
            null,
            uploadDirectory
        );
    },

    filename: (req, file, cb) => {
        const extension =
            path.extname(
                file.originalname
            ).toLowerCase();

        const uniqueName =
            `property-${Date.now()}-${Math.round(
                Math.random() * 1e9
            )}${extension}`;

        cb(
            null,
            uniqueName
        );
    }
});


// =========================================================
// FILE FILTER
// =========================================================
const fileFilter = (
    req,
    file,
    cb
) => {

    const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp"
    ];

    if (
        allowedTypes.includes(
            file.mimetype
        )
    ) {
        cb(
            null,
            true
        );
    } else {
        cb(
            new Error(
                "Only JPG, JPEG, PNG and WEBP images are allowed."
            ),
            false
        );
    }
};


// =========================================================
// MULTER CONFIGURATION
// =========================================================
const upload = multer({

    storage,

    fileFilter,

    limits: {
        fileSize:
            5 * 1024 * 1024, // 5 MB
        files: 10
    }
});


// =========================================================
// SINGLE IMAGE UPLOAD
// =========================================================
const uploadSingle = upload.single(
    "image"
);


// =========================================================
// MULTIPLE PROPERTY IMAGES
// =========================================================
const uploadPropertyImages =
    upload.array(
        "images",
        10
    );


// =========================================================
// EXPORT
// =========================================================
module.exports = {
    upload,
    uploadSingle,
    uploadPropertyImages
};