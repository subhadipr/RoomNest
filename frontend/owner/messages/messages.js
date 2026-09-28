/* =========================================================
   ROOMNEST — OWNER MESSAGES JS
========================================================= */

"use strict";


/* =========================================================
   STORAGE KEYS
========================================================= */

const MESSAGE_STORAGE_KEY = "roomnestOwnerMessages";
const OWNER_STORAGE_KEY = "roomnestOwner";
const SELECTED_STUDENT_KEY = "roomnestSelectedStudent";


/* =========================================================
   DEMO DATA
========================================================= */

const defaultConversations = [

    {
        id: "conv-1001",

        student: {
            name: "Rahul Das",
            email: "rahul.das@example.com",
            phone: "+91 98765 43210",
            college: "MAKAUT"
        },

        property: "Green View PG",
        room: "Room 204",
        bookingId: "RN-BK-1001",

        avatar: "RD",

        online: true,

        unread: 2,

        archived: false,

        lastTime: "5 min ago",

        messages: [

            {
                id: 1,
                sender: "student",
                text: "Hello sir, is Room 204 still available?",
                time: "10:15 AM"
            },

            {
                id: 2,
                sender: "owner",
                text: "Yes Rahul, Room 204 is currently available.",
                time: "10:18 AM"
            },

            {
                id: 3,
                sender: "student",
                text: "Great. Can I visit the property tomorrow?",
                time: "10:22 AM"
            },

            {
                id: 4,
                sender: "student",
                text: "Also, is electricity included in the rent?",
                time: "10:25 AM"
            }

        ]
    },


    {
        id: "conv-1002",

        student: {
            name: "Sneha Mukherjee",
            email: "sneha.m@example.com",
            phone: "+91 91234 56789",
            college: "Visva-Bharati University"
        },

        property: "Lake View Residence",
        room: "Room 103",
        bookingId: "RN-BK-1002",

        avatar: "SM",

        online: true,

        unread: 1,

        archived: false,

        lastTime: "28 min ago",

        messages: [

            {
                id: 1,
                sender: "student",
                text: "Hi, I wanted to know if food is included with the rent.",
                time: "9:45 AM"
            },

            {
                id: 2,
                sender: "owner",
                text: "Yes, breakfast and dinner are included.",
                time: "9:50 AM"
            },

            {
                id: 3,
                sender: "student",
                text: "Thank you. That sounds good.",
                time: "9:52 AM"
            }

        ]
    },


    {
        id: "conv-1003",

        student: {
            name: "Amit Ghosh",
            email: "amit.g@example.com",
            phone: "+91 90000 12345",
            college: "Suri College"
        },

        property: "City Center Boys PG",
        room: "Room 305",
        bookingId: "RN-BK-1003",

        avatar: "AG",

        online: false,

        unread: 0,

        archived: false,

        lastTime: "Yesterday",

        messages: [

            {
                id: 1,
                sender: "student",
                text: "Sir, I have submitted the booking documents.",
                time: "Yesterday 5:10 PM"
            },

            {
                id: 2,
                sender: "owner",
                text: "I received them. I will verify them shortly.",
                time: "Yesterday 5:18 PM"
            }

        ]
    },


    {
        id: "conv-1004",

        student: {
            name: "Priya Sharma",
            email: "priya.s@example.com",
            phone: "+91 88990 11223",
            college: "Burdwan University"
        },

        property: "Green View PG",
        room: "Room 107",
        bookingId: "RN-BK-1004",

        avatar: "PS",

        online: false,

        unread: 0,

        archived: false,

        lastTime: "Yesterday",

        messages: [

            {
                id: 1,
                sender: "owner",
                text: "Hello Priya, your booking has been confirmed.",
                time: "Yesterday 3:20 PM"
            },

            {
                id: 2,
                sender: "student",
                text: "Thank you sir.",
                time: "Yesterday 3:25 PM"
            }

        ]
    },


    {
        id: "conv-1005",

        student: {
            name: "Sourav Roy",
            email: "sourav.r@example.com",
            phone: "+91 81111 22334",
            college: "Bolpur College"
        },

        property: "Green View PG",
        room: "Room 202",
        bookingId: "RN-BK-1005",

        avatar: "SR",

        online: false,

        unread: 0,

        archived: true,

        lastTime: "3 days ago",

        messages: [

            {
                id: 1,
                sender: "student",
                text: "Thanks for your help.",
                time: "3 days ago"
            },

            {
                id: 2,
                sender: "owner",
                text: "You're welcome.",
                time: "3 days ago"
            }

        ]
    }

];


/* =========================================================
   STATE
========================================================= */

let conversations = [];

let selectedConversationId = null;

let currentFilter = "all";

let searchTerm = "";


/* =========================================================
   DOM
========================================================= */

const conversationList =
    document.getElementById("conversationList");

const conversationSearch =
    document.getElementById("conversationSearch");

const conversationCount =
    document.getElementById("conversationCount");

const filterUnreadCount =
    document.getElementById("filterUnreadCount");

const sidebarUnreadCount =
    document.getElementById("sidebarUnreadCount");

const totalConversations =
    document.getElementById("totalConversations");

const unreadMessages =
    document.getElementById("unreadMessages");

const activeStudents =
    document.getElementById("activeStudents");

const chatEmpty =
    document.getElementById("chatEmpty");

const activeChat =
    document.getElementById("activeChat");

const chatMessages =
    document.getElementById("chatMessages");

const chatStudentName =
    document.getElementById("chatStudentName");

const chatAvatar =
    document.getElementById("chatAvatar");

const chatStatus =
    document.getElementById("chatStatus");

const chatPropertyName =
    document.getElementById("chatPropertyName");

const chatBookingInfo =
    document.getElementById("chatBookingInfo");

const messageInput =
    document.getElementById("messageInput");

const sendMessageBtn =
    document.getElementById("sendMessageBtn");

const emojiBtn =
    document.getElementById("emojiBtn");

const emojiPicker =
    document.getElementById("emojiPicker");

const attachmentBtn =
    document.getElementById("attachmentBtn");

const fileInput =
    document.getElementById("fileInput");

const studentInfoModal =
    document.getElementById("studentInfoModal");

const searchModal =
    document.getElementById("searchModal");

const notificationModal =
    document.getElementById("notificationModal");

const toast =
    document.getElementById("toast");


/* =========================================================
   INIT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    loadOwner();

    loadMessages();

    setupEvents();

    handleSelectedStudentContext();

    renderConversations();

    updateStats();

});


/* =========================================================
   LOAD OWNER
========================================================= */

function loadOwner() {

    const savedOwner =
        localStorage.getItem(OWNER_STORAGE_KEY);

    if (!savedOwner) {
        return;
    }

    try {

        const owner = JSON.parse(savedOwner);

        const name =
            owner.name ||
            owner.fullName ||
            "Subhadip Roy";

        const initials =
            getInitials(name);

        const sidebarName =
            document.getElementById("sidebarOwnerName");

        const topName =
            document.getElementById("topOwnerName");

        const sidebarAvatar =
            document.getElementById("sidebarAvatar");

        const topAvatar =
            document.getElementById("topAvatar");

        if (sidebarName) {
            sidebarName.textContent = name;
        }

        if (topName) {
            topName.textContent = name;
        }

        if (sidebarAvatar) {
            sidebarAvatar.textContent = initials;
        }

        if (topAvatar) {
            topAvatar.textContent = initials;
        }

    } catch (error) {

        console.log("Owner data error:", error);

    }

}


/* =========================================================
   LOAD MESSAGES
========================================================= */

function loadMessages() {

    const saved =
        localStorage.getItem(MESSAGE_STORAGE_KEY);

    if (!saved) {

        conversations =
            structuredClone(defaultConversations);

        saveMessages();

        return;
    }

    try {

        conversations =
            JSON.parse(saved);

        if (!Array.isArray(conversations) ||
            conversations.length === 0) {

            conversations =
                structuredClone(defaultConversations);

            saveMessages();
        }

    } catch (error) {

        conversations =
            structuredClone(defaultConversations);

        saveMessages();
    }

}


/* =========================================================
   SAVE
========================================================= */

function saveMessages() {

    localStorage.setItem(
        MESSAGE_STORAGE_KEY,
        JSON.stringify(conversations)
    );

}


/* =========================================================
   EVENTS
========================================================= */

function setupEvents() {


    /* Search */

    conversationSearch.addEventListener(
        "input",
        event => {

            searchTerm =
                event.target.value
                    .trim()
                    .toLowerCase();

            renderConversations();

        }
    );


    /* Filters */

    document
        .querySelectorAll(".conversation-filter")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    document
                        .querySelectorAll(".conversation-filter")
                        .forEach(btn =>
                            btn.classList.remove("active")
                        );

                    button.classList.add("active");

                    currentFilter =
                        button.dataset.filter;

                    renderConversations();

                }
            );

        });


    /* Send */

    sendMessageBtn.addEventListener(
        "click",
        sendMessage
    );


    /* Enter send */

    messageInput.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Enter" &&
                !event.shiftKey
            ) {

                event.preventDefault();

                sendMessage();

            }

        }
    );


    /* Auto resize */

    messageInput.addEventListener(
        "input",
        () => {

            messageInput.style.height = "auto";

            messageInput.style.height =
                Math.min(
                    messageInput.scrollHeight,
                    100
                ) + "px";

        }
    );


    /* Emoji */

    emojiBtn.addEventListener(
        "click",
        event => {

            event.stopPropagation();

            emojiPicker.classList.toggle("show");

        }
    );


    document
        .querySelectorAll(".emoji-picker button")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    messageInput.value +=
                        button.textContent;

                    messageInput.focus();

                }
            );

        });


    document.addEventListener(
        "click",
        event => {

            if (
                !emojiPicker.contains(event.target) &&
                event.target !== emojiBtn
            ) {

                emojiPicker.classList.remove("show");

            }

        }
    );


    /* Attachment */

    attachmentBtn.addEventListener(
        "click",
        () => {

            fileInput.click();

        }
    );


    fileInput.addEventListener(
        "change",
        handleAttachment
    );


    /* Mark all */

    document
        .getElementById("markAllReadBtn")
        .addEventListener(
            "click",
            markAllRead
        );


    /* Mark selected */

    document
        .getElementById("markReadBtn")
        .addEventListener(
            "click",
            markSelectedRead
        );


    /* Archive */

    document
        .getElementById("archiveBtn")
        .addEventListener(
            "click",
            toggleArchive
        );


    /* Student info */

    document
        .getElementById("studentInfoBtn")
        .addEventListener(
            "click",
            openStudentInfo
        );


    document
        .getElementById("closeStudentInfo")
        .addEventListener(
            "click",
            () => closeModal(studentInfoModal)
        );


    document
        .getElementById("modalCloseBtn")
        .addEventListener(
            "click",
            () => closeModal(studentInfoModal)
        );


    /* Search modal */

    document
        .getElementById("searchBtn")
        .addEventListener(
            "click",
            () => openModal(searchModal)
        );


    document
        .getElementById("closeSearchModal")
        .addEventListener(
            "click",
            () => closeModal(searchModal)
        );


    /* Notification */

    document
        .getElementById("notificationBtn")
        .addEventListener(
            "click",
            () => openModal(notificationModal)
        );


    document
        .getElementById("closeNotificationModal")
        .addEventListener(
            "click",
            () => closeModal(notificationModal)
        );


    /* Global search */

    document
        .getElementById("globalMessageSearch")
        .addEventListener(
            "input",
            globalSearch
        );


    /* Mobile */

    document
        .getElementById("mobileMenuBtn")
        .addEventListener(
            "click",
            openSidebar
        );


    document
        .getElementById("sidebarOverlay")
        .addEventListener(
            "click",
            closeSidebar
        );


    document
        .getElementById("mobileBackBtn")
        .addEventListener(
            "click",
            closeMobileChat
        );


    /* Logout */

    document
        .getElementById("logoutBtn")
        .addEventListener(
            "click",
            logout
        );


    /* Property */

    document
        .getElementById("viewPropertyBtn")
        .addEventListener(
            "click",
            () => {

                showToast(
                    "Property",
                    "Property page will be connected with backend."
                );

            }
        );


    /* Profile */

    document
        .getElementById("profileMenuBtn")
        .addEventListener(
            "click",
            () => {

                window.location.href =
                    "../profile/profile.html";

            }
        );


    /* Modal outside click */

    [
        studentInfoModal,
        searchModal,
        notificationModal
    ].forEach(modal => {

        modal.addEventListener(
            "click",
            event => {

                if (event.target === modal) {
                    closeModal(modal);
                }

            }
        );

    });


    /* Escape */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {

                [
                    studentInfoModal,
                    searchModal,
                    notificationModal
                ].forEach(closeModal);

                emojiPicker.classList.remove("show");

            }

        }
    );

}


/* =========================================================
   HANDLE INCOMING STUDENT CONTEXT
========================================================= */

function handleSelectedStudentContext() {

    const selected =
        localStorage.getItem(
            SELECTED_STUDENT_KEY
        );

    if (!selected) {
        return;
    }

    try {

        const student =
            JSON.parse(selected);

        const matching =
            conversations.find(conversation =>

                conversation.student.email ===
                student.email

            );

        if (matching) {

            setTimeout(() => {

                selectConversation(matching.id);

            }, 100);

        } else if (student.name) {

            const newConversation = {

                id:
                    "conv-" +
                    Date.now(),

                student: {
                    name: student.name,
                    email: student.email || "",
                    phone: student.phone || "",
                    college: student.college || "Not provided"
                },

                property:
                    student.property ||
                    "RoomNest Property",

                room:
                    student.room ||
                    "Selected Room",

                bookingId:
                    student.bookingId ||
                    "Not assigned",

                avatar:
                    getInitials(student.name),

                online: true,

                unread: 0,

                archived: false,

                lastTime: "Just now",

                messages: []

            };

            conversations.unshift(
                newConversation
            );

            saveMessages();

            renderConversations();

            selectConversation(
                newConversation.id
            );

        }

        localStorage.removeItem(
            SELECTED_STUDENT_KEY
        );

    } catch (error) {

        console.log(
            "Selected student context error:",
            error
        );

    }

}


/* =========================================================
   RENDER CONVERSATIONS
========================================================= */

function renderConversations() {

    let filtered =
        [...conversations];


    /* Filter */

    if (currentFilter === "unread") {

        filtered =
            filtered.filter(
                conversation =>
                    Number(conversation.unread) > 0 &&
                    !conversation.archived
            );

    } else if (currentFilter === "archived") {

        filtered =
            filtered.filter(
                conversation =>
                    conversation.archived
            );

    } else {

        filtered =
            filtered.filter(
                conversation =>
                    !conversation.archived
            );

    }


    /* Search */

    if (searchTerm) {

        filtered =
            filtered.filter(
                conversation => {

                    const combined = [

                        conversation.student.name,

                        conversation.student.email,

                        conversation.property,

                        conversation.room,

                        conversation.bookingId,

                        getLastMessage(
                            conversation
                        )

                    ]
                        .join(" ")
                        .toLowerCase();

                    return combined.includes(
                        searchTerm
                    );

                }
            );

    }


    /* Empty */

    if (filtered.length === 0) {

        conversationList.innerHTML = `

            <div class="conversation-empty">

                <i class="fa-solid fa-comments"></i>

                <p>
                    No conversations found.
                </p>

            </div>

        `;

        updateConversationCount(0);

        return;
    }


    conversationList.innerHTML =
        filtered.map(
            createConversationHTML
        ).join("");


    updateConversationCount(
        filtered.length
    );


    /* Click */

    conversationList
        .querySelectorAll(".conversation-item")
        .forEach(item => {

            item.addEventListener(
                "click",
                () => {

                    selectConversation(
                        item.dataset.id
                    );

                }
            );

        });

}


/* =========================================================
   CREATE CONVERSATION HTML
========================================================= */

function createConversationHTML(
    conversation
) {

    const isActive =
        conversation.id ===
        selectedConversationId;

    const lastMessage =
        getLastMessage(
            conversation
        );

    return `

        <div
            class="conversation-item
                ${conversation.unread > 0 ? "unread" : ""}
                ${isActive ? "active" : ""}"
            data-id="${conversation.id}"
        >

            <div class="conversation-avatar">

                ${escapeHTML(conversation.avatar)}

                ${
                    conversation.online
                        ? `<span class="conversation-online"></span>`
                        : ""
                }

            </div>


            <div class="conversation-info">

                <div class="conversation-name-row">

                    <span class="conversation-name">
                        ${escapeHTML(
                            conversation.student.name
                        )}
                    </span>

                    <span class="conversation-time">
                        ${escapeHTML(
                            conversation.lastTime
                        )}
                    </span>

                </div>


                <div class="conversation-preview">

                    ${escapeHTML(
                        lastMessage ||
                        "No messages yet"
                    )}

                </div>


                <div class="conversation-property">

                    <i class="fa-solid fa-building"></i>

                    ${escapeHTML(
                        conversation.property
                    )}

                </div>

            </div>


            ${
                conversation.unread > 0
                    ? `
                        <span class="unread-count">
                            ${conversation.unread}
                        </span>
                      `
                    : ""
            }

        </div>

    `;

}


/* =========================================================
   SELECT CONVERSATION
========================================================= */

function selectConversation(id) {

    const conversation =
        conversations.find(
            item => item.id === id
        );

    if (!conversation) {
        return;
    }

    selectedConversationId = id;

    /* Mark read when opened */

    conversation.unread = 0;

    saveMessages();

    renderConversations();

    renderChat(conversation);

    updateStats();

    openMobileChat();

}


/* =========================================================
   RENDER CHAT
========================================================= */

function renderChat(conversation) {

    chatEmpty.style.display = "none";

    activeChat.classList.add("show");


    chatStudentName.textContent =
        conversation.student.name;

    chatAvatar.textContent =
        conversation.avatar;


    if (conversation.online) {

        chatStatus.textContent = "Online";

    } else {

        chatStatus.textContent =
            "Offline";

    }


    chatPropertyName.textContent =
        conversation.property;


    chatBookingInfo.textContent =
        `${conversation.room} • Booking #${conversation.bookingId}`;


    if (
        !conversation.messages ||
        conversation.messages.length === 0
    ) {

        chatMessages.innerHTML = `

            <div class="conversation-empty">

                <i class="fa-regular fa-message"></i>

                <p>
                    No messages yet. Start the conversation.
                </p>

            </div>

        `;

        return;
    }


    let html = `

        <div class="message-date">
            Today
        </div>

    `;


    conversation.messages.forEach(
        message => {

            html += createMessageHTML(
                message,
                conversation
            );

        }
    );


    chatMessages.innerHTML = html;


    scrollChatToBottom();

}


/* =========================================================
   CREATE MESSAGE
========================================================= */

function createMessageHTML(
    message,
    conversation
) {

    const isOwner =
        message.sender === "owner";


    const initials =
        isOwner
            ? getOwnerInitials()
            : conversation.avatar;


    return `

        <div class="
            message-row
            ${isOwner ? "owner" : "student"}
        ">

            <div class="message-small-avatar">
                ${escapeHTML(initials)}
            </div>


            <div class="message-content">

                ${
                    message.attachment
                        ? `
                            <div class="message-attachment">

                                <i class="fa-solid fa-file"></i>

                                <span>
                                    ${escapeHTML(
                                        message.attachment
                                    )}
                                </span>

                            </div>
                          `
                        : ""
                }


                ${
                    message.text
                        ? `
                            <div class="message-bubble">

                                ${escapeHTML(
                                    message.text
                                )}

                            </div>
                          `
                        : ""
                }


                <span class="message-time">

                    ${escapeHTML(
                        message.time
                    )}

                </span>

            </div>

        </div>

    `;

}


/* =========================================================
   SEND MESSAGE
========================================================= */

function sendMessage() {

    if (!selectedConversationId) {

        showToast(
            "Select a conversation",
            "Please select a student first."
        );

        return;
    }


    const text =
        messageInput.value.trim();


    if (!text) {
        return;
    }


    const conversation =
        conversations.find(
            item =>
                item.id ===
                selectedConversationId
        );


    if (!conversation) {
        return;
    }


    if (!conversation.messages) {
        conversation.messages = [];
    }


    conversation.messages.push({

        id:
            Date.now(),

        sender: "owner",

        text: text,

        time:
            getCurrentTime()

    });


    conversation.lastTime =
        "Just now";


    messageInput.value = "";

    messageInput.style.height = "auto";


    saveMessages();

    renderChat(conversation);

    renderConversations();

    updateStats();


    /* Demo student response */

    simulateStudentReply(
        conversation
    );

}


/* =========================================================
   DEMO STUDENT REPLY
========================================================= */

function simulateStudentReply(
    conversation
) {

    const replies = [

        "Thank you sir.",

        "Okay, I understand.",

        "That sounds good.",

        "Can I visit the property tomorrow?",

        "Thank you for the information.",

        "I will let you know shortly."

    ];


    const reply =
        replies[
            Math.floor(
                Math.random() *
                replies.length
            )
        ];


    const typingIndicator =
        document.getElementById(
            "typingIndicator"
        );


    setTimeout(() => {

        if (
            selectedConversationId ===
            conversation.id
        ) {

            typingIndicator.classList.add(
                "show"
            );

        }

    }, 500);


    setTimeout(() => {

        typingIndicator.classList.remove(
            "show"
        );


        conversation.messages.push({

            id:
                Date.now(),

            sender: "student",

            text: reply,

            time:
                getCurrentTime()

        });


        conversation.lastTime =
            "Just now";


        saveMessages();

        renderChat(conversation);

        renderConversations();

        updateStats();


    }, 1800);

}


/* =========================================================
   MARK SELECTED READ
========================================================= */

function markSelectedRead() {

    if (!selectedConversationId) {

        showToast(
            "No conversation",
            "Select a conversation first."
        );

        return;
    }


    const conversation =
        conversations.find(
            item =>
                item.id ===
                selectedConversationId
        );


    if (!conversation) {
        return;
    }


    conversation.unread = 0;

    saveMessages();

    renderConversations();

    updateStats();


    showToast(
        "Marked as read",
        "Conversation marked as read."
    );

}


/* =========================================================
   MARK ALL READ
========================================================= */

function markAllRead() {

    conversations.forEach(
        conversation => {

            conversation.unread = 0;

        }
    );


    saveMessages();

    renderConversations();

    updateStats();


    showToast(
        "All messages read",
        "All conversations have been marked as read."
    );

}


/* =========================================================
   ARCHIVE / RESTORE
========================================================= */

function toggleArchive() {

    if (!selectedConversationId) {
        return;
    }


    const conversation =
        conversations.find(
            item =>
                item.id ===
                selectedConversationId
        );


    if (!conversation) {
        return;
    }


    conversation.archived =
        !conversation.archived;


    saveMessages();

    renderConversations();

    updateStats();


    const action =
        conversation.archived
            ? "archived"
            : "restored";


    showToast(
        `Conversation ${action}`,
        `${conversation.student.name}'s conversation has been ${action}.`
    );


    if (conversation.archived) {

        closeMobileChat();

        chatEmpty.style.display = "flex";

        activeChat.classList.remove(
            "show"
        );

    }

}


/* =========================================================
   STUDENT INFO
========================================================= */

function openStudentInfo() {

    if (!selectedConversationId) {
        return;
    }


    const conversation =
        conversations.find(
            item =>
                item.id ===
                selectedConversationId
        );


    if (!conversation) {
        return;
    }


    const student =
        conversation.student;


    document.getElementById(
        "modalStudentAvatar"
    ).textContent =
        conversation.avatar;


    document.getElementById(
        "modalStudentName"
    ).textContent =
        student.name;


    document.getElementById(
        "modalStudentEmail"
    ).textContent =
        student.email || "Not provided";


    document.getElementById(
        "modalStudentPhone"
    ).textContent =
        student.phone || "Not provided";


    document.getElementById(
        "modalStudentCollege"
    ).textContent =
        student.college || "Not provided";


    document.getElementById(
        "modalStudentProperty"
    ).textContent =
        conversation.property;


    document.getElementById(
        "modalStudentBooking"
    ).textContent =
        conversation.bookingId;


    openModal(studentInfoModal);

}


/* =========================================================
   ATTACHMENT
========================================================= */

function handleAttachment(event) {

    const file =
        event.target.files[0];


    if (!file) {
        return;
    }


    if (!selectedConversationId) {

        showToast(
            "Select a conversation",
            "Please select a student first."
        );

        return;
    }


    const conversation =
        conversations.find(
            item =>
                item.id ===
                selectedConversationId
        );


    if (!conversation) {
        return;
    }


    if (!conversation.messages) {
        conversation.messages = [];
    }


    conversation.messages.push({

        id:
            Date.now(),

        sender: "owner",

        text:
            `Attached file: ${file.name}`,

        attachment:
            file.name,

        time:
            getCurrentTime()

    });


    conversation.lastTime =
        "Just now";


    saveMessages();

    renderChat(conversation);

    renderConversations();


    fileInput.value = "";


    showToast(
        "Attachment added",
        `${file.name} attached successfully.`
    );

}


/* =========================================================
   GLOBAL SEARCH
========================================================= */

function globalSearch(event) {

    const value =
        event.target.value
            .trim()
            .toLowerCase();


    const results =
        document.getElementById(
            "globalSearchResults"
        );


    if (!value) {

        results.innerHTML = `

            <p>
                Start typing to search conversations.
            </p>

        `;

        return;
    }


    const matched =
        conversations.filter(
            conversation => {

                const text = [

                    conversation.student.name,

                    conversation.student.email,

                    conversation.property,

                    conversation.bookingId

                ]
                    .join(" ")
                    .toLowerCase();

                return text.includes(value);

            }
        );


    if (matched.length === 0) {

        results.innerHTML = `

            <p>
                No matching conversation found.
            </p>

        `;

        return;
    }


    results.innerHTML =
        matched.map(
            conversation => `

                <div
                    class="global-result"
                    data-global-id="${conversation.id}"
                >

                    <div class="conversation-avatar">

                        ${escapeHTML(
                            conversation.avatar
                        )}

                    </div>

                    <div>

                        <strong>
                            ${escapeHTML(
                                conversation.student.name
                            )}
                        </strong>

                        <small>
                            ${escapeHTML(
                                conversation.property
                            )}
                        </small>

                    </div>

                </div>

            `
        ).join("");


    results
        .querySelectorAll(".global-result")
        .forEach(result => {

            result.addEventListener(
                "click",
                () => {

                    selectConversation(
                        result.dataset.globalId
                    );

                    closeModal(searchModal);

                    document.getElementById(
                        "globalMessageSearch"
                    ).value = "";

                }
            );

        });

}


/* =========================================================
   STATS
========================================================= */

function updateStats() {

    const total =
        conversations.length;


    const unread =
        conversations.reduce(
            (sum, conversation) =>
                sum +
                Number(
                    conversation.unread || 0
                ),
            0
        );


    const active =
        conversations.filter(
            conversation =>
                conversation.online &&
                !conversation.archived
        ).length;


    totalConversations.textContent =
        total;

    unreadMessages.textContent =
        unread;

    activeStudents.textContent =
        active;


    filterUnreadCount.textContent =
        unread;

    sidebarUnreadCount.textContent =
        unread;


    conversationCount.textContent =
        `${conversations.filter(
            c => !c.archived
        ).length} chats`;

}


/* =========================================================
   UPDATE CONVERSATION COUNT
========================================================= */

function updateConversationCount(
    count
) {

    conversationCount.textContent =
        `${count} ${count === 1 ? "chat" : "chats"}`;

}


/* =========================================================
   GET LAST MESSAGE
========================================================= */

function getLastMessage(
    conversation
) {

    if (
        !conversation.messages ||
        conversation.messages.length === 0
    ) {

        return "";

    }


    const last =
        conversation.messages[
            conversation.messages.length - 1
        ];


    return last.text || "Attachment";

}


/* =========================================================
   CURRENT TIME
========================================================= */

function getCurrentTime() {

    return new Date().toLocaleTimeString(
        [],
        {
            hour: "2-digit",
            minute: "2-digit"
        }
    );

}


/* =========================================================
   INITIALS
========================================================= */

function getInitials(name) {

    if (!name) {
        return "RN";
    }


    return name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map(word =>
            word.charAt(0)
        )
        .join("")
        .toUpperCase();

}


function getOwnerInitials() {

    const saved =
        localStorage.getItem(
            OWNER_STORAGE_KEY
        );


    if (!saved) {
        return "SR";
    }


    try {

        const owner =
            JSON.parse(saved);

        return getInitials(
            owner.name ||
            owner.fullName ||
            "Subhadip Roy"
        );

    } catch {

        return "SR";

    }

}


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHTML(value) {

    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* =========================================================
   MODALS
========================================================= */

function openModal(modal) {

    modal.classList.add("show");

}


function closeModal(modal) {

    modal.classList.remove("show");

}


/* =========================================================
   MOBILE SIDEBAR
========================================================= */

function openSidebar() {

    document
        .getElementById("ownerSidebar")
        .classList.add("open");

    document
        .getElementById("sidebarOverlay")
        .classList.add("show");

}


function closeSidebar() {

    document
        .getElementById("ownerSidebar")
        .classList.remove("open");

    document
        .getElementById("sidebarOverlay")
        .classList.remove("show");

}


/* =========================================================
   MOBILE CHAT
========================================================= */

function openMobileChat() {

    if (window.innerWidth <= 700) {

        document
            .getElementById("chatPanel")
            .classList.add("mobile-open");

    }

}


function closeMobileChat() {

    document
        .getElementById("chatPanel")
        .classList.remove("mobile-open");

}


/* =========================================================
   SCROLL CHAT
========================================================= */

function scrollChatToBottom() {

    setTimeout(() => {

        chatMessages.scrollTop =
            chatMessages.scrollHeight;

    }, 50);

}


/* =========================================================
   TOAST
========================================================= */

let toastTimer;


function showToast(
    title,
    message
) {

    document.getElementById(
        "toastTitle"
    ).textContent = title;


    document.getElementById(
        "toastMessage"
    ).textContent = message;


    toast.classList.add("show");


    clearTimeout(toastTimer);


    toastTimer =
        setTimeout(() => {

            toast.classList.remove(
                "show"
            );

        }, 3500);

}


document
    .getElementById("toastClose")
    .addEventListener(
        "click",
        () => {

            toast.classList.remove(
                "show"
            );

        }
    );


/* =========================================================
   LOGOUT
========================================================= */

function logout() {

    const confirmLogout =
        confirm(
            "Are you sure you want to logout?"
        );


    if (!confirmLogout) {
        return;
    }


    localStorage.removeItem(
        "roomnestOwner"
    );

    localStorage.removeItem(
        "roomnestOwnerToken"
    );


    window.location.href =
        "../../public/auth/login.html";

}


/* =========================================================
   RESIZE
========================================================= */

window.addEventListener(
    "resize",
    () => {

        if (window.innerWidth > 700) {

            document
                .getElementById("chatPanel")
                .classList.remove(
                    "mobile-open"
                );

        }

        if (window.innerWidth > 900) {

            closeSidebar();

        }

    }
);