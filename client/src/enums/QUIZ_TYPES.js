const types = {
    HEALTH: { code: 1, title: "Ecologia e Saúde" } // todo change for actual types
};

const fromCode = (code) => {
    for(type in types) {
        if (type.code == code) return type;
    }
}

export default Object.freeze({
    ...types,
    fromCode
});