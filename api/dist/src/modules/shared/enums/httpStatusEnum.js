export var HttpStatusEnum;
(function (HttpStatusEnum) {
    HttpStatusEnum[HttpStatusEnum["OK"] = 200] = "OK";
    HttpStatusEnum[HttpStatusEnum["CREATED"] = 201] = "CREATED";
    HttpStatusEnum[HttpStatusEnum["UNPROCESSABLE_ENTITY"] = 422] = "UNPROCESSABLE_ENTITY";
    HttpStatusEnum[HttpStatusEnum["TOO_MANY_REQUESTS"] = 429] = "TOO_MANY_REQUESTS";
    HttpStatusEnum[HttpStatusEnum["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
    HttpStatusEnum[HttpStatusEnum["INVALID_CREDENTIALS"] = 400] = "INVALID_CREDENTIALS";
    HttpStatusEnum[HttpStatusEnum["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
})(HttpStatusEnum || (HttpStatusEnum = {}));
//# sourceMappingURL=httpStatusEnum.js.map