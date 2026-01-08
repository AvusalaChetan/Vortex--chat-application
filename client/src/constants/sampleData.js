

export const sampleChats = [
  {
    avatar: ['/imgs/lord-vishnu-.avif'],
    name: 'a.chetan',
    _id: '1',
    groupChat: false,
    members: ['1', '2']
  },
  {
    avatar: ['/imgs/coder.png',
      '/imgs/tree.png',
      '/imgs/lord-vishnu-.avif',

    ],
    name: 'killer',
    _id: '2',
    groupChat: true,
    members: ['1', '2']
  },
  {
    avatar: ['/imgs/tree.png'],
    name: 'shadow',
    _id: '3',
    groupChat: false,
    members: ['1', '2']
  },
]



export const sampleUsers = [
  {
    _id: "1",
    name: "shadow",
    avatar: "/imgs/tree.png"
  },
  {
    _id: "2",
    name: "a.chetan",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg"
  },
  {
    _id: "3",
    name: "jane.doe",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg"
  },
  {
    _id: "4",
    name: "john.smith",
    avatar: "https://randomuser.me/api/portraits/men/4.jpg"
  },
  {
    _id: "5",
    name: "emma.watson",
    avatar: "https://randomuser.me/api/portraits/women/5.jpg"
  },
]

export const sampleNotifications = [
  {
    _id: "1",
    sender: {
      avatar: "https://randomuser.me/api/portraits/women/5.jpg",
      name: "emma.watson",
    }
  },
  {
    _id: "2",
    sender: {
      avatar: "https://randomuser.me/api/portraits/women/5.jpg",
      name: "emma.watson",
    }
  },
]



export const sampleMessages = [
  {
    _id: "msg1",
    content: "Did you watch the latest SpaceX launch?",
    sender: {
      _id: "2",
      name: "a.chetan",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg"
    },
    chat: "2",
    attachments: [
      {
        public_id: "public_sample_msg1_1",
        url: "/imgs/coder.png",
      },
    ],
    createdAt: "2024-06-01T10:00:00Z"
  },
  {
    _id: "msg2",
    content: "Yes! The Falcon 9 landed perfectly again.",
    sender: {
      _id: "1",
      name: "shadow",
      avatar: "/imgs/tree.png"
    },
    chat: "2",
    attachments: [
      {
        public_id: "public_sample_msg2_1",
        url: "/imgs/tree.png",
      },
    ],
    createdAt: "2024-06-01T10:01:00Z"
  },
  {
    _id: "msg1",
    content: "It's amazing how reusable rockets are changing space travel.",
    sender: {
      _id: "2",
      name: "a.chetan",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg"
    },
    chat: "2",
    attachments: [
      {
        public_id: "public_sample_msg3_1",
        url: "/imgs/lord-vishnu-.avif",
      },
    ],
    createdAt: "2024-06-01T10:02:00Z"
  },
  {
    _id: "msg2",
    content: "Can't wait for the Starship missions to Mars!",
    sender: {
      _id: "1",
      name: "shadow",
      avatar: "/imgs/tree.png"
    },
    chat: "2",
    attachments: [
      {
        public_id: "public_sample_msg4_1",
        url: "/imgs/tree.png",
      },
    ],
    createdAt: "2024-06-01T10:03:00Z"
  },
  {
    _id: "msg2",
    // content: "Can't wait for the Starship missions to Mars!",
    sender: {
      _id: "1",
      name: "shadow",
      avatar: "/imgs/tree.png"
    },
    chat: "2",
    attachments: [
      {
        public_id: "public_sample_msg4_1",
        url: "/imgs/tree.png",
      },
    ],
    createdAt: "2024-06-01T10:03:00Z"
  }
  ,
  {
    _id: "msg2",
    content: "Yes! The Falcon 9 landed perfectly again.",
    sender: {
      _id: "2",
      name: "shadow",
      avatar: "/imgs/tree.png"
    },
    chat: "2",
    createdAt: "2024-06-01T10:01:00Z"
  },
  {

    _id: "msg2",
    attachments: [
      { public_id: "vid1", url: "/videos/v.mp4" },
      { public_id: "aud1", url: "/audio/song.mp3" },
      { public_id: "doc1", url: "/docs/file.pdf" }
    ],
    content: "Yes! The Falcon 9 landed perfectly again.",
    sender: {
      _id: "2",
      name: "shadow",
      avatar: "/imgs/tree.png"
    },
    chat: "2",
    createdAt: "2024-06-01T10:01:00Z"
  },
]