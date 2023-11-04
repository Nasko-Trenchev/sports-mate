
export const ImageTypes = ["jpg", "jpeg", "jfif", "pjpeg", "pjp", "png", "webp", "avif", "apng", "gif"];
export const SkillLevels = ["Beginner", "Advanced", "Expert", "Proffesional"]

export const FootballFields = [
    "Sofia Sport 1",
    "RD Sport",
    "Sport complex OMV",
]

export const TennisFields = [
    "Tennis ground"
]

export const FootballFieldsImage = [
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
        image: 'https://lh5.googleusercontent.com/p/AF1QipNACwE_np5zlSZ_4P2Jf364eNRQj9kywAfkGRHk=w260-h175-n-k-no',
        coordinates: { lat: 42.65973821996859, lng: 23.354233246583714 }
    },
    {
        location: "Sport complex OMV",
        street: 'Sofia, bul Maria Luiza',
        image: 'http://www.kidssports.bg/prettyPhoto/default/sprite_y.png',
        coordinates: { lat: 42.661887368545905, lng: 23.392248001624957 }
    }
]

export const ratingLabels: { [index: string]: string } = {
    1: 'Useless',
    2: 'Poor',
    3: 'Ok',
    4: 'Good',
    5: 'Excellent',
};