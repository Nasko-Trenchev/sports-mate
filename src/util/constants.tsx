
export const ImageTypes = ["jpg", "jpeg", "jfif", "pjpeg", "pjp", "png", "webp", "avif", "apng", "gif"];
export const SkillLevels = ["Novice", "Beginner", "Advanced", "Expert", "Professional"]

export enum SkillLevelCodes {
    Novice = 1,
    Beginner,
    Advanced,
    Expert,
    Proffesional,
}

export const FootballFields = [
    "Sofia Sport 1",
    "RD Sport",
    "Sport complex OMV",
]

export const TennisFields = [
    "Tennis club Maleevi"
]

export const VolleyballFields = [
    "Asics arena",
    "Arena Sofia"
]

export const BasketballFields = [
    "Tripple double arena",
    "Titi Papazov center",
    "Triaditsa hall"
]

export const FieldsImage = [
    {
        location: "Sofia Sport 1",
        street: 'Sofia, bul Maria Luiza',
        image: 'https://lh3.googleusercontent.com/p/AF1QipNPGTcqMIJCNltlSOFSpgfDpSTl00AArd_zHd4H=s680-w680-h510',
        additionalImages: [
            "https://lh3.googleusercontent.com/p/AF1QipNPGTcqMIJCNltlSOFSpgfDpSTl00AArd_zHd4H=s680-w680-h510",
            "https://lh5.googleusercontent.com/p/AF1QipNACwE_np5zlSZ_4P2Jf364eNRQj9kywAfkGRHk=w260-h175-n-k-no",
            "https://lh5.googleusercontent.com/p/AF1QipNACwE_np5zlSZ_4P2Jf364eNRQj9kywAfkGRHk=w260-h175-n-k-no",
        ],
        coordinates: { lat: 42.65013036910133, lng: 23.33918324785182 }
    },
    {
        location: "RD Sport",
        street: 'Sofia, bul Maria Luiza',
        image: 'https://lh5.googleusercontent.com/p/AF1QipNACwE_np5zlSZ_4P2Jf364eNRQj9kywAfkGRHk=w650-h432-k-no',
        additionalImages: [
            "https://lh5.googleusercontent.com/p/AF1QipNACwE_np5zlSZ_4P2Jf364eNRQj9kywAfkGRHk=w650-h432-k-no",
            "https://stolica.bg/wp-content/uploads/2022/10/resize_uch_igri_2022_5_2048x1536.jpg",
            "https://imgrabo.com/pics/guide/20150929094125_27579.jpeg"
        ],
        coordinates: { lat: 42.65973821996859, lng: 23.354233246583714 }
    },
    {
        location: "Sport complex OMV",
        street: 'Sofia, bul Maria Luiza',
        image: 'http://www.kidssports.bg/prettyPhoto/default/sprite_y.png',
        coordinates: { lat: 42.661887368545905, lng: 23.392248001624957 }
    }
    ,
    {
        location: "Triaditsa hall",
        street: 'Sofia, Metlichna Polyana 57-58 str',
        image: 'https://sportenkalendar.bg/uploads/pages/zala-triad-6349b262b7759151365050.jpg',
        additionalImages: [
            "https://basketball.bg/pictures/pic_big/gallery/3h3/51909647120_91654ce424_k.jpg",
            "https://sportuvai.bg/pictures/187168_401_301.jpg",
            "https://m5.netinfo.bg/media/images/12024/12024673/960-600-spartak-trenirashe-izvestno-vreme-v-zala-rumen-pejchev.jpg",
        ],
        coordinates: { lat: 42.666213097265086, lng: 23.29772140479299 }
    },
    {
        location: "Tennis club Maleevi",
        street: 'Sofia, N.Vaptsarov 57 str',
        image: 'https://tennis.bg/uploaded/courts/1/galleries/6c882c7812e205a66c3b6c388fecb9da.jpg',
        additionalImages: [
            "https://tennis.bg/uploaded/courts/1/galleries/6c882c7812e205a66c3b6c388fecb9da.jpg",
            "https://sofiaestates.com/wp-content/uploads/2015/06/pic-123.jpg",
            "https://sofiaestates.com/wp-content/uploads/2015/06/pic-317-e1437373367334.jpg",
        ],
        coordinates: { lat: 42.66784492184275, lng: 23.32827062883584 }
    }
]

export const ratingLabels: { [index: string]: string } = {
    1: 'Novice',
    2: 'Beginner',
    3: 'Advanced',
    4: 'Expert',
    5: 'Professional',
};

export const helpRules = [
    {
        title: "What is "
    }
]