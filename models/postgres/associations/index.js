module.exports = (model) => {
    model.chatSetting.hasMany(model.weddingImages, {
        foreignKey: "userid",
        targetKey: "id",
    });
};
