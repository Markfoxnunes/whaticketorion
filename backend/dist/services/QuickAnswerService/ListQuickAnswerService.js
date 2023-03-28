"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const QuickAnswer_1 = __importDefault(require("../../models/QuickAnswer"));
const ListQuickAnswerService = ({ searchParam = "", pageNumber = "1" }) => __awaiter(void 0, void 0, void 0, function* () {
    const whereCondition = {
        message: sequelize_1.Sequelize.where(sequelize_1.Sequelize.fn("LOWER", sequelize_1.Sequelize.col("message")), "LIKE", `%${searchParam.toLowerCase().trim()}%`)
    };
    const limit = 40;
    const offset = limit * (+pageNumber - 1);
    const { count, rows: quickAnswers } = yield QuickAnswer_1.default.findAndCountAll({
        where: whereCondition,
        limit,
        offset,
        order: [["message", "ASC"]]
    });
    const hasMore = count > offset + quickAnswers.length;
    return {
        quickAnswers,
        count,
        hasMore
    };
});
exports.default = ListQuickAnswerService;
