/* =========================================================
   ROOMNEST — STUDENT MESSAGES
   Standalone JavaScript
========================================================= */


/* =========================================================
   DEMO CONVERSATIONS
========================================================= */

const conversations = [
    {
        id: 1,
        name: "Green View Premium PG",
        initials: "GV",
        property: "Green View Premium PG",
        location: "Suri, Birbhum",
        online: true,
        unread: 2,
        archived: false,
        time: "10:42 AM",
        lastMessage: "Yes, the room is still available.",
        phone: "+91 98765 43210",
        email: "owner@greenview.com",

        messages: [
            {
                type: "received",
                text: "Hello! Thanks for contacting Green View Premium PG.",
                time: "10:20 AM"
            },
            {
                type: "sent",
                text: "Hello, I wanted to know if a single room is available.",
                time: "10:24 AM",
                status: "✓✓"
            },
            {
                type: "received",
                text: "Yes, the room is still available.",
                time: "10:28 AM"
            },
            {
                type: "sent",
                text: "What is the monthly rent including electricity?",
                time: "10:31 AM",
                status: "✓✓"
            },
            {
                type: "received",
                text: "The monthly rent is ₹6,500. Electricity is separate.",
                time: "10:42 AM"
            }
        ]
    },


    {
        id: 2,
        name: "Urban Nest Rooms",
        initials: "UN",
        property: "Urban Nest Rooms",
        location: "Bolpur, Birbhum",
        online: true,
        unread: 1,
        archived: false,
        time: "Yesterday",
        lastMessage: "You can visit the property tomorrow.",
        phone: "+91 91234 56789",
        email: "contact@urbannest.com",

        messages: [
            {
                type: "received",
                text: "Hi Subhadip, how can I help you?",
                time: "Yesterday"
            },
            {
                type: "sent",
                text: "Can I visit the room before booking?",
                time: "Yesterday",
                status: "✓✓"
            },
            {
                type: "received",
                text: "Yes. You can visit the property tomorrow.",
                time: "Yesterday"
            }
        ]
    },


    {
        id: 3,
        name: "Comfort Stay PG",
        initials: "CS",
        property: "Comfort Stay PG",
        location: "Suri, Birbhum",
        online: false,
        unread: 0,
        archived: false,
        time: "Sep 14",
        lastMessage: "Thank you for your inquiry.",
        phone: "+91 90123 45678",
        email: "comfortstay@example.com",

        messages: [
            {
                type: "sent",
                text: "Is food included with the PG?",
                time: "Sep 14",
                status: "✓✓"
            },
            {
                type: "received",
                text: "Yes, breakfast and dinner are included.",
                time: "Sep 14"
            },
            {
                type: "sent",
                text: "Okay, thank you.",
                time: "Sep 14",
                status: "✓✓"
            },
            {
                type: "received",
                text: "Thank you for your inquiry.",
                time: "Sep 14"
            }
        ]
    },


    {
        id: 4,
        name: "Student Home PG",
        initials: "SH",
        property: "Student Home PG",
        location: "Durgapur, West Bengal",
        online: true,
        unread: 0,
        archived: false,
        time: "Sep 12",
        lastMessage: "The room has Wi-Fi and study table.",
        phone: "+91 98700 12345",
        email: "studenthome@example.com",

        messages: [
            {
                type: "sent",
                text: "Does the room have Wi-Fi?",
                time: "Sep 12",
                status: "✓✓"
            },
            {
                type: "received",
                text: "Yes, the room has Wi-Fi and study table.",
                time: "Sep 12"
            }
        ]
    },


    {
        id: 5,
        name: "Royal Residency",
        initials: "RR",
        property: "Royal Residency",
        location: "Kolkata, West Bengal",
        online: false,
        unread: 0,
        archived: true,
        time: "Sep 08",
        lastMessage: "We have archived this conversation.",
        phone: "+91 90000 11111",
        email: "royal@example.com",

        messages: [
            {
                type: "sent",
                text: "I am interested in the available room.",
                time: "Sep 08",
                status: "✓✓"
            },
            {
                type: "received",
                text: "We have archived this conversation.",
                time: "Sep 08"
            }
        ]
    },


    {
        id: 6,
        name: "Safe Stay Residence",
        initials: "SS",
        property: "Safe Stay Residence",
        location: "Kolkata, West Bengal",
        online: false,
        unread: 0,
        archived: true,
        time: "Sep 02",
        lastMessage: "Thanks for contacting us.",
        phone: "+91 98888 77777",
        email: "safestay@example.com",

        messages: [
            {
                type: "sent",
                text: "Is there parking available?",
                time: "Sep 02",
                status: "✓✓"
            },
            {
                type: "received",
                text: "Yes, parking is available.",
                time: "Sep 02"
            }
        ]
    }
];


/* =========================================================
   VARIABLES
========================================================= */

let selectedConversationId = 1;

let currentFilter = "all";

let searchTerm = "";

let toastTimer;


/* =========================================================
   DOM ELEMENTS
========================================================= */

const conversationList =
    document.getElementById("conversationList");

const conversationSearch =
    document.getElementById("conversationSearch");

const conversationEmpty =
    document.getElementById("conversationEmpty");

const messagesContainer =
    document.getElementById("messagesContainer");

const messageInput =
    document.getElementById("messageInput");

const sendBtn =
    document.getElementById("sendBtn");

const emojiBtn =
    document.getElementById("emojiBtn");

const emojiPicker =
    document.getElementById("emojiPicker");

const attachmentBtn =
    document.getElementById("attachmentBtn");

const fileInput =
    document.getElementById("fileInput");

const sidebar =
    document.getElementById("sidebar");

const sidebarOverlay =
    document.getElementById("sidebarOverlay");

const menuBtn =
    document.getElementById("menuBtn");

const sidebarClose =
    document.getElementById("sidebarClose");

const backConversations =
    document.getElementById("backConversations");

const chatArea =
    document.getElementById("chatArea");

const ownerModal =
    document.getElementById("ownerModal");

const ownerInfoBtn =
    document.getElementById("ownerInfoBtn");

const archiveBtn =
    document.getElementById("archiveBtn");

const viewPropertyBtn =
    document.getElementById("viewPropertyBtn");

const newMessageBtn =
    document.getElementById("newMessageBtn");

const logoutBtn =
    document.getElementById("logoutBtn");


/* =========================================================
   CHAT ELEMENTS
========================================================= */

const chatOwnerAvatar =
    document.getElementById("chatOwnerAvatar");

const chatOwnerName =
    document.getElementById("chatOwnerName");

const chatOwnerStatus =
    document.getElementById("chatOwnerStatus");

const chatPropertyName =
    document.getElementById("chatPropertyName");

const chatPropertyLocation =
    document.getElementById("chatPropertyLocation");

const modalOwnerAvatar =
    document.getElementById("modalOwnerAvatar");

const modalOwnerName =
    document.getElementById("modalOwnerName");

const modalPhone =
    document.getElementById("modalPhone");

const modalEmail =
    document.getElementById("modalEmail");

const modalLocation =
    document.getElementById("modalLocation");

const typingIndicator =
    document.getElementById("typingIndicator");


/* =========================================================
   TOAST
========================================================= */

function showToast(title, message, icon = "✓") {

    const toast =
        document.getElementById("toast");

    document.getElementById("toastTitle").textContent =
        title;

    document.getElementById("toastMessage").textContent =
        message;

    document.getElementById("toastIcon").textContent =
        icon;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {

        toast.classList.remove("show");

    }, 2800);
}


/* =========================================================
   GET SELECTED CONVERSATION
========================================================= */

function getSelectedConversation() {

    return conversations.find(
        conversation =>
            conversation.id === selectedConversationId
    );
}


/* =========================================================
   RENDER CONVERSATIONS
========================================================= */

function renderConversations() {

    conversationList.innerHTML = "";

    const filtered = conversations.filter(conversation => {

        const matchesSearch =
            conversation.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||

            conversation.property
                .toLowerCase()
                .includes(searchTerm.toLowerCase());

        if (!matchesSearch) {
            return false;
        }


        if (currentFilter === "unread") {
            return conversation.unread > 0;
        }


        if (currentFilter === "archived") {
            return conversation.archived;
        }


        return !conversation.archived;
    });


    if (filtered.length === 0) {

        conversationEmpty.classList.add("show");

        return;

    }


    conversationEmpty.classList.remove("show");


    filtered.forEach(conversation => {

        const item =
            document.createElement("div");

        item.className =
            "conversation-item";

        if (
            conversation.id ===
            selectedConversationId
        ) {

            item.classList.add("active");

        }


        const onlineHTML =
            conversation.online
                ? `<span class="conversation-online"></span>`
                : "";


        const unreadHTML =
            conversation.unread > 0
                ? `<span class="unread-badge">${conversation.unread}</span>`
                : "";


        item.innerHTML = `

            <div class="conversation-avatar">

                ${conversation.initials}

                ${onlineHTML}

            </div>


            <div class="conversation-content">

                <div class="conversation-top">

                    <strong class="conversation-name">
                        ${conversation.name}
                    </strong>

                    <span class="conversation-time">
                        ${conversation.time}
                    </span>

                </div>


                <p class="conversation-message">
                    ${conversation.lastMessage}
                </p>


                <div class="conversation-bottom">

                    <span class="conversation-property">
                        ${conversation.property}
                    </span>

                    ${unreadHTML}

                </div>

            </div>

        `;


        item.addEventListener(
            "click",
            () => selectConversation(conversation.id)
        );


        conversationList.appendChild(item);

    });

}


/* =========================================================
   SELECT CONVERSATION
========================================================= */

function selectConversation(id) {

    selectedConversationId = id;

    const conversation =
        conversations.find(
            item => item.id === id
        );


    if (!conversation) {
        return;
    }


    /* Mark as read */

    conversation.unread = 0;


    updateChatHeader(conversation);

    renderMessages(conversation);

    renderConversations();

    updateStats();


    /* Mobile */

    if (window.innerWidth <= 700) {

        chatArea.classList.add("mobile-open");

    }

}


/* =========================================================
   UPDATE CHAT HEADER
========================================================= */

function updateChatHeader(conversation) {

    chatOwnerAvatar.textContent =
        conversation.initials;

    chatOwnerName.textContent =
        conversation.name;

    chatOwnerStatus.textContent =
        conversation.online
            ? "Online"
            : "Offline";

    chatPropertyName.textContent =
        conversation.property;

    chatPropertyLocation.textContent =
        conversation.location;


    modalOwnerAvatar.textContent =
        conversation.initials;

    modalOwnerName.textContent =
        conversation.name;

    modalPhone.textContent =
        conversation.phone;

    modalEmail.textContent =
        conversation.email;

    modalLocation.textContent =
        conversation.location;

}


/* =========================================================
   RENDER MESSAGES
========================================================= */

function renderMessages(conversation) {

    messagesContainer.innerHTML = "";


    const separator =
        document.createElement("div");

    separator.className =
        "date-separator";

    separator.innerHTML =
        `<span>Today</span>`;

    messagesContainer.appendChild(separator);


    conversation.messages.forEach(message => {

        const row =
            document.createElement("div");

        row.className =
            `message-row ${message.type}`;


        const wrapper =
            document.createElement("div");

        wrapper.className =
            "message-bubble-wrapper";


        const bubble =
            document.createElement("div");

        bubble.className =
            "message-bubble";

        bubble.textContent =
            message.text;


        const time =
            document.createElement("span");

        time.className =
            "message-time";

        time.innerHTML =
            `${message.time} ${
                message.status
                    ? `<span class="message-status">${message.status}</span>`
                    : ""
            }`;


        wrapper.appendChild(bubble);

        wrapper.appendChild(time);

        row.appendChild(wrapper);

        messagesContainer.appendChild(row);

    });


    scrollMessagesToBottom();

}


/* =========================================================
   SCROLL
========================================================= */

function scrollMessagesToBottom() {

    setTimeout(() => {

        messagesContainer.scrollTop =
            messagesContainer.scrollHeight;

    }, 50);

}


/* =========================================================
   SEND MESSAGE
========================================================= */

function sendMessage() {

    const text =
        messageInput.value.trim();


    if (!text) {

        showToast(
            "Empty Message",
            "Please type a message first.",
            "!"
        );

        return;

    }


    const conversation =
        getSelectedConversation();


    if (!conversation) {
        return;
    }


    const now =
        new Date();


    const time =
        now.toLocaleTimeString(
            [],
            {
                hour: "2-digit",
                minute: "2-digit"
            }
        );


    conversation.messages.push({

        type: "sent",

        text: text,

        time: time,

        status: "✓"

    });


    conversation.lastMessage =
        text;

    conversation.time =
        time;


    messageInput.value = "";

    autoResizeTextarea();

    saveMessages();

    renderMessages(conversation);

    renderConversations();


    showToast(
        "Message Sent",
        "Your message has been sent.",
        "✓"
    );


    /* Demo owner reply */

    simulateOwnerReply();

}


/* =========================================================
   OWNER REPLY DEMO
========================================================= */

function simulateOwnerReply() {

    const conversation =
        getSelectedConversation();


    if (!conversation) {
        return;
    }


    typingIndicator.classList.add("show");


    setTimeout(() => {

        typingIndicator.classList.remove("show");


        const reply =
            "Thanks for your message. I will get back to you shortly.";


        const now =
            new Date();


        const time =
            now.toLocaleTimeString(
                [],
                {
                    hour: "2-digit",
                    minute: "2-digit"
                }
            );


        conversation.messages.push({

            type: "received",

            text: reply,

            time: time

        });


        conversation.lastMessage =
            reply;

        conversation.time =
            time;


        saveMessages();

        renderMessages(conversation);

        renderConversations();


    }, 1800);

}


/* =========================================================
   LOCAL STORAGE
========================================================= */

function saveMessages() {

    localStorage.setItem(
        "roomnest_messages",
        JSON.stringify(conversations)
    );

}


function loadMessages() {

    const saved =
        localStorage.getItem(
            "roomnest_messages"
        );


    if (!saved) {
        return;
    }


    try {

        const parsed =
            JSON.parse(saved);


        if (Array.isArray(parsed)) {

            parsed.forEach(savedConversation => {

                const original =
                    conversations.find(
                        item =>
                            item.id ===
                            savedConversation.id
                    );


                if (original) {

                    original.messages =
                        savedConversation.messages ||
                        original.messages;

                    original.lastMessage =
                        savedConversation.lastMessage ||
                        original.lastMessage;

                    original.time =
                        savedConversation.time ||
                        original.time;

                    original.unread =
                        savedConversation.unread ?? 0;

                    original.archived =
                        savedConversation.archived ?? false;

                }

            });

        }

    } catch (error) {

        console.error(
            "Unable to load messages:",
            error
        );

    }

}


/* =========================================================
   STATS
========================================================= */

function updateStats() {

    const total =
        conversations.length;


    const active =
        conversations.filter(
            conversation =>
                !conversation.archived
        ).length;


    const unread =
        conversations.reduce(
            (sum, conversation) =>
                sum + conversation.unread,
            0
        );


    const archived =
        conversations.filter(
            conversation =>
                conversation.archived
        ).length;


    document.getElementById(
        "totalConversations"
    ).textContent = total;


    document.getElementById(
        "activeConversations"
    ).textContent = active;


    document.getElementById(
        "unreadMessages"
    ).textContent = unread;


    document.getElementById(
        "archivedConversations"
    ).textContent = archived;


    document.getElementById(
        "sidebarUnread"
    ).textContent = unread;

}


/* =========================================================
   SEARCH
========================================================= */

conversationSearch.addEventListener(
    "input",
    event => {

        searchTerm =
            event.target.value.trim();

        renderConversations();

    }
);


/* =========================================================
   FILTER TABS
========================================================= */

document
    .querySelectorAll(".conversation-tab")
    .forEach(tab => {

        tab.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(".conversation-tab")
                    .forEach(item =>
                        item.classList.remove("active")
                    );


                tab.classList.add("active");


                currentFilter =
                    tab.dataset.filter;


                renderConversations();

            }
        );

    });


/* =========================================================
   SEND BUTTON
========================================================= */

sendBtn.addEventListener(
    "click",
    sendMessage
);


/* =========================================================
   ENTER TO SEND
========================================================= */

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


/* =========================================================
   TEXTAREA AUTO RESIZE
========================================================= */

function autoResizeTextarea() {

    messageInput.style.height = "auto";

    messageInput.style.height =
        Math.min(
            messageInput.scrollHeight,
            90
        ) + "px";

}


messageInput.addEventListener(
    "input",
    autoResizeTextarea
);


/* =========================================================
   EMOJI PICKER
========================================================= */

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

                autoResizeTextarea();

                emojiPicker.classList.remove(
                    "show"
                );

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

            emojiPicker.classList.remove(
                "show"
            );

        }

    }
);


/* =========================================================
   ATTACHMENT
========================================================= */

attachmentBtn.addEventListener(
    "click",
    () => {

        fileInput.click();

    }
);


fileInput.addEventListener(
    "change",
    () => {

        if (!fileInput.files.length) {
            return;
        }


        const file =
            fileInput.files[0];


        showToast(
            "Attachment Selected",
            file.name,
            "📎"
        );


        fileInput.value = "";

    }
);


/* =========================================================
   OWNER INFO
========================================================= */

ownerInfoBtn.addEventListener(
    "click",
    () => {

        ownerModal.classList.add("show");

    }
);


/* =========================================================
   CLOSE MODAL
========================================================= */

document
    .querySelectorAll("[data-close-modal]")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                ownerModal.classList.remove(
                    "show"
                );

            }
        );

    });


ownerModal.addEventListener(
    "click",
    event => {

        if (
            event.target === ownerModal
        ) {

            ownerModal.classList.remove(
                "show"
            );

        }

    }
);


/* =========================================================
   ARCHIVE
========================================================= */

archiveBtn.addEventListener(
    "click",
    () => {

        const conversation =
            getSelectedConversation();


        if (!conversation) {
            return;
        }


        conversation.archived =
            !conversation.archived;


        saveMessages();

        updateStats();

        renderConversations();


        showToast(
            conversation.archived
                ? "Conversation Archived"
                : "Conversation Restored",

            conversation.archived
                ? "Conversation moved to archive."
                : "Conversation restored.",

            "🗂️"
        );


        if (
            conversation.archived &&
            currentFilter !== "archived"
        ) {

            chatArea.classList.remove(
                "mobile-open"
            );

        }

    }
);


/* =========================================================
   VIEW PROPERTY
========================================================= */

viewPropertyBtn.addEventListener(
    "click",
    () => {

        showToast(
            "Property Preview",
            "Property details page will open here.",
            "🏠"
        );

        /*
         * Later connect:
         * ../../public/property/property-details.html
         */

    }
);


/* =========================================================
   NEW MESSAGE
========================================================= */

newMessageBtn.addEventListener(
    "click",
    () => {

        showToast(
            "New Conversation",
            "Property owner selection will be connected later.",
            "＋"
        );

    }
);


/* =========================================================
   MOBILE SIDEBAR
========================================================= */

menuBtn.addEventListener(
    "click",
    () => {

        sidebar.classList.add("open");

        sidebarOverlay.classList.add("show");

    }
);


sidebarClose.addEventListener(
    "click",
    closeSidebar
);


sidebarOverlay.addEventListener(
    "click",
    closeSidebar
);


function closeSidebar() {

    sidebar.classList.remove("open");

    sidebarOverlay.classList.remove("show");

}


/* =========================================================
   MOBILE BACK
========================================================= */

backConversations.addEventListener(
    "click",
    () => {

        chatArea.classList.remove(
            "mobile-open"
        );

    }
);


/* =========================================================
   LOGOUT
========================================================= */

logoutBtn.addEventListener(
    "click",
    () => {

        const confirmed =
            confirm(
                "Are you sure you want to logout?"
            );


        if (!confirmed) {
            return;
        }


        localStorage.removeItem(
            "roomnest_student_token"
        );


        localStorage.removeItem(
            "roomnest_student"
        );


        showToast(
            "Logged Out",
            "You have been logged out.",
            "↪"
        );


        setTimeout(() => {

            window.location.href =
                "../../public/auth/login.html";

        }, 900);

    }
);


/* =========================================================
   INITIALIZE
========================================================= */

loadMessages();

renderConversations();

selectConversation(
    selectedConversationId
);

updateStats();