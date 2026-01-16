import { avatarClasses } from "@mui/material";

export const sampleChats = [
  {
    avatar: ["/imgs/lord-vishnu-.avif"],
    name: "a.chetan",
    _id: "1",
    groupChat: false,
    members: ["1", "2"],
  },
  {
    avatar: ["/imgs/coder.png", "/imgs/tree.png", "/imgs/lord-vishnu-.avif"],
    name: "killer",
    _id: "2",
    groupChat: true,
    members: ["1", "2"],
  },
  {
    avatar: ["/imgs/tree.png"],
    name: "shadow",
    _id: "3",
    groupChat: false,
    members: ["1", "2"],
  },
];

export const sampleUsers = [
  {
    _id: "1",
    name: "shadow",
    avatar: "/imgs/tree.png",
  },
  {
    _id: "2",
    name: "a.chetan",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    _id: "3",
    name: "jane.doe",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
  },
  {
    _id: "4",
    name: "john.smith",
    avatar: "https://randomuser.me/api/portraits/men/4.jpg",
  },
  {
    _id: "5",
    name: "emma.watson",
    avatar: "https://randomuser.me/api/portraits/women/5.jpg",
  },
];

export const sampleNotifications = [
  {
    _id: "1",
    sender: {
      avatar: "https://randomuser.me/api/portraits/women/5.jpg",
      name: "emma.watson",
    },
  },
  {
    _id: "2",
    sender: {
      avatar: "https://randomuser.me/api/portraits/women/5.jpg",
      name: "emma.watson",
    },
  },
];

export const sampleMessages = [
  {
    _id: "msg1",
    content: "Did you watch the latest SpaceX launch?",
    sender: {
      _id: "2",
      name: "a.chetan",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    },
    chat: "2",
    attachments: [
      {
        public_id: "public_sample_msg1_1",
        url: "/imgs/coder.png",
      },
    ],
    createdAt: "2024-06-01T10:00:00Z",
  },
  {
    _id: "msg2",
    content: "Yes! The Falcon 9 landed perfectly again.",
    sender: {
      _id: "1",
      name: "shadow",
      avatar: "/imgs/tree.png",
    },
    chat: "2",
    attachments: [
      {
        public_id: "public_sample_msg2_1",
        url: "/imgs/tree.png",
      },
    ],
    createdAt: "2024-06-01T10:01:00Z",
  },
  {
    _id: "msg1",
    content: "It's amazing how reusable rockets are changing space travel.",
    sender: {
      _id: "2",
      name: "a.chetan",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    },
    chat: "2",
    attachments: [
      {
        public_id: "public_sample_msg3_1",
        url: "/imgs/lord-vishnu-.avif",
      },
    ],
    createdAt: "2024-06-01T10:02:00Z",
  },
  {
    _id: "msg2",
    content: "Can't wait for the Starship missions to Mars!",
    sender: {
      _id: "1",
      name: "shadow",
      avatar: "/imgs/tree.png",
    },
    chat: "2",
    attachments: [
      {
        public_id: "public_sample_msg4_1",
        url: "/imgs/tree.png",
      },
    ],
    createdAt: "2024-06-01T10:03:00Z",
  },
  {
    _id: "msg2",
    // content: "Can't wait for the Starship missions to Mars!",
    sender: {
      _id: "1",
      name: "shadow",
      avatar: "/imgs/tree.png",
    },
    chat: "2",
    attachments: [
      {
        public_id: "public_sample_msg4_1",
        url: "/imgs/tree.png",
      },
    ],
    createdAt: "2024-06-01T10:03:00Z",
  },
  {
    _id: "msg2",
    content: "Yes! The Falcon 9 landed perfectly again.",
    sender: {
      _id: "2",
      name: "shadow",
      avatar: "/imgs/tree.png",
    },
    chat: "2",
    createdAt: "2024-06-01T10:01:00Z",
  },
  {
    _id: "msg2",
    attachments: [
      { public_id: "vid1", url: "/videos/v.mp4" },
      { public_id: "aud1", url: "/audio/song.mp3" },
      { public_id: "doc1", url: "/docs/file.pdf" },
    ],
    content: "Yes! The Falcon 9 landed perfectly again.",
    sender: {
      _id: "2",
      name: "shadow",
      avatar: "/imgs/tree.png",
    },
    chat: "2",
    createdAt: "2024-06-01T10:01:00Z",
  },
];

export const sampleGroups = [
  {
    _id: "g1",
    name: "Design Team",
    subtitle: "UI/UX discussions",
    members: ["A", "B", "C", "D"],
    cover:
      "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=1400&q=80",
  },
  {
    _id: "g2",
    name: "Frontend Devs",
    subtitle: "React, MUI & tooling",
    members: ["G", "H", "I"],
    cover:
      "https://images.unsplash.com/photo-1542744095-291d1f67b221?w=1400&q=80",
  },
  {
    _id: "g3",
    name: "Product",
    subtitle: "Roadmap & specs",
    members: ["X", "Y"],
    cover:
      "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?w=1400&q=80",
  },
  {
    _id: "g4",
    name: "Backend Engineers",
    subtitle: "APIs, services & infra",
    members: ["M", "N", "O"],
    cover:
      "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=1400&q=80",
  },
  {
    _id: "g5",
    name: "QA",
    subtitle: "Testing & reliability",
    members: ["Q", "R"],
    cover:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1400&q=80",
  },
  {
    _id: "g6",
    name: "Marketing",
    subtitle: "Growth & comms",
    members: ["S", "T", "U"],
    cover:
      "https://images.unsplash.com/photo-1492496913980-501348b61469?w=1400&q=80",
  },
  {
    _id: "g7",
    name: "Operations",
    subtitle: "SRE & platform",
    members: ["V", "W"],
    cover:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1400&q=80",
  },
];

export const sampleDashboardData = {
  users: [
    {
      name: "bob",
      avatar: "/imgs/tree.png",
      _id: "1",
      username: "shadow",
      friends: 23,
      groups: 5,
    },
    {
      name: "killer",
      avatar: "/imgs/coder.png",
      _id: "2",
      username: "kieller",
      friends: 45,
      groups: 8,
    },
    {
      name: "god",
      avatar: "/imgs/lord-vishnu-.avif",
      _id: "3",
      username: "GOD",
      friends: 12,
      groups: 3,
    },
  ],


  chats: [
    {
      name: "group chat 1",
      avatar: ["/imgs/tree.png", "/imgs/coder.png"],
      _id: "1",
      groupChat: true,
      totalMembers: 23,
      totalMessages: 150,
      members: [
        { _id: '1', name: "shadow", avatar: "/imgs/tree.png" },
        { _id: '2', name: "a.chetan", avatar: "https://randomuser.me/api/portraits/men/2.jpg" },
        { _id: '3', name: "jane.doe", avatar: "https://randomuser.me/api/portraits/women/3.jpg" },
      ],
      creator: { name: "shadow", avatar: "/imgs/tree.png" },
    }, {
      name: "chat between bob and killer",
      avatar: ["/imgs/coder.png"],
      _id: "2",
      groupChat: false,
      totalMembers: 2,
      totalMessages: 75,
      members: [
        { _id: '1', name: "bob", avatar: "/imgs/tree.png" },
        { _id: '2', name: "killer", avatar: "/imgs/coder.png" },
      ],
      creator: { name: "bob", avatar: "/imgs/tree.png" },
    }
  ],

  message: [
    {
      attachments: [{ public_id: "public_sample_msg1_1", url: "/imgs/vinlandSaga.png" }],
      content: "Hello World",
      _id: 'msg1',
      sender: { _id: '1', name: "bob", avatar: "/imgs/vinlandSaga.png" },
      chat: "chatId",groupChat:false,

      createdAt: "2024-06-01T10:00:00Z",
    }, 
    {
      // attachments: [{ public_id: "public_sample_msg2_25", url: "/imgs/tree.png" }],
      content: "",
      _id: 'msg2',
      sender: { _id: '2', name: "killer", avatar: "/imgs/coder.png" },
      chat: "chatId",
      groupChat:true,
      createdAt: "2024-06-01T10:05:00Z",

    }
  ]
};
