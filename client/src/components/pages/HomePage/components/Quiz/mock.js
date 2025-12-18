import enums from "../../../../../enums";

const alternatives1 = [
    { text: "Rios e lagos de água corrente", isCorrect: false },
    { text: "Locais com água parada e limpa", isCorrect: true },
    { text: "Lixões secos e sem umidade", isCorrect: false },
    { text: "Água salgada do mar", isCorrect: false },
];

const alternatives2 = [
    { text: "Deixar garrafas e pneus ao ar livre", isCorrect: false },
    { text: "Tampar caixas d’água e eliminar recipientes com água parada", isCorrect: true },
    { text: "Usar apenas repelente", isCorrect: false },
    { text: "Jogar lixo em terrenos baldios", isCorrect: false },
];

const alternatives3 = [
    { text: "Mutualismo", isCorrect: false },
    { text: "Parasitismo", isCorrect: true },
    { text: "Comensalismo", isCorrect: false },
    { text: "Competição", isCorrect: false },
];

const alternatives4 = [
    { text: "Baixa temperatura e seca prolongada", isCorrect: false },
    { text: "Clima quente, chuvas e acúmulo de lixo urbano", isCorrect: true },
    { text: "Poluição do ar e queimadas", isCorrect: false },
    { text: "Redução da umidade do ar", isCorrect: false },
];

const alternatives5 = [
    { text: "Jogar óleo de cozinha na pia", isCorrect: false },
    { text: "Manter plantas com pratos cheios de água", isCorrect: false },
    { text: "Reciclar materiais e limpar quintais regularmente", isCorrect: true },
    { text: "Acumular entulho no quintal", isCorrect: false },
];

const questionsMock = [
    {
        title: "O mosquito Aedes aegypti, transmissor da dengue, zika e chikungunya, se reproduz principalmente em:",
        options: alternatives1,
    },
    {
        title: "Uma forma eficaz de evitar a proliferação do mosquito da dengue é:",
        options: alternatives2,
    },
    {
        title: "A relação entre o homem e o mosquito Aedes aegypti é um exemplo de:",
        options: alternatives3,
    },
    {
        title: "O aumento de casos de dengue está relacionado a fatores ecológicos como:",
        options: alternatives4,
    },
    {
        title: "Qual destas atitudes ajuda na preservação ambiental e na prevenção de doenças?",
        options: alternatives5,
    },
];

export default {
    id: 1,
    type: enums.QUIZ_TYPES.HEALTH.title,
    questions: questionsMock,
};
